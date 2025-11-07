# TaskManager Issues Index

## Overview
This directory contains all issues for the TaskManager project - a **lightweight PHP task queue** with a **data-driven architecture** designed for shared hosting environments. The system operates entirely on-demand (no background processes) with endpoints, validation rules, and actions configured in the database rather than hardcoded in PHP.

**📋 See also**: [PROJECT_PLAN.md](../PROJECT_PLAN.md) - Comprehensive project plan with timeline, dependencies, and roadmap

## Architecture Context

**System Type**: Lightweight PHP Task Queue (Data-Driven, On-Demand)  
**Key Feature**: REST API endpoints defined in database, not code  
**Hosting**: Shared hosting compatible (Vedos) - no background processes  
**Technology**: PHP 7.4+, MySQL/MariaDB, Apache mod_rewrite

## Structure
```
issues/
├── new/         # New issues to be assigned (by worker)
├── wip/         # Work in progress (by worker)
└── done/        # Completed issues (no worker folders)
```

## Workers

| Worker | Specialization | New Issues | WIP Issues | Done Issues |
|--------|---------------|------------|------------|-------------|
| Worker01 | Project Manager & Issue Creation | 0 | 1 | 0 |
| Worker02 | SQL Database Expert (Task Queue + API Config) | 0 | 1 | 0 |
| Worker03 | PHP Backend Expert (Data-Driven Router) | 1 | 0 | 0 |
| Worker04 | API Design & Integration (Endpoint Seeding) | 0 | 1 | 0 |
| Worker05 | Security & Validation (Database-Driven) | 0 | 1 | 0 |
| Worker06 | Documentation Specialist (Data-Driven Docs) | 0 | 1 | 0 |
| Worker07 | Testing & QA (API + Workers) | 1 | 0 | 0 |
| Worker08 | DevOps & Deployment (Shared Hosting) | 1 | 0 | 0 |
| Worker09 | Performance & Optimization (Endpoint Lookup) | 1 | 0 | 0 |
| Worker10 | Senior Review Master (Architecture Review) | 1 | 0 | 0 |

## All Issues

### ISSUE-TASKMANAGER-000: Master Plan
- **Status**: 🟢 IN PROGRESS
- **Worker**: Worker01 (Project Manager)
- **Location**: wip/Worker01/
- **Priority**: High
- **Type**: Epic / Planning
- **Focus**: Data-driven architecture coordination and lightweight task queue design

### ISSUE-TASKMANAGER-001: Core Infrastructure
- **Status**: 🟢 IN PROGRESS
- **Worker**: Worker02 (SQL Expert)
- **Location**: wip/Worker02/
- **Priority**: High
- **Type**: Database / Infrastructure
- **Focus**: Schema design for task queue + data-driven API tables (api_endpoints, api_validations, api_transformations)

### ISSUE-TASKMANAGER-002: Data-Driven API Implementation
- **Status**: 🟢 IN PROGRESS
- **Worker**: Worker04 (API Specialist)
- **Location**: wip/Worker04/
- **Priority**: High
- **Type**: API Development
- **Focus**: EndpointRouter, ActionExecutor, dynamic routing from database

### ISSUE-TASKMANAGER-003: Validation and Deduplication
- **Status**: 🟢 IN PROGRESS
- **Worker**: Worker05 (Security Expert)
- **Location**: wip/Worker05/
- **Priority**: High
- **Type**: Security / Validation
- **Focus**: Database-driven validation rules, JSON schema validation, SQL injection prevention

### ISSUE-TASKMANAGER-004: Data-Driven Documentation
- **Status**: 🟢 IN PROGRESS
- **Worker**: Worker06 (Documentation Specialist)
- **Location**: wip/Worker06/
- **Priority**: High
- **Type**: Documentation
- **Focus**: Document data-driven architecture, endpoint creation via SQL, worker examples

### ISSUE-TASKMANAGER-005: Task Queue Endpoint Seeding & Testing
- **Status**: 🔴 NOT STARTED
- **Worker**: Worker07 (Testing & QA)
- **Location**: new/Worker07/
- **Priority**: High
- **Type**: Testing / Endpoint Seeding
- **Focus**: Seed task management endpoints in database, test data-driven API, worker integration tests

### ISSUE-TASKMANAGER-006: Shared Hosting Deployment Automation
- **Status**: 🔴 NOT STARTED
- **Worker**: Worker08 (DevOps)
- **Location**: new/Worker08/
- **Priority**: High
- **Type**: DevOps / Deployment
- **Focus**: Browser-based deployment script, Vedos compatibility, no SSH deployment

### ISSUE-TASKMANAGER-007: Example Worker Implementations
- **Status**: 🔴 NOT STARTED
- **Worker**: Worker03 (PHP Expert) + Worker04
- **Location**: new/Worker03/
- **Priority**: Medium
- **Type**: Integration / Examples
- **Focus**: PHP/Python/Node.js worker examples, task claiming patterns, on-demand workers

### ISSUE-TASKMANAGER-008: Endpoint Lookup Performance Optimization
- **Status**: 🔴 NOT STARTED
- **Worker**: Worker09 (Performance Expert)
- **Location**: new/Worker09/
- **Priority**: Medium
- **Type**: Performance / Optimization
- **Focus**: Optimize endpoint lookup queries, caching strategies, database connection pooling

### ISSUE-TASKMANAGER-009: Data-Driven Architecture Review
- **Status**: 🔴 NOT STARTED
- **Worker**: Worker10 (Review Master)
- **Location**: new/Worker10/
- **Priority**: Critical
- **Type**: Code Review / Architecture Review
- **Focus**: Review data-driven approach, security audit for dynamic SQL, shared hosting verification

## Issue Status Legend
- 🟢 IN PROGRESS: Currently being worked on
- 🔴 NOT STARTED: Waiting to be started
- ✅ COMPLETED: Work finished and merged
- ⚠️ BLOCKED: Waiting on dependencies

## Dependencies

```
ISSUE-000 (Master Plan - Data-Driven)
├── ISSUE-001 (Infrastructure - Task Queue + API Config Tables)
│   ├── ISSUE-002 (Data-Driven API - Router + Action Executor)
│   │   ├── ISSUE-003 (Database-Driven Validation)
│   │   ├── ISSUE-004 (Data-Driven Documentation)
│   │   ├── ISSUE-005 (Endpoint Seeding & Testing)
│   │   └── ISSUE-007 (Example Workers)
│   └── ISSUE-006 (Shared Hosting Deployment)
│
├── ISSUE-008 (Endpoint Lookup Performance)
│   └── Depends on: ISSUE-002, ISSUE-005
│
└── ISSUE-009 (Data-Driven Architecture Review)
    └── Depends on: ALL OTHER ISSUES
```

## Progress Summary

### Phase 1: Data-Driven Foundation (Weeks 1-2) - 🟢 IN PROGRESS
- ISSUE-000: Master Plan (Data-Driven Architecture) ✅
- ISSUE-001: Infrastructure (Task Queue + API Config Tables) ✅
- ISSUE-002: Data-Driven API (Router + Action Executor) ✅
- ISSUE-003: Database-Driven Validation ✅
- ISSUE-004: Data-Driven Documentation ✅

**Status**: 5/5 complete (100%)

### Phase 2: Endpoint Seeding & Worker Integration (Weeks 3-4) - 🔴 NOT STARTED
- ISSUE-005: Task Queue Endpoint Seeding & Testing (Worker07 + Worker04)
- ISSUE-006: Shared Hosting Deployment (Worker08)
- ISSUE-007: Example Worker Implementations (Worker03 + Worker04)
- ISSUE-008: Endpoint Lookup Performance (Worker09)

**Status**: 0/4 complete (0%)

### Phase 3: Review & Production Readiness (Week 5) - 🔴 NOT STARTED
- ISSUE-009: Data-Driven Architecture Review (Worker10)

**Status**: 0/1 complete (0%)

**Overall Progress**: 5/10 issues (50%)

## Quick Links

### By Status
- [In Progress Issues](#in-progress-5)
- [Not Started Issues](#not-started-5)
- [Completed Issues](#completed-0)

### By Worker
- [Worker01 Issues](wip/Worker01/)
- [Worker02 Issues](wip/Worker02/)
- [Worker03 Issues](new/Worker03/)
- [Worker04 Issues](wip/Worker04/)
- [Worker05 Issues](wip/Worker05/)
- [Worker06 Issues](wip/Worker06/)
- [Worker07 Issues](new/Worker07/)
- [Worker08 Issues](new/Worker08/)
- [Worker09 Issues](new/Worker09/)
- [Worker10 Issues](new/Worker10/)

### By Priority
- **Critical**: ISSUE-009 (Data-Driven Architecture Review)
- **High**: ISSUE-001, 002, 003, 004, 005, 006
- **Medium**: ISSUE-007, 008

## Next Steps

1. **Immediate** (This Week):
   - Workers 02, 04, 05, 06 continue data-driven implementation work
   - Worker01 updates master plan with data-driven focus
   
2. **Next Sprint** (Next Week):
   - Worker07 starts endpoint seeding and testing data-driven API
   - Worker08 starts shared hosting deployment automation
   - Worker03 + Worker04 start example worker implementations
   - Worker09 starts endpoint lookup performance optimization

3. **Final Sprint** (Week After):
   - Worker10 conducts comprehensive data-driven architecture review
   - Address Worker10 feedback (focus on SQL injection, validation bypass)
   - Prepare for production deployment on Vedos
   - Verify no background processes needed

## Data-Driven Architecture Notes

### Key Advantages
- **Faster Development**: Add endpoints via SQL INSERT instead of code deployment
- **Better Parallelization**: Workers can add endpoints independently without code conflicts
- **Easier Testing**: Test endpoint configurations without rebuilding code
- **Rapid Iteration**: Modify API behavior by updating database records
- **Shared Hosting Friendly**: No framework dependencies, minimal PHP code

### Critical Requirements
- All endpoints must be defined in `api_endpoints` table
- All validation rules must be in `api_validations` table
- ActionExecutor must handle query/insert/update/delete/custom actions dynamically
- No background processes (all on-demand via HTTP)
- SQL injection prevention via prepared statements in ActionExecutor
- Works on PHP 7.4+ with MySQL 5.7+ on shared hosting

## Contact

For questions about specific issues, contact the assigned worker or Worker01 (Project Manager).

---

**Last Updated**: 2025-11-07  
**Architecture**: Lightweight PHP Task Queue (Data-Driven, On-Demand)  
**Total Issues**: 10  
**Completed**: 0  
**In Progress**: 5  
**Not Started**: 5  
**Blocked**: 0
