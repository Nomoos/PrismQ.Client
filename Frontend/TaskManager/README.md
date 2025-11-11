# Frontend/TaskManager - Mobile-First UI

A lightweight, mobile-first web interface for the Backend/TaskManager system, optimized for Vedos/Wedos shared hosting deployment.

## 🎯 Overview

Frontend/TaskManager provides a modern Vue 3-based UI that connects to the Backend/TaskManager REST API, enabling task management through a mobile-optimized web interface.

### Key Features

- 📱 **Mobile-First** - Optimized for Redmi 24115RA8EG (6.7" AMOLED)
- 🚀 **High Performance** - < 3s load on 3G, < 500KB bundle
- 🌐 **Simple Deployment** - Static files + PHP scripts, no Node.js on server
- 🔄 **Real-Time Updates** - Live task status monitoring
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🎨 **Modern UI** - Vue 3 + TypeScript + Tailwind CSS

## 📋 Requirements

**Development**:
- Node.js 18+ or higher
- npm package manager

**Production (Server)**:
- Apache web server with mod_rewrite
- PHP 7.4+ (for deployment scripts only)
- Backend/TaskManager API running

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Backend/TaskManager API URL

# Run development server
npm run dev
# Available at http://localhost:5173
```

### Build for Production

**Automated Build & Package (Recommended):**

```bash
# Linux/Mac - Creates ready-to-upload package
./build-and-package.sh

# Windows - Creates ready-to-upload package
build-and-package.bat

# Clean rebuild
./build-and-package.sh --clean
```

This creates:
- `deploy-package/` - Ready-to-upload directory with all files
- `deploy-package-YYYYMMDD_HHMMSS.tar.gz` - Archive for easy transfer
- `deploy-package-YYYYMMDD_HHMMSS.zip` - Windows-compatible archive
- `deploy-package-latest.tar.gz` - Symlink to latest build

**Manual Build:**

```bash
# Build static files only
npm run build

# Preview production build
npm run preview
```

### Deploy to Vedos/Wedos

**Method 1: FTP Upload (Easiest)**

```bash
# 1. Build package
./build-and-package.sh

# 2. Upload deploy-package/ contents via FTP/FileZilla
#    to your web root (e.g., /www/ or /public_html/)

# 3. Open in browser
https://your-domain.com/deploy.php

# 4. Follow wizard to configure .htaccess
```

**Method 2: Automated CLI (If you have SSH access)**

```bash
# On local machine
./build-and-package.sh
scp deploy-package-latest.tar.gz user@server:/path/to/web/

# On server via SSH
cd /path/to/web
php deploy-auto.php --source=deploy-package-latest.tar.gz
```

**Method 3: Legacy deploy-deploy.php**

```bash
# 1. Build locally
npm run build

# 2. Upload deploy-deploy.php to your server
# (Located at public root, e.g., /www/taskmanager/)

# 3. Access via browser
https://your-domain.com/taskmanager/deploy-deploy.php

# 4. Follow the deployment wizard
```

## 📁 Project Structure

```
Frontend/TaskManager/
├── src/                          # Application source code
│   ├── main.ts                   # Entry point
│   ├── App.vue                   # Root component
│   ├── router/                   # Vue Router configuration
│   ├── stores/                   # Pinia state management
│   ├── services/                 # API services
│   ├── components/               # Vue components
│   ├── views/                    # Page views
│   ├── composables/              # Reusable composables
│   ├── types/                    # TypeScript types
│   └── assets/                   # Static assets
├── public/                       # Public static files
│   ├── deploy-deploy.php         # Deployment loader
│   └── .htaccess.example         # Apache SPA routing
├── tests/                        # Test files
│   ├── unit/                     # Unit tests (Vitest)
│   └── e2e/                      # E2E tests (Playwright)
├── _meta/                        # Project metadata (not deployed)
│   ├── README.md                 # _meta organization guide
│   ├── docs/                     # All project documentation
│   ├── scripts/                  # Development scripts
│   ├── examples/                 # Code examples and templates
│   ├── issues/                   # Issue tracking
│   └── baselines/                # Performance baselines
├── package.json                  # Dependencies
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS config
├── build-and-package.sh          # Production build script
├── deploy.php                    # Server deployment script
└── README.md                     # This file (you are here)
```

**Note**: See [`_meta/README.md`](./_meta/README.md) for detailed information about project metadata organization.

## 🛠️ Technology Stack

- **Framework**: Vue 3.4+ (Composition API)
- **Language**: TypeScript 5.0+ (strict mode)
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.4+ (mobile-first utilities)
- **State Management**: Pinia 2.1+
- **Router**: Vue Router 4.2+
- **HTTP Client**: Axios
- **Testing**: Vitest (unit) + Playwright (E2E)

## 🎨 Mobile-First Design

### Target Device: Redmi 24115RA8EG
- **Display**: 6.7" AMOLED, 2712x1220 (1.5K)
- **Viewport**: 360-428px (CSS pixels)
- **Touch Targets**: 44x44px minimum
- **Performance**: < 3s initial load on 3G
- **Bundle Size**: < 500KB initial JavaScript

### Performance Targets
- **Initial Load**: < 3s on 3G
- **Time to Interactive**: < 5s
- **First Contentful Paint**: < 2s
- **Lighthouse Score**: > 90

## 🔗 Backend Integration

### API Connection
```typescript
// Configure in .env
VITE_API_BASE_URL=https://api.prismq.nomoos.cz/api
VITE_API_KEY=your-api-key
```

### Available Endpoints
- `GET /health` - Health check
- `POST /task-types/register` - Register task type
- `GET /task-types` - List task types
- `POST /tasks` - Create task
- `GET /tasks` - List tasks
- `POST /tasks/claim` - Claim task
- `POST /tasks/:id/complete` - Complete task
- `POST /tasks/:id/progress` - Update progress

## 📚 Documentation

**Quick Links**:
- 📖 **[_meta Organization Guide](./_meta/README.md)** - Complete guide to project metadata
- 📝 **[Project Status](./_meta/docs/NEXT_STEPS.md)** - Current status and next steps
- 🇨🇿 **[Czech Summary](./_meta/docs/CZECH_SUMMARY.md)** - Český souhrn projektu

### For Users
- **[User Guide](./_meta/docs/USER_GUIDE.md)** - Complete guide for end users (coming soon)
- **[Troubleshooting](./_meta/docs/TROUBLESHOOTING.md)** - Common issues and solutions (coming soon)

### For Developers
- **[API Integration](./_meta/docs/API_INTEGRATION.md)** - Backend API integration guide
- **[Performance Guide](./_meta/docs/PERFORMANCE.md)** - Performance optimization
- **[Security Guide](./_meta/docs/SECURITY.md)** - Security best practices
- **[Testing Guide](./_meta/docs/TESTING.md)** - Testing strategy and guidelines
- **[Accessibility Guide](./_meta/docs/ACCESSIBILITY_GUIDE.md)** - WCAG 2.1 AA compliance

### For Deployment
- **[Deployment Guide](./_meta/docs/DEPLOYMENT.md)** - Complete deployment instructions
- **[Deployment Runbook](./_meta/docs/DEPLOYMENT_RUNBOOK.md)** - Operational procedures
- **[Rollback Procedures](./_meta/docs/ROLLBACK_PROCEDURES.md)** - Emergency rollback guide
- **[Quick Deploy Reference](./_meta/docs/QUICK_DEPLOYMENT_REFERENCE.md)** - Fast deployment

### Project Management
- **[Issue Index](./_meta/issues/INDEX.md)** - All project issues and tracking
- **[Parallelization Matrix](./_meta/docs/PARALLELIZATION_MATRIX.md)** - Worker coordination

**All Documentation**: See [`_meta/docs/`](./_meta/docs/) for the complete collection (30+ documents).

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

### Test Coverage Targets
- **Unit Tests**: > 80% coverage
- **Component Tests**: All major components
- **E2E Tests**: Critical user flows
- **Mobile Tests**: All views on mobile viewport

## 🚀 Deployment

### Automated Deployment (Recommended)

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Upload deploy-deploy.php**:
   - Upload to your server root (e.g., `/www/taskmanager/`)

3. **Access deployment wizard**:
   ```
   https://your-domain.com/taskmanager/deploy-deploy.php
   ```

4. **Follow the wizard**:
   - Downloads latest deploy.php
   - Uploads dist/ files
   - Configures .htaccess for SPA routing
   - Sets environment variables
   - Validates installation

### Manual Deployment

1. Build: `npm run build`
2. Upload `dist/` contents to server
3. Copy `.htaccess.example` to `.htaccess` and configure
4. Set API base URL in environment
5. Test: `https://your-domain.com/taskmanager/`

## 👥 Team & Coordination

See [`_meta/issues/INDEX.md`](./_meta/issues/INDEX.md) for complete worker assignments and issue tracking.

### Workers
- **Worker01**: Project Manager & Planning
- **Worker02**: API Integration Expert
- **Worker03**: Vue.js/TypeScript Expert
- **Worker04**: Mobile Performance Specialist
- **Worker06**: Documentation Specialist
- **Worker07**: Testing & QA Specialist
- **Worker08**: DevOps & Deployment Specialist
- **Worker10**: Senior Review Master
- **Worker11**: UX Design Specialist
- **Worker12**: UX Review & Testing

## 📊 Project Status

**Current Phase**: Production Ready - MVP Complete  
**Progress**: 100% (All 15 issues complete)  
**Production Approval**: ✅ 8.7/10 (Worker10 & Worker12)

**See**: [`_meta/docs/NEXT_STEPS.md`](./_meta/docs/NEXT_STEPS.md) for detailed status and roadmap.

### Quick Stats

| Metric | Status |
|--------|--------|
| TypeScript Errors | ✅ 0 errors (strict mode) |
| Test Coverage | ✅ 627 tests (97% pass rate) |
| Bundle Size | ✅ 236KB (target: <500KB) |
| Lighthouse Score | ✅ 99-100/100 |
| Accessibility | ✅ WCAG 2.1 AA compliant |
| Load Time (3G) | ✅ 1.5-2.1s (target: <3s) |

## 🔗 Related Projects

- **[Backend/TaskManager](../../Backend/TaskManager/)** - REST API backend
- **[Backend/TaskManager API Docs](../../Backend/TaskManager/public/)** - OpenAPI/Swagger
- **[Main Client](../../)** - PrismQ.Client overview

## 📝 License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ

---

**Created By**: Worker01 (Project Manager)  
**Production Ready**: ✅ YES  
**Production Approval**: 8.7/10 (Worker10 & Worker12)  
**Last Updated**: 2025-11-11

## 📖 Additional Resources

### Navigation
- 📁 **[Project Metadata](./_meta/README.md)** - Complete _meta organization
- 📝 **[Project Status](./_meta/docs/NEXT_STEPS.md)** - Current status and roadmap
- 🔍 **[Issue Tracking](./_meta/issues/INDEX.md)** - All issues and progress
- 📚 **[All Documentation](./_meta/docs/)** - 30+ comprehensive documents

### Quick Access
- **Getting Started**: This README (Quick Start section above)
- **Development**: See "Quick Start" and "Technology Stack" sections
- **Deployment**: See "Deploy to Vedos/Wedos" section above
- **Testing**: `npm test` and [`_meta/docs/TESTING.md`](./_meta/docs/TESTING.md)
- **Performance**: [`_meta/docs/PERFORMANCE.md`](./_meta/docs/PERFORMANCE.md)

---

**License**: Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ
