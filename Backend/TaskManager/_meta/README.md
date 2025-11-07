# TaskManager Project Organization

This directory contains project documentation and issue tracking for the TaskManager implementation.

## Structure

```
_meta/
├── docs/           # Project documentation
├── issues/         # Issue tracking with worker specialization
│   ├── new/        # New issues to be assigned
│   │   ├── Worker01/ - Project Manager & Issue Creation Specialist
│   │   ├── Worker02/ - SQL Database Expert
│   │   ├── Worker03/ - PHP Backend Expert
│   │   ├── Worker04/ - API Design & Integration Specialist
│   │   ├── Worker05/ - Security & Validation Expert
│   │   ├── Worker06/ - Documentation Specialist
│   │   ├── Worker07/ - Testing & QA Specialist
│   │   ├── Worker08/ - DevOps & Deployment Specialist
│   │   ├── Worker09/ - Performance & Optimization Expert
│   │   └── Worker10/ - Senior Review Master
│   ├── wip/        # Work in progress issues by worker
│   │   └── Worker01-10/ (same structure as new/)
│   └── done/       # Completed issues (archived without worker folders)
└── README.md       # This file
```

## Worker Specializations

### Worker01 - Project Manager & Issue Creation Specialist
**Responsibilities**:
- Creating and managing project issues
- Issue templates and organization
- Project planning and coordination
- Task breakdown and assignment
- Progress tracking and reporting

**Skills**: Project management, issue tracking, coordination

### Worker02 - SQL Database Expert
**Responsibilities**:
- Database schema design and optimization
- SQL query optimization
- Index design and management
- Data integrity and constraints
- Database migration scripts

**Skills**: MySQL/MariaDB, database design, performance tuning

### Worker03 - PHP Backend Expert
**Responsibilities**:
- PHP code implementation
- Business logic development
- Code architecture and patterns
- PHP best practices
- Error handling and logging

**Skills**: PHP 7.4+, OOP, design patterns

### Worker04 - API Design & Integration Specialist
**Responsibilities**:
- REST API design and implementation
- API endpoint routing
- Request/response handling
- CORS and headers management
- API versioning

**Skills**: REST APIs, HTTP protocols, API design

### Worker05 - Security & Validation Expert
**Responsibilities**:
- Input validation and sanitization
- SQL injection prevention
- XSS prevention
- Authentication and authorization
- Security best practices
- JSON Schema validation

**Skills**: Security, validation, cryptography

### Worker06 - Documentation Specialist
**Responsibilities**:
- Technical documentation
- API reference documentation
- Deployment guides
- Code comments and inline docs
- README files
- User guides

**Skills**: Technical writing, markdown, documentation tools

### Worker07 - Testing & QA Specialist
**Responsibilities**:
- Unit test creation
- Integration testing
- Test coverage analysis
- Bug identification and reporting
- Test automation
- Quality assurance

**Skills**: Testing frameworks, QA methodologies

### Worker08 - DevOps & Deployment Specialist
**Responsibilities**:
- Deployment scripts and procedures
- Server configuration
- Environment setup
- CI/CD pipeline
- Monitoring and logging
- Backup strategies

**Skills**: DevOps, Apache, MySQL admin, shell scripting

### Worker09 - Performance & Optimization Expert
**Responsibilities**:
- Performance profiling
- Query optimization
- Code optimization
- Caching strategies
- Resource usage optimization
- Bottleneck identification

**Skills**: Performance analysis, profiling tools, optimization

### Worker10 - Senior Review Master
**Responsibilities**:
- Code review and quality assessment
- Architecture review
- Best practices enforcement
- Asking clarifying questions
- Providing suggestions and improvements
- Final approval of implementations

**Skills**: Senior-level expertise across all domains, code review

**Note**: Worker10 focuses on asking questions, providing comments, and making suggestions rather than direct implementation.

## Issue Workflow

1. **New Issues** → Created in `issues/new/WorkerXX/`
2. **Assignment** → Issue moved to appropriate worker's folder
3. **Work in Progress** → Issue moved to `issues/wip/WorkerXX/`
4. **Completion** → Issue moved to `issues/done/` (no worker subfolders)

## Issue Naming Convention

```
ISSUE-TASKMANAGER-XXX-description.md
```

Where:
- XXX is the issue number (000, 001, 002, etc.)
- description is a brief kebab-case description

## Parallelization

See `PARALLELIZATION_MATRIX.md` for detailed worker dependencies and parallel execution strategy.

## Deployment

The project will be deployed manually by running a PHP deployment script that:
1. Checks out the appropriate branch from GitHub
2. Downloads required scripts and files
3. Sets up the database
4. Configures the environment
5. Validates the installation

See `docs/DEPLOYMENT_SCRIPT.md` for details.
