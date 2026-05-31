# Word Cloud Generator

A full-stack word cloud application built with React, Vite, TypeScript, Node.js, and Express.

The server fetches random words from an external API, calculates the frequency of each unique word, and exposes the processed data through an API endpoint.

The client displays the result as an interactive word cloud. Words with higher frequency appear larger, and each word keeps a stable color.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Client | React, Vite, TypeScript, TanStack React Query |
| Server | Node.js, Express, TypeScript |
| Styling and utilities | CSS, d3-scale |
| Container runtime | Docker, Docker Compose, Nginx |

## API

```text
GET /api/word-cloud
```

Example response:

```json
[
  { "word": "apple", "count": 12 },
  { "word": "banana", "count": 8 }
]
```

## Font Scaling Function

The React word cloud uses `getScaledFontSize(count, minCount, maxCount)` from:

```text
client/src/word-cloud/utils.ts
```

The function uses a linear scale with `d3-scale`:

```ts
domain: [minCount, maxCount]
range: [12, 64]
```

This means the least frequent word is rendered at `12px`, the most frequent word is rendered at `64px`, and all other words are scaled proportionally between those values.

The scale is clamped, so values cannot produce font sizes below `12px` or above `64px`.

If all words have the same count, the function returns the midpoint of the range, `38px`, so the word cloud still renders with a readable default size.

## Run with Docker

From the project root directory:

```bash
docker compose up --build
```

Then open the app at:

```text
http://localhost:3000
```

Docker Compose starts two services:

| Service | Container Port | Host Port | Purpose |
| --- | ---: | ---: | --- |
| client | 80 | 3000 | Serves the built React app through Nginx |
| server | 4000 | 4000 | Runs the Express API |

The frontend uses a relative API path:

```text
/api/word-cloud
```

Inside Docker, Nginx proxies `/api` requests from the client container to the backend container using the Docker Compose service name:

```text
http://server:4000
```

The API can also be accessed through the frontend proxy at:

```text
http://localhost:3000/api/word-cloud
```

If the server port is exposed in `docker-compose.yml`, the API can also be accessed directly at:

```text
http://localhost:4000/api/word-cloud
```

Useful Docker commands:

```bash
docker compose up --build
docker compose down
docker compose logs -f
```

## Run Locally for Development

Install dependencies:

```bash
npm run install:all
```

Start the client and server together:

```bash
npm run dev
```

Open the local development client at:

```text
http://localhost:5173
```

The backend runs at:

```text
http://localhost:4000
```

The word cloud API is available at:

```text
http://localhost:4000/api/word-cloud
```

## Build Locally

From the project root directory:

```bash
npm run build
```

This builds:

- the server into `server/dist`
- the client into `client/dist`

## Project Structure

```text
myapp/
|-- client/
|   |-- Dockerfile
|   |-- nginx.conf
|   |-- src/
|   |   |-- App.tsx
|   |   |-- main.tsx
|   |   |-- index.css
|   |   `-- word-cloud/
|   |       |-- WordCloud.tsx
|   |       |-- api.ts
|   |       |-- consts.ts
|   |       |-- types.ts
|   |       `-- utils.ts
|   `-- package.json
|-- server/
|   |-- Dockerfile
|   |-- src/
|   |   |-- app.ts
|   |   |-- index.ts
|   |   `-- word-cloud/
|   |       |-- consts.ts
|   |       |-- routes.ts
|   |       |-- service.ts
|   |       `-- types.ts
|   `-- package.json
|-- docker-compose.yml
|-- package.json
`-- README.md
```

## Performance Notes

The backend does not send all 6000 external API requests at once.

Instead, it processes requests in batches. Each batch runs multiple requests in parallel, while batches themselves are processed sequentially. This keeps concurrency controlled and avoids unnecessary load on the external API.

Individual requests also use a small retry mechanism to handle temporary external API failures.

Word frequencies are accumulated with a `Map<string, number>`, allowing efficient updates while processing the fetched words.

## Code Quality Notes

The codebase is split into separate client and server applications.

The word cloud logic is grouped by feature, keeping related files close together and making the project easy to extend.

The client keeps API access isolated in a small module, uses React Query for loading and error states, and avoids unnecessary refetches for this expensive operation.

The server keeps routing and business logic separated, with constants and types defined in focused files.