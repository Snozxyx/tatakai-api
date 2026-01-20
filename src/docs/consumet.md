# Consumet Multi-Source Hub

Access multiple providers for Anime, Manga, Light Novels, and Comics through a single interface.

## 📺 Anime Providers

Supported Providers: \`gogoanime\`, \`zoro\`, \`enime\`, \`animepahe\`, \`9anime\`

### Search Anime

- **URL**: `/consumet/anime/:provider/:query`
- **Method**: `GET`

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/anime/gogoanime/naruto"
```

#### 📦 Response Schema

```typescript
interface ConsumetSearchResult {
    currentPage: number;
    hasNextPage: boolean;
    results: Array<{
        id: string;
        title: string;
        image: string;
        releaseDate?: string;
        subOrDub?: "sub" | "dub";
    }>;
}
```

### Anime Details

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/anime/gogoanime/naruto"
```

### Streaming Links

- **URL**: `/consumet/anime/:provider/watch/:episodeId`
- **Method**: `GET`

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/anime/gogoanime/watch/naruto-episode-1"
```

---

## 📖 Manga Providers

Supported Providers: `mangadex`, `mangahere`, `mangakakalot`, `mangapark`

### Search Manga

- **URL**: `/consumet/manga/:provider/:query`
- **Method**: `GET`

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/manga/mangadex/berserk"
```

### Read Chapter

- **URL**: `/consumet/manga/:provider/read/:chapterId`
- **Method**: `GET`

- **URL**: `/consumet/manga/:provider/read/:chapterId`
- **Method**: `GET`

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/manga/mangadex/read/chapter-id-here"
```

---

## ⚡ Meta (Anilist)

Access rich anime metadata, trending lists, and streaming sources via Anilist.

### Search

- **URL**: `/consumet/meta/anilist/:query`
- **Params**: `?page=1`, `?perPage=20`

### Trending

- **URL**: `/consumet/meta/anilist/trending`

### Info

- **URL**: `/consumet/meta/anilist/info/:id`

### Watch (Sources)

- **URL**: `/consumet/meta/anilist/watch/:episodeId`

---

## 📚 Light Novels

### ReadLightNovels (Search)

- **URL**: `/consumet/light-novels/read_light_novels/:query`
- **Method**: `GET`

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/light-novels/read_light_novels/overlord"
```

---

## 💬 Comics

### GetComics (Search)

- **URL**: `/consumet/comics/getComics/:query`
- **Method**: `GET`

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/comics/getComics/batman"
```

---

## 📰 News & Others

### Anime News Network

- **URL**: `/consumet/news/ann`
- **Method**: `GET`

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/consumet/news/ann"
```
