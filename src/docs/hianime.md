# HiAnime Scraper (AniWatch)

The primary and most advanced scraper, verified to work with high-quality streaming sources.

## 1. Homepage Data

Get trending, latest, and spotlight anime.

- **URL**: \`/hianime/home\`
- **Method**: \`GET\`

### 🧪 Test Module

\`\`\`bash
curl -X GET "<http://localhost:4000/api/v1/hianime/home>"
\`\`\`

### 📄 Result

\`\`\`json
{
  "status": 200,
  "data": {
    "spotlightAnimes": [
      {
        "id": "one-piece-100",
        "title": "One Piece",
        "poster": "https://...",
        "description": "..."
      }
    ],
    "trendingAnimes": [...]
  }
}
\`\`\`

---

## 2. Anime Information

Get detailed metadata, character info, and related anime.

- **URL**: \`/hianime/info/:id\`
- **Method**: \`GET\`
- **Params**:
  - \`id\` (path): Anime slug (e.g., \`one-piece-100\`)

### 🧪 Test Module

\`\`\`bash
curl -X GET "<http://localhost:4000/api/v1/hianime/info/one-piece-100>"
\`\`\`

---

## 3. Streaming Links

Get video sources and subtitles.

- **URL**: \`/hianime/episode/sources\`
- **Method**: \`GET\`
- **Query Params**:
  - \`animeEpisodeId\`: Episode ID (e.g., \`one-piece-100?ep=1234\`)
  - \`server\` (optional): Server ID (default: \`hd-1\`)
  - \`category\` (optional): \`sub\` or \`dub\` (default: \`sub\`)

### 🧪 Test Module

\`\`\`bash
curl -X GET "<http://localhost:4000/api/v1/hianime/episode/sources?animeEpisodeId=one-piece-100?ep=10000&category=sub>"
\`\`\`

### 📦 Response Schema

\`\`\`typescript
interface HiAnimeSources {
    status: number;
    data: {
        sources: Array<{
            url: string;
            type: "hls" | "mp4";
            quality?: string;
            isM3U8: boolean;
        }>;
        tracks: Array<{
            file: string; // VTT subtitle url
            label: string; // e.g. "English"
            kind: "captions";
            default?: boolean;
        }>;
        intro?: { start: number; end: number };
        outro?: { start: number; end: number };
    }
}
\`\`\`
