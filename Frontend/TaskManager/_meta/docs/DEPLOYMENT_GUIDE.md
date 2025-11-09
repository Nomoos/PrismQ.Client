# Frontend/TaskManager - Deployment Guide

**Version**: 1.0  
**Last Updated**: 2025-11-09  
**Audience**: System Administrators and DevOps

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Local Build](#local-build)
4. [Deployment Methods](#deployment-methods)
5. [Vedos/Wedos Deployment](#vedoswedos-deployment)
6. [Manual Deployment](#manual-deployment)
7. [Configuration](#configuration)
8. [Verification](#verification)
9. [Troubleshooting](#troubleshooting)
10. [Production Checklist](#production-checklist)

---

## Overview

Frontend/TaskManager is a static Vue.js Single Page Application (SPA) that can be deployed to any web server with Apache and mod_rewrite support. This guide focuses on deployment to Vedos/Wedos shared hosting.

### Deployment Architecture

```
┌────────────────────────────────────────────┐
│         Development Machine                 │
│  ┌──────────────────────────────────────┐  │
│  │  1. npm run build                     │  │
│  │  2. Creates dist/ folder              │  │
│  └──────────────────────────────────────┘  │
└──────────────────┬─────────────────────────┘
                   │ Upload via FTP/SFTP
                   ▼
┌────────────────────────────────────────────┐
│      Vedos/Wedos Server (Apache)           │
│  ┌──────────────────────────────────────┐  │
│  │  /www/taskmanager/                    │  │
│  │  ├── index.html                       │  │
│  │  ├── assets/                          │  │
│  │  │   ├── index-[hash].js              │  │
│  │  │   └── index-[hash].css             │  │
│  │  ├── .htaccess (SPA routing)          │  │
│  │  └── deploy-deploy.php (optional)     │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
                   │ Serves
                   ▼
┌────────────────────────────────────────────┐
│            End Users (Browsers)             │
│  https://your-domain.com/taskmanager/      │
└────────────────────────────────────────────┘
```

---

## Prerequisites

### On Development Machine

- Node.js 18+ installed
- npm package manager
- Git (for version control)
- FTP/SFTP client (FileZilla, WinSCP, or command line)

### On Server (Vedos/Wedos)

- Apache web server with mod_rewrite enabled
- PHP 7.4+ (only for deployment scripts, not for the app itself)
- HTTPS certificate (recommended)
- Domain configured and pointing to server

### Backend Requirements

- Backend/TaskManager API must be deployed and accessible
- API endpoint URL (e.g., `https://api.prismq.nomoos.cz/api`)
- API key (if authentication is enabled)

---

## Local Build

### Step 1: Prepare the Build

1. **Navigate to project directory**

```bash
cd Frontend/TaskManager
```

2. **Install dependencies** (if not already installed)

```bash
npm install
```

3. **Configure environment variables**

Create or update `.env.production`:

```env
# Production API Configuration
VITE_API_BASE_URL=https://api.prismq.nomoos.cz/api
VITE_API_KEY=your-production-api-key

# Production Settings
VITE_APP_TITLE=TaskManager
VITE_DEBUG_MODE=false
```

**Important**: Never commit `.env.production` with real API keys to version control!

### Step 2: Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # ~155KB (gzipped: ~58KB)
│   ├── index-[hash].css     # ~13KB (gzipped: ~3KB)
│   └── [other assets]
└── [other static files]
```

### Step 3: Verify Build Locally

```bash
npm run preview
```

- Opens preview server at `http://localhost:4173`
- Test all functionality
- Verify API connection
- Check for console errors

---

## Deployment Methods

### Method 1: Automated Deployment (Recommended)

Uses `deploy-deploy.php` wizard for easy deployment.

**Pros**:
- ✅ User-friendly wizard interface
- ✅ Automatic file upload
- ✅ Automatic .htaccess configuration
- ✅ Built-in verification

**Cons**:
- ⚠️ Requires PHP on server
- ⚠️ Requires write permissions

### Method 2: Manual Deployment

Direct FTP/SFTP upload of built files.

**Pros**:
- ✅ Full control over deployment
- ✅ Works without PHP scripts
- ✅ No special permissions needed

**Cons**:
- ⚠️ More manual steps
- ⚠️ Manual .htaccess configuration
- ⚠️ Manual verification

---

## Vedos/Wedos Deployment

### Automated Deployment (Recommended)

#### Step 1: Build Locally

```bash
cd Frontend/TaskManager
npm run build
```

#### Step 2: Upload Deployment Wizard

1. **Connect via FTP/SFTP** to your Vedos/Wedos server
2. **Navigate** to `/www/` or your web root
3. **Create folder** `taskmanager/` if it doesn't exist
4. **Upload** `public/deploy-deploy.php` to `/www/taskmanager/`

#### Step 3: Run Deployment Wizard

1. **Open in browser**: `https://your-domain.com/taskmanager/deploy-deploy.php`

2. **Follow the wizard steps**:

   **Welcome Screen**:
   - Click "Start Deployment"

   **Step 1: Download Deploy Script**:
   - Click "Download deploy.php"
   - This fetches the main deployment script

   **Step 2: Upload Files**:
   - Select your local `dist/` folder
   - Or provide path to dist folder
   - Click "Upload Files"
   - Wait for upload to complete

   **Step 3: Configure .htaccess**:
   - Review .htaccess configuration
   - Click "Apply Configuration"
   - This sets up SPA routing

   **Step 4: Set Environment**:
   - Enter API Base URL
   - Enter API Key (if required)
   - Click "Save Configuration"

   **Step 5: Verify Installation**:
   - Click "Test Installation"
   - Checks:
     - ✅ index.html accessible
     - ✅ Assets loading
     - ✅ .htaccess working
     - ✅ API connection

3. **Complete Deployment**:
   - Click "Finish"
   - Note the application URL
   - Optionally remove deploy-deploy.php for security

#### Step 4: Verify Deployment

Visit your application:
```
https://your-domain.com/taskmanager/
```

Check:
- [ ] Application loads without errors
- [ ] Tasks list displays
- [ ] Navigation works (all routes)
- [ ] API connection successful
- [ ] Mobile responsive layout
- [ ] Browser console has no errors

---

## Manual Deployment

### Step 1: Build Locally

```bash
cd Frontend/TaskManager
npm run build
```

### Step 2: Connect to Server

Using FTP/SFTP client:

```bash
# Example with sftp command line
sftp username@your-server.com
```

Or use FileZilla, WinSCP, etc.

### Step 3: Create Directory Structure

On server:

```bash
mkdir -p /www/taskmanager
cd /www/taskmanager
```

### Step 4: Upload Files

Upload all contents from local `dist/` folder to `/www/taskmanager/`:

```
Local                    →    Server
dist/index.html          →    /www/taskmanager/index.html
dist/assets/*            →    /www/taskmanager/assets/*
```

Using FileZilla:
1. Connect to server
2. Navigate to `/www/taskmanager/`
3. Drag and drop all files from `dist/` folder
4. Wait for upload to complete

Using command line SFTP:
```bash
sftp> cd /www/taskmanager
sftp> put -r dist/* .
```

### Step 5: Configure .htaccess

Create `/www/taskmanager/.htaccess`:

```apache
# Frontend/TaskManager - Apache Configuration for SPA Routing

<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Set base directory (adjust if needed)
  RewriteBase /taskmanager/
  
  # Handle requests for existing files and directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Route all other requests to index.html
  RewriteRule ^ index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  # Prevent clickjacking
  Header set X-Frame-Options "SAMEORIGIN"
  
  # Prevent MIME type sniffing
  Header set X-Content-Type-Options "nosniff"
  
  # Enable XSS protection
  Header set X-XSS-Protection "1; mode=block"
  
  # Content Security Policy (adjust as needed)
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.prismq.nomoos.cz;"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  
  # HTML - no cache
  ExpiresByType text/html "access plus 0 seconds"
  
  # CSS and JavaScript - 1 year (with hash in filename)
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  
  # Images - 1 month
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/webp "access plus 1 month"
</IfModule>

# Force HTTPS (recommended for production)
# Uncomment the following lines to force HTTPS
# <IfModule mod_rewrite.c>
#   RewriteCond %{HTTPS} off
#   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
# </IfModule>
```

**Note**: If your application is in a different path, adjust `RewriteBase` accordingly.

### Step 6: Set Permissions

Ensure proper file permissions:

```bash
# Files should be readable
chmod 644 /www/taskmanager/index.html
chmod 644 /www/taskmanager/.htaccess

# Directories should be executable
chmod 755 /www/taskmanager
chmod 755 /www/taskmanager/assets
```

### Step 7: Test Deployment

1. Visit `https://your-domain.com/taskmanager/`
2. Verify all routes work:
   - `/` - Task List
   - `/tasks/1` - Task Detail
   - `/workers` - Worker Dashboard
   - `/settings` - Settings
3. Check browser console for errors
4. Test API connection in Settings

---

## Configuration

### Environment Variables

The application reads configuration from environment variables at build time:

```env
# API Configuration
VITE_API_BASE_URL=https://api.prismq.nomoos.cz/api
VITE_API_KEY=your-api-key

# Application Settings
VITE_APP_TITLE=TaskManager
VITE_DEBUG_MODE=false
```

These are baked into the JavaScript bundle during build. To change them:

1. Update `.env.production`
2. Rebuild: `npm run build`
3. Redeploy

### Runtime Configuration (Advanced)

For configuration that can change without rebuild, use `config.js`:

1. Create `public/config.js`:

```javascript
window.APP_CONFIG = {
  API_BASE_URL: 'https://api.prismq.nomoos.cz/api',
  API_KEY: 'your-api-key'
}
```

2. Load in `index.html`:

```html
<script src="/config.js"></script>
```

3. Use in application:

```typescript
const apiBaseUrl = window.APP_CONFIG?.API_BASE_URL || import.meta.env.VITE_API_BASE_URL
```

This allows changing configuration without rebuild, but requires manual file updates on server.

---

## Verification

### Deployment Checklist

After deployment, verify:

#### Basic Functionality
- [ ] Application loads at correct URL
- [ ] No 404 errors in browser console
- [ ] No JavaScript errors in console
- [ ] All assets (CSS, JS) loading correctly

#### Routing
- [ ] Homepage (`/`) loads
- [ ] Task detail route (`/tasks/:id`) works
- [ ] Worker dashboard (`/workers`) works
- [ ] Settings (`/settings`) works
- [ ] Direct URL access works (not just navigation)
- [ ] Browser back/forward buttons work

#### API Connection
- [ ] Settings shows API URL
- [ ] Tasks load from backend
- [ ] Can claim tasks
- [ ] Can complete tasks
- [ ] Error messages display properly

#### Mobile Responsiveness
- [ ] Test on mobile device or DevTools
- [ ] Touch targets are adequate (44x44px)
- [ ] No horizontal scrolling
- [ ] Bottom navigation visible and functional
- [ ] Cards and buttons touch-friendly

#### Performance
- [ ] Initial load < 3 seconds (on 3G)
- [ ] JavaScript bundle < 500KB
- [ ] No layout shift during load
- [ ] Images optimized and loading fast

#### Security
- [ ] HTTPS enabled (recommended)
- [ ] No API keys in client-side code
- [ ] CSP headers configured
- [ ] X-Frame-Options set

---

## Troubleshooting

### Problem: 404 Errors on Route Navigation

**Symptom**: Direct URL access to routes (like `/tasks/1`) shows 404

**Cause**: .htaccess not configured or mod_rewrite not enabled

**Solution**:
1. Verify `.htaccess` exists in deployment directory
2. Check `RewriteBase` matches your path
3. Ensure mod_rewrite is enabled (contact hosting support)
4. Test .htaccess with simple redirect:
   ```apache
   RewriteEngine On
   RewriteRule ^test$ index.html [L]
   ```
   Visit `/taskmanager/test` - should show index.html

### Problem: Blank Page After Deployment

**Symptom**: Page loads but shows blank screen

**Causes and Solutions**:

1. **JavaScript errors**:
   - Open browser console
   - Check for errors
   - Common: Wrong base path in build

2. **Wrong base URL**:
   - Check `vite.config.ts`:
     ```typescript
     export default defineConfig({
       base: '/taskmanager/'  // Must match server path
     })
     ```
   - Rebuild if changed

3. **CORS errors**:
   - API must allow requests from your domain
   - Check backend CORS configuration

### Problem: API Connection Failed

**Symptom**: Tasks don't load, API errors in console

**Solutions**:

1. **Check API URL**:
   - Go to Settings
   - Verify API Base URL is correct
   - Test URL in browser: `https://api.prismq.nomoos.cz/api/health`

2. **Check CORS**:
   - Backend must allow your frontend domain
   - In Backend TaskManager, check CORS headers:
     ```php
     header('Access-Control-Allow-Origin: https://your-domain.com');
     ```

3. **Check API Key**:
   - Verify API key is correct
   - Check if API requires authentication

4. **Network issues**:
   - Test backend URL directly
   - Check server firewall
   - Verify DNS resolution

### Problem: Assets Not Loading (CSS/JS)

**Symptom**: Unstyled page, functionality broken

**Solutions**:

1. **Check paths**:
   - Open browser DevTools > Network
   - Look for 404 errors on CSS/JS files
   - Verify `base` in `vite.config.ts`

2. **Check permissions**:
   - Ensure files are readable: `chmod 644`
   - Ensure directories are executable: `chmod 755`

3. **Clear cache**:
   - Hard reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache
   - Try incognito mode

### Problem: Slow Loading

**Solutions**:

1. **Enable compression**:
   - Check `.htaccess` has mod_deflate rules
   - Verify with browser DevTools > Network > Size column

2. **Enable caching**:
   - Check `.htaccess` has mod_expires rules
   - Verify with browser DevTools > Network > Headers

3. **Optimize build**:
   - Check bundle size: `npm run build`
   - If too large, consider code splitting

4. **Use CDN**:
   - Host static assets on CDN
   - Update paths in built files

### Problem: Worker ID Not Persisting

**Symptom**: Worker ID resets on page reload

**Cause**: localStorage not working or being cleared

**Solutions**:

1. Check browser settings:
   - Cookies and site data enabled
   - Not in incognito mode

2. Check HTTPS:
   - Some browsers restrict localStorage on HTTP

3. Check browser compatibility:
   - Use modern browser (Chrome 90+, Firefox 88+, Safari 14+)

---

## Production Checklist

### Before Deployment

- [ ] All features tested locally
- [ ] Production build successful
- [ ] Bundle size optimized (< 500KB)
- [ ] No console errors or warnings
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Backup current production version

### During Deployment

- [ ] Build with production environment variables
- [ ] Upload all files from dist/
- [ ] Configure .htaccess correctly
- [ ] Set proper file permissions
- [ ] Test all routes
- [ ] Verify API connection

### After Deployment

- [ ] Smoke test all features
- [ ] Test on mobile device
- [ ] Test on multiple browsers
- [ ] Check performance (Lighthouse)
- [ ] Monitor for errors (first hour)
- [ ] Verify HTTPS certificate
- [ ] Test with real users

### Security Checklist

- [ ] HTTPS enabled and enforced
- [ ] CSP headers configured
- [ ] X-Frame-Options set
- [ ] No API keys in client code
- [ ] .env files not uploaded
- [ ] deploy-deploy.php removed (if used)
- [ ] File permissions correct (644 for files, 755 for dirs)
- [ ] Error messages don't expose sensitive info

---

## Advanced Topics

### Zero-Downtime Deployment

For production systems, deploy to a staging directory first:

1. Deploy to `/www/taskmanager-new/`
2. Test thoroughly
3. Swap directories:
   ```bash
   mv /www/taskmanager /www/taskmanager-old
   mv /www/taskmanager-new /www/taskmanager
   ```
4. Rollback if needed:
   ```bash
   mv /www/taskmanager /www/taskmanager-failed
   mv /www/taskmanager-old /www/taskmanager
   ```

### Automated CI/CD

Set up GitHub Actions for automated deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /www/taskmanager/
```

### Monitoring and Logging

Set up monitoring for production:

1. **Error Tracking**: Sentry, Rollbar, or similar
2. **Analytics**: Google Analytics, Plausible
3. **Performance**: Google Lighthouse, WebPageTest
4. **Uptime**: UptimeRobot, Pingdom

---

## Support

For deployment issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review [Vedos/Wedos documentation](https://www.wedos.com/)
3. Contact hosting support
4. Check project documentation

---

**Document Owner**: Worker06 (Documentation Specialist)  
**Last Updated**: 2025-11-09  
**Version**: 1.0  
**Status**: ✅ Complete
