import { Hono } from "hono";
import * as Consumet from "@consumet/extensions";
import { cache } from "../../../config/cache.js";
import type { ServerContext } from "../../../config/context.js";

const META = Consumet.META as Record<string, new () => any>;
const metaRouter = new Hono<ServerContext>();

metaRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        data: {
            message: "Available meta providers",
            providers: ["anilist", "tmdb"],
        },
    });
});

// Anilist specific routes
metaRouter.get("/anilist/:query", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const query = c.req.param("query");
    const page = parseInt(c.req.query("page") || "1");
    const perPage = parseInt(c.req.query("perPage") || "20");
    const anilist = new META["Anilist"]();
    const data = await cache.getOrSet(() => anilist.search(query, page, perPage), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

metaRouter.get("/anilist/info/:id", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const id = c.req.param("id");
    const dub = c.req.query("dub") === "true";
    const anilist = new META["Anilist"]();
    const data = await cache.getOrSet(() => anilist.fetchAnimeInfo(id, dub), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

metaRouter.get("/anilist/trending", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const page = parseInt(c.req.query("page") || "1");
    const perPage = parseInt(c.req.query("perPage") || "20");
    const anilist = new META["Anilist"]();
    const data = await cache.getOrSet(() => anilist.fetchTrendingAnime(page, perPage), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

metaRouter.get("/anilist/watch/:episodeId", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const episodeId = c.req.param("episodeId");
    const anilist = new META["Anilist"]();
    const data = await cache.getOrSet(() => anilist.fetchEpisodeSources(episodeId), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

export { metaRouter };
