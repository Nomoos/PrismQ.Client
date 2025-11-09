# Frontend/TaskManager - Deployment Guide

**Version**: 1.0  
**Last Updated**: 2025-11-09  
**Audience**: System Administrators and DevOps
# TaskManager Deployment Guide

**Version**: 0.1.0  
**Last Updated**: 2025-11-09  
**Target Audience**: DevOps, System Administrators

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
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Local Deployment](#local-deployment)
4. [Production Deployment](#production-deployment)
5. [Vedos/Wedos Deployment](#vedoswedos-deployment)
6. [Environment Configuration](#environment-configuration)
7. [Troubleshooting](#troubleshooting)
8. [Production Checklist](#production-checklist)

---

## Introduction

### About This Guide

This guide covers deployment of the Frontend/TaskManager application to various environments, with a focus on Vedos/Wedos hosting which is the primary deployment target.

### Deployment Options

1. **Local Development**: For testing and development
2. **Vedos/Wedos Hosting**: Primary production deployment
3. **Generic Web Server**: Apache, Nginx, or other static hosting

### Architecture

Frontend/TaskManager is a **Single Page Application (SPA)** that:
- Consists of static files (HTML, CSS, JavaScript)
- Requires client-side routing support
- Connects to Backend/TaskManager API
- Has no server-side rendering

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
### Development Machine

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: For source control

### Production Server

- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **PHP**: 7.4+ (for deployment scripts)
- **HTTPS**: SSL certificate recommended
- **Domain**: Configured and pointing to server

### Access Requirements

- FTP/SFTP credentials for file upload
- SSH access (optional, for advanced setup)
- Domain DNS configuration access

---

## Local Deployment

### Development Server

For local development with hot reload:

```bash
cd Frontend/TaskManager
npm install
npm run dev
```

Access at: `http://localhost:5173`

### Local Production Build

To test production build locally:

```bash
# Build
npm run build

# Preview
npm run preview
```

Access at: `http://localhost:4173`

### Local with Backend

To test with local Backend/TaskManager:

1. Start Backend/TaskManager:
   ```bash
   cd Backend/TaskManager
   npm start
   ```

2. Configure Frontend environment (`.env`):
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   VITE_API_KEY=your-local-api-key
   ```

3. Start Frontend:
   ```bash
   npm run dev
   ```

---

## Production Deployment

### Build Process

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   
   Create `.env.production`:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   VITE_API_KEY=production-api-key
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Verify Build**
   ```bash
   # Check output
   ls -la dist/
   
   # Check bundle size
   npm run bundle:size
   ```

### Build Output

The `dist/` directory contains:

```
dist/
├── assets/
│   ├── index-[hash].js      # Main application bundle
│   ├── vendor-[hash].js     # Third-party libraries
│   └── index-[hash].css     # Compiled styles
├── index.html               # Entry point
└── favicon.ico              # Icon
```

### Deployment Methods

#### Method 1: FTP/SFTP Upload

1. Build locally (see above)
2. Connect to server via FTP/SFTP
3. Upload contents of `dist/` to web root
4. Configure web server (see below)

#### Method 2: Git Deploy (Advanced)

```bash
# On server
git clone <repo-url> /var/www/taskmanager
cd /var/www/taskmanager/Frontend/TaskManager
npm install
npm run build

# Serve dist/ directory
```

#### Method 3: CI/CD Pipeline

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend

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
          node-version: '18'
      
      - name: Install and Build
        run: |
          cd Frontend/TaskManager
          npm install
          npm run build
      
      - name: Deploy to Server
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./Frontend/TaskManager/dist/
```

---

## Vedos/Wedos Deployment

### Overview

Vedos/Wedos is a Czech hosting provider. This section provides step-by-step instructions for deploying to Vedos/Wedos hosting.

### Step 1: Prepare Build

On your local machine:

```bash
cd Frontend/TaskManager

# Install dependencies
npm install

# Create production environment file
cat > .env.production << EOF
VITE_API_BASE_URL=https://your-domain.cz/api
VITE_API_KEY=your-production-api-key
EOF

# Build for production
npm run build

# Verify build
ls -la dist/
```

### Step 2: Prepare Deployment Files

The repository includes deployment scripts:

- `deploy-deploy.php` - Deployment wizard launcher
- `deploy.php` - Main deployment script
- `.htaccess` - Apache configuration for SPA routing

These files handle:
- File uploads
- Environment configuration
- Health checks
- Deployment verification

### Step 3: Upload Files via FTP

1. **Connect to Vedos/Wedos FTP**:
   - Host: `ftp.yourdomain.cz`
   - Port: 21
   - Username: Your FTP username
   - Password: Your FTP password

2. **Create Directory Structure**:
   ```
   /www/
   └── taskmanager/
       ├── (upload dist/ contents here)
       ├── deploy-deploy.php
       └── deploy.php
   ```

3. **Upload Built Files**:
   - Upload all contents of `dist/` to `/www/taskmanager/`
   - Upload `deploy-deploy.php` to `/www/taskmanager/`
   - Upload `deploy.php` to `/www/taskmanager/`

### Step 4: Configure Apache

Create or update `.htaccess` in `/www/taskmanager/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /taskmanager/
  
  # Redirect to HTTPS (recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Handle SPA routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /taskmanager/index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  
  # CORS (if needed)
  Header set Access-Control-Allow-Origin "https://your-api-domain.cz"
  Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, Authorization"
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
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### Step 5: Run Deployment Wizard

1. **Access Deployment Wizard**:
   ```
   https://yourdomain.cz/taskmanager/deploy-deploy.php
   ```

2. **Follow Wizard Steps**:
   - Verify files uploaded
   - Configure environment variables
   - Test API connection
   - Run health check
   - Complete deployment

3. **Delete Deployment Scripts** (after successful deployment):
   ```
   # For security, remove these files
   rm deploy-deploy.php
   rm deploy.php
   ```

### Step 6: Verify Deployment

1. **Access Application**:
   ```
   https://yourdomain.cz/taskmanager/
   ```

2. **Check Health**:
   - Task List should load
   - Tasks should be fetchable from API
   - Navigation should work
   - No console errors

3. **Test Functionality**:
   - Configure Worker ID in Settings
   - View task details
   - Claim a task
   - Complete a task

### Step 7: Configure Domain (Optional)

If deploying to root domain or subdomain:

1. **In Vedos/Wedos Control Panel**:
   - Go to Domain Management
   - Point domain to `/www/taskmanager/`
   - Update SSL certificate

2. **Update `.htaccess`**:
   ```apache
   RewriteBase /
   RewriteRule . /index.html [L]
   ```

3. **Update Environment**:
   - Rebuild with correct base URL
   - Re-upload files

---

## Environment Configuration

### Environment Variables

Create `.env.production` before building:

```env
# API Configuration
VITE_API_BASE_URL=https://api.yourdomain.cz
VITE_API_KEY=your-production-api-key

# Application Configuration
VITE_APP_TITLE=TaskManager
VITE_APP_VERSION=0.1.0

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

### Runtime Configuration

For configuration that can't be embedded at build time, use the Settings view:

- **API Base URL**: Configurable in UI
- **API Key**: Configurable in UI (stored in localStorage)
- **Worker ID**: Configurable in UI (stored in localStorage)

### CORS Configuration

If Frontend and Backend are on different domains:

1. **Backend Configuration** (in Backend/TaskManager):
   ```javascript
   // Enable CORS
   app.use(cors({
     origin: 'https://frontend.yourdomain.cz',
     credentials: true
   }))
   ```

2. **Frontend Configuration**:
   - Already configured in Axios client
   - No additional changes needed

---

## Troubleshooting

### Issue: 404 Error on Refresh

**Symptom**: Direct navigation to `/tasks/123` returns 404

**Cause**: Server not configured for SPA routing

**Solution**: 
1. Ensure `.htaccess` is uploaded
2. Verify `mod_rewrite` is enabled on server
3. Check `RewriteBase` matches deployment path

### Issue: Blank Page After Deployment

**Symptom**: White screen, no content

**Cause**: JavaScript errors, wrong base path

**Solution**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify build was successful
4. Check `base` in `vite.config.ts` matches deployment path

### Issue: API Connection Failed

**Symptom**: "Failed to fetch tasks" error

**Cause**: Wrong API URL or CORS issue

**Solution**:
1. Go to Settings
2. Verify API Base URL is correct
3. Test API URL in browser: `https://api.yourdomain.cz/health`
4. Check CORS configuration on backend
5. Verify API key is correct

### Issue: Assets Not Loading

**Symptom**: Missing styles or JavaScript

**Cause**: Wrong asset paths

**Solution**:
1. Check browser network tab
2. Verify base path in build configuration
3. Rebuild if necessary
4. Re-upload files

### Issue: Slow Loading

**Symptom**: Application takes > 5 seconds to load

**Cause**: Large bundle, slow network

**Solution**:
1. Check bundle size: `npm run bundle:check`
2. Verify code splitting is working
3. Enable compression in `.htaccess`
4. Check server response times
5. Use CDN if available

---

## Production Checklist

### Pre-Deployment

- [ ] All tests passing (`npm run test`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Bundle size < 500KB (`npm run bundle:check`)
- [ ] Environment variables configured
- [ ] API connection tested
- [ ] HTTPS certificate ready
- [ ] Backup existing deployment (if updating)

### During Deployment

- [ ] Build production bundle (`npm run build`)
- [ ] Verify build output (`ls -la dist/`)
- [ ] Upload files to server
- [ ] Configure `.htaccess`
- [ ] Run deployment wizard (if applicable)
- [ ] Verify file permissions
- [ ] Test basic navigation

### Post-Deployment

- [ ] Application loads successfully
- [ ] No console errors
- [ ] All routes accessible
- [ ] API connection working
- [ ] Task claiming works
- [ ] Task completion works
- [ ] Mobile responsive (test on device)
- [ ] Cross-browser compatibility
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Remove deployment scripts (`deploy-deploy.php`, `deploy.php`)

### Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No API keys in client code
- [ ] CORS properly configured
- [ ] No sensitive data exposed
- [ ] Deployment scripts removed

### Monitoring

- [ ] Error tracking configured (optional)
- [ ] Analytics configured (optional)
- [ ] Performance monitoring (optional)
- [ ] Health check endpoint working

---

## Rollback Procedure

If deployment fails or issues arise:

### Quick Rollback

1. **Restore Previous Version**:
   - Re-upload previous `dist/` files
   - Or restore from backup

2. **Verify**:
   - Test application
   - Check for errors
   - Confirm functionality

### Full Rollback

1. **Revert Git Commit**:
   ```bash
   git revert HEAD
   git push
   ```

2. **Rebuild Previous Version**:
   ```bash
   git checkout <previous-commit>
   npm install
   npm run build
   ```

3. **Re-deploy**:
   - Upload files
   - Verify

---

## Continuous Deployment

### Automated Deployment

For automatic deployment on git push:

1. **Set up CI/CD** (GitHub Actions, GitLab CI)
2. **Configure secrets** (FTP credentials, API keys)
3. **Create workflow** (see CI/CD Pipeline section above)
4. **Test workflow**
5. **Monitor deployments**

### Deployment Monitoring

After deployment:
- Monitor error logs
- Check performance metrics
- Review user feedback
- Track API errors
- Monitor bundle size over time

---

## Additional Resources

### Vedos/Wedos Documentation

- [Vedos Hosting Guide](https://www.vedos.cz/)
- [FTP Configuration](https://www.vedos.cz/podpora/)
- [SSL Certificates](https://www.vedos.cz/ssl/)

### General Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vue SPA Deployment](https://router.vuejs.org/guide/essentials/history-mode.html)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

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
1. **Check Troubleshooting Section** above
2. **Review Server Logs**
3. **Check Browser Console**
4. **Contact Hosting Support** (Vedos/Wedos)
5. **Contact Development Team**

---

**Last Updated**: 2025-11-09  
**Version**: 0.1.0
