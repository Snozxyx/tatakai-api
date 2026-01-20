# Utility & Meta APIs

Useful tools for building rich anime applications.

## 1. Trace.moe (Reverse Image Search)

Identify anime from a screenshot.

- **URL**: `/anime-api/trace`
- **Method**: `POST`
- **Body**: JSON
  - `imageUrl`: URL of the image to search

### 🧪 Test Module

```bash
curl -X POST "<http://localhost:4000/api/v1/anime-api/trace>" \
     -H "Content-Type: application/json" \
     -d '{"imageUrl": "<https://images.plurk.com/32B15UXxymfSMwKGTObY5e.jpg"}>'
```

---

## 2. Anime Quotes

Get random quotes or quotes by a specific anime.

- **URL**: `/anime-api/quotes/random`
- **Query Params**: `anime` (optional)

### 🧪 Test Module

```bash
curl -X GET "<http://localhost:4000/api/v1/anime-api/quotes/random?anime=naruto>"
```

---

## 3. Anime Images (Nekos.best)

Get high-quality anime wallpapers and reaction images.

- **URL**: `/anime-api/images/:type`
- **Path Params**: `type` (e.g., `waifu`, `neko`, `shinobu`, `cry`, `hug`, `kiss`)

### 🧪 Test Module

```bash
curl -X GET "<http://localhost:4000/api/v1/anime-api/images/waifu>"
```

---

## 4. Waifu.im Search

Advanced waifu image search with tag filtering.

- **URL**: `/anime-api/waifu`
- **Query Params**: `tags` (comma-separated, e.g., `maid,uniform`)

### 🧪 Test Module

```bash
curl -X GET "<http://localhost:4000/api/v1/anime-api/waifu?tags=maid>"
```

---

## 5. Anime Facts

Get interesting facts about popular anime series.

- **URL**: `/anime-api/facts/:anime`
- **Method**: `GET`

### 🧪 Test Module

```bash
curl -X GET "http://localhost:4000/api/v1/anime-api/facts/naruto"
```
