# AGENTS.md

## Project Overview
This repo contains a Wi-Fi deauthentication tool (`wifi_jammer.py`) written in Python using Scapy. It is a CLI tool, not a web app — it cannot run in this sandbox (no Wi-Fi hardware, no monitor mode, no raw sockets).

## What Runs Here
A **project presentation website** (Vite + React) that explains the tool educationally — how it works, its code modules, CLI usage, and defenses. This is what serves on port 3000.

## Setup
- `docker compose -f docker-compose.base44.yml up -d` starts the Vite dev server on port 3000.
- Node 22 slim image, source bind-mounted, `npm install` runs on startup.
- Live reload via Vite polling (`watch.usePolling: true` for bind mounts).
- No external secrets or credentials needed.
- No database, no backend — purely a static frontend presentation.

## Editing
- All content is in `src/App.jsx`. Styles are in `src/App.css` and `src/index.css`.
- Changes hot-reload automatically in the preview.
