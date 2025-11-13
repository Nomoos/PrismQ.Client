# Examples Module

Comprehensive examples and demonstrations for PrismQ.Client modules.

## Overview

This directory contains practical, runnable examples demonstrating how to integrate with and use various PrismQ.Client modules. Each example is production-ready and includes complete documentation.

## Available Examples

### TaskManager Examples

**[TaskManager](./TaskManager/)** - Task queue and worker examples

Complete examples for distributed task processing:
- Worker registration and task claiming
- Task creation and sub-task spawning
- Task completion and progress updates
- Error handling and graceful shutdown

**Quick Start:**
```bash
cd TaskManager/Worker/
pip install -r requirements.txt
python worker_example.py --debug
```

**Use Cases:**
- Distributed task processing
- Multi-stage workflows
- Batch processing
- Long-running operations with progress tracking

## Purpose

The Examples module provides:

1. **Learning Resources** - Understand how to use PrismQ.Client modules
2. **Starting Templates** - Copy and customize for your projects
3. **Best Practices** - See recommended patterns and architectures
4. **Testing Tools** - Scripts to create test data and scenarios

## Structure

```
Examples/
├── TaskManager/           # TaskManager module examples
│   ├── Worker/           # Worker implementation examples
│   │   ├── worker_example.py    # Comprehensive worker
│   │   ├── test_tasks.py        # Test task creator
│   │   ├── requirements.txt     # Dependencies
│   │   └── README.md           # Documentation
│   └── README.md         # TaskManager examples overview
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Python 3.7 or higher (for Python examples)
- Access to TaskManager API (Backend module)

### Run Your First Example

1. **Clone or navigate to the repository**
   ```bash
   cd /path/to/PrismQ.Client
   ```

2. **Start the TaskManager API** (if not already running)
   ```bash
   cd Backend/TaskManager/src
   php -S localhost:8000
   ```

3. **Navigate to an example**
   ```bash
   cd Examples/TaskManager/Worker
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create test tasks**
   ```bash
   python test_tasks.py --num-tasks=10
   ```

6. **Run the example**
   ```bash
   python worker_example.py --debug
   ```

## Example Categories

### 1. Worker Examples
Located in `TaskManager/Worker/`

Demonstrates:
- ✅ Worker registration
- ✅ Task claiming
- ✅ Task creation (spawning sub-tasks)
- ✅ Task completion
- ✅ Progress updates
- ✅ Error handling

Real-world use case: Channel scraper that creates video download tasks

### 2. Integration Examples (Future)
Coming soon: Full integration examples showing end-to-end workflows

### 3. Testing Examples (Future)
Coming soon: Examples for testing workers and task processing

## Key Concepts

### Worker Registration
Each worker has a unique ID for tracking and coordination:
```python
worker = TaskManagerWorker(
    worker_id='my-worker-01',
    api_url='http://localhost:8000/api'
)
```

### Task Claiming
Workers claim tasks from the queue:
```python
task = worker.claim_task()
```

### Task Creation
Workers can create new tasks (e.g., for multi-stage workflows):
```python
new_task = worker.create_task(
    task_type='video.download',
    params={'video_id': 'abc123'}
)
```

### Task Completion
Report successful or failed task completion:
```python
worker.complete_task(task_id, result)
worker.fail_task(task_id, error_message)
```

## Common Patterns

### Pattern 1: Simple Task Processing
```
Worker → Claim Task → Process → Complete
```

### Pattern 2: Multi-Task Creation
```
Worker → Claim Channel Task → 
  Create Video Tasks → Complete Channel Task →
  Claim Video Tasks → Process Videos → Complete Video Tasks
```

### Pattern 3: Progress Tracking
```
Worker → Claim Task → 
  Update Progress (0%) →
  Update Progress (50%) →
  Update Progress (100%) →
  Complete Task
```

## Customization

All examples are designed to be:
1. **Copied** - Use as starting point for your projects
2. **Modified** - Customize handlers and logic
3. **Extended** - Add new task types and features

Example customization:
```python
def _handle_my_custom_task(self, task_id, params):
    # Your custom logic here
    result = process_my_data(params)
    
    # Create sub-tasks if needed
    self.create_task('subtask.type', {'data': result})
    
    return {'success': True, 'data': result}
```

## Testing

Each example includes test scripts:

```bash
# Create test tasks
python test_tasks.py --num-tasks=10

# Create specific task types
python test_tasks.py --task-type=channel --num-tasks=5

# Run worker to process tasks
python worker_example.py --debug --max-runs=10
```

## Troubleshooting

### Can't Connect to API
```bash
# Check API health
curl http://localhost:8000/api/health

# Verify API is running
ps aux | grep php
```

### No Tasks to Process
```bash
# Create test tasks
python test_tasks.py --num-tasks=10

# Check pending tasks
curl http://localhost:8000/api/tasks?status=pending
```

### Import Errors
```bash
# Install dependencies
pip install -r requirements.txt

# Check Python version
python --version  # Should be 3.7+
```

## Related Documentation

### TaskManager Module
- [TaskManager Examples](./TaskManager/README.md) - TaskManager-specific examples
- [Worker README](./TaskManager/Worker/README.md) - Detailed worker documentation
- [TaskManager Backend](../Backend/TaskManager/README.md) - Backend API documentation

### Project Documentation
- [Main README](../README.md) - Project overview
- [Setup Guide](../_meta/docs/SETUP.md) - Installation guide
- [Development Guide](../_meta/docs/DEVELOPMENT.md) - Development practices

## Contributing

To add a new example:

1. Create a new directory under appropriate category
2. Include working code with comments
3. Add README.md with:
   - Overview and purpose
   - Prerequisites
   - Quick start instructions
   - Example usage
   - Customization guide
4. Include test scripts or sample data
5. Add requirements.txt or equivalent

## License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ
