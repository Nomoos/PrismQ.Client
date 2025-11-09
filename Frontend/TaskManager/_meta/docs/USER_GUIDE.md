# Frontend/TaskManager - User Guide

**Version**: 1.0  
**Last Updated**: 2025-11-09  
**Audience**: End Users

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Task Management](#task-management)
4. [Worker Dashboard](#worker-dashboard)
5. [Settings](#settings)
6. [FAQ](#faq)
7. [Best Practices](#best-practices)

---

## Introduction

### What is Frontend/TaskManager?

Frontend/TaskManager is a mobile-first web application for managing tasks in a distributed task queue system. It provides an intuitive interface for:

- Viewing and filtering tasks by status
- Claiming tasks for processing
- Updating task progress
- Completing tasks with results
- Monitoring worker activity

### Who is it for?

Frontend/TaskManager is designed for:

- **Task Workers**: Individuals who claim and process tasks from the queue
- **Task Managers**: Users who monitor task execution and worker performance
- **System Administrators**: Those who need to oversee task system health

### Key Features

- 📱 **Mobile-First**: Optimized for mobile devices with responsive design
- 🔄 **Real-Time Updates**: Live task status monitoring
- 🎯 **Smart Filtering**: Filter tasks by status (pending, claimed, completed, failed)
- 📊 **Progress Tracking**: Visual progress indicators for claimed tasks
- ⚡ **Fast Performance**: Lightweight and optimized for 3G networks
- ♿ **Accessible**: WCAG 2.1 AA compliant design

---

## Getting Started

### First Access

1. **Open the Application**
   - Navigate to your TaskManager URL (e.g., `https://your-domain.com/taskmanager/`)
   - The application will load in your web browser

2. **Homepage Overview**
   - You'll see the **Task List** view by default
   - Tasks are displayed as cards with status indicators
   - Use the filter tabs to view different task statuses

3. **Navigation**
   - Use the **bottom navigation bar** to access different sections:
     - 📋 **Tasks** - View and manage tasks
     - 👥 **Workers** - Monitor worker activity
     - ⚙️ **Settings** - Configure application settings

### Mobile vs Desktop

The application is optimized for mobile but works equally well on desktop:

- **Mobile**: Touch-friendly interface with large buttons and cards
- **Desktop**: Same interface with responsive layout adapting to larger screens

---

## Task Management

### Viewing Tasks

#### Task List View

![Task List View](screenshots/task-list.png)

The main task list displays all tasks with the following information:

- **Status Indicator**: Color-coded dot showing task status
  - 🔵 Blue - Pending
  - 🟡 Yellow - Claimed
  - 🟢 Green - Completed
  - 🔴 Red - Failed

- **Task Type**: The type of task (e.g., `PrismQ.IdeaInspiration.Generate`)
- **Task ID**: Unique identifier for the task
- **Priority**: Task priority level
- **Attempts**: Number of processing attempts
- **Progress Bar**: Visual indicator for claimed tasks (0-100%)
- **Status Badge**: Text status label
- **Timestamp**: When the task was created (e.g., "2 hours ago")

#### Filtering Tasks

Use the filter tabs at the top to view specific task statuses:

- **All** - Shows all tasks regardless of status
- **Pending** - Tasks waiting to be claimed
- **Claimed** - Tasks currently being processed
- **Completed** - Successfully finished tasks
- **Failed** - Tasks that encountered errors

**Tip**: The badge on each tab shows the count of tasks in that status.

### Task Details

#### Viewing Task Details

1. **Tap on any task card** in the task list
2. You'll navigate to the **Task Detail** view
3. Here you can see:
   - Full task information
   - Task parameters (input data)
   - Current status and progress
   - Error messages (if failed)
   - Task result (if completed)
   - Processing history

![Task Detail View](screenshots/task-detail.png)

### Claiming Tasks

To claim a task for processing:

1. Navigate to the **Task List** and filter by **Pending**
2. Tap on a pending task to view its details
3. Tap the **Claim Task** button
4. The task will be assigned to your worker ID
5. Status will change to "Claimed"
6. You can now process this task

**Important**: 
- Only pending tasks can be claimed
- Each task can only be claimed by one worker at a time
- Claimed tasks have a timeout - if not completed within the timeout period, they become available for claiming again

### Updating Progress

For claimed tasks, you can update the progress:

1. Open a claimed task in the Task Detail view
2. Use the **Progress Slider** to indicate completion percentage (0-100%)
3. Tap **Update Progress** to save
4. The progress bar will update on the task list

**Use Case**: If a task involves multiple steps, update progress as you complete each step to provide visibility.

### Completing Tasks

#### Successful Completion

When you finish processing a task successfully:

1. Open the claimed task in Task Detail view
2. Enter the **result data** in the result field (JSON format)
3. Tap **Complete Task**
4. The task status will change to "Completed"
5. The task will appear in the Completed filter

**Example Result**:
```json
{
  "status": "success",
  "output": "Task completed successfully",
  "data": {
    "processedItems": 42
  }
}
```

#### Failed Completion

If a task fails during processing:

1. Open the claimed task in Task Detail view
2. Enter an **error message** describing what went wrong
3. Tap **Mark as Failed**
4. The task will be retried automatically (up to max attempts)
5. If max attempts exceeded, it moves to the dead letter queue

**Example Error**:
```
Database connection timeout after 30 seconds
```

---

## Worker Dashboard

### Overview

The Worker Dashboard provides visibility into worker activity and performance.

![Worker Dashboard](screenshots/worker-dashboard.png)

### Worker Information

Each worker card displays:

- **Worker ID**: Unique identifier for the worker
- **Status**: Current worker status
  - 🟢 Active - Currently processing tasks
  - 🟡 Idle - Ready but not processing
  - ⚪ Offline - Not available

- **Tasks Claimed**: Number of tasks claimed by this worker
- **Tasks Completed**: Number of successfully completed tasks
- **Success Rate**: Percentage of successful task completions

### Initializing Your Worker

1. Navigate to **Workers** from the bottom navigation
2. Tap **Initialize Worker**
3. A unique worker ID will be generated and stored locally
4. Your worker status will be set to "Idle"

### Worker Status Management

You can change your worker status:

- **Set Active**: Indicates you're actively processing tasks
- **Set Idle**: Indicates you're ready but not currently processing
- **Set Offline**: (Automatic) No activity detected

---

## Settings

### Configuration

![Settings View](screenshots/settings.png)

#### API Configuration

View and configure the backend API connection:

- **API Base URL**: The URL of the Backend/TaskManager API
- **API Key**: Authentication key (if required)
- **Connection Status**: Real-time API health check

#### Application Preferences

- **Theme**: Light or Dark mode (if implemented)
- **Notifications**: Enable/disable notifications
- **Auto-refresh**: Automatically refresh task list
- **Refresh Interval**: How often to refresh (in seconds)

#### About

- Application version
- Build information
- License information

### Configuring API Connection

If you need to connect to a different backend:

1. Navigate to **Settings**
2. Tap **Edit Configuration**
3. Enter the new **API Base URL**
4. Enter the **API Key** (if required)
5. Tap **Test Connection** to verify
6. Tap **Save** to apply changes

**Example**:
```
API Base URL: https://api.prismq.nomoos.cz/api
API Key: your-api-key-here
```

---

## FAQ

### General Questions

#### Q: What browsers are supported?

**A**: Frontend/TaskManager works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (Chrome Mobile, Safari iOS)

Minimum versions:
- Chrome 90+
- Firefox 88+
- Safari 14+

#### Q: Can I use this on my phone?

**A**: Yes! The application is optimized for mobile devices. We recommend using it on devices with at least a 5" screen for the best experience.

#### Q: Does it work offline?

**A**: No, Frontend/TaskManager requires an active internet connection to communicate with the backend API.

### Task Management

#### Q: How many tasks can I claim at once?

**A**: You can claim multiple tasks, but it's recommended to claim only what you can process within the task timeout period (typically 5-15 minutes).

#### Q: What happens if I claim a task but don't complete it?

**A**: If a claimed task isn't completed within the timeout period, it will automatically become available for claiming again by you or another worker.

#### Q: Can I unclaim a task?

**A**: No, but if you need to stop processing a task, you can mark it as failed with an appropriate error message.

#### Q: Why can't I see some tasks?

**A**: Tasks may be filtered by status. Make sure you select the **All** filter tab to see all tasks, or check the specific status filter.

### Troubleshooting

#### Q: Tasks aren't loading - what should I do?

**A**: Try these steps:
1. Check your internet connection
2. Verify the API connection in Settings
3. Refresh the page (pull down to refresh on mobile)
4. Clear browser cache and reload
5. Check if the backend API is running

#### Q: I claimed a task but can't see the complete button

**A**: Make sure:
1. You're viewing the task detail (tap on the task card)
2. The task status is "Claimed"
3. The task is claimed by your worker ID

#### Q: The progress update isn't saving

**A**: This could be due to:
1. Network connectivity issues
2. API timeout
3. Invalid progress value (must be 0-100)
4. Task is no longer in "Claimed" status

### Performance

#### Q: The app is loading slowly

**A**: Try these optimizations:
1. Use a modern browser
2. Clear browser cache
3. Check your internet connection speed
4. Reduce the number of active browser tabs

#### Q: Is there a limit on tasks displayed?

**A**: The application displays all tasks by default. Future updates may include pagination for large task lists.

---

## Best Practices

### For Task Workers

1. **Claim Responsibly**: Only claim tasks you can complete within the timeout
2. **Update Progress**: Keep progress updated for long-running tasks
3. **Clear Error Messages**: Provide descriptive error messages when marking tasks as failed
4. **Monitor Your Worker**: Keep your worker status accurate (Active/Idle)
5. **Complete Promptly**: Complete or fail tasks quickly to avoid timeout

### For Task Managers

1. **Monitor Regularly**: Check worker dashboard for stuck or failed tasks
2. **Review Failed Tasks**: Investigate patterns in task failures
3. **Optimize Timeouts**: Adjust task timeouts based on typical completion times
4. **Balance Load**: Ensure tasks are distributed evenly among workers

### Performance Tips

1. **Mobile Data**: The app is optimized for 3G, but works best on WiFi
2. **Refresh Strategy**: Use pull-to-refresh instead of constant page reloads
3. **Filter Usage**: Use status filters to reduce data loaded
4. **Background Tabs**: Close unused tabs to free up browser memory

### Security Tips

1. **Protect API Keys**: Never share your API key
2. **Secure Connection**: Always use HTTPS URLs
3. **Logout**: If sharing a device, clear browser data after use
4. **Worker ID**: Your worker ID is stored locally - clear it if switching devices

---

## Support

### Getting Help

If you need assistance:

1. Check the [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Review the [FAQ](#faq) above
3. Contact your system administrator
4. Check the [Developer Guide](DEVELOPER_GUIDE.md) for technical details

### Reporting Issues

When reporting issues, include:

- Browser and version
- Device type (mobile/desktop)
- Steps to reproduce the issue
- Screenshots or error messages
- Task ID (if applicable)

---

## Glossary

- **Task**: A unit of work to be processed
- **Task Type**: Category of task (e.g., PrismQ.IdeaInspiration.Generate)
- **Worker**: A person or system that processes tasks
- **Worker ID**: Unique identifier for a worker
- **Claim**: Assigning a task to a worker for processing
- **Progress**: Percentage completion of a claimed task (0-100%)
- **Status**: Current state of a task (pending, claimed, completed, failed)
- **Priority**: Importance level of a task
- **Attempts**: Number of times a task has been processed
- **Timeout**: Maximum time allowed for processing a claimed task
- **Dead Letter Queue**: Storage for tasks that have failed maximum attempts

---

**Document Owner**: Worker06 (Documentation Specialist)  
**Last Updated**: 2025-11-09  
**Version**: 1.0  
**Status**: ✅ Complete
