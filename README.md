# Word Cloud Generator

A minimal full-stack app for generating word clouds from text.

## Tech Stack

| Layer  | Technology                              |
|--------|-----------------------------------------|
| Client | React 18, Vite, TypeScript              |
| Server | Node.js, Express, TypeScript            |
| Data   | TanStack React Query (client-side)      |

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

## Install

```bash
npm run install:all
```

This installs dependencies for the root, server, and client.

## Development

```bash
npm run dev
```

Starts both the client and server concurrently.

| Service | URL                        |
|---------|----------------------------|
| Client  | http://localhost:5173       |
| Server  | http://localhost:4000       |
| Health  | http://localhost:4000/api/health |

## Build

```bash
npm run build
```

Builds both the server (`server/dist/`) and the client (`client/dist/`).

## Project Structure

```
├── client/               # React + Vite frontend
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── server/               # Express backend
│   └── src/
│       ├── app.ts        # Express app setup
│       └── index.ts      # Server entry point
├── package.json          # Root scripts
└── README.md
```
