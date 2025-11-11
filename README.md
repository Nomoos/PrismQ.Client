# PrismQ Web Client

Local web control panel for running PrismQ data collection modules.

## ✨ Highlights

- **Module discovery** - Automatic detection of available PrismQ modules
- **Web interface** - Vue 3 frontend with FastAPI backend
- **Real-time monitoring** - Live log streaming and status updates
- **Parameter configuration** - Form-based module configuration with persistence
- **Concurrent execution** - Run multiple modules simultaneously
- **On-demand architecture** - All operations triggered by UI requests (no autonomous background tasks)
- **296 tests** - Comprehensive test coverage (195 backend + 101 frontend)

## 🚀 Quick Start

**Windows (One-click launcher):**
```cmd
_meta\_scripts\run_both.bat
```

**Manual start:**
```bash
# Backend (Terminal 1)
cd Backend && uvicorn src.main:app --reload

# Frontend (Terminal 2)  
cd Frontend && npm run dev

# Open http://localhost:5173
```

## 📚 Documentation

### Getting Started
- **[Setup Guide](./_meta/docs/SETUP.md)** - Installation and configuration
- **[User Guide](./_meta/docs/USER_GUIDE.md)** - How to use the web client
- **[Node.js Installation](./_meta/docs/NODEJS_INSTALLATION.md)** - Node.js setup instructions
- **[Troubleshooting](./_meta/docs/TROUBLESHOOTING.md)** - Common issues and solutions

### Architecture & Design
- **[On-Demand Architecture](./_meta/docs/ONDEMAND_ARCHITECTURE.md)** - Client architecture principles
- **[System Architecture](./_meta/docs/ARCHITECTURE.md)** - Complete system design
- **[API Reference](./Backend/TaskManager/_meta/docs/api/API_REFERENCE.md)** - REST API documentation
- **[Integration Guide](./_meta/docs/INTEGRATION_GUIDE.md)** - Integration with PrismQ modules

### Development
- **[Development Guide](./_meta/docs/DEVELOPMENT.md)** - Contributing guide
- **[Testing Guide](./_meta/docs/TESTING.md)** - Test coverage and commands
- **[Configuration](./_meta/docs/CONFIGURATION.md)** - Configuration options
- **[Modules Guide](./_meta/docs/MODULES.md)** - How to add new modules

### Operations & Deployment
- **[Release Management Guide](./_meta/docs/RELEASE.md)** - Version control and release process
- **[Deployment Checklist](./_meta/docs/DEPLOYMENT_CHECKLIST.md)** - Production deployment procedures
- **[Changelog](./_meta/docs/CHANGELOG.md)** - Version history and changes
- **[Data Directory Rationale](./_meta/docs/DATA_DIRECTORY_RATIONALE.md)** - Data storage design decisions
- **[Security Fixes](./_meta/docs/SECURITY_FIXES.md)** - Security updates and patches

### Worker Implementation
- **[Worker Implementation Plan](./_meta/docs/WORKER_IMPLEMENTATION_PLAN.md)** - Strategic implementation plan
- **[Worker Implementation Guidelines](./_meta/docs/WORKER_IMPLEMENTATION_GUIDELINES.md)** - Best practices and patterns
- **[Worker Examples](./_meta/examples/workers/README.md)** - Production-ready worker examples (Python, PHP)
- **[Worker Integration Guide](./_meta/examples/workers/INTEGRATION_GUIDE.md)** - Complete integration documentation
**→ [Complete Documentation Index](./_meta/docs/README.md)** - Full documentation organized by role and purpose

### Quick Navigation

#### 🚀 [Getting Started](./_meta/docs/getting-started/README.md)
New users start here for installation and setup
- [Setup Guide](./_meta/docs/getting-started/SETUP.md)
- [User Guide](./_meta/docs/getting-started/USER_GUIDE.md)
- [Node.js Installation](./_meta/docs/getting-started/NODEJS_INSTALLATION.md)
- [Troubleshooting](./_meta/docs/getting-started/TROUBLESHOOTING.md)

#### 👨‍💻 [Development](./_meta/docs/development/README.md)
Developers and contributors
- [Development Guide](./_meta/docs/development/DEVELOPMENT.md)
- [Testing Guide](./_meta/docs/development/TESTING.md)
- [Configuration](./_meta/docs/development/CONFIGURATION.md)
- [Worker Implementation](./_meta/docs/development/WORKER_IMPLEMENTATION_GUIDELINES.md)

#### 🏗️ [Architecture](./_meta/docs/architecture/README.md)
System design and technical decisions
- [Architecture Overview](./_meta/docs/architecture/ARCHITECTURE.md)
- [On-Demand Architecture](./_meta/docs/architecture/ONDEMAND_ARCHITECTURE.md)
- [Integration Guide](./_meta/docs/architecture/INTEGRATION_GUIDE.md)

#### 🚀 [Operations](./_meta/docs/operations/README.md)
Deployment and release management
- [Deployment Checklist](./_meta/docs/operations/DEPLOYMENT_CHECKLIST.md)
- [Release Management](./_meta/docs/operations/RELEASE.md)
- [Security Fixes](./_meta/docs/operations/SECURITY_FIXES.md)
- [Changelog](./_meta/docs/operations/CHANGELOG.md)

### Additional Resources
- **[Worker Examples](./_meta/examples/workers/README.md)** - Production-ready implementations
- **[Documentation Templates](./_meta/templates/README.md)** - Standard templates
- **[Testing Documentation](./_meta/tests/TESTING_GUIDE.md)** - Test suite guide

## 🔗 Related

- [Main Repository](../) - PrismQ.IdeaInspiration overview
- [Backend](./Backend/) - FastAPI REST API
- [Frontend](./Frontend/) - Vue 3 web UI
- [TaskManager](./Backend/TaskManager/) - Task queue system

## 📄 License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ
