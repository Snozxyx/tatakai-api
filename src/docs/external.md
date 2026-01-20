# External Scrapers

Legacy ports from the original Anime-API project. Useful as fallbacks.

## Supported Sites

- **GogoAnime**: \`<https://gogoanime3.co\`>
- **Chia-Anime**: \`<https://chia-anime.su\`>
- **AnimeFreak**: \`<https://animefreak.video\`>
- **Animeland**: \`<https://animeland.tv\`>

## Generic Search Endpoint

All external scrapers follow the same \`/:provider/:query\` search pattern.

- **URL Patterns**:
  - \`/anime/gogoanime/:query\`
  - \`/anime/chia-anime/:query\`
  - \`/anime/anime-freak/:query\`
  - \`/anime/animeland/:query\`

### 🧪 Test Module

\`\`\`bash
curl -X GET "<http://localhost:4000/api/v1/anime/gogoanime/naruto>"
\`\`\`
