# 🔧 Deployment Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. **Repository Structure Issue**
**Problem**: Project is nested in `Skote_Vite_v4.3.0/Admin/` which confuses deployment platforms.

**Solutions**:

#### Option A: Create a New Repository (Recommended)
```bash
# 1. Create a new directory for clean deployment
mkdir indian-techno-dashboard-deploy
cd indian-techno-dashboard-deploy

# 2. Copy only the Admin folder contents
cp -r "path/to/Skote_Vite_v4.3.0/Admin/*" .

# 3. Initialize new git repository
git init
git add .
git commit -m "Initial deployment-ready commit"

# 4. Create new GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/indian-techno-dashboard.git
git branch -M main
git push -u origin main
```

#### Option B: Deploy with Root Directory Setting
- **Vercel**: Set "Root Directory" to `Skote_Vite_v4.3.0/Admin`
- **Netlify**: Set "Base directory" to `Skote_Vite_v4.3.0/Admin`

### 2. **Build Failures**

#### Node.js Version Issues
**Problem**: Deployment platform uses incompatible Node.js version.

**Solution**: Add to your deployment config:
```toml
# netlify.toml
[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "8"
```

```json
// vercel.json
{
  "functions": {
    "app/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

#### Memory Issues
**Problem**: Build runs out of memory.

**Solution**: Add to package.json:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

### 3. **Routing Issues (404 on Refresh)**

**Problem**: SPA routes return 404 when accessed directly.

**Solution**: Both `vercel.json` and `netlify.toml` are configured with proper redirects:

```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 4. **Asset Loading Issues**

#### Base URL Problems
**Problem**: Assets not loading due to incorrect base path.

**Solution**: Check `vite.config.js`:
```javascript
export default defineConfig({
  // For subdirectory deployment, set base
  base: '/your-repo-name/', // Only if deploying to subdirectory
  // For root domain deployment, leave as default or set to '/'
  base: '/',
})
```

#### CORS Issues
**Problem**: API calls blocked by CORS.

**Solution**: Add CORS headers in deployment config (already added to configs).

### 5. **Environment Variables**

**Problem**: Missing environment variables in production.

**Solution**:
- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Build & Deploy → Environment Variables

Common variables to add:
```
NODE_ENV=production
VITE_APP_TITLE=Indian Techno Dashboard
```

### 6. **Large Bundle Size Warnings**

**Problem**: Build warns about large chunks (as seen in your build).

**Solutions**:

#### Code Splitting
Add to `vite.config.js`:
```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts': ['apexcharts', 'recharts'],
          'ui': ['reactstrap', 'react-bootstrap'],
          'utils': ['lodash-es', 'moment'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

#### Dynamic Imports
Convert static imports to dynamic:
```javascript
// Instead of:
import SomeHeavyComponent from './SomeHeavyComponent'

// Use:
const SomeHeavyComponent = lazy(() => import('./SomeHeavyComponent'))
```

## 🔍 Debugging Steps

### 1. **Local Build Test**
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173` to test production build locally.

### 2. **Check Build Logs**
- **Vercel**: Functions tab → View logs
- **Netlify**: Deploys → Click on failed deploy → View logs

### 3. **Test Individual Routes**
After deployment, test these URLs:
- `/` (home)
- `/dashboard`
- `/indian-techno-dashboard`
- `/custom-demo`
- `/enhanced-demo`

### 4. **Browser Console**
Check for JavaScript errors in browser console on deployed site.

## 🚀 Step-by-Step Deployment (Clean Approach)

### For Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Import project from GitHub
3. **Framework Preset**: Vite
4. **Root Directory**: `Skote_Vite_v4.3.0/Admin` (if using current structure)
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Install Command**: `npm install`
8. Deploy!

### For Netlify:
1. Go to [netlify.com](https://netlify.com)
2. New site from Git
3. Choose your repository
4. **Base directory**: `Skote_Vite_v4.3.0/Admin` (if using current structure)
5. **Build command**: `npm run build`
6. **Publish directory**: `Skote_Vite_v4.3.0/Admin/dist` (if using current structure)
7. Deploy!

## 🛠️ Quick Fixes

### If deployment keeps failing:
1. **Create a minimal test deployment**:
   - Copy just essential files
   - Remove unused dependencies
   - Test with basic dashboard only

2. **Check file paths**:
   - Ensure all import paths are correct
   - Check for case-sensitive file names
   - Verify asset paths

3. **Simplify first**:
   - Comment out problematic components
   - Deploy basic version first
   - Add features incrementally

## 📞 Getting Help

If issues persist:
1. Check deployment platform logs (most important)
2. Compare with a working Vite + React deployment
3. Test locally with production build
4. Check network tab for failed requests

## 🎯 Current Status

✅ Build completed successfully  
✅ Deployment configs updated  
✅ Assets properly organized  
⚠️ Large bundle size (consider code splitting)  
🔄 Ready for deployment with improved configurations
