import { Hono } from "hono";
import * as cheerio from "cheerio";
import { cache } from "../../config/cache.js";
import type { ServerContext } from "../../config/context.js";

const animelokRouter = new Hono<ServerContext>();

const BASE_URL = "https://animelok.to";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchHtml(url: string): Promise<string> {
    const response = await fetch(url, {
        headers: {
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml",
            "Referer": BASE_URL,
        },
    });
    return response.text();
}

// ========== HOME ==========
animelokRouter.get("/home", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");

    const data = await cache.getOrSet(async () => {
        const html = await fetchHtml(`${BASE_URL}/home`);
        const $ = cheerio.load(html);

        const sections: any[] = [];


        // Loop through all sections
        $("section").each((_, section) => {
            const title = $(section).find("h2").text().trim();
            if (!title) return;

            const items: any[] = [];

            // Find all anime cards in this section
            $(section).find("a[href^='/anime/']").each((_, link) => {
                const url = $(link).attr("href");
                const id = url?.split("/").pop(); // text-123456
                const poster = $(link).find("img").attr("src");
                const title = $(link).find("h3").text().trim();
                const rank = $(link).find("span").first().text().trim(); // For trending "01", "02" etc.
                const dubBadge = $(link).find("span:contains('DUB')").length > 0 || $(link).text().includes("Dub");

                if (title && id) {
                    items.push({
                        id,
                        title,
                        poster,
                        url,
                        rank: rank && !isNaN(parseInt(rank)) ? parseInt(rank) : undefined,
                        isDub: dubBadge
                    });
                }
            });

            if (items.length > 0) {
                sections.push({
                    title,
                    items
                });
            }
        });

        return { sections };
    }, cacheConfig.key, cacheConfig.duration);

    return c.json({ provider: "Tatakai", status: 200, data });
});

// ========== SCHEDULE ==========
animelokRouter.get("/schedule", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");

    const data = await cache.getOrSet(async () => {
        const html = await fetchHtml(`${BASE_URL}/regional-schedule`);
        const $ = cheerio.load(html);

        const schedule: any[] = [];

        $(".schedule-day, .day-section").each((_, day) => {
            const dayName = $(day).find(".day-title, h3").first().text().trim();
            const anime: any[] = [];

            $(day).find(".anime-item, .schedule-item").each((_, item) => {
                const title = $(item).find(".title, a").first().text().trim();
                const time = $(item).find(".time").text().trim();
                const link = $(item).find("a").attr("href");
                const id = link?.match(/\/anime\/([^\/]+)/)?.[1];

                if (title) {
                    anime.push({ id, title, time, url: link });
                }
            });

            if (anime.length > 0) {
                schedule.push({ day: dayName, anime });
            }
        });

        return { schedule };
    }, cacheConfig.key, cacheConfig.duration);

    return c.json({ provider: "Tatakai", status: 200, data });
});

// ========== LANGUAGES ==========
animelokRouter.get("/languages", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");

    const data = await cache.getOrSet(async () => {
        const html = await fetchHtml(`${BASE_URL}/languages`);
        const $ = cheerio.load(html);

        const languages: any[] = [];

        $(".language-item, .lang-card, a[href*='/language/']").each((_, item) => {
            const name = $(item).text().trim();
            const link = $(item).attr("href");
            const code = link?.match(/\/language\/([^\/]+)/)?.[1];

            if (name && code) {
                languages.push({ name, code, url: link });
            }
        });

        return { languages };
    }, cacheConfig.key, cacheConfig.duration);

    return c.json({ provider: "Tatakai", status: 200, data });
});

// ========== ANIME INFO ==========
animelokRouter.get("/anime/:id", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const id = c.req.param("id");

    const data = await cache.getOrSet(async () => {
        const html = await fetchHtml(`${BASE_URL}/anime/${id}`);
        const $ = cheerio.load(html);

        const title = $("h1, .anime-title").first().text().trim();
        const description = $(".synopsis, .description, [class*='desc']").first().text().trim();
        const poster = $(".poster img, .cover img").attr("src") || $("meta[property='og:image']").attr("content");
        const rating = $(".rating, .score").first().text().trim();

        // Extract seasons/episodes
        const seasons: any[] = [];
        $(".season, .episode-list").each((_, season) => {
            const seasonTitle = $(season).find(".season-title, h3").first().text().trim() || "Season 1";
            const episodes: any[] = [];

            $(season).find(".episode, .ep-item, a[href*='ep=']").each((_, ep) => {
                const epTitle = $(ep).text().trim();
                const epLink = $(ep).attr("href");
                const epNum = epLink?.match(/ep=(\d+)/)?.[1];

                if (epNum) {
                    episodes.push({ number: parseInt(epNum), title: epTitle, url: epLink });
                }
            });

            seasons.push({ title: seasonTitle, episodes });
        });

        return { id, title, description, poster, rating, seasons };
    }, cacheConfig.key, cacheConfig.duration);

    return c.json({ provider: "Tatakai", status: 200, data });
});

// ========== WATCH (Episode Sources) ==========
animelokRouter.get("/watch/:id", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const id = c.req.param("id");
    const ep = c.req.query("ep") || "1";

    const data = await cache.getOrSet(async () => {
        const html = await fetchHtml(`${BASE_URL}/watch/${id}?ep=${ep}`);
        const $ = cheerio.load(html);

        const title = $("h1, .episode-title").first().text().trim();

        const servers: any[] = [];
        const subtitles: any[] = [];

        // Extract servers from data attributes or script
        $("script").each((_, script) => {
            const content = $(script).html() || "";

            // Look for server data in scripts
            const serverMatch = content.match(/servers\s*[:=]\s*(\[[\s\S]*?\])/);
            if (serverMatch) {
                try {
                    const parsed = JSON.parse(serverMatch[1].replace(/'/g, '"'));
                    servers.push(...parsed);
                } catch { }
            }

            // Look for subtitle data
            const subMatch = content.match(/subtitles?\s*[:=]\s*(\[[\s\S]*?\])/);
            if (subMatch) {
                try {
                    const parsed = JSON.parse(subMatch[1].replace(/'/g, '"'));
                    subtitles.push(...parsed);
                } catch { }
            }
        });

        // Fallback: extract from visible server buttons
        $(".server-btn, .server-item, [data-server]").each((_, btn) => {
            const name = $(btn).text().trim();
            const serverUrl = $(btn).attr("data-src") || $(btn).attr("data-url") || $(btn).attr("href");
            const lang = $(btn).attr("data-lang") || "Unknown";

            if (name && serverUrl) {
                servers.push({ name, url: serverUrl, language: lang });
            }
        });

        // Extract subtitle tracks
        $("track[kind='subtitles'], track[kind='captions']").each((_, track) => {
            const label = $(track).attr("label") || $(track).attr("srclang");
            const src = $(track).attr("src");
            if (label && src) {
                subtitles.push({ label, src });
            }
        });

        return { id, episode: ep, title, servers, subtitles };
    }, cacheConfig.key, cacheConfig.duration);

    return c.json({ provider: "Tatakai", status: 200, data });
});

// ========== ROOT ==========
animelokRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        message: "Animelok Scraper - Hindi Dubbed Anime with HiAnime-style IDs",
        endpoints: {
            home: "/api/v1/animelok/home",
            schedule: "/api/v1/animelok/schedule",
            languages: "/api/v1/animelok/languages",
            anime: "/api/v1/animelok/anime/:id",
            watch: "/api/v1/animelok/watch/:id?ep=1",
        },
    });
});

export { animelokRouter };
