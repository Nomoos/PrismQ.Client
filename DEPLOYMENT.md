# Deployment Guide

This guide explains how to automatically deploy PrismQ Client to various hosting platforms. The repository is now configured to automatically deploy whenever code is pushed to the `main` branch.

## 🚀 Supported Hosting Platforms

We've configured the repository to work with multiple hosting platforms. Choose the one that best fits your needs:

### 1. Render.com (Recommended - Free Tier Available)

**Why Render.com?**
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Supports Docker deployments
- ✅ Built-in health checks
- ✅ Persistent disk storage
- ✅ Easy environment variable management

**Setup Steps:**

1. **Create a Render account** at https://render.com

2. **Connect your GitHub repository:**
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub account
   - Select the `Nomoos/PrismQ.Client` repository
   - Render will automatically detect the `render.yaml` configuration

3. **Configure deployment:**
   - The `render.yaml` file is already configured
   - Render will automatically build using Docker
   - The service will deploy to the free tier by default

4. **Access your deployed application:**
   - Once deployed, Render will provide a URL (e.g., `https://prismq-client.onrender.com`)
   - The frontend will be accessible at the root URL
   - The API docs will be at `/docs`

**Auto-deploy Configuration:**
- ✅ Already configured in `render.yaml`
- ✅ Automatic deploys on push to `main` branch
- ✅ Health checks configured at `/api/health`

---

### 2. Railway.app (Alternative - Generous Free Tier)

**Why Railway.app?**
- ✅ $5/month free credit
- ✅ Very easy setup
- ✅ Automatic deployments
- ✅ Good developer experience

**Setup Steps:**

1. **Create a Railway account** at https://railway.app

2. **Deploy from GitHub:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `Nomoos/PrismQ.Client`
   - Railway will automatically detect the `railway.json` and `Dockerfile`

3. **Configure environment variables (if needed):**
   - Go to your project settings
   - Add any required environment variables

4. **Access your application:**
   - Railway will provide a URL
   - The application will be available at that URL

**Auto-deploy Configuration:**
- ✅ Already configured in `railway.json`
- ✅ Automatic deploys on push to `main` branch

---

### 3. Docker Deployment (Self-Hosted)

**For your own server or cloud provider (AWS, GCP, Azure, etc.):**

**Build and run locally:**
```bash
# Build the Docker image
docker build -t prismq-client .

# Run the container
docker run -d \
  -p 8000:8000 \
  -v $(pwd)/data:/app/data \
  --name prismq-client \
  prismq-client
```

**Or use Docker Compose:**
```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

**For production deployment:**
```bash
# Build and tag for your registry
docker build -t your-registry/prismq-client:latest .

# Push to your registry
docker push your-registry/prismq-client:latest

# Deploy on your server
docker pull your-registry/prismq-client:latest
docker run -d -p 8000:8000 -v /path/to/data:/app/data your-registry/prismq-client:latest
```

---

## 🔄 Continuous Integration/Continuous Deployment (CI/CD)

The repository includes a GitHub Actions workflow that automatically:

1. **Runs tests** on every push and pull request:
   - Backend tests (Python 3.10 and 3.11)
   - Frontend tests (Node.js 18 and 20)
   - Linting
   - Build validation

2. **Builds Docker image** to ensure deployment readiness

3. **Deploys automatically** when tests pass on the `main` branch:
   - Render.com or Railway will automatically deploy
   - No manual intervention required

**Workflow file:** `.github/workflows/ci-cd.yml`

**To view workflow status:**
- Go to the "Actions" tab in your GitHub repository
- View the latest workflow runs and their status

---

## 📋 Configuration Files

The following files have been added to enable automatic deployment:

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage Docker build configuration |
| `docker-compose.yml` | Local development and deployment orchestration |
| `.dockerignore` | Excludes unnecessary files from Docker image |
| `render.yaml` | Render.com deployment configuration |
| `railway.json` | Railway.app deployment configuration |
| `.github/workflows/ci-cd.yml` | GitHub Actions CI/CD pipeline |

---

## 🌍 Environment Variables

For production deployment, you may want to configure these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Runtime environment | `production` |
| `LOG_LEVEL` | Logging level | `info` |
| `PORT` | Server port | `8000` |
| `MAX_CONCURRENT_RUNS` | Max concurrent module runs | `5` |

**Setting environment variables:**

**Render.com:**
- Dashboard → Service → Environment → Add Variable

**Railway.app:**
- Project → Variables → Add Variable

**Docker:**
```bash
docker run -e ENVIRONMENT=production -e LOG_LEVEL=info ...
```

---

## 🔍 Health Checks

All hosting platforms are configured to use the health check endpoint:

**Endpoint:** `GET /api/health`

**Example response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime_seconds": 3600,
  "active_runs": 2,
  "total_modules": 10
}
```

---

## 🚦 Deployment Status

After pushing to the `main` branch:

1. **GitHub Actions** will run tests (visible in the Actions tab)
2. **Hosting platform** will automatically deploy if tests pass
3. **Deployment typically takes 3-5 minutes**

**Check deployment status:**
- **Render.com:** Dashboard → Service → Events
- **Railway.app:** Project → Deployments
- **GitHub Actions:** Repository → Actions tab

---

## 🐛 Troubleshooting

### Deployment fails on Render/Railway

**Check logs:**
- Render: Dashboard → Service → Logs
- Railway: Project → Deployments → View logs

**Common issues:**
1. **Build timeout:** Increase build timeout in platform settings
2. **Out of memory:** Upgrade to a paid tier with more resources
3. **Port binding:** Ensure the app uses the `PORT` environment variable

### Health check fails

**Verify the endpoint:**
```bash
curl https://your-app-url.com/api/health
```

**If it fails:**
1. Check if the application started correctly (view logs)
2. Verify the health check path is `/api/health`
3. Increase health check timeout in platform settings

### Static files not loading

**For Docker deployment:**
1. Ensure frontend was built: `cd Frontend && npm run build`
2. Verify static files exist in `Backend/static/`
3. Check Docker logs for static file serving messages

---

## 📚 Additional Resources

- [Render.com Documentation](https://render.com/docs)
- [Railway.app Documentation](https://docs.railway.app)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🎉 Quick Start (TL;DR)

**Want to deploy in under 5 minutes?**

1. **Choose a platform:** Render.com (recommended)
2. **Sign up** at https://render.com
3. **Connect your GitHub:** New + → Blueprint → Select this repo
4. **Done!** Render will automatically deploy from the `render.yaml` config

Every push to `main` will automatically deploy. That's it! 🚀
