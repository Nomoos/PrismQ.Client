# Development Documentation

Technical documentation for developers contributing to or extending PrismQ Client.

## 📚 Core Documentation

### Getting Started with Development
- **[Development Guide](DEVELOPMENT.md)** - Contributing guide and development setup
- **[Testing Guide](TESTING.md)** - Test coverage, running tests, and testing practices
- **[Configuration](CONFIGURATION.md)** - Environment variables and configuration options

### Code Organization
- **[Single Responsibility Module Pattern](SINGLE_RESPONSIBILITY_MODULE_PATTERN.md)** - Code organization pattern following SOLID principles
- **[Modules Guide](MODULES.md)** - How to add new PrismQ modules

### Worker Implementation
- **[Worker Implementation Plan](WORKER_IMPLEMENTATION_PLAN.md)** - Strategic plan for external worker systems
- **[Worker Implementation Guidelines](WORKER_IMPLEMENTATION_GUIDELINES.md)** - Best practices and patterns for building workers

## 🏗️ Architecture

For system architecture and design decisions, see [Architecture Documentation](../architecture/README.md).

## 🧪 Testing

```bash
# Backend tests
cd Backend
pytest ../_meta/tests/Backend/ -v

# Frontend tests
cd Frontend
npm test

# Full test suite
npm run test:all
```

See [Testing Guide](TESTING.md) for comprehensive testing documentation.

## 📦 Adding Features

1. Review [Single Responsibility Module Pattern](SINGLE_RESPONSIBILITY_MODULE_PATTERN.md)
2. Follow patterns established in existing code
3. Add appropriate tests
4. Update documentation

## 🔧 Configuration

See [Configuration](CONFIGURATION.md) for:
- Environment variables
- Module configuration
- Backend/Frontend settings
- Development vs Production configuration

## 🤝 Contributing

See [Development Guide](DEVELOPMENT.md) for:
- Code style guidelines
- Branch naming conventions
- Pull request process
- Review requirements
