# Issue Index: On-Demand Architecture Implementation

## Overview
This index organizes all issues related to the Client on-demand architecture implementation. Issues are categorized by component (Client, Worker, Integration) and status.

## Quick Status Summary
- **Client Issues**: 4 completed ✅
- **Worker Issues**: 2 not started 🔴
- **Integration Issues**: 1 not started 🔴

---

## Client Issues (UI, API, On-Demand Communication)

### ✅ Completed

#### [ISSUE-CLIENT-001](client/ISSUE-CLIENT-001-remove-automatic-periodic-tasks.md): Remove Automatic Periodic Tasks
**Component**: Backend/src/main.py  
**Priority**: High  
**Commit**: 1e767c2  
**Summary**: Removed automatic periodic task execution from Client backend to ensure all operations are triggered on-demand by UI requests.

#### [ISSUE-CLIENT-002](client/ISSUE-CLIENT-002-add-ondemand-maintenance-endpoints.md): Add On-Demand Maintenance API Endpoints
**Component**: Backend/src/api/system.py  
**Priority**: High  
**Commit**: 1e767c2  
**Summary**: Created 4 REST API endpoints allowing UI to trigger maintenance operations on-demand.

#### [ISSUE-CLIENT-003](client/ISSUE-CLIENT-003-create-ondemand-documentation.md): Create On-Demand Architecture Documentation
**Component**: Documentation  
**Priority**: Medium  
**Commits**: 5b14705, 583720a  
**Summary**: Comprehensive documentation explaining on-demand architecture principles, endpoints, and migration guide.

#### [ISSUE-CLIENT-004](client/ISSUE-CLIENT-004-add-ondemand-test-suite.md): Add Test Suite for On-Demand Architecture
**Component**: _meta/tests/Backend/integration/  
**Priority**: High  
**Commit**: 1cab769  
**Summary**: 6 comprehensive tests validating on-demand behavior and ensuring no automatic tasks run.

---

## Worker Issues (Background Task Execution)

### 🔴 Not Started

#### [ISSUE-WORKER-001](worker/ISSUE-WORKER-001-implement-cleanup-worker.md): Implement Cleanup Task Worker
**Component**: Worker/Workers (Not Client)  
**Priority**: Medium  
**Status**: Not Started - Belongs in Worker Project  
**Summary**: Create worker component to execute cleanup operations (old runs, temp files) when triggered by Client API via task queue.

**Key Features**:
- Cleanup old runs based on age threshold
- Cleanup temporary files
- Error handling with retry logic
- Configurable thresholds

**Dependencies**: None (independent worker)

#### [ISSUE-WORKER-002](worker/ISSUE-WORKER-002-implement-health-check-worker.md): Implement Health Check Worker
**Component**: Worker/Workers (Not Client)  
**Priority**: Medium  
**Status**: Not Started - Belongs in Worker Project  
**Summary**: Create worker component to perform comprehensive system health checks (CPU, memory, disk) when requested by Client API.

**Key Features**:
- Collect system metrics (CPU, memory, disk, tasks)
- Evaluate health status against thresholds
- Return comprehensive health report
- Configurable warning/error thresholds

**Dependencies**: None (independent worker)

---

## Integration Issues (Client ↔ Worker)

### 🔴 Not Started

#### [ISSUE-INTEGRATION-001](integration/ISSUE-INTEGRATION-001-connect-client-to-worker-queue.md): Connect Client API to Worker Task Queue
**Component**: Backend/src/api/, Worker Integration  
**Priority**: High  
**Status**: Not Started - Future Work  
**Summary**: Integrate Client's on-demand maintenance endpoints with worker task queue for async execution, better scalability, and separation of concerns.

**Scope**:
- Update API endpoints to enqueue tasks instead of executing directly
- Add task status endpoints for tracking
- Configure queue integration
- Update documentation

**Dependencies**:
- ISSUE-CLIENT-002 (✅ Complete)
- ISSUE-WORKER-001 (🔴 Not Started)
- ISSUE-WORKER-002 (🔴 Not Started)

---

## Parallelization Plan

### Phase 1: Client-Only Work ✅ COMPLETE
**Timeline**: Completed  
**Status**: All issues complete

**Track A - Backend Changes** (Sequential):
1. ✅ ISSUE-CLIENT-001: Remove periodic tasks
2. ✅ ISSUE-CLIENT-002: Add on-demand endpoints

**Track B - Documentation** (Parallel with Track A):
1. ✅ ISSUE-CLIENT-003: Create documentation

**Track C - Testing** (After Track A):
1. ✅ ISSUE-CLIENT-004: Add test suite

### Phase 2: Worker Development 🔴 NOT STARTED
**Timeline**: Future  
**Status**: Can be parallelized (independent workers)

**Track A - Cleanup Worker** (Independent):
1. 🔴 ISSUE-WORKER-001: Implement cleanup worker

**Track B - Health Check Worker** (Independent):
1. 🔴 ISSUE-WORKER-002: Implement health check worker

**Parallelization**: These workers are independent and can be developed simultaneously by different developers.

### Phase 3: Integration 🔴 NOT STARTED
**Timeline**: After Phase 2  
**Status**: Sequential work

**Sequential Work**:
1. 🔴 ISSUE-INTEGRATION-001: Connect Client API to worker task queue
   - Requires ISSUE-WORKER-001 and ISSUE-WORKER-002 to be complete

---

## Recommendations

### 1. Worker Architecture Decision
**Decision Needed**: Determine if workers should be:
- **Option A**: Same repository, separate directory (`PrismQ.Client/Workers/`)
- **Option B**: Separate repository (`PrismQ.Workers/`)

**Recommendation**: Start with Option A for easier development, migrate to Option B when workers mature.

### 2. Priority Order for Next Steps
1. **Decision**: Choose worker architecture (same repo vs separate)
2. **High Priority**: ISSUE-WORKER-001 (Cleanup worker) - Most frequently needed
3. **High Priority**: ISSUE-INTEGRATION-001 (Task queue integration) - Enables async execution
4. **Medium Priority**: ISSUE-WORKER-002 (Health check worker) - Useful for monitoring

### 3. Existing Infrastructure
The project already has queue infrastructure at `Backend/src/queue/`:
- Database-backed queue (`database.py`)
- Worker support (`worker.py`)
- Task handler registry (`task_handler_registry.py`)
- Scheduling strategies (`scheduling.py`)

**Recommendation**: Review and use existing queue infrastructure instead of creating new.

### 4. Gradual Migration
For ISSUE-INTEGRATION-001, use gradual migration:
1. Keep direct execution endpoints as default
2. Add async endpoints with `/async` suffix
3. Test async endpoints
4. Switch UI to async endpoints
5. Remove direct execution endpoints

This ensures backward compatibility and safer deployment.

---

## Related Documentation

### Main Documents
- [ISSUE_ORGANIZATION.md](../ISSUE_ORGANIZATION.md) - Detailed issue organization and recommendations
- [ONDEMAND_ARCHITECTURE.md](../../ONDEMAND_ARCHITECTURE.md) - On-demand architecture principles
- [IMPLEMENTATION_SUMMARY.md](../../IMPLEMENTATION_SUMMARY.md) - Complete implementation details

### Test Suite
- [test_ondemand_architecture.py](../../_meta/tests/Backend/integration/test_ondemand_architecture.py) - 6 tests validating on-demand behavior

### API Endpoints
Current (Direct Execution):
- `POST /api/system/maintenance/cleanup-runs`
- `POST /api/system/maintenance/health-check`
- `POST /api/system/maintenance/cleanup-temp-files`
- `POST /api/system/maintenance/log-statistics`

Future (Async via Queue):
- `POST /api/system/maintenance/cleanup-runs` → Returns task_id
- `GET /api/system/maintenance/tasks/{task_id}` → Returns task status/result

---

## Issue Template

For creating new issues, use this template:

```markdown
# ISSUE-{CATEGORY}-{NUMBER}: {Title}

## Status
{✅ COMPLETED | 🟡 IN PROGRESS | 🔴 NOT STARTED}

## Component
{Component path or "Worker/Workers (Not Client)"}

## Type
{Feature | Bug | Documentation | Testing | Integration}

## Priority
{High | Medium | Low}

## Description
{What needs to be done}

## Problem Statement
{Why this is needed}

## Solution
{How to solve it}

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Dependencies
{List of dependent issues}

## Related Issues
{List of related issues}

## Commits
{Commit hashes if completed}

## Notes
{Additional information}
```

---

## Contact & Questions
For questions about these issues, refer to:
- Architecture: [ONDEMAND_ARCHITECTURE.md](../../ONDEMAND_ARCHITECTURE.md)
- Implementation: [IMPLEMENTATION_SUMMARY.md](../../IMPLEMENTATION_SUMMARY.md)
- Organization: [ISSUE_ORGANIZATION.md](../ISSUE_ORGANIZATION.md)

---

**Last Updated**: 2025-11-06  
**Total Issues**: 7 (4 completed, 3 not started)  
**Phase 1 Status**: ✅ Complete  
**Phase 2 Status**: 🔴 Not Started  
**Phase 3 Status**: 🔴 Not Started
