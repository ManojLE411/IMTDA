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
