# Tatakai API 🎌

> Unified Anime API combining HiAnime, Consumet, and regional scrapers with modern caching, CORS, rate limiting, and logging.

## Features

- 🚀 **Modern Stack**: Built with [Hono](https://hono.dev/) - ultra-fast, lightweight web framework
- 💾 **Hybrid Caching**: Redis with LRU in-memory fallback
- 🔒 **Rate Limiting**: Configurable per-IP rate limiting
- 📝 **Structured Logging**: Pino logger with pretty dev output
- 🌐 **CORS Ready**: Configurable origin whitelisting
- 🐳 **Docker Ready**: Multi-stage Dockerfile included
- 📦 **TypeScript**: Full type safety

## API Endpoints

| Route | Description |
|-------|-------------|
| `/api/v1/hianime/*` | HiAnime scraper - search, info, episodes, sources |
| `/api/v1/consumet/*` | Consumet providers - anime, manga, movies, meta |
| `/api/v1/hindidubbed/*` | Hindi dubbed anime scraper |
| `/api/v1/watchaw/*` | WatchAnimeWorld multi-language streaming |
| `/health` | Health check |
| `/version` | API version info |

## Quick Start

### Prerequisites

- Node.js >= 18
- npm or yarn
- Redis (optional, for distributed caching)

### Installation

```bash
# Clone and install
cd TatakaiAPI
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build image only
docker build -t tatakai-api .
docker run -p 4000:4000 tatakai-api
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment | `development` |
| `REDIS_URL` | Redis connection URL | (empty = in-memory) |
| `CORS_ALLOWED_ORIGINS` | Allowed origins (comma-separated) | `*` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `CACHE_TTL_SECONDS` | Default cache TTL | `300` |

## Example Requests

```bash
# HiAnime home page
curl http://localhost:4000/api/v1/hianime/home

# Search anime
curl "http://localhost:4000/api/v1/hianime/search?q=naruto"

# Consumet Anilist trending
curl http://localhost:4000/api/v1/consumet/meta/anilist/trending

# Hindi dubbed search
curl "http://localhost:4000/api/v1/hindidubbed/search?title=naruto"
```

## Project Structure

```
TatakaiAPI/
├── src/
│   ├── config/       # Configuration (env, cache, cors, logger, etc.)
│   ├── middleware/   # Hono middleware (logging, cache control)
│   ├── routes/       # API routes by provider
│   │   ├── hianime/
│   │   ├── consumet/
│   │   ├── animehindidubbed/
│   │   └── watchanimeworld/
│   ├── server.ts     # Main entry point
│   └── utils.ts      # Utility functions
├── public/           # Static files
├── Dockerfile
└── docker-compose.yml
```

## License

MIT
