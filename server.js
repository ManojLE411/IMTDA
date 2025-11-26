import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist'), {
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
    const indexPath = join(__dirname, 'dist', 'index.html');
    const indexHtml = readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(indexHtml);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

