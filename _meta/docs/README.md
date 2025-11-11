# PrismQ Client Documentation

Central documentation hub for PrismQ Web Client. All documentation is organized by purpose following SOLID principles.

## 📖 Documentation Categories

### 🚀 [Getting Started](getting-started/README.md)
**For new users** - Installation, setup, and basic usage
- Setup Guide
- Node.js Installation
- User Guide
- Troubleshooting

### 👨‍💻 [Development](development/README.md)
**For developers** - Contributing, code organization, and testing
- Development Guide
- Testing Guide
- Configuration
- Module Pattern
- Worker Implementation

### 🏗️ [Architecture](architecture/README.md)
**For architects** - System design and technical decisions
- Architecture Overview
- On-Demand Architecture
- Integration Guide
- Data Design Decisions

### 🚀 [Operations](operations/README.md)
**For operators** - Deployment and release management
- Deployment Checklist
- Release Management
- Security Fixes
- Changelog

### 📦 [Archive](archive/README.md)
Historical documentation and obsolete files (reference only)

## 🎯 Quick Links by Role

### I want to use PrismQ Client
→ Start with [Getting Started](getting-started/README.md)

### I want to develop/contribute
→ Start with [Development Guide](development/DEVELOPMENT.md)

### I want to understand the architecture
→ Start with [Architecture Overview](architecture/ARCHITECTURE.md)

### I want to deploy or release
→ Start with [Operations Guide](operations/README.md)

## 📚 Additional Resources

### Examples
- **[Worker Examples](../examples/workers/README.md)** - Production-ready worker implementations
- **[Postman Collection](../examples/PrismQ_Web_Client.postman_collection.json)** - API testing collection

### Templates
- **[Documentation Templates](../templates/README.md)** - Standard templates for creating documentation

### Scripts
- **[Utility Scripts](../_scripts/)** - Development and release automation scripts

### Tests
- **[Test Documentation](../tests/TESTING_GUIDE.md)** - Testing guide and test suite
- **[Performance Benchmarks](../tests/PERFORMANCE_BENCHMARKS.md)** - Performance testing

## 🗂️ Organization Principles (SOLID)

This documentation follows SOLID principles:

### Single Responsibility Principle (SRP)
Each documentation category has a single, well-defined purpose:
- **Getting Started**: User onboarding only
- **Development**: Developer information only
- **Architecture**: Design decisions only
- **Operations**: Deployment/release only

### Open/Closed Principle (OCP)
- Documentation is organized to be extensible (easy to add new docs)
- Core structure remains stable (categories don't change frequently)

### Liskov Substitution Principle (LSP)
- All category README files follow the same structure
- Consistent navigation patterns across categories

### Interface Segregation Principle (ISP)
- Documentation is split by audience (users, developers, architects, operators)
- Each role sees only relevant documentation

### Dependency Inversion Principle (DIP)
- This README depends on abstractions (categories) not concrete files
- Specific documents can change without affecting navigation

## 🔍 Finding Documentation

### By Topic
- **Setup & Installation**: [Getting Started](getting-started/README.md)
- **Using the Application**: [User Guide](getting-started/USER_GUIDE.md)
- **Code Organization**: [Module Pattern](development/SINGLE_RESPONSIBILITY_MODULE_PATTERN.md)
- **Testing**: [Testing Guide](development/TESTING.md)
- **API Integration**: [Integration Guide](architecture/INTEGRATION_GUIDE.md)
- **Deployment**: [Deployment Checklist](operations/DEPLOYMENT_CHECKLIST.md)
- **Releases**: [Release Guide](operations/RELEASE.md)

### By File Type
- **Guides**: Step-by-step instructions (SETUP.md, USER_GUIDE.md)
- **References**: Technical specifications (ARCHITECTURE.md, API docs)
- **Checklists**: Verification procedures (DEPLOYMENT_CHECKLIST.md)
- **Templates**: Reusable document formats (templates/)

## 📝 Contributing to Documentation

When adding documentation:
1. Determine the appropriate category (getting-started, development, architecture, operations)
2. Follow existing document structure and style
3. Update the category README.md to include your new document
4. Use templates from [templates/](../templates/) directory when applicable

## 🆘 Need Help?

1. Check [Troubleshooting](getting-started/TROUBLESHOOTING.md) for common issues
2. Review relevant category documentation
3. Check [Archive](archive/README.md) for historical context if needed

---

**Last Updated**: 2025-11-11 | **Version**: 1.0.0 (Reorganized following SOLID principles)
