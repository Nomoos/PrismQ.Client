# TaskManager Meta-Information

This directory contains all meta-information about the TaskManager project: documentation, examples, tests, and issue tracking.

## 🚀 Quick Start

- **New to TaskManager?** → [Quick Start Deployment](docs/deployment/QUICK_START_DEPLOY.md)
- **Need API docs?** → [API Reference](docs/api/API_REFERENCE.md) or [Swagger UI](docs/api/SWAGGER_DEPLOYMENT_INFO.md)
- **Want to understand the architecture?** → [Data-Driven Architecture](docs/architecture/DATA_DRIVEN_ARCHITECTURE.md)

## 📚 Documentation

**[Complete Documentation Index](docs/README.md)**

Documentation is organized by purpose and audience:

- **[Architecture](docs/architecture/)** - System design and data-driven architecture
- **[API Reference](docs/api/)** - REST API documentation and OpenAPI/Swagger
- **[Deployment](docs/deployment/)** - Deployment guides and operations
- **[Development](docs/development/)** - Developer guides and tools
- **[Security](docs/security/)** - Security guidelines and best practices
- **[Planning Archive](docs/planning/)** - Historical planning documents

## 📂 Directory Structure

```
_meta/
├── README.md           # This navigation file
├── docs/               # All documentation (organized by category)
│   ├── architecture/   # Architecture & design
│   ├── api/           # API reference
│   ├── deployment/    # Deployment & operations
│   ├── development/   # Developer guides
│   ├── security/      # Security documentation
│   └── planning/      # Planning archive (historical)
├── examples/          # Code examples
├── issues/            # Issue tracking
│   └── INDEX.md       # Issue status and tracking
└── tests/             # Test suite and documentation
    └── README.md      # Test documentation
```

## 🎯 Find What You Need

### For First-Time Users
1. [Quick Start Guide](docs/deployment/QUICK_START_DEPLOY.md) - Get started quickly
2. [API Reference](docs/api/API_REFERENCE.md) - Learn the API
3. [Examples](examples/) - See code examples

### For Developers
1. [Architecture Overview](docs/architecture/DATA_DRIVEN_ARCHITECTURE.md) - Understand the design
2. [Development Guide](docs/development/) - Development tools and guides
3. [API Examples](docs/api/ENDPOINT_EXAMPLES.md) - Practical examples
4. [Test Suite](tests/) - Run and write tests

### For Operations/DevOps
1. [Deployment Guide](docs/deployment/DEPLOYMENT_GUIDE.md) - Full deployment instructions
2. [Environment Setup](docs/deployment/CHECK_SETUP_GUIDE.md) - Validate your environment
3. [Monitoring](docs/deployment/PRODUCTION_OPTIMIZATION_GUIDE.md) - Performance optimization

### For Security Review
1. [Security Guidelines](docs/security/SECURITY.md) - Security best practices
2. [Security Hardening](docs/security/SECURITY_HARDENING_SUMMARY.md) - Implementation details

## 📋 Project Status

- **[Issue Tracking](issues/INDEX.md)** - Current project status and completed work
- **Production Readiness**: 9.5/10 (Fully production ready)
- **Test Coverage**: 92% (35 tests, all passing)

## 🏗️ Organization Principles

This directory structure follows SOLID principles:

- **Single Responsibility**: Each directory/file has one clear purpose
- **Open/Closed**: Easy to add new docs without restructuring
- **Interface Segregation**: Organized by audience (developers, ops, security)
- **Clear Navigation**: README files provide context and guidance

See [Organization Review](ORGANIZATION_REVIEW.md) for details on the reorganization.
