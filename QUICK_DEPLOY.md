# Quick Deployment Guide 🚀

This file provides a TL;DR version of the deployment setup. For full details, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## What's Been Set Up

Your repository is now configured for **automatic deployment** whenever you push to the `main` branch!

## Six Deployment Options

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

### Option 3: Heroku (Classic PaaS)

1. Go to https://heroku.com and sign up
2. Install Heroku CLI
3. Run: `heroku create your-app-name`
4. Run: `heroku stack:set container`
5. Run: `git push heroku main` - Done! 🎉

**Or connect via GitHub:**
- Dashboard → New App → Connect to GitHub → Enable auto-deploy

**Auto-deploy:** ✅ Enabled with GitHub integration

**Cost:** FREE tier (sleeps after 30 mins inactivity)

---

### Option 4: Vercel (Frontend Only)

**Note:** Vercel deploys frontend only. Backend needs separate hosting (Render/Railway).

1. Go to https://vercel.com and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Set environment variable: `VITE_API_URL` = your backend URL
5. Deploy! 🎉

**Auto-deploy:** ✅ Enabled - Frontend only

**Cost:** FREE tier available

**Recommended:** Frontend on Vercel + Backend on Render

---

### Option 5: Linux Server (Automatic via SSH)

1. **Setup server:**
```bash
ssh user@your-server.com
sudo apt install docker docker-compose git
cd /opt && git clone https://github.com/Nomoos/PrismQ.Client.git
```

2. **Configure GitHub secrets:**
   - `SSH_PRIVATE_KEY` - Your SSH key
   - `SERVER_HOST` - Server IP/hostname
   - `SERVER_USER` - SSH username
   - `DEPLOY_PATH` - `/opt/PrismQ.Client`

3. **Done!** Push to `main` and GitHub Actions deploys automatically 🎉

**Auto-deploy:** ✅ Enabled via GitHub Actions

**Cost:** Your server costs

---

### Option 6: Docker (Manual Self-Hosted)

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
