# TaskManager Worker Example

Comprehensive Python worker example demonstrating all core operations for TaskManager API integration.

## Overview

This worker demonstrates:

1. **Worker Registration** - Initialize worker with unique ID
2. **Task Claiming** - Claim tasks from the API queue
3. **Task Creation** - Create new tasks (e.g., channel scraper creating video download tasks)
4. **Task Completion** - Report successful task completion
5. **Progress Updates** - Update task progress for long-running operations
6. **Error Handling** - Proper error handling and task failure reporting

## Quick Start

### Prerequisites

```bash
# Install Python dependencies
pip install -r requirements.txt

# Ensure TaskManager API is running
# Default: http://localhost:8000/api
```

### Run the Worker

```bash
# Run with default settings
python worker_example.py

# Run with debug logging
python worker_example.py --debug

# Process specific task type IDs
python worker_example.py --task-type-ids="1,2,3"

# Process 10 tasks then exit
python worker_example.py --max-runs=10

# Use custom API URL
python worker_example.py --api-url=https://api.example.com/api
```

### Create Test Tasks

```bash
# Create 10 mixed test tasks
python test_tasks.py --num-tasks=10

# Create only echo tasks
python test_tasks.py --task-type=echo --num-tasks=5

# Create only channel scrape tasks
python test_tasks.py --task-type=channel --num-tasks=3
```

## Example Task Types

The worker includes handlers for these example task types:

### 1. Echo Task (`example.echo`)
Simple echo task that returns the input message.

**Parameters:**
- `message` (string): Message to echo back

**Example:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "example.echo",
    "params": {"message": "Hello, World!"}
  }'
```

### 2. Uppercase Task (`example.uppercase`)
Converts text to uppercase.

**Parameters:**
- `text` (string): Text to convert

**Example:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "example.uppercase",
    "params": {"text": "hello world"}
  }'
```

### 3. Channel Scrape Task (`example.channel.scrape`)
**Demonstrates task creation capability!**

This task simulates a channel scraper that creates multiple video download tasks.

**Parameters:**
- `channel_url` (string): URL of channel to scrape

**Behavior:**
1. Simulates scraping channel for videos
2. Creates `example.video.download` tasks for each video found
3. Updates progress as videos are processed
4. Returns list of created task IDs

**Example:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "example.channel.scrape",
    "params": {"channel_url": "https://youtube.com/@example"}
  }'
```

### 4. Video Download Task (`example.video.download`)
Simulates video download with progress updates.

**Parameters:**
- `video_id` (string): Video identifier
- `title` (string): Video title
- `url` (string): Video URL

**Example:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "example.video.download",
    "params": {
      "video_id": "abc123",
      "title": "Example Video",
      "url": "https://example.com/video"
    }
  }'
```

### 5. Sleep Task (`example.sleep`)
Simulates long-running task with progress updates.

**Parameters:**
- `duration` (integer): Duration in seconds (max 30)

**Example:**
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "type": "example.sleep",
    "params": {"duration": 5}
  }'
```

## Key Features Demonstrated

### 1. Worker Registration
```python
worker = TaskManagerWorker(
    api_url='http://localhost:8000/api',
    worker_id='my-worker-01',
    task_type_ids=[1, 2, 3],
    poll_interval=10,
    debug=True
)
```

### 2. Claiming Tasks
```python
task = worker.claim_task()
if task:
    print(f"Claimed task: {task['id']}")
```

### 3. Creating New Tasks
```python
# Create a new task (e.g., from channel scraper)
new_task = worker.create_task(
    task_type='example.video.download',
    params={'video_id': 'abc123', 'title': 'Video 1'},
    priority=5,
    parent_task_id=current_task_id
)
```

### 4. Updating Progress
```python
# Update progress during long-running operations
worker.update_progress(task_id, 50, "Processing...")
```

### 5. Completing Tasks
```python
# Report successful completion
worker.complete_task(task_id, {
    'data': {'result': 'success'},
    'message': 'Task completed'
})

# Report failure
worker.fail_task(task_id, "Error message")
```

## Command-Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--api-url` | TaskManager API base URL | `http://localhost:8000/api` |
| `--worker-id` | Unique worker identifier | Auto-generated |
| `--task-type-ids` | Comma-separated task type IDs to process | All active types |
| `--poll-interval` | Seconds to wait between polls | 10 |
| `--max-runs` | Maximum tasks to process before exit | Unlimited |
| `--debug` | Enable debug logging | False |

## Architecture

### Worker Lifecycle

```
1. Initialize
   ├── Load configuration
   ├── Setup logging
   ├── Register signal handlers
   └── Log worker registration

2. Health Check
   └── Verify API connectivity

3. Main Loop
   ├── Claim task from queue
   ├── Process task (route to handler)
   ├── Report result (complete/fail)
   └── Repeat

4. Graceful Shutdown
   ├── Complete current task
   ├── Print statistics
   └── Exit cleanly
```

### Task Processing Flow

```
Worker
  ├── claim_task()
  │   ├── Query API for available tasks
  │   └── Return claimed task
  │
  ├── process_task(task)
  │   ├── Route to specific handler
  │   ├── Handler processes task
  │   │   ├── May create new tasks
  │   │   └── May update progress
  │   └── Return result
  │
  └── complete_task() / fail_task()
      └── Report result to API
```

## Customization

### Adding Custom Task Handlers

1. Add a new handler method:

```python
def _handle_my_custom_task(self, task_id: str, params: Dict[str, Any]) -> Dict[str, Any]:
    """Handle my custom task type."""
    # Your processing logic here
    result = do_something(params)
    
    # Optionally create new tasks
    self.create_task('other.task', {'data': result})
    
    # Optionally update progress
    self.update_progress(task_id, 50, "Halfway done")
    
    return {
        'success': True,
        'data': result,
        'message': 'Task completed'
    }
```

2. Add routing in `process_task()`:

```python
def process_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
    task_type = task.get('type', 'unknown')
    task_id = task.get('id', 'unknown')
    params = task.get('params', {})
    
    if task_type == 'my.custom.task':
        return self._handle_my_custom_task(task_id, params)
    # ... other handlers
```

## Real-World Example: YouTube Channel Scraper

This worker includes a practical example of a channel scraper that demonstrates how workers can create new tasks:

```python
# Channel scraper handler
def _handle_channel_scrape(self, task_id, params):
    channel_url = params['channel_url']
    
    # 1. Scrape channel for videos
    videos = scrape_channel(channel_url)
    
    # 2. Create download task for each video
    created_tasks = []
    for video in videos:
        task = self.create_task(
            task_type='example.video.download',
            params={'video_id': video['id'], 'title': video['title']},
            parent_task_id=task_id
        )
        created_tasks.append(task['id'])
    
    # 3. Return results
    return {
        'success': True,
        'data': {'tasks_created': created_tasks}
    }
```

This pattern is useful for:
- Video processing pipelines (scrape → download → process)
- Batch processing (split large job into smaller tasks)
- Multi-stage workflows (task A creates tasks B, C, D)

## Troubleshooting

### Worker Can't Connect to API

```bash
# Check API is running
curl http://localhost:8000/api/health

# Verify API URL
python worker_example.py --api-url=http://localhost:8000/api --debug
```

### Worker Not Claiming Tasks

```bash
# Check for pending tasks
curl http://localhost:8000/api/tasks?status=pending

# Create test tasks
python test_tasks.py --num-tasks=5

# Run worker with debug logging
python worker_example.py --debug
```

### Task Creation Fails

Check that the task type exists in the TaskManager:

```bash
# List all task types
curl http://localhost:8000/api/task-types
```

## Files

- `worker_example.py` - Main worker implementation with all examples
- `test_tasks.py` - Script to create test tasks
- `requirements.txt` - Python dependencies
- `README.md` - This file

## Related Documentation

- [Examples Module](../../README.md) - Examples module overview
- [TaskManager Backend](../../../Backend/TaskManager/README.md) - TaskManager API documentation
- [TaskManager API Reference](../../../Backend/TaskManager/_meta/docs/api/API_REFERENCE.md) - Complete API reference

## License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ
