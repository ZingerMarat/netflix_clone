# ZingerFlix (Netflix Clone)

ZingerFlix is a full-stack Netflix-style streaming experience that combines a Vite + React 19 frontend, Tailwind CSS 4 styling, and an Express/MongoDB backend. It integrates The Movie Database (TMDB) for catalog data, Google Gemini for AI-powered recommendations, and cookie-based authentication backed by JSON Web Tokens.

## Features

- **Binge-worthy UI:** Dynamic hero banner with randomized trailers, carousel sections (Upcoming/Now Playing/Popular/Top Rated), and rich detail pages with cast grids and watch actions.
- **Category & search flows:** Infinite scrolling category pages, global search with live TMDB suggestions, and deep links to individual movies/TV shows.
- **Auth & profiles:** Signup/login/logout backed by MongoDB, bcrypt hashing, and JWT cookies; automatic session restoration with Zustand.
- **AI Picks:** Multi-step quiz that feeds Google Gemini (`gemini-2.0-flash-lite`) via `@google/genai`, enforces structured responses with Zod, and hydrates TMDB cards for every recommended title.
- **Responsive navigation:** Mobile drawer, CTA routing, toast feedback, and Swiper-based sliders optimized for touch and desktop interactions.

## Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | Vite 7, React 19, React Router 7, Tailwind CSS 4 (`@tailwindcss/vite`), Swiper, Zustand, Axios, React Hot Toast, Lucide icons, Zod |
| Backend    | Node.js, Express 5, Mongoose 8, MongoDB Atlas, bcryptjs, jsonwebtoken, cookie-parser, cors, dotenv |
| External APIs | TMDB (REST, Bearer token), Google Gemini (via `@google/genai`) |

## Project Structure

```
netflix_clone/
├── frontend/
│   ├── src/
│   │   ├── components/ (Navbar, Card lists, Movie info, AI recommendations, etc.)
│   │   ├── pages/ (Home, Media, Category, Auth, AI Picks)
│   │   ├── store/ (Zustand auth + recommendation stores)
│   │   └── utiles/ScrollToTop.jsx
│   ├── lib/AIModel.js (Gemini integration with Zod schema)
│   ├── public/ (static assets e.g., background_banner.jpg)
│   └── vite.config.js (React + Tailwind plugins)
└── backend/
    ├── server.js (Express app, CORS, routers)
    ├── config/db.js (Mongo connection helper)
    ├── routes/auth.router.js
    ├── controllers/auth.controller.js
    └── models/user.model.js
```

## Prerequisites

- Node.js 20+
- npm 10+
- TMDB read-access token (v4 API bearer token)
- Google AI Studio project + API key for Gemini
- MongoDB connection string (Atlas or self-hosted)

## Environment Variables

Create the following files from the provided templates (never commit real secrets):

```
# frontend/.env
VITE_TMDB_TOKEN=<tmdb_read_access_token>
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_GENAI_API_KEY=<google_genai_key>

# backend/.env
PORT=3000
MONGO_URI=<mongodb_connection_string>
JWT_SECRET=<secure_random_string>
CLIENT_URL=http://localhost:5173
```

## Installation

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Running Locally

```bash
# Start backend (http://localhost:3000)
cd backend
npm start

# In a separate terminal start frontend (http://localhost:5173 by default)
cd frontend
npm run dev
```

The frontend proxies requests to the backend using `VITE_API_BASE_URL`, so keep both servers running concurrently. Ensure MongoDB is reachable and TMDB/Gemini credentials are valid before logging in or using AI Picks.

## Available Scripts

### Frontend (`frontend/package.json`)
- `npm run dev` – Start Vite dev server with hot reload.
- `npm run build` – Production build.
- `npm run preview` – Preview the production build.
- `npm run lint` – Run ESLint (React hooks + refresh plugins).

### Backend (`backend/package.json`)
- `npm start` – Run Express server with `node --watch server.js`.

## API Overview (backend)

| Method | Endpoint     | Description |
|--------|--------------|-------------|
| POST   | `/auth/signup` | Create a user; hashes password and sets signed JWT cookie. |
| POST   | `/auth/login`  | Authenticate user; validates credentials and issues cookie. |
| GET    | `/auth/me`     | Returns the logged-in user (sans password) based on signed JWT. |
| GET    | `/auth/logout` | Clears JWT cookie to sign out. |

Responses include friendly status messages surfaced via toast notifications in the UI.

## Data & AI Integrations

- **TMDB**: All catalog data (home feeds, categories, search, credits) use server-side bearer auth supplied via `VITE_TMDB_TOKEN`. Requests are throttled with intersection observers and debounced searches to stay within rate limits.
- **Google Gemini**: `lib/AIModel.js` uses `@google/genai` to call `gemini-2.0-flash-lite`. A Zod schema enforces a 10-item string array so the client always receives displayable movie titles before fetching TMDB poster data.

## Testing & QA

- Manual flows: signup/login/logout, browsing categories, search, AI recommendations.
- Automated tests are not configured yet; consider adding component tests (Vitest/React Testing Library) and integration tests for the auth API.

---

Paste this content into `frontend/README.md` (or a root-level README) when you regain write access.
