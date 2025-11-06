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

### 3. Heroku (Classic PaaS)

**Why Heroku?**
- ✅ Well-established platform
- ✅ Simple deployment process
- ✅ Free tier available (with some limitations)
- ✅ Automatic deployments

**Setup Steps:**

1. **Create a Heroku account** at https://heroku.com

2. **Install Heroku CLI:**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Ubuntu
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

3. **Deploy using Heroku CLI:**
```bash
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-app-name

# Set stack to container (for Docker deployment)
heroku stack:set container

# Deploy
git push heroku main
```

4. **Or connect via GitHub:**
   - Go to Heroku Dashboard
   - Create New App
   - Connect to GitHub repository
   - Enable automatic deployments from `main` branch

**Auto-deploy Configuration:**
- ✅ Already configured in `heroku.yml`
- ✅ Uses Docker for consistent environments
- ✅ Automatic deploys when connected to GitHub

**Note:** Heroku's free tier has some limitations (sleeps after 30 mins of inactivity). Consider upgrading for production use.

---

### 4. Vercel (Frontend-Only)

**Why Vercel?**
- ✅ Optimized for frontend deployments
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Free tier available

**Important:** Vercel is best suited for deploying **only the frontend**. The backend would need to be hosted separately (e.g., Render, Railway, or your own server).

**Setup Steps:**

1. **Create a Vercel account** at https://vercel.com

2. **Connect via Vercel Dashboard:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will detect the `vercel.json` configuration
   - Configure the backend API URL in environment variables

3. **Set environment variable:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variable:
     - **Key:** `VITE_API_URL`
     - **Value:** URL of your backend (e.g., `https://your-backend.onrender.com`)
   - Save and redeploy
   
   **Note:** The `vercel.json` file references `@api_url` which is Vercel's secret reference syntax. You need to either:
   - Set `VITE_API_URL` directly in the dashboard (recommended), OR
   - Create a secret named `api_url` in Vercel and reference it with `@api_url`

**Auto-deploy Configuration:**
- ✅ Already configured in `vercel.json`
- ✅ Builds frontend only
- ✅ Automatic deploys on push to `main` branch

**Recommended Setup:**
- Frontend on Vercel
- Backend on Render.com or Railway.app

---

### 5. Linux Server (Automatic Deployment via SSH)

**Why Self-Hosted?**
- ✅ Full control over infrastructure
- ✅ No vendor lock-in
- ✅ Can be more cost-effective at scale
- ✅ Custom configurations possible

**Prerequisites:**
- A Linux server (Ubuntu/Debian recommended)
- Docker and Docker Compose installed
- SSH access to the server
- Git installed on the server

**Setup Steps:**

1. **Prepare your server:**
```bash
# SSH into your server
ssh user@your-server.com

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Clone the repository
cd /opt
sudo git clone https://github.com/Nomoos/PrismQ.Client.git
cd PrismQ.Client

# Set proper permissions
sudo chown -R $USER:$USER /opt/PrismQ.Client
```

2. **Configure GitHub Secrets for automatic deployment:**
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `SSH_PRIVATE_KEY` - Your SSH private key for the server
     - `SERVER_HOST` - Your server's hostname or IP address
     - `SERVER_USER` - SSH username (e.g., `ubuntu`, `root`)
     - `DEPLOY_PATH` - Path where app is deployed (e.g., `/opt/PrismQ.Client`)

3. **Generate SSH key for deployment:**
```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy
cat ~/.ssh/github_deploy.pub

# Copy the public key and add it to your server's authorized_keys
ssh user@your-server.com
echo "your-public-key-here" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Use the private key content for SSH_PRIVATE_KEY secret
cat ~/.ssh/github_deploy
```

4. **Test the deployment:**
   - Push to `main` branch
   - GitHub Actions will automatically:
     - Connect to your server via SSH
     - Pull latest code
     - Rebuild Docker containers
     - Restart the application
     - Run health checks

**Auto-deploy Configuration:**
- ✅ Already configured in `.github/workflows/deploy-linux-server.yml`
- ✅ Automatic SSH deployment on push to `main` branch
- ✅ Health check verification after deployment

**Server Configuration:**
```bash
# On your server, ensure the app starts on boot
cd /opt/PrismQ.Client
docker-compose up -d

# Configure reverse proxy (optional, recommended for production)
# Example with Nginx:
sudo apt-get install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/prismq

# Add:
# server {
#     listen 80;
#     server_name your-domain.com;
#     location / {
#         proxy_pass http://localhost:8000;
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#     }
# }

sudo ln -s /etc/nginx/sites-available/prismq /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### 6. Docker Deployment (Manual Self-Hosted)

**For your own server or cloud provider (AWS, GCP, Azure, etc.) without automatic deployment:**

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
| `heroku.yml` | Heroku deployment configuration (Docker-based) |
| `Procfile` | Heroku alternative (non-Docker) configuration |
| `vercel.json` | Vercel deployment configuration (frontend only) |
| `.github/workflows/ci-cd.yml` | GitHub Actions CI/CD pipeline |
| `.github/workflows/deploy-linux-server.yml` | Automatic SSH deployment to Linux server |

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
