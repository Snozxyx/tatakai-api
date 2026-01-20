# Regional Scrapers (Hindi, Tamil, Telugu)

Specialized scrapers for Indian regional languages and dubbed content.

## 1. Animelok

Next-gen scraper for \`animelok.to\` using HiAnime-style IDs.

### Homepage

- **URL**: \`/animelok/home\`
- **Method**: \`GET\`

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/animelok/home"
```

### Watch Episode

- **URL**: \`/animelok/watch/:id\`
- **Query Params**: \`ep\` (default: 1)

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/animelok/watch/naruto-shippuden-112233?ep=1"
```

---

## 2. WatchAnimeWorld (Supabase Proxy)

Proxy-enabled scraper for \`watchanimeworld.in\` to bypass geoblocking.

### Get Episode Sources

- **URL**: \`/watchaw/episode\`
- **Query Params**:
  - \`id\`: Slug (e.g., \`naruto-shippuden-1x1\`) OR
  - \`episodeUrl\`: Full URL

#### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/watchaw/episode?id=naruto-shippuden-1x1"
```

#### 📄 Result

\`\`\`json
{
  "status": 200,
  "data": {
    "sources": [
      {
        "url": "https://...",
        "language": "Hindi",
        "isDub": true
      }
    ]
  }
}
\`\`\`

#### 📦 Response Schema

\`\`\`typescript
interface WatchAnimeResponse {
    status: number;
    data: {
        sources: Array<{
            url: string;      // Stream URL
            isM3U8: boolean;  // True if HLS stream
            quality?: string; // e.g. "auto", "1080p"
            language: string; // e.g. "Hindi", "Tamil"
            isDub: boolean;
        }>;
    }
}
\`\`\`

---

## 3. AnimeHindiDubbed

Classic scraper for \`animehindidubbed.in\`.

### Search

- **URL**: \`/hindidubbed/search\`
- **Query Params**: \`title\`

#### 🧪 Test Module

\`\`\`bash
curl -X GET "<http://localhost:4000/api/v1/hindidubbed/search?title=doraemon>"
\`\`\`
