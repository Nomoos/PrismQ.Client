# Deployment Runbook - Frontend/TaskManager

**Document Type:** Operations Runbook  
**Last Updated:** 2025-11-09  
**Maintained by:** Worker08 (DevOps & Deployment)  
**Version:** 1.0.0

## Overview

This runbook provides step-by-step procedures for deploying Frontend/TaskManager to staging and production environments on Vedos/Wedos shared hosting.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Staging Deployment](#staging-deployment)
3. [Production Deployment](#production-deployment)
4. [Rollback Procedures](#rollback-procedures)
5. [Health Checks](#health-checks)
6. [Troubleshooting](#troubleshooting)
7. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

### Development Readiness

- [ ] All code changes committed and pushed to repository
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review completed and approved
- [ ] Security scan completed (CodeQL, no critical issues)
- [ ] Performance benchmarks met (bundle size <500KB, Lighthouse >90)
- [ ] Documentation updated
- [ ] Changelog updated with version notes

### Build Verification

- [ ] Local build successful: `npm run build`
- [ ] No TypeScript errors: `vue-tsc`
- [ ] No ESLint warnings
- [ ] Bundle size within limits (check build output)
- [ ] Source maps generated (if needed for debugging)

### Environment Configuration

- [ ] `.env` file configured for target environment
  - `VITE_API_BASE_URL` set correctly
  - `VITE_API_KEY` configured (if needed)
  - Other environment variables verified
- [ ] API backend is deployed and accessible
- [ ] CORS configured on backend (if needed)
- [ ] SSL certificate valid on target domain

### Access & Permissions

- [ ] FTP/SFTP credentials available
- [ ] SSH access available (if using automated deployment)
- [ ] Backup access to previous version
- [ ] Emergency rollback access confirmed

---

## Staging Deployment

### Purpose
Test deployment process and validate application in production-like environment before releasing to production users.

### Staging Environment Details

**URL:** `https://staging.your-domain.com` or subdirectory  
**Server:** Vedos/Wedos shared hosting  
**Web Root:** `/www/staging/` or `/public_html/staging/`  
**PHP Version:** 7.4+  
**Apache Modules:** mod_rewrite required

### Step-by-Step Procedure

#### Step 1: Prepare Build

```bash
# Navigate to project directory
cd Frontend/TaskManager

# Ensure environment is set to staging
cp .env.staging.example .env  # If using separate staging env file

# Verify configuration
cat .env | grep VITE_API_BASE_URL
# Should point to staging API: https://api-staging.your-domain.com

# Build production bundle
./build-and-package.sh

# Verify build output
ls -lh deploy-package/
# Should see: assets/, index.html, deploy scripts, .htaccess
```

**Expected Output:**
- Build completes in ~4-5 seconds
- Bundle size ~210KB (71KB gzipped)
- No TypeScript or build errors

#### Step 2: Upload to Staging

**Option A: FTP Upload (Recommended)**

```bash
# Using FileZilla or similar FTP client:
# 1. Connect to staging server
# 2. Navigate to /www/staging/
# 3. Upload contents of deploy-package/
# 4. Verify all files uploaded successfully
```

**Option B: Automated Upload (if SSH available)**

```bash
# SCP upload
scp -r deploy-package/* user@staging-server:/www/staging/

# Or use rsync for faster incremental updates
rsync -avz --delete deploy-package/ user@staging-server:/www/staging/
```

**Option C: Manual File Manager**
1. Compress deploy-package/ to ZIP
2. Login to Vedos control panel
3. Upload ZIP via File Manager
4. Extract in /www/staging/

#### Step 3: Configure Server

```bash
# Access deploy.php wizard
# Open: https://staging.your-domain.com/deploy.php

# Follow wizard steps:
# 1. Click "Run Environment Check"
#    - Verify PHP version ≥7.4
#    - Check write permissions
#    - Confirm .htaccess support
# 
# 2. Click "Proceed with Setup"
#    - Creates .htaccess from example
#    - Sets up SPA routing
#
# 3. Verify success message
```

#### Step 4: Health Check

Run comprehensive health checks:

```bash
# Test 1: Application loads
curl -I https://staging.your-domain.com/
# Expected: HTTP/2 200

# Test 2: index.html served
curl https://staging.your-domain.com/ | grep '<title>'
# Expected: <title>PrismQ TaskManager</title>

# Test 3: SPA routing works
curl -I https://staging.your-domain.com/tasks
# Expected: HTTP/2 200 (not 404)

# Test 4: Static assets load
curl -I https://staging.your-domain.com/assets/index-*.js
# Expected: HTTP/2 200

# Test 5: Health endpoint (if implemented)
curl https://staging.your-domain.com/health.json
# Expected: {"status":"ok","version":"0.1.0"}
```

#### Step 5: Manual Testing

1. **Basic Functionality**
   - [ ] Open https://staging.your-domain.com/
   - [ ] Verify home page loads
   - [ ] Check browser console (no errors)
   - [ ] Navigate to /tasks
   - [ ] Navigate to /workers
   - [ ] Navigate to /settings

2. **API Connection**
   - [ ] Go to Settings page
   - [ ] Verify API URL displayed correctly
   - [ ] Test API connection
   - [ ] Verify tasks load from backend

3. **Mobile Testing**
   - [ ] Open on mobile device (Redmi 24115RA8EG)
   - [ ] Test touch interactions
   - [ ] Verify responsive layout
   - [ ] Check performance (should be fast on 3G)

4. **Cross-Browser Testing**
   - [ ] Chrome/Edge (desktop & mobile)
   - [ ] Firefox
   - [ ] Safari (iOS)

#### Step 6: Cleanup

```bash
# Optional: Remove deployment scripts after successful deployment
# (Can be left for future updates)

# If removing:
rm https://staging.your-domain.com/deploy.php
rm https://staging.your-domain.com/deploy-deploy.php
rm https://staging.your-domain.com/deploy-auto.php
```

### Staging Acceptance Criteria

- [ ] Application accessible at staging URL
- [ ] All pages load without errors
- [ ] API connection working
- [ ] SPA routing functional (no 404 on refresh)
- [ ] Mobile responsive
- [ ] Performance acceptable (Lighthouse score >80)
- [ ] No console errors
- [ ] Matches expected functionality

### Staging Duration

Keep staging deployment live for **24-48 hours** minimum before production deployment to:
- Allow thorough testing
- Identify any edge cases
- Verify backend integration
- Get feedback from stakeholders

---

## Production Deployment

### Pre-Production Final Checks

- [ ] Staging deployment successful and tested
- [ ] All critical issues from staging resolved
- [ ] Performance validated on staging
- [ ] Backend production API ready
- [ ] Production `.env` configured
- [ ] Backup of current production version
- [ ] Rollback plan prepared
- [ ] Stakeholders notified of deployment window

### Production Environment Details

**URL:** `https://your-domain.com` or production path  
**Server:** Vedos/Wedos shared hosting  
**Web Root:** `/www/` or `/public_html/`  
**Downtime:** Expected <5 minutes  
**Rollback Time:** <2 minutes if needed

### Step-by-Step Procedure

#### Step 1: Backup Current Production

```bash
# Via FTP/File Manager:
# 1. Download current production files
# 2. Save to: backups/production-backup-YYYYMMDD/
# 3. Verify backup complete

# Via SSH (if available):
cd /www
tar -czf ~/backups/production-backup-$(date +%Y%m%d_%H%M%S).tar.gz *
```

#### Step 2: Prepare Production Build

```bash
# Use production environment variables
cp .env.production.example .env

# Verify production API URL
cat .env | grep VITE_API_BASE_URL
# Should point to: https://api.your-domain.com

# Build production bundle
./build-and-package.sh

# Verify bundle
ls -lh deploy-package/
```

#### Step 3: Deploy to Production

**Recommended: Off-Peak Hours**
- Best time: Late night or early morning
- Notify users in advance if possible
- Monitor during deployment

**Upload Process:**
```bash
# Same as staging, but to production path
# Via FTP: Upload to /www/
# Via SCP: scp -r deploy-package/* user@prod-server:/www/
```

#### Step 4: Configure & Verify

```bash
# Run deploy wizard
# Open: https://your-domain.com/deploy.php
# Follow steps 1-3 as in staging

# Run production health checks
curl -I https://your-domain.com/
# Expected: HTTP/2 200
```

#### Step 5: Smoke Testing

**Critical Path Testing (5 minutes):**
1. Open application
2. Verify home page
3. Check task list loads
4. Verify API connection
5. Test one complete workflow
6. Check mobile view

**If any issues:** Immediately rollback (see Rollback Procedures)

#### Step 6: Monitoring

**First 30 minutes:**
- Monitor server logs for errors
- Check browser console on multiple devices
- Monitor API backend logs
- Watch for user reports

**First 24 hours:**
- Check error rates
- Monitor performance metrics
- Gather user feedback
- Be ready for quick rollback

---

## Rollback Procedures

### When to Rollback

**Immediate Rollback Required:**
- Application not loading
- Critical functionality broken
- API connection completely failed
- Security vulnerability discovered
- Severe performance degradation

**Consider Rollback:**
- Non-critical features broken
- Minor performance issues
- Cosmetic bugs affecting UX
- User complaints about specific features

### Quick Rollback (2-5 minutes)

#### Method 1: Restore from Backup (Fastest)

```bash
# Via FTP:
# 1. Delete current deployment files
# 2. Upload backup files from backups/production-backup-YYYYMMDD/
# 3. Verify .htaccess in place
# 4. Test application loads

# Via SSH (if available):
cd /www
rm -rf *
tar -xzf ~/backups/production-backup-YYYYMMDD_HHMMSS.tar.gz
```

**Verification:**
```bash
curl -I https://your-domain.com/
# Should return 200

# Quick smoke test
# Open application in browser
# Verify basic functionality
```

#### Method 2: Re-deploy Previous Version

```bash
# If you have the previous deploy-package:
cd Frontend/TaskManager
./build-and-package.sh  # Using previous .env

# Upload previous build
# Same as deployment steps
```

### Post-Rollback

- [ ] Verify application working
- [ ] Notify stakeholders of rollback
- [ ] Document what went wrong
- [ ] Analyze root cause
- [ ] Fix issues in development
- [ ] Re-test in staging
- [ ] Plan new deployment

---

## Health Checks

### Automated Health Checks

Create `health.json` endpoint (static file in build):

```json
{
  "status": "ok",
  "version": "0.1.0",
  "deployed_at": "2025-11-09T12:00:00Z",
  "environment": "production"
}
```

**Monitoring:**
```bash
# Check health endpoint
curl https://your-domain.com/health.json

# Expected response:
# {"status":"ok","version":"0.1.0",...}
```

### Manual Health Checks

#### Level 1: Basic Availability
- [ ] Homepage loads (200 response)
- [ ] No 500 errors in logs
- [ ] Static assets load

#### Level 2: Functionality
- [ ] SPA routing works
- [ ] API connection successful
- [ ] Data loads from backend
- [ ] Navigation functional

#### Level 3: Performance
- [ ] Page load time <3s
- [ ] Time to interactive <5s
- [ ] No console errors
- [ ] Bundle size as expected

#### Level 4: Cross-Platform
- [ ] Works on desktop browsers
- [ ] Works on mobile browsers
- [ ] Touch interactions responsive
- [ ] Accessibility features working

---

## Troubleshooting

### Issue: Application Not Loading (Blank Page)

**Symptoms:** White screen, no content

**Diagnosis:**
```bash
# Check browser console
# Look for JavaScript errors

# Verify files uploaded
ls -la /www/  # Should see index.html, assets/

# Check .htaccess
cat /www/.htaccess  # Should exist and be correct
```

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Verify all files uploaded correctly
3. Check file permissions (644 for files, 755 for directories)
4. Verify .htaccess uploaded and not corrupted

### Issue: 404 on Page Refresh

**Symptoms:** Direct URLs fail, only homepage works

**Diagnosis:**
```bash
# Test SPA routing
curl -I https://your-domain.com/tasks
# If 404, routing not working
```

**Solutions:**
1. Verify .htaccess exists
2. Check mod_rewrite enabled on server
3. Verify Apache supports .htaccess
4. Check RewriteBase in .htaccess matches deployment path

### Issue: API Connection Failed

**Symptoms:** "Failed to connect" errors, no data loading

**Diagnosis:**
```bash
# Check API URL in browser network tab
# Verify CORS headers
curl -I https://api.your-domain.com/api/tasks
```

**Solutions:**
1. Verify VITE_API_BASE_URL correct in .env
2. Rebuild with correct environment variables
3. Check backend API is running
4. Verify CORS configured on backend
5. Check network connectivity

### Issue: Assets Not Loading (404)

**Symptoms:** Broken styles, JavaScript not executing

**Diagnosis:**
```bash
# Check assets directory
ls -la /www/assets/

# Test asset URL
curl -I https://your-domain.com/assets/index-xxx.js
```

**Solutions:**
1. Verify assets/ directory uploaded
2. Check asset file names match (with hash)
3. Verify file permissions
4. Check base URL configuration in Vite

---

## Post-Deployment

### Immediate (First Hour)

- [ ] Verify application accessible
- [ ] Monitor server logs
- [ ] Check error reporting (if configured)
- [ ] Test critical user workflows
- [ ] Monitor API backend
- [ ] Respond to any user reports

### First 24 Hours

- [ ] Review analytics/metrics
- [ ] Check performance monitoring
- [ ] Gather user feedback
- [ ] Monitor error rates
- [ ] Document any issues found

### First Week

- [ ] Performance analysis
- [ ] User feedback review
- [ ] Plan next iteration
- [ ] Document lessons learned
- [ ] Update runbook if needed

### Cleanup

- [ ] Remove old deployment scripts (optional)
- [ ] Archive deployment logs
- [ ] Update documentation
- [ ] Remove old backups (keep recent 3-5)

---

## Deployment Schedule

### Recommended Cadence

- **Hotfixes:** As needed (with expedited testing)
- **Minor Updates:** Weekly or bi-weekly
- **Major Releases:** Monthly or quarterly
- **Staging:** Continuous (any commit)

### Deployment Windows

**Production:**
- **Preferred:** Tuesday-Thursday, 2-4 AM local time
- **Avoid:** Fridays (no weekend support), Mondays (users expect stable start)
- **Emergency:** Anytime (with proper approval)

**Staging:**
- Anytime during business hours
- Automated if possible

---

## Emergency Contacts

**Deployment Issues:**
- Primary: Worker08 (DevOps)
- Backup: Worker01 (Project Manager)

**Backend API Issues:**
- Backend Team Lead
- API on-call engineer

**Hosting/Infrastructure:**
- Vedos/Wedos Support
- Support ticket: [link]
- Emergency: [phone]

---

## Appendix

### A. File Checklist

**Must Be Deployed:**
- [ ] index.html
- [ ] assets/ (all files)
- [ ] .htaccess
- [ ] favicon.ico (if exists)

**Optional:**
- [ ] deploy.php (for future updates)
- [ ] deploy-deploy.php
- [ ] deploy-auto.php
- [ ] health.json

### B. Environment Variables Reference

```bash
# Required
VITE_API_BASE_URL=https://api.your-domain.com

# Optional
VITE_APP_ENV=production
VITE_API_KEY=your-api-key
VITE_ENABLE_ANALYTICS=true
```

### C. Server Requirements

- Apache 2.4+ or Nginx 1.18+
- PHP 7.4+ (for deployment scripts only)
- mod_rewrite (Apache)
- HTTPS/SSL certificate
- Minimum 20MB storage
- Outbound HTTPS allowed (for API calls)

---

**Document Version:** 1.0.0  
**Last Reviewed:** 2025-11-09  
**Next Review:** After first production deployment  
**Maintained by:** Worker08 (DevOps & Deployment)
