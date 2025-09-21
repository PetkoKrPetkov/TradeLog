# TradeLog

TradeLog is a full-stack MERN application for tracking trades, notes, and threaded comments. These steps explain how to launch the app locally from the checked-in structure (`TradeLogFinal/TradeLog`).

## Project structure
```
TradeLogFinal/
    TradeLog/
        client/
        server/
```

All commands below assume you start in `TradeLogFinal/TradeLog`.

## Prerequisites
- Node.js 18+ (developed with v20.11.0)
- npm (ships with Node.js)
- MongoDB 6+ running locally or a MongoDB Atlas connection

## 1. Clone the repository
```bash
git clone <your-fork-or-repo-url>
cd TradeLogFinal/TradeLog
```

If you already have the project locally, change into the same directory (`TradeLogFinal/TradeLog`).

## 2. Install dependencies
Install packages for the backend and frontend separately:
```bash
cd server
npm install
cd ../client
npm install
```

## 3. Configure environment variables
1. Navigate to `TradeLogFinal/TradeLog/server`.
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Update the values in `.env`:
   - `PORT`: API port (default `3030`).
   - `MONGODB_URI`: Mongo connection string (e.g., `mongodb://127.0.0.1:27017/tradelog`).
   - `JWT_SECRET`: long random string used to sign JWTs.
   - `CORS_ORIGIN`: frontend URL that is allowed to call the API (default `http://localhost:5173`).

> **Important:** keep `.env` out of version control. Only commit `.env.example`.

## 4. Start the backend
```bash
cd TradeLogFinal/TradeLog/server
npm run dev
```
- Connects to MongoDB and listens on `http://localhost:3030`.
- Use `npm run start` when running in production.

## 5. Start the frontend
Open a new terminal:
```bash
cd TradeLogFinal/TradeLog/client
npm run dev
```
- Vite serves the client on `http://localhost:5173`.
- API calls use the URLs in `client/src/api` (pointing to `http://localhost:3030`).

## 6. Open the app
Browse to `http://localhost:5173`. Register, create trades, and add comments. The client authenticates and persists data through the API at `http://localhost:3030`.

## Useful scripts
### Server (`TradeLogFinal/TradeLog/server`)
- `npm run dev`: start the Express API with nodemon (auto-reload on save).
- `npm run start`: start the API in production mode.

### Client (`TradeLogFinal/TradeLog/client`)
- `npm run dev`: start the Vite dev server.
- `npm run build`: build the production bundle.
- `npm run preview`: locally serve the production build.

## Troubleshooting
- **Address already in use:** stop anything on port `3030` or change `PORT` in `.env`.
- **MongoDB connection errors:** verify MongoDB is running and the connection string is correct.
- **CORS errors:** ensure `CORS_ORIGIN` matches the URL serving the frontend.

