# Warmup Backoffice — React SPA + Express + SQLite

This repository is a minimal implementation of the "Warm-up Assignment" web application described in the provided PDF: a small backoffice UI to view and manage companies and a sample module page.

What it contains
- client/: React SPA (Vite)
- server/: Express API with SQLite (simple CRUD for companies)
- root scripts to run both concurrently

Requirements
- Node 18+ (npm)
- (Optional) npx, curl, sqlite3 CLI

Quick start (local)
1. Clone or create this project directory and add the files from this repo.
2. From project root install dependencies:

   npm install

3. Run development servers (starts both server and client):

   npm run dev

4. Open the app in the browser:

   - Frontend: http://localhost:5173
   - API: http://localhost:4000/api/companies

Server-only
- cd server
- npm install
- npm start
- The server will initialize `data/companies.db` and seed records on first run.

Client-only
- cd client
- npm install
- npm run dev

API
- GET /api/companies — list companies
- GET /api/companies/:id — single company
- POST /api/companies — create (JSON body)
- PUT /api/companies/:id — update
- DELETE /api/companies/:id — delete
- POST /api/login — mock login (body: { username, password }) → returns { token: "demo-token" }

Notes
- The server exposes CORS for the client.
- The DB is a small SQLite file created at server/data/companies.db; it is seeded with example companies.
- This is a minimal scaffold; you can extend it to match the exact UI in the PDF (I can implement layouts and styling from the Figma if you want).

If you want me to:
- implement exact pixel-perfect UI from a Figma/figma URL,
- add JWT-based auth,
- connect a hosted DB,
- containerize (Dockerfile + docker-compose),
tell me and I’ll extend accordingly.
