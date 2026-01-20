import { Hono } from "hono";
import * as Consumet from "@consumet/extensions";
import { cache } from "../../../config/cache.js";
import type { ServerContext } from "../../../config/context.js";

const NEWS = Consumet.NEWS as Record<string, new () => any>;
const newsRouter = new Hono<ServerContext>();

newsRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        data: {
            message: "Available news providers",
            providers: ["ann"],
        },
    });
});

newsRouter.get("/ann", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const ann = new NEWS["ANN"]();

    const data = await cache.getOrSet(async () => {
        return ann.fetchNewsFeeds();
    }, cacheConfig.key, cacheConfig.duration);

    return c.json({ provider: "Tatakai", status: 200, data });
});

export { newsRouter };
