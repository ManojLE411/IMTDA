# IMTDA Frontend

React + TypeScript + Vite frontend for IMTDA platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your API base URL and other configuration.

4. Run in development:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm run preview
```

## Environment Variables

- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:5000)
- `VITE_GEMINI_API_KEY` - Gemini API key (optional)
- `VITE_VERBOSE` - Enable verbose logging (optional)

## Deployment

### Render.com

This project includes a `render.yaml` configuration file for deploying to Render as a static site.

**Important:** 
- Deploy as a **Static Site** service (not Web Service)
- The `render.yaml` file handles SPA routing automatically
- Ensure your frontend is deployed separately from the backend API
- The frontend should have its own URL (e.g., `imtda-frontend.onrender.com`)

**If frontend and backend are on the same domain:**
- The backend must serve `index.html` for all non-API routes
- This requires backend configuration changes

## Project Structure

```
src/
├── components/   # React components
├── config/       # Configuration files
├── constants/    # Constants
├── hooks/        # Custom hooks
├── layouts/      # Layout components
├── pages/        # Page components
├── routes/       # Route configuration
├── services/     # API services
├── store/        # Redux store
├── types/        # TypeScript types
├── utils/        # Utility functions
├── AppRouter.tsx # Main router
└── vite-env.d.ts # Vite types
```
