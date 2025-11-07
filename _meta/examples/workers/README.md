# Worker Implementation Examples

Complete examples and guidelines for implementing distributed workers that integrate with the PrismQ TaskManager system.

## 📖 Overview

This directory contains production-ready worker examples that demonstrate how to:
- Integrate with the TaskManager API
- Process different types of tasks
- Handle errors and edge cases
- Deploy workers in production
- Scale workers for higher throughput

## 🚀 Quick Start

### 1. Choose Your Language

We provide worker examples in multiple languages:

- **[Python (YouTube Scraper)](./youtube/)** - Recommended for Python developers
- **[PHP](./php/)** - For PHP developers or PHP hosting environments

### 2. Review Documentation

Before implementing a worker, review these key documents:

1. **[Worker Implementation Plan](../../_meta/docs/WORKER_IMPLEMENTATION_PLAN.md)** 📋
   - Strategic plan for implementing workers
   - Implementation phases and timeline
   - Success criteria and checklist

2. **[Worker Implementation Guidelines](../../_meta/docs/WORKER_IMPLEMENTATION_GUIDELINES.md)** 📚
   - Best practices and design patterns
   - Code examples and anti-patterns
   - Security, performance, and monitoring guidelines

3. **Example-specific documentation**
   - Each example has its own README and integration guide
   - Review the example that matches your use case

## 📁 Available Examples

### YouTube Shorts Scraper (Python)

**Directory**: [`./youtube/`](./youtube/)

**Description**: Complete Python worker implementation for scraping YouTube shorts from the [PrismQ.IdeaInspiration.Sources.Content.Shorts.YouTube](https://github.com/Nomoos/PrismQ.IdeaInspiration.Sources.Content.Shorts.YouTube) repository.

**Features**:
- ✅ Mock implementation with example data
- ✅ Task claiming and processing
- ✅ Error handling and retry logic
- ✅ Graceful shutdown
- ✅ Comprehensive logging
- ✅ Production-ready deployment options

**Quick Start**:
```bash
cd youtube/
pip install -r requirements.txt
python youtube_worker.py
```

**Documentation**:
- [README](./youtube/README.md) - Quick start and overview
- [Integration Guide](./youtube/INTEGRATION_GUIDE.md) - Complete implementation guide

**Best For**:
- YouTube scraping tasks
- Python-based projects
- Learning worker implementation patterns

---

### TaskManager PHP Worker

**Directory**: [`./php/`](./php/)

**Description**: Production-ready PHP worker for processing tasks from TaskManager API, ideal for shared hosting environments.

**Features**:
- ✅ Pure PHP implementation (no background processes needed)
- ✅ Extensible task handlers
- ✅ Comprehensive error handling
- ✅ Systemd and Supervisor configs included
- ✅ Multiple example task types

**Quick Start**:
```bash
cd php/
php worker.php --api-url=http://localhost/api
```

**Documentation**:
- [README](./php/README.md) - Quick start guide
- [Integration Guide](./php/INTEGRATION_GUIDE.md) - Deployment and configuration

**Best For**:
- PHP projects
- Shared hosting environments
- When background processes aren't available

## 🎯 Implementation Steps

Follow these steps to implement a worker in your repository:

### Step 1: Plan Your Implementation

1. Review the [Worker Implementation Plan](../../_meta/docs/WORKER_IMPLEMENTATION_PLAN.md)
2. Define your task types and parameters
3. Choose your implementation language
4. Estimate timeline and resources

### Step 2: Setup Repository

1. Create worker directory in your repository
2. Copy example worker code as starting point
3. Install dependencies
4. Configure environment variables

### Step 3: Implement Task Processing

1. Implement `process_task()` method
2. Add parameter validation
3. Integrate with external services (APIs, databases, etc.)
4. Format and return results

### Step 4: Test Thoroughly

1. Write unit tests for components
2. Write integration tests with TaskManager
3. Test error scenarios
4. Perform load testing

### Step 5: Deploy to Production

1. Setup deployment configuration (systemd/Docker/etc.)
2. Configure monitoring and alerting
3. Deploy workers
4. Monitor performance and errors

## 📚 Documentation Index

### Core Documentation

| Document | Description |
|----------|-------------|
| [Worker Implementation Plan](../../_meta/docs/WORKER_IMPLEMENTATION_PLAN.md) | Strategic implementation plan |
| [Worker Implementation Guidelines](../../_meta/docs/WORKER_IMPLEMENTATION_GUIDELINES.md) | Best practices and patterns |
| [TaskManager API Reference](../../../Backend/TaskManager/docs/API_REFERENCE.md) | Complete API documentation |

### Example Documentation

| Example | Quick Start | Integration Guide |
|---------|-------------|-------------------|
| YouTube (Python) | [README](./youtube/README.md) | [Integration Guide](./youtube/INTEGRATION_GUIDE.md) |
| TaskManager (PHP) | [README](./php/README.md) | [Integration Guide](./php/INTEGRATION_GUIDE.md) |

## 🔄 Worker Lifecycle

All workers follow this standard lifecycle:

```
┌─────────────────────────────────────────────────────┐
│ 1. Initialize                                       │
│    - Load configuration                             │
│    - Setup logging                                  │
│    - Register signal handlers                       │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 2. Health Check                                     │
│    - Verify API connectivity                        │
│    - Check external service availability            │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 3. Main Loop                                        │
│    ┌─────────────────────────────────────┐          │
│    │ a. Claim task from queue            │          │
│    └──────────┬──────────────────────────┘          │
│               │                                      │
│    ┌──────────▼──────────────────────────┐          │
│    │ b. Process task                     │          │
│    └──────────┬──────────────────────────┘          │
│               │                                      │
│    ┌──────────▼──────────────────────────┐          │
│    │ c. Report result (complete/fail)    │          │
│    └──────────┬──────────────────────────┘          │
│               │                                      │
│    └──────────┘ (repeat)                            │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│ 4. Graceful Shutdown                                │
│    - Complete current task                          │
│    - Report statistics                              │
│    - Exit cleanly                                   │
└─────────────────────────────────────────────────────┘
```

## 🎓 Learning Resources

### For Beginners

Start here if you're new to distributed workers:

1. Read the [YouTube Worker README](./youtube/README.md)
2. Run the example worker with test tasks
3. Review the code and understand the workflow
4. Modify the example for your use case

### For Intermediate Developers

Ready to implement a custom worker:

1. Review the [Worker Implementation Guidelines](../../_meta/docs/WORKER_IMPLEMENTATION_GUIDELINES.md)
2. Study the [Worker Implementation Plan](../../_meta/docs/WORKER_IMPLEMENTATION_PLAN.md)
3. Copy an example worker as a template
4. Implement your task processing logic
5. Test thoroughly before deploying

### For Advanced Developers

Optimizing and scaling workers:

1. Implement connection pooling and caching
2. Add custom metrics and monitoring
3. Setup horizontal scaling with multiple workers
4. Implement advanced error handling and retry strategies
5. Optimize for specific workload patterns

## 🔗 Related Resources

### TaskManager System

- [TaskManager README](../../../Backend/TaskManager/README.md) - System overview
- [TaskManager API Reference](../../../Backend/TaskManager/docs/API_REFERENCE.md) - API documentation
- [Data-Driven Architecture](../../../Backend/TaskManager/docs/DATA_DRIVEN_ARCHITECTURE.md) - Architecture details

### PrismQ.Client

- [Main README](../../../README.md) - Client overview
- [Architecture Guide](../../docs/ARCHITECTURE.md) - System architecture
- [Integration Guide](../../docs/INTEGRATION_GUIDE.md) - Integration patterns

## 🐛 Troubleshooting

### Common Issues

#### Worker Can't Connect to API

```bash
# Check API is running
curl http://localhost:8000/api/health

# Verify API URL in configuration
echo $TASKMANAGER_API_URL

# Test with explicit URL
python worker.py --api-url=http://localhost:8000/api --debug
```

#### Worker Not Claiming Tasks

```bash
# Check for pending tasks
curl http://localhost:8000/api/tasks?status=pending

# Create test tasks
python test_worker.py --num-tasks=5

# Verify task type matches worker configuration
```

#### Worker Exits with Errors

```bash
# Enable debug logging
python worker.py --debug

# Check dependencies
pip install -r requirements.txt

# Verify Python version
python --version  # Should be 3.7+
```

### Getting Help

If you encounter issues:

1. Check the example-specific README and troubleshooting section
2. Review the [Worker Implementation Guidelines](../../_meta/docs/WORKER_IMPLEMENTATION_GUIDELINES.md)
3. Enable debug logging to get more information
4. Check TaskManager logs for API-side errors

## 📊 Worker Comparison

| Feature | Python (YouTube) | PHP (TaskManager) |
|---------|------------------|-------------------|
| **Language** | Python 3.7+ | PHP 7.4+ |
| **Task Type** | YouTube scraping | General purpose |
| **Dependencies** | requests | cURL extension |
| **Deployment** | systemd, Docker, Kubernetes | systemd, supervisor, cron |
| **Async Support** | Native (asyncio available) | Via multiple processes |
| **Best For** | Data scraping, API integration | Web hosting, shared hosting |
| **Example Complexity** | Medium | Low-Medium |

## 🎯 Choosing the Right Example

### Choose Python (YouTube) if:
- You're implementing a YouTube scraping worker
- Your project is Python-based
- You need async/await support
- You want modern Python patterns
- You're deploying to containers or VMs

### Choose PHP if:
- Your project is PHP-based
- You're on shared hosting
- You can't run background processes
- You need lightweight workers
- You're familiar with PHP ecosystem

### Implementing from Scratch?

If neither example fits your needs:
1. Review the [Worker Implementation Guidelines](../../_meta/docs/WORKER_IMPLEMENTATION_GUIDELINES.md)
2. Use the closest example as a reference
3. Follow the standard worker lifecycle
4. Implement TaskManager API integration
5. Test thoroughly before deploying

## 📄 License

Proprietary - All Rights Reserved - Copyright (c) 2025 PrismQ

## 🤝 Contributing

These examples are part of the PrismQ.Client project. For contributions:
1. Follow the patterns established in existing examples
2. Include comprehensive documentation
3. Add tests for new functionality
4. Update this README if adding new examples
