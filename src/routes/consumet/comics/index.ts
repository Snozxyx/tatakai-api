import { Hono } from "hono";
import * as Consumet from "@consumet/extensions";
import { cache } from "../../../config/cache.js";
import type { ServerContext } from "../../../config/context.js";

const COMICS = Consumet.COMICS as Record<string, new () => any>;
const comicsRouter = new Hono<ServerContext>();

comicsRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        data: {
            message: "Available comics providers",
            providers: ["getComics"],
        },
    });
});

comicsRouter.get("/getComics/:query", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const query = c.req.param("query");
    const provider = new COMICS["GetComics"]();
    const data = await cache.getOrSet(() => provider.search(query), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

export { comicsRouter };
