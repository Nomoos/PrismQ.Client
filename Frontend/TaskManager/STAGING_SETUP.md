# Staging Environment Setup Guide

**Version:** 1.0.0  
**Last Updated:** 2025-11-09  
**Purpose:** Configure and maintain staging environment for Frontend/TaskManager

---

## Table of Contents

1. [Overview](#overview)
2. [Staging vs Production](#staging-vs-production)
3. [Initial Setup](#initial-setup)
4. [Environment Configuration](#environment-configuration)
5. [Deployment to Staging](#deployment-to-staging)
6. [Testing & Validation](#testing--validation)
7. [Maintenance](#maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Overview

### Purpose of Staging Environment

The staging environment serves as a **production-like environment** for:
- Testing new features before production release
- Validating deployment procedures
- Integration testing with staging backend
- Performance testing under production-like conditions
- UAT (User Acceptance Testing)
- Security validation

### Key Characteristics

- **Production-like:** Mirrors production configuration
- **Isolated:** Separate from production, safe for testing
- **Accessible:** Available to team members for testing
- **Stable:** Long-lived, not torn down after each test
- **Protected:** Access controlled, but not as strict as production

---

## Staging vs Production

| Aspect | Staging | Production |
|--------|---------|------------|
| URL | `https://staging.domain.com` or `/staging/` | `https://domain.com` |
| Purpose | Testing & validation | Live users |
| Data | Test data, can be reset | Real user data |
| Uptime SLA | Best effort (~95%) | High availability (99.9%+) |
| Deployment Frequency | Multiple times daily | Weekly/bi-weekly |
| Access | Team + stakeholders | Public users |
| Monitoring | Basic | Comprehensive |
| Performance | Good enough | Optimized |
| SSL | Self-signed OK | Production certificate required |

---

## Initial Setup

### Option 1: Subdomain (Recommended)

**Setup:**
1. Create DNS record: `staging.your-domain.com → server IP`
2. Configure SSL certificate for staging subdomain
3. Create separate web root: `/www/staging/`

**Pros:**
- Cleaner separation
- Independent SSL
- Better mimics production
- No path conflicts

**Cons:**
- Requires DNS setup
- Needs separate SSL cert
- Slightly more complex

### Option 2: Subdirectory

**Setup:**
1. Use production domain with path: `your-domain.com/staging/`
2. Create subdirectory in web root: `/www/staging/`
3. Configure .htaccess for subdirectory routing

**Pros:**
- Simpler setup
- No DNS changes needed
- Shares production SSL
- Quick to set up

**Cons:**
- Path conflicts possible
- Less production-like
- Routing complexity

### Server Requirements

**Minimum Specifications:**
- Apache 2.4+ (or Nginx 1.18+)
- PHP 7.4+ (for deployment scripts)
- 50 MB storage (staging + backups)
- mod_rewrite enabled (Apache)
- HTTPS recommended

**Access Requirements:**
- FTP/SFTP access
- SSH access (optional, recommended)
- File manager access
- Control panel access (Vedos/Wedos)

---

## Environment Configuration

### Directory Structure

```
/www/staging/                    # Web root for staging
├── assets/                      # Built JavaScript/CSS
│   ├── index-*.js
│   ├── vue-vendor-*.js
│   ├── axios-vendor-*.js
│   └── index-*.css
├── index.html                   # App entry point
├── .htaccess                    # SPA routing config
├── health.json                  # Health check endpoint
├── health.html                  # Health check UI
├── deploy.php                   # Deployment wizard
├── deploy-deploy.php            # (Optional) Loader
└── deploy-auto.php              # (Optional) CLI deploy
```

### Environment Variables (Staging)

Create `.env.staging` in local project:

```bash
# Staging Environment Configuration
# File: Frontend/TaskManager/.env.staging

# API Configuration - Point to STAGING backend
VITE_API_BASE_URL=https://api-staging.your-domain.com
# OR if backend in subdirectory:
# VITE_API_BASE_URL=https://your-domain.com/api-staging

# API Key (staging-specific key)
VITE_API_KEY=staging-test-key-12345

# App Configuration
VITE_APP_ENV=staging
VITE_APP_NAME=PrismQ TaskManager (Staging)

# Feature Flags (enable beta features in staging)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_ENABLE_BETA_FEATURES=true

# Deployment metadata
VITE_DEPLOYED_ENV=staging
```

### Apache Configuration (.htaccess)

For subdirectory deployment, modify `.htaccess`:

```apache
# Staging SPA Routing Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # For subdirectory deployment
  RewriteBase /staging/
  
  # Handle Frontend routes - redirect all requests to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /staging/index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  
  # Staging environment indicator
  Header set X-Environment "staging"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache control (shorter for staging)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 hour"
  ExpiresByType application/javascript "access plus 1 hour"
  ExpiresByType image/png "access plus 1 day"
  ExpiresByType image/jpeg "access plus 1 day"
</IfModule>
```

### health.json Configuration

Update `public/health.json` for staging:

```json
{
  "status": "ok",
  "service": "PrismQ Frontend/TaskManager",
  "version": "0.1.0-staging",
  "environment": "staging",
  "deployed_at": "2025-11-09T00:00:00Z",
  "build": {
    "bundle_size_kb": 210,
    "gzipped_size_kb": 71,
    "build_date": "2025-11-09"
  },
  "checks": {
    "static_files": "ok",
    "spa_routing": "ok"
  },
  "backend_api": "https://api-staging.your-domain.com"
}
```

---

## Deployment to Staging

### Automated Deployment (Recommended)

Create deployment script: `deploy-staging.sh`

```bash
#!/bin/bash
# Deploy Frontend/TaskManager to Staging
# Usage: ./deploy-staging.sh

set -e

echo "🚀 Deploying to STAGING"
echo "======================="

# 1. Use staging environment
echo "📝 Configuring for staging..."
cp .env.staging .env

# 2. Build production bundle
echo "🔨 Building..."
./build-and-package.sh

# 3. Update health.json
echo "💚 Updating health check..."
cat > deploy-package/health.json << EOF
{
  "status": "ok",
  "service": "PrismQ Frontend/TaskManager",
  "version": "0.1.0-staging",
  "environment": "staging",
  "deployed_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "build": {
    "bundle_size_kb": 210,
    "gzipped_size_kb": 71,
    "build_date": "$(date +%Y-%m-%d)"
  },
  "checks": {
    "static_files": "ok",
    "spa_routing": "ok"
  }
}
EOF

# 4. Upload to staging
echo "📤 Uploading to staging..."
# Option A: Using SCP (if SSH available)
scp -r deploy-package/* user@server:/www/staging/

# Option B: Using rsync (faster for updates)
# rsync -avz --delete deploy-package/ user@server:/www/staging/

# Option C: Manual - use FTP client
# echo "Upload deploy-package/ to /www/staging/ via FTP"
# read -p "Press Enter when upload complete..."

# 5. Verify deployment
echo "✅ Verifying deployment..."
curl -f https://staging.your-domain.com/health.json || echo "⚠️ Health check failed"

echo ""
echo "✅ STAGING DEPLOYMENT COMPLETE!"
echo "URL: https://staging.your-domain.com"
echo "Health: https://staging.your-domain.com/health.html"
```

### Manual Deployment Steps

1. **Prepare Build:**
   ```bash
   cd Frontend/TaskManager
   cp .env.staging .env
   ./build-and-package.sh
   ```

2. **Upload via FTP:**
   - Open FileZilla
   - Connect to staging server
   - Navigate to `/www/staging/`
   - Upload `deploy-package/*`

3. **Configure:**
   - Open `https://staging.your-domain.com/deploy.php`
   - Run environment check
   - Complete setup wizard

4. **Verify:**
   - Open `https://staging.your-domain.com/`
   - Check health: `https://staging.your-domain.com/health.html`
   - Test functionality

---

## Testing & Validation

### Health Check Validation

```bash
# Check staging health
curl https://staging.your-domain.com/health.json

# Expected output:
# {"status":"ok","environment":"staging",...}

# Visual health check
# Open: https://staging.your-domain.com/health.html
# Should show all green checkmarks
```

### Functional Testing

**Test Checklist:**
- [ ] Homepage loads
- [ ] All routes accessible
- [ ] SPA routing works (refresh pages)
- [ ] API connection to staging backend
- [ ] Data loads correctly
- [ ] CRUD operations work
- [ ] Settings persist
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Performance acceptable

### Integration Testing

**Backend Integration:**
```bash
# Test API connectivity
curl https://staging.your-domain.com/
# Check browser console for API calls
# Verify data from staging backend

# Test specific endpoints
# - List tasks
# - View task detail
# - Claim task
# - Complete task
# - View workers
```

### Performance Testing

```bash
# Run Lighthouse on staging
npm run lighthouse -- https://staging.your-domain.com

# Expected scores:
# Performance: >80
# Accessibility: >90
# Best Practices: >90
# SEO: >80
```

### Security Testing

**Checklist:**
- [ ] HTTPS working (no mixed content)
- [ ] Security headers present
- [ ] No secrets exposed in client
- [ ] CORS configured correctly
- [ ] API authentication working
- [ ] XSS protection enabled

---

## Maintenance

### Regular Updates

**Frequency:** Multiple times daily during active development

**Process:**
1. Build with latest code
2. Upload to staging
3. Quick smoke test
4. Notify team of update

### Cleanup

**Weekly:**
- [ ] Remove old deployment archives
- [ ] Clear test data (if accumulated)
- [ ] Review and clean logs
- [ ] Update documentation

**Monthly:**
- [ ] Review staging vs production drift
- [ ] Update dependencies
- [ ] Security updates
- [ ] Performance audit

### Data Management

**Test Data:**
- Create realistic test scenarios
- Document test user accounts
- Reset data periodically
- Keep staging data separate from production

**Database (if applicable):**
- Staging backend should use staging database
- Periodic refresh from production (anonymized)
- Clear separation from production data

---

## Troubleshooting

### Issue: Staging Not Loading

**Check:**
```bash
# Verify deployment
ls -la /www/staging/

# Check health endpoint
curl -I https://staging.your-domain.com/health.json

# Check Apache logs
tail -f /var/log/apache2/error.log
```

**Solutions:**
1. Verify all files uploaded
2. Check .htaccess present
3. Verify mod_rewrite enabled
4. Check file permissions

### Issue: API Connection Failed

**Check:**
```bash
# Verify API URL in build
cat deploy-package/assets/index-*.js | grep -o "api-staging"

# Test API directly
curl https://api-staging.your-domain.com/health
```

**Solutions:**
1. Verify VITE_API_BASE_URL in .env.staging
2. Rebuild with correct environment
3. Check CORS on staging backend
4. Verify staging backend is running

### Issue: Subdirectory Routing Not Working

**Check:**
```bash
# Verify RewriteBase in .htaccess
cat /www/staging/.htaccess | grep RewriteBase

# Test routing
curl -I https://your-domain.com/staging/tasks
# Should return 200, not 404
```

**Solutions:**
1. Update RewriteBase in .htaccess
2. Verify Apache .htaccess support
3. Check mod_rewrite enabled
4. Test with simpler .htaccess first

---

## Access Control

### Team Access

**Who Should Have Access:**
- Development team (full access)
- QA team (testing access)
- Product owners (review access)
- Stakeholders (view access)

**How to Share:**
```
Staging URL: https://staging.your-domain.com
Health Check: https://staging.your-domain.com/health.html
Test Credentials: [if auth required]
```

### IP Whitelisting (Optional)

For additional security, restrict staging access:

```apache
# Add to .htaccess
<IfModule mod_authz_core.c>
  Require ip 123.45.67.89    # Office IP
  Require ip 98.76.54.32     # VPN IP
</IfModule>
```

---

## Best Practices

### Deployment
1. **Always test locally first** before deploying to staging
2. **Use automated scripts** to reduce manual errors
3. **Keep staging updated** with latest code
4. **Document changes** in each deployment

### Testing
1. **Test thoroughly** before promoting to production
2. **Include stakeholders** in staging reviews
3. **Run full test suite** on staging
4. **Test on actual devices** not just emulators

### Configuration
1. **Keep .env.staging** in version control (no secrets)
2. **Document environment differences**
3. **Maintain parity** with production where possible
4. **Version control .htaccess** modifications

### Communication
1. **Notify team** of staging deployments
2. **Share staging URL** with stakeholders
3. **Document test scenarios**
4. **Collect feedback** from staging users

---

## Quick Reference

### Environment Files

```bash
# Local development
.env.development  # Auto-used by Vite in dev mode

# Staging
.env.staging      # For staging builds

# Production
.env.production   # For production builds
```

### Deployment Commands

```bash
# Deploy to staging
./deploy-staging.sh

# Deploy to production
./deploy-production.sh

# Build only (manual upload)
./build-and-package.sh
```

### URLs

```
Staging App:     https://staging.your-domain.com
Health Check:    https://staging.your-domain.com/health.html
Deploy Wizard:   https://staging.your-domain.com/deploy.php
Staging API:     https://api-staging.your-domain.com
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-11-09  
**Maintained by:** Worker08 (DevOps & Deployment)  
**Next Review:** After first staging deployment
