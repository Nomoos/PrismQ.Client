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

```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

### Deploy to Vedos/Wedos

```bash
# 1. Build locally
npm run build

# 2. Upload deploy-deploy.php to your server
# (Located at public root, e.g., /www/taskmanager/)

# 3. Access via browser
https://your-domain.com/taskmanager/deploy-deploy.php

# 4. Follow the deployment wizard
# - Downloads deploy.php
# - Uploads dist/ files
# - Configures .htaccess
# - Validates installation
```

## 📁 Project Structure

```
Frontend/TaskManager/
├── src/                          # Application source
│   ├── main.ts                   # Entry point
│   ├── App.vue                   # Root component
│   ├── router/                   # Vue Router configuration
│   │   └── index.ts
│   ├── stores/                   # Pinia state management
│   │   ├── tasks.ts              # Task store
│   │   ├── workers.ts            # Worker store
│   │   └── auth.ts               # Authentication store
│   ├── services/                 # API services
│   │   ├── api.ts                # API client
│   │   ├── taskService.ts        # Task operations
│   │   └── workerService.ts      # Worker operations
│   ├── components/               # Vue components
│   │   ├── base/                 # Base components
│   │   ├── tasks/                # Task components
│   │   └── workers/              # Worker components
│   ├── views/                    # Page views
│   │   ├── TaskList.vue
│   │   ├── TaskDetail.vue
│   │   ├── WorkerDashboard.vue
│   │   └── Settings.vue
│   ├── composables/              # Reusable composables
│   ├── types/                    # TypeScript types
│   └── assets/                   # Static assets
├── public/                       # Public static files
│   ├── deploy-deploy.php         # Deployment loader
│   └── .htaccess.example         # Apache SPA routing
├── tests/                        # Test files
│   ├── unit/                     # Unit tests (Vitest)
│   └── e2e/                      # E2E tests (Playwright)
├── _meta/                        # Project metadata
│   ├── docs/                     # Documentation
│   ├── issues/                   # Issue tracking
│   │   ├── new/                  # Unassigned issues
│   │   ├── wip/                  # In progress
│   │   └── done/                 # Completed
│   ├── PROJECT_PLAN.md           # Project roadmap
│   ├── PARALLELIZATION_MATRIX.md # Worker coordination
│   └── BLOCKERS.md               # Blocker tracking
├── package.json                  # Dependencies
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS config
└── README.md                     # This file
```

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

### User Documentation
- **[User Guide](./_meta/docs/USER_GUIDE.md)** ✅ - Complete guide for end users
- **[Troubleshooting](./_meta/docs/TROUBLESHOOTING.md)** ✅ - Common issues and solutions

### Developer Documentation
- **[Developer Guide](./_meta/docs/DEVELOPER_GUIDE.md)** ✅ - Development setup and best practices
- **[API Integration Guide](./_meta/docs/API_INTEGRATION.md)** ✅ - Backend API integration
- **[Component Library](./_meta/docs/COMPONENT_LIBRARY.md)** ✅ - Component documentation
- **[Performance Guide](./_meta/docs/PERFORMANCE_GUIDE.md)** ✅ - Performance optimization
- **[Contributing Guide](./_meta/docs/CONTRIBUTING.md)** ✅ - How to contribute

### Deployment Documentation
- **[Deployment Guide](./_meta/docs/DEPLOYMENT_GUIDE.md)** ✅ - Step-by-step deployment to Vedos/Wedos

### Planning & Architecture
- **[Project Plan](./_meta/PROJECT_PLAN.md)** - Comprehensive project roadmap
- **[Parallelization Matrix](./_meta/PARALLELIZATION_MATRIX.md)** - Worker coordination strategy
- **[Blockers Tracking](./_meta/BLOCKERS.md)** - Current blockers and risks

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

## 👥 Team & Workers

### Worker Assignments

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

**Current Phase**: Planning (Phase 1)  
**Progress**: 5% (Structure created, planning in progress)  
**Timeline**: 2-3 weeks estimated  
**Blockers**: 4 active (see BLOCKERS.md)

### Completion Status

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Foundation | 🟢 IN PROGRESS | 25% |
| Phase 2: Development | 🔴 NOT STARTED | 0% |
| Phase 3: Testing | 🔴 NOT STARTED | 0% |
| Phase 4: Deployment | 🔴 NOT STARTED | 0% |

## 🔗 Related Projects

- **[Backend/TaskManager](../../Backend/TaskManager/)** - REST API backend
- **[Backend/TaskManager API Docs](../../Backend/TaskManager/public/)** - OpenAPI/Swagger
- **[Main Client](../../)** - PrismQ.Client overview

## 📝 License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ

---

**Created By**: Worker01 (Project Manager)  
**Date**: 2025-11-09  
**Status**: 🟢 IN PLANNING  
**Production Readiness**: 0/10 (Planning Phase)
