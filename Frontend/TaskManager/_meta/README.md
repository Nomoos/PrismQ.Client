# Frontend/TaskManager - _meta Directory

**Purpose**: This directory contains all project metadata, documentation, examples, scripts, and artifacts that are NOT part of the production deployment.

**Last Updated**: 2025-11-11  
**Status**: ✅ Organized following SOLID principles

---

## 📋 Directory Structure

```
_meta/
├── README.md                    # This file - _meta organization guide
├── baselines/                   # Performance baselines and history
│   ├── README.md
│   ├── baseline-history.json
│   └── performance-baseline.json
├── docs/                        # All project documentation
│   ├── NEXT_STEPS.md           # Project status and next steps
│   ├── CZECH_SUMMARY.md        # Czech language summary
│   ├── CODE_QUALITY_ANALYSIS.md
│   ├── PARALLELIZATION_MATRIX.md
│   ├── ACCESSIBILITY_*.md      # Accessibility documentation
│   ├── DEPLOYMENT_*.md         # Deployment guides and procedures
│   ├── PERFORMANCE_*.md        # Performance documentation
│   ├── SECURITY.md             # Security guidelines
│   ├── TESTING_*.md            # Testing documentation
│   └── [26+ other docs]        # Comprehensive project documentation
├── examples/                    # Example files and templates
│   └── (Future: code examples, config templates)
├── issues/                      # Issue tracking and project management
│   ├── INDEX.md                # Issue tracking index
│   ├── FRONTEND_PARALLELIZATION_MATRIX.md
│   ├── done/                   # Completed issues (by worker)
│   │   ├── Worker01/           # Project Manager
│   │   ├── Worker02/           # API Integration
│   │   ├── Worker03/           # Vue.js/TypeScript
│   │   ├── Worker04/           # Performance
│   │   ├── Worker07/           # Testing & QA
│   │   ├── Worker08/           # DevOps
│   │   ├── Worker10/           # Senior Review
│   │   ├── Worker12/           # UX Review
│   │   └── *.md                # Individual issue files
│   └── new/                    # New/unassigned issues
│       ├── Worker02/           # API Integration tasks
│       └── Worker06/           # Documentation tasks
└── scripts/                     # Helper scripts for development
    ├── baseline.js             # Performance baseline tracking
    ├── bundle-size.js          # Bundle size analysis
    ├── perf-test.js            # Performance testing
    └── test-deployment.sh      # Deployment testing script
```

---

## 🎯 Purpose and Organization

### What Goes in _meta/

**Documentation** (_meta/docs/):
- All project documentation not needed for deployment
- Development guides, procedures, and best practices
- Historical records and summaries
- Analysis and review documents

**Scripts** (_meta/scripts/):
- Development and testing scripts
- Performance analysis tools
- Build helpers that are not part of the deployment process

**Examples** (_meta/examples/):
- Code examples and templates
- Configuration examples
- Sample implementations

**Issues** (_meta/issues/):
- Issue tracking and project management
- Worker assignments and progress
- Historical issue records

**Baselines** (_meta/baselines/):
- Performance baseline data
- Historical metrics
- Comparison benchmarks

### What Stays in Root (Deployment)

**Configuration Files**:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build configuration
- `tailwind.config.js` - Styling configuration
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules

**Build Scripts** (Part of Deployment Process):
- `build-and-package.sh` - Production build script
- `build-and-package.bat` - Windows build script
- `deploy.php` - Server-side deployment script
- `deploy-auto.php` - Automated deployment

**Source Code**:
- `src/` - Application source code
- `public/` - Public static files
- `index.html` - Entry HTML file

**Tests** (Quality Assurance):
- `tests/` - Unit and E2E tests
- Test configuration files

---

## 📚 Documentation Overview

### Key Documents in _meta/docs/

#### Project Status
- **NEXT_STEPS.md** - Current project status, roadmap, and action items
- **CZECH_SUMMARY.md** - Czech language project summary

#### Development Guides
- **CODE_QUALITY_ANALYSIS.md** - Code quality standards and analysis
- **API_INTEGRATION.md** - Backend API integration guide
- **COMPONENT_EXTRACTION_SUMMARY.md** - Component architecture
- **COMPONENT_REFACTORING_SUMMARY.md** - Refactoring documentation

#### Performance
- **PERFORMANCE.md** - Performance guidelines
- **PERFORMANCE_OPTIMIZATION_GUIDE.md** - Optimization techniques
- **PERFORMANCE_RESULTS.md** - Performance test results
- **PERFORMANCE_USAGE.md** - Using performance tools
- **PERFORMANCE_EXAMPLES.md** - Performance examples

#### Accessibility
- **ACCESSIBILITY_GUIDE.md** - WCAG 2.1 AA compliance guide
- **ACCESSIBILITY_IMPLEMENTATION_SUMMARY.md** - Implementation details
- **ACCESSIBILITY_TESTING_REPORT.md** - Test results
- **FINAL_ACCESSIBILITY_COMPLIANCE_REPORT.md** - Final compliance report
- **KEYBOARD_NAVIGATION_GUIDE.md** - Keyboard navigation

#### Deployment
- **DEPLOYMENT.md** - Main deployment guide
- **DEPLOYMENT_RUNBOOK.md** - Operational runbook
- **DEPLOYMENT_SUMMARY.md** - Deployment history
- **QUICK_DEPLOYMENT_REFERENCE.md** - Quick reference
- **ROLLBACK_PROCEDURES.md** - Rollback procedures
- **STAGING_DEPLOYMENT_CHECKLIST.md** - Staging checklist

#### Testing
- **TESTING.md** - Testing strategy
- **TESTING_GUIDE.md** - Testing guidelines
- **VALIDATION_TESTING.md** - Validation testing

#### Monitoring
- **MONITORING_SETUP.md** - Monitoring configuration
- **SENTRY_EVALUATION.md** - Sentry evaluation
- **SENTRY_IMPLEMENTATION_SUMMARY.md** - Sentry implementation
- **SENTRY_SETUP.md** - Sentry setup guide
- **SENTRY_TESTING.md** - Sentry testing

#### Security
- **SECURITY.md** - Security guidelines and best practices

#### Coordination
- **PARALLELIZATION_MATRIX.md** - Worker coordination strategy

---

## 🔧 Scripts Overview

### Performance Scripts (_meta/scripts/)

**baseline.js**:
- Track performance baselines
- Compare current metrics with historical data
- Generate baseline reports

**bundle-size.js**:
- Analyze bundle size
- Track size over time
- Identify large dependencies

**perf-test.js**:
- Run performance tests
- Measure load times and metrics
- Generate performance reports

**test-deployment.sh**:
- Test deployment process locally
- Verify deployment scripts
- Simulate production deployment

---

## 📊 Issue Tracking

### Structure (_meta/issues/)

**INDEX.md**: Central issue tracking index
- Lists all issues (ISSUE-FRONTEND-001 through 018)
- Worker assignments and status
- Dependencies and progress tracking

**Organization**:
- `done/` - Completed issues organized by worker
- `new/` - Unassigned or new issues

**Workers**:
- Worker01: Project Manager & Planning
- Worker02: API Integration Expert
- Worker03: Vue.js/TypeScript Expert
- Worker04: Mobile Performance Specialist
- Worker06: Documentation Specialist
- Worker07: Testing & QA Specialist
- Worker08: DevOps & Deployment Specialist
- Worker10: Senior Review Master
- Worker11: UX Design Specialist
- Worker12: UX Review & Testing

---

## 🎯 SOLID Principles Applied

### Single Responsibility Principle
- Each subdirectory has a clear, single purpose
- Documentation in docs/
- Scripts in scripts/
- Issues in issues/
- Examples in examples/

### Open/Closed Principle
- Easy to add new documentation without modifying structure
- New issue types can be added without changing organization
- Script categories can expand without restructuring

### Liskov Substitution Principle
- All documentation files follow consistent format
- Issues follow standard template structure
- Scripts have consistent interfaces

### Interface Segregation Principle
- Separate directories for different concerns
- Documentation organized by topic
- Issues organized by status and worker

### Dependency Inversion Principle
- README files provide high-level navigation
- INDEX files provide detailed references
- Dependencies flow from general to specific

---

## 📝 Maintenance

### Adding New Documentation
1. Determine category (performance, testing, deployment, etc.)
2. Create markdown file in `_meta/docs/`
3. Follow existing naming conventions
4. Update this README if introducing new category

### Adding New Scripts
1. Place in `_meta/scripts/`
2. Make executable if needed (`chmod +x`)
3. Add description in this README
4. Include inline documentation in script

### Adding Examples
1. Create in `_meta/examples/`
2. Include README.md with examples
3. Follow project coding standards
4. Update this README

### Managing Issues
1. Create new issues in `_meta/issues/new/`
2. Move to worker folder when assigned
3. Move to `done/` when complete
4. Update INDEX.md to reflect changes

---

## 🔍 Finding Information

### Quick Reference

**Project Status**: `_meta/docs/NEXT_STEPS.md`  
**Getting Started**: `/README.md` (root)  
**API Integration**: `_meta/docs/API_INTEGRATION.md`  
**Deployment**: `_meta/docs/DEPLOYMENT.md`  
**Testing**: `_meta/docs/TESTING.md`  
**Performance**: `_meta/docs/PERFORMANCE.md`  
**Accessibility**: `_meta/docs/ACCESSIBILITY_GUIDE.md`  
**Security**: `_meta/docs/SECURITY.md`  
**Issue Tracking**: `_meta/issues/INDEX.md`

---

## 📞 Contact

For questions about _meta organization or content, contact:
- **Worker01** (Project Manager) - Overall organization
- **Worker06** (Documentation) - Documentation structure
- **Worker08** (DevOps) - Scripts and tooling

---

**Created**: 2025-11-11  
**Author**: Copilot Agent (Issue: Reorganize _meta structure)  
**Purpose**: Establish clear organization for non-deployment project files  
**Principles**: SOLID, DRY, clear separation of concerns
