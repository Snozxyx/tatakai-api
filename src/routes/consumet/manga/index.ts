import { Hono } from "hono";
import * as Consumet from "@consumet/extensions";
import { cache } from "../../../config/cache.js";
import type { ServerContext } from "../../../config/context.js";

const MANGA = Consumet.MANGA as Record<string, new () => any>;
const mangaRouter = new Hono<ServerContext>();

mangaRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        data: {
            message: "Available manga providers",
            providers: ["mangadex", "mangahere", "mangakakalot", "mangapark"],
        },
    });
});

const registerMangaProvider = (name: string, className: string) => {
    // Search
    mangaRouter.get(`/${name}/:query`, async (c) => {
        const cacheConfig = c.get("CACHE_CONFIG");
        const query = c.req.param("query");
        const page = parseInt(c.req.query("page") || "1");
        const provider = new MANGA[className]();
        const data = await cache.getOrSet(() => provider.search(query, page), cacheConfig.key, cacheConfig.duration);
        return c.json({ provider: "Tatakai", status: 200, data });
    });

    // Info
    mangaRouter.get(`/${name}/info/:id`, async (c) => {
        const cacheConfig = c.get("CACHE_CONFIG");
        const id = c.req.param("id");
        const provider = new MANGA[className]();
        const data = await cache.getOrSet(() => provider.fetchMangaInfo(id), cacheConfig.key, cacheConfig.duration);
        return c.json({ provider: "Tatakai", status: 200, data });
    });

    // Read
    mangaRouter.get(`/${name}/read/:chapterId`, async (c) => {
        const cacheConfig = c.get("CACHE_CONFIG");
        const chapterId = c.req.param("chapterId");
        const provider = new MANGA[className]();
        const data = await cache.getOrSet(() => provider.fetchChapterPages(chapterId), cacheConfig.key, cacheConfig.duration);
        return c.json({ provider: "Tatakai", status: 200, data });
    });
};

registerMangaProvider("mangadex", "MangaDex");
registerMangaProvider("mangahere", "MangaHere");
registerMangaProvider("mangakakalot", "MangaKakalot");
registerMangaProvider("mangapark", "MangaPark");

export { mangaRouter };
