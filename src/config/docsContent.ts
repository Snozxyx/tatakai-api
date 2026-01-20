export const apiDocs = `
# 🎌 Tatakai API Documentation

Welcome to the **Tatakai API** - A unified, high-performance anime and entertainment API hub. 
This documentation is designed to be both human-readable and LLM-friendly.

## 🚀 Base URL
\`http://localhost:4000/api/v1\`

---

## 📂 1. HiAnime Scraper (AniWatch)
*Primary advanced scraper featuring high-quality metadata and streaming.*

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| \`GET\` | \`/hianime/home\` | Dashboard data: Trending, Spotlight, Latest, Upcoming. |
| \`GET\` | \`/hianime/info/:id\` | Full metadata for a specific anime (id example: \`one-piece-37\`). |
| \`GET\` | \`/hianime/episodes/:id\` | List all episodes for an anime. |
| \`GET\` | \`/hianime/episode/sources\` | **Params**: \`animeEpisodeId\`, \`server\`, \`category\`. Get video links. |
| \`GET\` | \`/hianime/search\` | **Params**: \`q\`, \`page\`. Comprehensive filters available. |
| \`GET\` | \`/hianime/search/suggestion\` | **Params**: \`q\`. Quick search suggestions. |
| \`GET\` | \`/hianime/genre/:name\` | Get animes by genre (e.g., \`action\`, \`shounen\`). |
| \`GET\` | \`/hianime/category/:name\` | Get by category (e.g., \`most-popular\`, \`tv\`). |
| \`GET\` | \`/hianime/schedule\` | **Params**: \`date\`, \`tzOffset\`. Anime airing schedule. |
| \`GET\` | \`/hianime/qtip/:id\` | Quick tooltip info for an anime. |
| \`GET\` | \`/hianime/azlist\` | **Params**: \`sort\`, \`page\`. A-Z sorted list. |

---

## 📂 2. Consumet Multi-Source Hub
*Multi-provider integration for Anime, Manga, Novels, and Comics.*

### 📺 Anime providers
Providers: \`gogoanime\`, \`zoro\`, \`enime\`, \`animepahe\`, \`9anime\`

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| \`GET\` | \`/consumet/anime/:provider/:query\` | Search anime via specified provider. |
| \`GET\` | \`/consumet/anime/:provider/info/:id\` | Get anime details and episode list. |
| \`GET\` | \`/consumet/anime/:provider/watch/:epId\` | **Query**: \`server\`. Fetch streaming links. |
| \`GET\` | \`/consumet/anime/gogoanime/recent-episodes\` | Latest releases on GogoAnime. |

### 📖 Manga & Comics
Providers: \`mangadex\`, \`mangahere\`, \`mangakakalot\`, \`mangapark\`, \`getComics\`

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| \`GET\` | \`/consumet/manga/:provider/:query\` | Search manga titles. |
| \`GET\` | \`/consumet/manga/:provider/info/:id\` | Manga details and chapter list. |
| \`GET\` | \`/consumet/manga/:provider/read/:chId\` | Fetch image pages for a chapter. |
| \`GET\` | \`/consumet/comics/getComics/:query\` | Search Western comics. |

### 📰 Other Consumet
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| \`GET\` | \`/consumet/news/ann\` | Latest feeds from Anime News Network. |
| \`GET\` | \`/consumet/light-novels/read_light_novels/:q\` | Search Light Novels. |

---

## 📂 3. Regional Scrapers (Hindi, Tamil, Telugu)
*Specialized regional content with localized metadata.*

| Scraper | Endpoint | Features |
|:--------|:---------|:---------|
| **Animelok** | \`/animelok/home\` | Sections (\`Hindi Dubbed\`, \`Recent\`), Schedule, Info. |
| | \`/animelok/watch/:id?ep=1\` | Specialized regional video sources. |
| **WatchAW** | \`/watchaw/episode?id={slug}\` | **Proxy Enabled**. High-reliability regional sources. |
| | \`/watchaw/search?q={query}\` | Search specifically for regional dubs. |
| **HindiDub** | \`/hindidubbed/home\` | Classic Hindi dubbed anime provider. |
| | \`/hindidubbed/anime/:slug\` | Multi-server Hindi streaming links. |

---

## 📂 4. Utility & Meta (anime-api ports)
*Anime quotes, facts, and vision-based utilities.*

| Method | Endpoint | Params / Description |
|:-------|:---------|:---------------------|
| \`GET\` | \`/anime-api/quotes/random\` | **Query**: \`anime\`. Get random or anime-specific quotes. |
| \`GET\` | \`/anime-api/images/:type\` | **Path**: \`waifu\`, \`neko\`, \`shinobu\`, etc. Get wallpapers. |
| \`GET\` | \`/anime-api/waifu\` | **Query**: \`tags\`. Advanced waifu image search. |
| \`GET\` | \`/anime-api/facts/:anime\` | Interesting facts about a specific anime. |
| \`POST\` | \`/anime-api/trace\` | **Body**: \`{ \"imageUrl\": \"...\" }\`. Trace anime from screenshot. |

---

## 📂 5. External Classic Scrapers
*Legacy scrapers for broader coverage.*

- \`GET /anime/gogoanime/:query\`
- \`GET /anime/chia-anime/:query\`
- \`GET /anime/anime-freak/:query\`
- \`GET /anime/animeland/:query\`

---

## 🛠 Project Infrastructure
- **System Health**: \`GET /health\` (returns \`daijoubu\`)
- **Version Info**: \`GET /version\`
- **Middleware**: Logging (\`Pino\`), Caching (\`In-memory/Redis\`), Rate Limiting, CORS.

*Everything you need to build the next generation of anime apps.*
`;
