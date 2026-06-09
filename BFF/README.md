# BFF (Backend-for-Frontend) Service

This is the **Backend-for-Frontend (BFF)** service for the Headless CMS. It is built using **Node.js**, **Express**, and **node-fetch** to act as an intermediary layer between the frontend application (e.g., Next.js) and the WordPress CMS.

Its primary responsibility is to:
1. Aggregate and format WordPress GraphQL queries.
2. Abstract complex GraphQL schemas from the client.
3. Optimize performance by parallelizing downstream queries where applicable.
4. Mask direct WordPress endpoints/APIs.

---

## Table of Contents
- [Architecture & Design](#architecture--design)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Development Setup](#development-setup)
- [Docker & Production Deployment](#docker--production-deployment)

---

## Architecture & Design

The application follows a lightweight MVC-inspired architecture:
* **Routes (`src/routes/`)**: Maps client endpoints to the corresponding controllers.
* **Controllers (`src/controller/`)**: Coordinates business logic, parses request parameters, and handles response/error status codes.
* **Services (`src/services/`)**: Defines specific WordPress GraphQL queries and business logic, then uses `wpClient` to fetch data.
* **Utils (`src/utils/`)**: Provides helper utilities like `wpClient` for issuing low-level POST requests to the WordPress GraphQL endpoint.

---

## Directory Structure

```text
BFF/
├── .env                    # Local environment variables
├── Dockerfile              # Multi-stage production build recipe
├── docker-compose.yml      # Docker compose configuration for running locally
├── package.json            # Node.js dependencies and run scripts
└── src/
    ├── index.js            # Main entry point (middleware, routes mount, startup, health checks)
    ├── routes/
    │   └── postRoutes.js   # Route definitions for CMS entities (posts, pages, menus)
    ├── controller/
    │   └── postController.js # Handles request/response cycles & forwards to wpService
    ├── services/
    │   └── wpService.js    # Formulates and executes WordPress GraphQL queries
    └── utils/
        └── wpClient.js     # Low-level WordPress GraphQL fetcher
```

---

## Environment Variables

Create a `.env` file in the root directory:
```env
PORT=9595
WP_GRAPHQL_URL="http://72.61.224.143:8080/graphql"
```

* `PORT`: The port on which the BFF server runs (defaults to `4000` if not specified).
* `WP_GRAPHQL_URL`: The URL to the WordPress WPGraphQL endpoint.

---

## API Documentation

The BFF mounts all routes under `/bff/api/posts`.

### 1. Health Check
* **Endpoint**: `GET /bff/health`
* **Description**: Verifies the BFF service is UP and attempts a lightweight connection test to the WordPress CMS.
* **Response (Success)**:
  ```json
  {
      "status": "UP",
      "services": {
          "bff": "healthy",
          "wordpress": "connected"
      },
      "timestamp": "2026-06-04T13:43:28.000Z"
  }
  ```
* **Response (WordPress Disconnected)**: Returns `503 Service Unavailable` with details of the failure.

### 2. Posts & Articles
* **GET `/bff/api/posts/latest?limit=5`**
  Returns the latest articles. The limit can be configured via query parameter.
* **GET `/bff/api/posts/home`**
  Fetches homepage setup configuration (defined in `"homepage-settings"` Page in WordPress) and fetches corresponding dynamic category sections and latest articles in parallel.
* **GET `/bff/api/posts/detail/:slug`**
  Returns full article details by post slug, including author metadata, categories, and SEO data parsed by Rank Math SEO.
* **GET `/bff/api/posts/homepagesections/`**
  Retrieves home page config sections directly.

### 3. Taxonomy & Author Pages
* **GET `/bff/api/posts/author/:slug`**
  Returns author biography, avatar, metadata, the latest 10 articles written by them, and author-level Rank Math SEO details.
* **GET `/bff/api/posts/topic/:slug`**
  Retrieves tag information, latest posts under this tag, and SEO data.
* **GET `/bff/api/posts/category/:slug`**
  Retrieves details for a category slug, resolves the category name, and retrieves the latest 20 articles in that category.

### 4. Navigation & Menus
* **GET `/bff/api/posts/topmenu/`**
  Retrieves navigation links matching `TOP_NAV` location.
* **GET `/bff/api/posts/topmenu/primary`**
  Retrieves navigation links matching `PRIMARY_NAV` location.
* **GET `/bff/api/posts/topmenu/secondary`**
  Retrieves navigation links matching `SECONDARY_NAV` location.

---

## Development Setup

To run the application locally without Docker:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development mode (with Nodemon hot-reloads)**:
   ```bash
   npm run dev
   ```

3. **Run in production mode**:
   ```bash
   npm start
   ```

The server runs on the port configured in `.env` (default is `9595` in the provided env).

---

## Docker & Production Deployment

### Dockerfile (Multi-stage Build)
The project includes a robust 3-stage `Dockerfile` to produce minimal production images:
1. **`deps` Stage**: Installs production dependencies only (`npm ci --omit=dev`).
2. **`builder` Stage**: Installs all dependencies and copies source files to allow build/compilation processes.
3. **`runner` Stage**: Starts with a fresh Node Alpine image, copies over only the production `node_modules` from `deps`, compiles and copies application sources from `builder`, sets the port to `9595`, and runs the server.

### Docker Compose
Run the stack using docker-compose:
```bash
docker-compose up --build -d
```
* The configuration exposes port `9595` and sets the `WP_GRAPHQL_URL` to point to `http://host.docker.internal:8080/graphql` to facilitate container-to-host connectivity.
