import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/', // Explicitly set to root-relative paths
      server: {
        port: 3000,
        host: '0.0.0.0',
        strictPort: false,
        hmr: {
          protocol: 'ws',
          host: 'localhost',
          port: 3000,
        },
        proxy: {
          '/api': {
            target: env.VITE_API_BASE_URL,
            changeOrigin: true,
            secure: false,
            ws: true, // Enable WebSocket proxying
            timeout: 30000, // 30 second timeout
            proxyTimeout: 30000,
            configure: (proxy, _options) => {
              let errorCount = 0;
              const maxErrors = 5; // Only log first 5 errors to avoid spam
              
              proxy.on('error', (err: NodeJS.ErrnoException, req, res) => {
                errorCount++;
                
                // Suppress ECONNREFUSED errors after initial warnings
                // These are common when backend restarts or during development
                const errorCode = (err as any).code || err.code;
                if (errorCode === 'ECONNREFUSED' || errorCode === 'ECONNRESET') {
                  // Only log first few connection errors
                  if (errorCount <= maxErrors && mode === 'development') {
                    console.warn(
                      `[Vite Proxy] Backend connection error (${errorCode}). ` +
                      `Ensure backend server is running at ${env.VITE_API_BASE_URL || 'configured URL'}. ` +
                      `(This is normal during server restarts)`
                    );
                  }
                  // Reset error count after a delay to allow periodic logging
                  if (errorCount > maxErrors) {
                    setTimeout(() => {
                      errorCount = 0;
                    }, 10000); // Reset after 10 seconds
                  }
                } else {
                  // Log other errors normally
                  if (mode === 'development') {
                    console.warn('[Vite Proxy] Error:', err.message);
                  }
                }
                
                // Send error response to client
                if (res && !res.headersSent) {
                  res.writeHead(503, {
                    'Content-Type': 'application/json',
                  });
                  res.end(JSON.stringify({
                    success: false,
                    error: {
                      code: 'SERVICE_UNAVAILABLE',
                      message: `Backend server is not available. Please ensure the server is running at ${env.VITE_API_BASE_URL || 'the configured URL'}.`,
                    },
                  }));
                }
              });
              
              // Log successful proxy connections in verbose mode
              if (mode === 'development' && process.env.VITE_VERBOSE === 'true') {
                proxy.on('proxyReq', (proxyReq, req) => {
                  console.log(`[Vite Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);
                });
              }
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        },
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      },
      optimizeDeps: {
        include: ['react-router-dom', 'react-router'],
        exclude: [],
        force: true,
        esbuildOptions: {
          target: 'esnext',
        },
      },
      build: {
        target: 'esnext',
        modulePreload: false,
        rollupOptions: {
          output: {
            manualChunks: undefined,
          },
        },
      },
      ssr: {
        noExternal: ['react-router-dom']
      }
    };
});
