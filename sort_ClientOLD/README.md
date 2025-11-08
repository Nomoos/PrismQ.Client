# ⚠️ DEPRECATED - Do Not Use

**Status**: This directory is obsolete and scheduled for removal  
**Date Flagged**: 2025-11-08  
**Flagged By**: Worker10 (Integration & Migration)

---

## ⛔ Warning

**DO NOT USE CODE IN THIS DIRECTORY**

This directory contains archived code from previous project iterations that has been superseded by the current implementation.

---

## Replacement

The functionality in this directory has been replaced by:

### Current Implementation
- **Backend/TaskManager/** - Modern PHP-based task management system
  - Database-driven API architecture
  - MySQL/MariaDB backend
  - RESTful API endpoints
  - Worker claim/complete/progress tracking

### Worker Implementations
- **examples/workers/php/** - PHP worker with progress tracking
- **examples/workers/python/** - Python worker with progress tracking

---

## What Was Here

This directory contained:
- **OldBackend/src/queue/** - Old Python-based queue system (replaced by Backend/TaskManager)
- **OldBackend/src/worker_model/** - Old worker models (redesigned in current implementation)
- **Client/** - Old client code (replaced by current Frontend)

---

## Why It's Obsolete

1. **Architecture Change**: Moved from Python to PHP for shared hosting compatibility
2. **Database Change**: Redesigned for MySQL instead of SQLite
3. **API Design**: New data-driven API approach
4. **Feature Enhancements**: Added progress tracking, priority queuing, deduplication
5. **Production Ready**: Current implementation has comprehensive testing (175+ tests)

---

## Migration Complete

All functionality from this old implementation has been migrated to the current codebase:
- ✅ Task creation and queuing
- ✅ Worker claiming and processing
- ✅ Task completion and failure handling
- ✅ **NEW**: Progress tracking (0-100%)
- ✅ **NEW**: Priority-based claiming
- ✅ **NEW**: Automatic retry logic
- ✅ **NEW**: Task deduplication

---

## Scheduled Removal

This directory is scheduled for removal after:
1. ✅ Verification that no code references it
2. ✅ Verification that no documentation links to it
3. ⏳ Team approval
4. ⏳ Git archival tag created

See `OLD_FILES_TO_REMOVE.md` in the root directory for details.

---

## Need Help?

If you need information about:
- **Task Management**: See `Backend/TaskManager/README.md`
- **Worker Implementation**: See `examples/workers/`
- **API Documentation**: See `Backend/TaskManager/docs/`
- **Migration Questions**: Contact Worker10 (Integration & Migration)

---

## References

For current implementation details, see:
- Queue System Planning: `_meta/issues/done/queue-system/`
- Worker Assignments: `_meta/issues/done/queue-system/QUEUE-SYSTEM-PARALLELIZATION.md`
- Implementation Status: `_meta/issues/done/queue-system/IMPLEMENTATION-SUMMARY.md`

---

**Last Updated**: 2025-11-08  
**Action Required**: None - await scheduled removal
