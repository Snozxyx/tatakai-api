import { Hono } from "hono";
import * as Consumet from "@consumet/extensions";
import { cache } from "../../../config/cache.js";
import type { ServerContext } from "../../../config/context.js";

const ANIME = Consumet.ANIME as Record<string, new () => any>;
const animeRouter = new Hono<ServerContext>();

// Get available anime providers
animeRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        data: {
            message: "Available anime providers",
            providers: ["gogoanime", "zoro", "enime", "animepahe", "9anime"],
        },
    });
});

// Helper for provider routes
const registerProvider = (name: string, className: string) => {
    // Search
    animeRouter.get(`/${name}/:query`, async (c) => {
        const cacheConfig = c.get("CACHE_CONFIG");
        const query = c.req.param("query");
        const page = parseInt(c.req.query("page") || "1");
        const provider = new ANIME[className]();
        const data = await cache.getOrSet(() => provider.search(query, page), cacheConfig.key, cacheConfig.duration);
        return c.json({ provider: "Tatakai", status: 200, data });
    });

    // Info
    animeRouter.get(`/${name}/info/:id`, async (c) => {
        const cacheConfig = c.get("CACHE_CONFIG");
        const id = c.req.param("id");
        const provider = new ANIME[className]();
        const data = await cache.getOrSet(() => provider.fetchAnimeInfo(id), cacheConfig.key, cacheConfig.duration);
        return c.json({ provider: "Tatakai", status: 200, data });
    });

    // Watch
    animeRouter.get(`/${name}/watch/:episodeId`, async (c) => {
        const cacheConfig = c.get("CACHE_CONFIG");
        const episodeId = c.req.param("episodeId");
        const server = c.req.query("server");
        const provider = new ANIME[className]();
        const data = await cache.getOrSet(() => provider.fetchEpisodeSources(episodeId, server as any), cacheConfig.key, cacheConfig.duration);
        return c.json({ provider: "Tatakai", status: 200, data });
    });
};

registerProvider("gogoanime", "Gogoanime");
registerProvider("zoro", "Zoro");
registerProvider("enime", "Enime");
registerProvider("animepahe", "AnimePahe");
registerProvider("9anime", "NineAnime");

// Recent episodes (Gogoanime specific usually)
animeRouter.get("/gogoanime/recent-episodes", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const page = parseInt(c.req.query("page") || "1");
    const type = parseInt(c.req.query("type") || "1");
    const gogoanime = new ANIME["Gogoanime"]();
    const data = await cache.getOrSet(() => gogoanime.fetchRecentEpisodes(page, type), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

export { animeRouter };
