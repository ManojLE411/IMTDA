# Render.com Deployment Guide - Fix 404 Errors

## The Problem
You're getting 404 errors when accessing routes like `/admin`, `/about`, `/services` directly or on page refresh. This happens because Render.com is trying to find these files on the server, but React Router handles routing client-side.

## Solution: Configure as Web Service (Not Static Site)

### Step 1: Check Your Render.com Dashboard

1. Go to your Render.com dashboard
2. Click on your service (imtda-frontend)
3. Go to **Settings** tab
4. Check the **Service Type**:
   - ❌ If it says "Static Site" → This is the problem!
   - ✅ It should say "Web Service"

### Step 2: Convert to Web Service (if needed)

If your service is configured as a **Static Site**, you need to:

**Option A: Use render.yaml (Recommended)**
- The `render.yaml` file in your repo should automatically configure it
- Make sure `render.yaml` is in your repository root
- Render.com should detect it automatically on the next deploy

**Option B: Manual Configuration**
1. Delete the current static site service
2. Create a new **Web Service** (not Static Site)
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Port**: `3000` (or leave default)

### Step 3: Verify Configuration

After deployment, check the logs:
- You should see: `✅ Server is running on port 3000`
- You should see: `✅ SPA routing enabled - all routes will serve index.html`

### Step 4: Test

After redeploying:
1. Visit `https://imtda.onrender.com/admin` directly
2. It should load (not 404)
3. Refresh the page - it should still work

## Alternative: If You Must Use Static Site

If you absolutely need to use Static Site hosting:

1. Go to your Render.com dashboard
2. Navigate to **Redirects/Rewrites** section
3. Add a rewrite rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

However, **Web Service is recommended** because:
- ✅ Better control
- ✅ Can add custom headers
- ✅ Can handle API proxying if needed
- ✅ More reliable for SPAs

## Current Configuration

Your repository includes:
- ✅ `server.js` - Express server for SPA routing
- ✅ `render.yaml` - Render.com configuration
- ✅ `public/_redirects` - Fallback for static sites
- ✅ `package.json` - Updated with Express and start script

## Troubleshooting

If you still get 404 errors:

1. **Check Render.com logs**: Look for errors in the deployment logs
2. **Verify build succeeded**: Make sure `npm run build` completed successfully
3. **Check service type**: Must be "Web Service", not "Static Site"
4. **Verify start command**: Should be `npm start` (runs `node server.js`)
5. **Check PORT**: Render.com sets PORT automatically, server.js uses `process.env.PORT`

## Need Help?

If the issue persists:
1. Check Render.com deployment logs
2. Verify the service type in dashboard
3. Make sure `render.yaml` is in the repository root
4. Ensure Express is installed: `npm install express`

