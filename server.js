import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the dist directory path
const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');

// Verify dist directory exists
if (!existsSync(distPath)) {
  console.error(`ERROR: dist directory not found at ${distPath}`);
  console.error('Make sure you run "npm run build" before starting the server');
  process.exit(1);
}

if (!existsSync(indexPath)) {
  console.error(`ERROR: index.html not found at ${indexPath}`);
  console.error('Make sure you run "npm run build" before starting the server');
  process.exit(1);
}

console.log(`Serving static files from: ${distPath}`);
console.log(`Index file located at: ${indexPath}`);

// Serve static files from the dist directory
app.use(express.static(distPath, {
  // Don't serve index.html for static file requests
  index: false,
}));

// Handle all routes by serving index.html (SPA fallback)
// This catches all routes that don't match static files
app.get('*', (req, res) => {
  // Skip API routes - these should go to the backend (though in production
  // they typically use full URLs, this is a safety measure)
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Serve index.html for all other routes (SPA routing)
  try {
    const indexHtml = readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(indexHtml);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ SPA routing enabled - all routes will serve index.html`);
});

