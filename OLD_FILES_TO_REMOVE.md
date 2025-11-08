# Old Development Files - Scheduled for Removal

**Date**: 2025-11-08  
**Worker**: Worker10 (Integration & Migration)  
**Status**: Flagged for removal

---

## Overview

This document identifies obsolete development files and directories that are no longer needed in the current codebase. These files are from previous iterations of the project and should be removed once verified that no dependencies exist.

---

## Directories to Remove

### 1. `sort_ClientOLD/`

**Location**: `/sort_ClientOLD/`  
**Size**: Contains multiple subdirectories (Client/, OldBackend/)  
**Reason**: Contains archived code from old implementation

**Contents**:
```
sort_ClientOLD/
├── Client/          # Old client implementation
└── OldBackend/      # Old backend implementation with Python queue system
    ├── _meta/
    ├── src/
    │   ├── queue/           # Old Python-based queue system
    │   │   ├── worker.py
    │   │   ├── worker_config.py
    │   │   ├── demo_worker.py
    │   │   └── examples/
    │   └── worker_model/    # Old worker model
    └── venv/                # Old virtual environment
```

**Why it's obsolete**:
- Replaced by current Backend/TaskManager PHP implementation
- Old Python-based queue system replaced by MySQL/PHP task queue
- Worker models redesigned in current implementation

**Action Required**:
1. ✅ Verify no code references `sort_ClientOLD/`
2. ✅ Verify no documentation links to files in this directory
3. ⏳ Archive to separate backup if needed
4. ⏳ Remove from repository

**Estimated Impact**: Low - appears to be completely isolated

---

## Individual Files to Review

### Development/Test Files

None identified at this time in the main codebase.

---

## Migration Notes

### Before Removal

- [x] Document what's being removed (this file)
- [ ] Search codebase for any references:
  ```bash
  grep -r "sort_ClientOLD" . --exclude-dir=.git
  grep -r "OldBackend" . --exclude-dir=.git
  ```
- [ ] Check if any documentation references these files
- [ ] Verify no active development branches depend on these files

### Removal Process

1. **Phase 1**: Documentation (Current)
   - Create this flagging document
   - Notify team of planned removal

2. **Phase 2**: Verification (Week of 2025-11-11)
   - Search for references
   - Verify no dependencies
   - Get approval from team

3. **Phase 3**: Archival (Before removal)
   - Create git tag: `archive/sort_ClientOLD`
   - Optional: Create backup archive

4. **Phase 4**: Removal (After verification)
   - Remove directories
   - Commit with clear message
   - Update this document

---

## Alternative: Deprecation Notice

Instead of immediate removal, consider adding a deprecation notice:

**File**: `sort_ClientOLD/README.md`

```markdown
# DEPRECATED - Do Not Use

This directory contains obsolete code from previous project iterations.

**Status**: Scheduled for removal  
**Replacement**: Backend/TaskManager/  
**Date Flagged**: 2025-11-08

Do not use or reference code in this directory. See the current implementation in:
- Backend/TaskManager/ (PHP task management system)
- examples/workers/ (Worker implementations)

This directory will be removed in a future cleanup.
```

---

## Verification Checklist

Before removing `sort_ClientOLD/`:

- [ ] No references in active code
- [ ] No references in documentation
- [ ] No open PRs depend on it
- [ ] No active development branches use it
- [ ] Team notified and approved removal
- [ ] Backup created (if needed)
- [ ] Git tag created for archival

---

## Additional Notes

### Current Implementation

The old code has been replaced by:
- **Backend/TaskManager/**: Current PHP-based task management system
- **examples/workers/**: Current worker implementations (PHP, Python)
- **Database-driven architecture**: Modern data-driven API approach

### Why These Files Exist

These appear to be from an early Python-based queue implementation that was replaced by the current MySQL/PHP implementation documented in the Worker01-Worker10 planning documents.

---

## Contact

**Questions about removal**:
- Worker10 (Integration & Migration)
- Review with team before final removal

---

**Created**: 2025-11-08  
**Last Updated**: 2025-11-08  
**Status**: Flagged, awaiting verification
