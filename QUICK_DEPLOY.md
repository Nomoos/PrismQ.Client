# Quick Deployment Guide 🚀

This file provides a TL;DR version of the deployment setup. For full details, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## What's Been Set Up

Your repository is now configured for **automatic deployment** whenever you push to the `main` branch!

## Three Deployment Options

### Option 1: Render.com (Easiest - Recommended) ⭐

1. Go to https://render.com and sign up
2. Click "New +" → "Blueprint"
3. Connect your GitHub account
4. Select this repository (`Nomoos/PrismQ.Client`)
5. Click "Apply" - Done! 🎉

**What happens:** Render automatically detects `render.yaml` and deploys your full-stack app.

**Auto-deploy:** ✅ Enabled - Every push to `main` automatically deploys

**Cost:** FREE tier available

---

### Option 2: Railway.app (Also Easy)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Railway auto-detects configuration - Done! 🎉

**Auto-deploy:** ✅ Enabled - Every push to `main` automatically deploys

**Cost:** $5/month free credit

---

### Option 3: Docker (Self-Hosted)

```bash
# Build and run
docker build -t prismq-client .
docker run -d -p 8000:8000 prismq-client

# Or use docker-compose
docker-compose up -d
```

**Auto-deploy:** Manual (you build and deploy)

**Cost:** Your infrastructure costs

---

## What Gets Automatically Deployed

When you push to `main`:

1. ✅ **GitHub Actions runs tests**
   - Backend tests (Python)
   - Frontend tests (Node.js)
   - Docker build validation

2. ✅ **Platform auto-deploys** (Render/Railway)
   - Builds frontend (Vue 3)
   - Builds backend (FastAPI)
   - Combines them in one container
   - Deploys and starts serving

3. ✅ **Health checks verify deployment**
   - Endpoint: `/api/health`
   - Ensures app is running properly

---

## CI/CD Pipeline Status

View your pipeline status:
- **GitHub Actions:** Repository → Actions tab
- **Render.com:** Dashboard → Service → Events
- **Railway.app:** Project → Deployments

---

## Configuration Files Created

| File | Purpose |
|------|---------|
| `.github/workflows/ci-cd.yml` | Automated testing on every push |
| `render.yaml` | Render.com deployment config |
| `railway.json` | Railway.app deployment config |
| `Dockerfile` | Container build instructions |
| `docker-compose.yml` | Local development setup |
| `DEPLOYMENT.md` | Full deployment documentation |

---

## Testing Your Deployment

After deployment, your app will be available at:

**Render:** `https://your-service-name.onrender.com`
**Railway:** `https://your-app.railway.app`

Test these endpoints:
- `/` - Frontend UI
- `/api` - API info
- `/api/health` - Health check
- `/docs` - API documentation

---

## Need Help?

- 📚 **Full guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🏠 **Main README:** [README.md](./README.md)
- 🐛 **Issues?** Check the troubleshooting section in DEPLOYMENT.md

---

## Summary

**Push to main branch → Tests run automatically → Deploys automatically!** 

That's it! No manual deployment steps required. 🎉
