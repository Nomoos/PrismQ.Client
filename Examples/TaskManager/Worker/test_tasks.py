#!/usr/bin/env python3
"""
Test script for creating sample tasks

This script creates various test tasks to demonstrate worker functionality.
"""

import argparse
import json
import sys
import time

try:
    import requests
except ImportError:
    print("ERROR: requests library not found. Install it with: pip install requests")
    sys.exit(1)


def create_task(api_url: str, task_type: str, params: dict) -> dict:
    """Create a task in TaskManager."""
    try:
        response = requests.post(
            f"{api_url}/tasks",
            json={
                'type': task_type,
                'params': params
            },
            timeout=10
        )
        
        if response.status_code in [200, 201]:
            data = response.json()
            if data.get('success'):
                task = data.get('data', data)
                task_id = task.get('id', 'unknown')
                print(f"✓ Created task: {task_id} (type: {task_type})")
                return task
        
        print(f"✗ Failed to create task: HTTP {response.status_code}")
        print(f"  Response: {response.text}")
        return None
            
    except requests.exceptions.RequestException as e:
        print(f"✗ Error creating task: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(description='Create test tasks for worker')
    parser.add_argument(
        '--api-url',
        default='http://localhost:8000/api',
        help='TaskManager API base URL (default: http://localhost:8000/api)'
    )
    parser.add_argument(
        '--num-tasks',
        type=int,
        default=10,
        help='Number of test tasks to create (default: 10)'
    )
    parser.add_argument(
        '--task-type',
        choices=['echo', 'uppercase', 'channel', 'video', 'sleep', 'all'],
        default='all',
        help='Type of tasks to create (default: all)'
    )
    
    args = parser.parse_args()
    api_url = args.api_url.rstrip('/')
    
    print("=" * 60)
    print("Creating test tasks for TaskManager Worker")
    print("=" * 60)
    print(f"API URL: {api_url}")
    print(f"Task type: {args.task_type}")
    print(f"Tasks to create: {args.num_tasks}")
    print("=" * 60)
    
    tasks = []
    task_types = []
    
    # Determine which task types to create
    if args.task_type == 'all':
        task_types = ['echo', 'uppercase', 'channel', 'video', 'sleep']
    else:
        task_types = [args.task_type]
    
    count_per_type = max(1, args.num_tasks // len(task_types))
    
    # Create echo tasks
    if 'echo' in task_types:
        print("\nCreating echo tasks...")
        for i in range(count_per_type):
            task = create_task(
                api_url,
                'example.echo',
                {'message': f'Hello from test task #{i+1}'}
            )
            if task:
                tasks.append(task)
            time.sleep(0.1)
    
    # Create uppercase tasks
    if 'uppercase' in task_types:
        print("\nCreating uppercase tasks...")
        for i in range(count_per_type):
            task = create_task(
                api_url,
                'example.uppercase',
                {'text': f'test message number {i+1}'}
            )
            if task:
                tasks.append(task)
            time.sleep(0.1)
    
    # Create channel scrape tasks
    if 'channel' in task_types:
        print("\nCreating channel scrape tasks...")
        for i in range(count_per_type):
            task = create_task(
                api_url,
                'example.channel.scrape',
                {'channel_url': f'https://example.com/channel{i+1}'}
            )
            if task:
                tasks.append(task)
            time.sleep(0.1)
    
    # Create video download tasks
    if 'video' in task_types:
        print("\nCreating video download tasks...")
        for i in range(count_per_type):
            task = create_task(
                api_url,
                'example.video.download',
                {
                    'video_id': f'video{i+1}',
                    'title': f'Test Video {i+1}',
                    'url': f'https://example.com/video{i+1}'
                }
            )
            if task:
                tasks.append(task)
            time.sleep(0.1)
    
    # Create sleep tasks
    if 'sleep' in task_types:
        print("\nCreating sleep tasks...")
        for i in range(count_per_type):
            task = create_task(
                api_url,
                'example.sleep',
                {'duration': 3 + i}
            )
            if task:
                tasks.append(task)
            time.sleep(0.1)
    
    print("\n" + "=" * 60)
    print(f"Successfully created {len(tasks)} tasks")
    print("=" * 60)
    print("\nRun the worker to process these tasks:")
    print("  python worker_example.py --debug")


if __name__ == '__main__':
    main()
