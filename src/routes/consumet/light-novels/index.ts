import { Hono } from "hono";
import * as Consumet from "@consumet/extensions";
import { cache } from "../../../config/cache.js";
import type { ServerContext } from "../../../config/context.js";

const LN = Consumet.LIGHT_NOVELS as Record<string, new () => any>;
const lnRouter = new Hono<ServerContext>();

lnRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        data: {
            message: "Available light novel providers",
            providers: ["read_light_novels"],
        },
    });
});

lnRouter.get("/read_light_novels/:query", async (c) => {
    const cacheConfig = c.get("CACHE_CONFIG");
    const query = c.req.param("query");
    const provider = new LN["ReadLightNovels"]();
    const data = await cache.getOrSet(() => provider.search(query), cacheConfig.key, cacheConfig.duration);
    return c.json({ provider: "Tatakai", status: 200, data });
});

export { lnRouter };
