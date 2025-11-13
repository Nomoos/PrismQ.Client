# TaskManager Examples

Examples and demonstrations for TaskManager module integration.

## Overview

This directory contains comprehensive examples showing how to integrate with the TaskManager API for distributed task processing.

## Available Examples

### Worker Examples

**[Worker](./Worker/)** - Comprehensive Python worker example

A complete, production-ready worker implementation demonstrating:
- Worker registration with unique ID
- Task claiming from API queue
- Task creation (spawning sub-tasks)
- Task completion and progress updates
- Error handling and graceful shutdown

**Key Features:**
- ✅ All core worker operations demonstrated
- ✅ Real-world example: Channel scraper creating video download tasks
- ✅ Multiple example task handlers
- ✅ Test script for creating sample tasks
- ✅ Comprehensive documentation

**Quick Start:**
```bash
cd Worker/
pip install -r requirements.txt
python worker_example.py --debug
```

## Use Cases

### 1. Basic Task Processing
Process simple tasks like data transformation, API calls, or computations.

### 2. Multi-Stage Workflows
Create workflows where one task spawns multiple sub-tasks:
- Channel scraper → Creates video download tasks
- Batch processor → Creates individual item tasks
- Pipeline orchestrator → Creates stage-specific tasks

### 3. Long-Running Operations
Handle long-running operations with progress updates:
- File downloads with progress tracking
- Data processing with step-by-step updates
- Multi-step operations with status reporting

## Getting Started

1. **Start TaskManager API**
   ```bash
   cd ../../../Backend/TaskManager/src
   php -S localhost:8000
   ```

2. **Install Worker Dependencies**
   ```bash
   cd Worker/
   pip install -r requirements.txt
   ```

3. **Create Test Tasks**
   ```bash
   python test_tasks.py --num-tasks=10
   ```

4. **Run Worker**
   ```bash
   python worker_example.py --debug
   ```

## Architecture

```
TaskManager API (Backend)
        ↓
    Task Queue
        ↓
    ┌───────────────────────────┐
    │   Worker Example          │
    │                           │
    │  1. Claim Task            │
    │  2. Process Task          │
    │     ├── Echo              │
    │     ├── Uppercase         │
    │     ├── Channel Scrape    │
    │     │   └── Creates Tasks │
    │     ├── Video Download    │
    │     └── Sleep             │
    │  3. Report Result         │
    └───────────────────────────┘
```

## Example Task Flow

### Simple Task Processing
```
1. Worker claims task
2. Worker processes task
3. Worker reports completion
```

### Multi-Task Creation
```
1. Worker claims channel.scrape task
2. Worker scrapes channel
3. Worker creates video.download tasks for each video
4. Worker reports channel.scrape completion
5. Worker claims video.download tasks
6. Worker processes video downloads
7. Worker reports video.download completions
```

## Related Documentation

- [Worker Example README](./Worker/README.md) - Detailed worker documentation
- [TaskManager Backend](../../Backend/TaskManager/README.md) - API documentation
- [Examples Module](../README.md) - Main examples overview

## License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ
