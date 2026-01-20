import { Hono } from "hono";
import type { ServerContext } from "../../config/context.js";

import { animeRouter } from "./anime/index.js";
import { mangaRouter } from "./manga/index.js";
import { metaRouter } from "./meta/index.js";
import { newsRouter } from "./news/index.js";
import { lnRouter } from "./light-novels/index.js";
import { comicsRouter } from "./comics/index.js";

const consumetRouter = new Hono<ServerContext>();

consumetRouter.route("/anime", animeRouter);
consumetRouter.route("/manga", mangaRouter);
consumetRouter.route("/meta", metaRouter);
consumetRouter.route("/news", newsRouter);
consumetRouter.route("/light-novels", lnRouter);
consumetRouter.route("/comics", comicsRouter);

consumetRouter.get("/", (c) => {
    return c.json({ provider: "Tatakai",
        status: 200,
        message: "Consumet API Hub",
        categories: {
            anime: "/api/v1/consumet/anime",
            manga: "/api/v1/consumet/manga",
            meta: "/api/v1/consumet/meta",
            news: "/api/v1/consumet/news",
            lightNovels: "/api/v1/consumet/light-novels",
            comics: "/api/v1/consumet/comics",
        },
    });
});

export { consumetRouter };
