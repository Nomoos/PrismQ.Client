# User Flows

**Version**: 1.0.0  
**Last Updated**: 2025-11-09  
**Design System**: [Design System](../DESIGN_SYSTEM.md)

---

## Table of Contents

1. [Task Claiming Flow](#task-claiming-flow)
2. [Task Completion Flow](#task-completion-flow)
3. [Task Creation Flow](#task-creation-flow)
4. [Task Failure Flow](#task-failure-flow)
5. [Error Recovery Flow](#error-recovery-flow)
6. [First-Time Onboarding Flow](#first-time-onboarding-flow)

---

## Task Claiming Flow

### Purpose
Allow workers to claim available tasks from the task list.

### User Story
> "As a worker, I want to claim an available task so that I can work on it."

### Flow Diagram

```
┌─────────────┐
│  Task List  │
│   (Pending) │
└──────┬──────┘
       │
       │ 1. User views pending tasks
       ▼
┌─────────────┐
│ Select Task │
│  (Tap card) │
└──────┬──────┘
       │
       │ 2. Navigate to Task Detail
       ▼
┌─────────────┐
│ Task Detail │
│   (Pending) │
└──────┬──────┘
       │
       │ 3. Review task details
       │    - Type, priority, parameters
       │    - Check if task is suitable
       ▼
┌─────────────┐
│ Tap "Claim  │
│  This Task" │
└──────┬──────┘
       │
       │ 4. API call: POST /tasks/{id}/claim
       ▼
    ┌──┴──┐
    │ API │
    └──┬──┘
       │
   ┌───┴───┐
   │Success│
   │   ?   │
   └─┬───┬─┘
     │   │
 Yes │   │ No
     │   │
     ▼   ▼
┌────────┐ ┌────────────┐
│Success │ │   Error    │
│ Toast  │ │   Toast    │
└───┬────┘ └─────┬──────┘
    │            │
    │            │ 5. Show error
    │            │    "Task already claimed"
    │            │    "Network error"
    │            ▼
    │      ┌──────────┐
    │      │  Retry   │
    │      │   or     │
    │      │  Cancel  │
    │      └────┬─────┘
    │           │
    │      Back to step 4
    │
    │ 6. Update UI
    │    - Status badge: "Claimed"
    │    - Show "Complete" button
    │    - Update task list
    ▼
┌─────────────┐
│ Task Detail │
│  (Claimed)  │
└──────┬──────┘
       │
       │ 7. Worker can now work on task
       ▼
┌─────────────┐
│   Success   │
└─────────────┘
```

### Steps

1. **View Pending Tasks**
   - User navigates to Task List
   - Filters by "Pending" status
   - Views available tasks

2. **Select Task**
   - User taps on task card
   - Navigates to Task Detail view
   - Reviews task information

3. **Review Details**
   - User checks task type
   - Reviews parameters
   - Checks priority level
   - Decides if task is suitable

4. **Claim Task**
   - User taps "Claim This Task" button
   - Button shows loading state
   - API request sent to backend

5. **Handle Response**
   - **Success**: 
     - Show success toast
     - Update task status to "Claimed"
     - Show complete/fail buttons
     - Add to "My Tasks"
   - **Error**:
     - Show error toast with message
     - Keep button enabled
     - Allow retry

6. **Start Working**
   - Worker begins external work
   - (Optional) Update progress
   - Return to complete or fail

### Alternative Flows

#### Quick Claim (Swipe Action)

```
Task List → Swipe Right on Task → Confirm Dialog → Claim → Success/Error
```

**Swipe Right Action**:
- Only available for pending tasks
- Shows confirmation: "Claim this task?"
- Buttons: [Claim] [Cancel]
- Same API call as primary flow

#### Auto-Claim (If Enabled)

```
New Task Created → Worker Polling → Auto-Claim → Success → Notification
```

**Auto-Claim**:
- Worker has "auto-claim" setting enabled
- Backend assigns tasks automatically
- Push notification: "New task claimed"
- Task appears in "My Tasks"

### Error Scenarios

1. **Task Already Claimed**
   - Error: "This task has been claimed by another worker"
   - Action: Return to task list
   - Alternative: View other pending tasks

2. **Network Error**
   - Error: "Unable to connect to server"
   - Action: [Retry] button
   - Retry up to 3 times with exponential backoff

3. **Unauthorized**
   - Error: "You are not authorized to claim this task"
   - Action: Check worker status
   - May need to re-authenticate

4. **Task Not Found**
   - Error: "Task not found or has been deleted"
   - Action: Return to task list
   - Refresh task list

### Success Criteria

- ✅ User can view all pending tasks
- ✅ User can select and review task details
- ✅ User can claim available tasks
- ✅ System prevents double-claiming
- ✅ User receives immediate feedback
- ✅ Task appears in "My Tasks"
- ✅ Error states handled gracefully

---

## Task Completion Flow

### Purpose
Allow workers to mark claimed tasks as completed with results.

### User Story
> "As a worker, I want to complete a claimed task and submit results so that the task is marked as done."

### Flow Diagram

```
┌─────────────┐
│  My Tasks   │
│  (Claimed)  │
└──────┬──────┘
       │
       │ 1. User views claimed tasks
       ▼
┌─────────────┐
│ Select Task │
│  (Tap card) │
└──────┬──────┘
       │
       │ 2. Navigate to Task Detail
       ▼
┌─────────────┐
│ Task Detail │
│  (Claimed)  │
└──────┬──────┘
       │
       │ 3. Review current status
       │    - Progress (if any)
       │    - Time elapsed
       ▼
┌─────────────┐
│External Work│
│  (Outside   │
│   the app)  │
└──────┬──────┘
       │
       │ 4. Complete work externally
       │    - Scraping, processing, etc.
       │    - Collect result data
       ▼
┌─────────────┐
│Return to App│
│  Task Detail│
└──────┬──────┘
       │
       │ 5. Tap "Complete Task" button
       ▼
┌─────────────┐
│Result Entry │
│   (Modal)   │
└──────┬──────┘
       │
       │ 6. Enter result data (optional)
       │    - JSON result
       │    - Text notes
       │    - Attachments
       ▼
┌─────────────┐
│ Validate    │
│   Result    │
└──────┬──────┘
       │
   ┌───┴───┐
   │ Valid?│
   └─┬───┬─┘
     │   │
  No │   │ Yes
     │   │
     ▼   ▼
┌────────┐ ┌────────────┐
│  Show  │ │   Submit   │
│ Error  │ │   Result   │
└───┬────┘ └─────┬──────┘
    │            │
    │            │ 7. API: POST /tasks/{id}/complete
    │            ▼
    │      ┌──────────┐
    │      │   API    │
    │      └────┬─────┘
    │           │
    │       ┌───┴───┐
    │       │Success│
    │       │   ?   │
    │       └─┬───┬─┘
    │         │   │
    │     Yes │   │ No
    │         │   │
    │         ▼   ▼
    │   ┌────────┐ ┌────────┐
    │   │Success │ │ Error  │
    │   │ Toast  │ │ Toast  │
    │   └───┬────┘ └───┬────┘
    │       │          │
    │       │          │ Retry?
    │       │          │
    │       │ 8. Update UI    │
    │       │    - Status: Completed
    │       │    - Move to "Completed"
    │       │    - Remove from "My Tasks"
    │       ▼          │
    │  ┌─────────┐    │
    │  │Completed│    │
    │  │  List   │◄───┘
    │  └─────────┘
    │       │
    │       │ 9. Optionally view next task
    │       ▼
    └──►┌─────────┐
        │  Next   │
        │  Task?  │
        └─────────┘
```

### Steps

1. **View Claimed Tasks**
   - Navigate to "My Tasks" or Worker Dashboard
   - See list of tasks in progress
   - View progress (if updated)

2. **Select Task**
   - Tap on claimed task card
   - Navigate to Task Detail view
   - Review task information

3. **Review Status**
   - Check current progress
   - View time elapsed since claimed
   - Review parameters

4. **Perform Work**
   - Exit app (or minimize)
   - Perform actual work (scraping, processing, etc.)
   - Collect result data

5. **Return to App**
   - Open app
   - Navigate back to task
   - Review completed work

6. **Complete Task**
   - Tap "Complete Task" button
   - Modal/Bottom sheet opens
   - (Optional) Enter result data

7. **Enter Results** (Optional)
   - JSON result data
   - Text notes
   - Validation errors shown inline

8. **Submit**
   - Tap "Submit" or "Complete"
   - Loading state shown
   - API request sent

9. **Handle Response**
   - **Success**:
     - Success toast
     - Task status: "Completed"
     - Move to completed list
     - Remove from "My Tasks"
   - **Error**:
     - Error toast
     - Keep modal open
     - Allow retry

10. **Next Steps**
    - View completed tasks
    - Claim another task
    - View statistics

### Alternative Flows

#### Quick Complete (No Result Data)

```
Task Detail → Tap "Complete" → Confirm → Submit → Success
```

**Simple Completion**:
- No result data required
- Confirmation dialog: "Mark as complete?"
- Buttons: [Complete] [Cancel]
- Same API call

#### Update Progress Before Complete

```
Task Detail → Update Progress → Save → Continue Work → Complete
```

**Progress Updates**:
- Tap "Update Progress" button
- Enter percentage (0-100)
- Save progress
- Continue working
- Complete when done

### Error Scenarios

1. **Invalid Result Data**
   - Error: "Invalid JSON format"
   - Action: Show inline error
   - Highlight problem field
   - Allow correction

2. **Task No Longer Claimed**
   - Error: "Task is no longer claimed by you"
   - Action: Return to task list
   - May have been reassigned

3. **Network Error**
   - Error: "Unable to submit result"
   - Action: Save locally, retry later
   - Show [Retry] button

4. **Server Error**
   - Error: "Server error processing result"
   - Action: [Retry] or [Report Issue]
   - Save result locally

### Success Criteria

- ✅ User can complete claimed tasks
- ✅ User can optionally provide result data
- ✅ Result data is validated before submission
- ✅ User receives immediate feedback
- ✅ Task status updated correctly
- ✅ Task removed from "My Tasks"
- ✅ Task appears in "Completed" list

---

## Task Creation Flow

### Purpose
Allow users to create new tasks with specific types and parameters.

### User Story
> "As a user, I want to create a new task so that workers can claim and process it."

### Flow Diagram

```
┌─────────────┐
│  Task List  │
│   or Home   │
└──────┬──────┘
       │
       │ 1. Tap "Create Task" button
       ▼
┌─────────────┐
│Create Task  │
│    Form     │
└──────┬──────┘
       │
       │ 2. Select task type
       ▼
┌─────────────┐
│ Task Type   │
│  Dropdown   │
└──────┬──────┘
       │
       │ 3. Type selected
       │    - Loads type-specific params
       ▼
┌─────────────┐
│  Set        │
│ Priority    │
└──────┬──────┘
       │
       │ 4. Select priority
       │    - Low, Medium, High, Urgent
       ▼
┌─────────────┐
│   Set Max   │
│  Attempts   │
└──────┬──────┘
       │
       │ 5. Set max attempts (1-10)
       ▼
┌─────────────┐
│   Fill      │
│ Parameters  │
└──────┬──────┘
       │
       │ 6. Fill required params
       │    - search_query, max_results, etc.
       │    - Validation on blur
       ▼
┌─────────────┐
│  Optional   │
│   Notes     │
└──────┬──────┘
       │
       │ 7. Add notes (optional)
       ▼
┌─────────────┐
│  Validate   │
│    Form     │
└──────┬──────┘
       │
   ┌───┴───┐
   │ Valid?│
   └─┬───┬─┘
     │   │
  No │   │ Yes
     │   │
     ▼   ▼
┌────────┐ ┌────────────┐
│  Show  │ │Tap "Create"│
│ Errors │ │   Button   │
└───┬────┘ └─────┬──────┘
    │            │
    │            │ 8. API: POST /tasks
    │            ▼
    │      ┌──────────┐
    │      │   API    │
    │      └────┬─────┘
    │           │
    │       ┌───┴───┐
    │       │Success│
    │       │   ?   │
    │       └─┬───┬─┘
    │         │   │
    │     Yes │   │ No
    │         │   │
    │         ▼   ▼
    │   ┌────────┐ ┌────────┐
    │   │Success │ │ Error  │
    │   │ Toast  │ │ Toast  │
    │   └───┬────┘ └───┬────┘
    │       │          │
    │       │          │ Retry?
    │       │          │
    │       │ 9. Navigate to task
    │       │    - Show created task
    │       ▼          │
    │  ┌─────────┐    │
    │  │  Task   │    │
    │  │ Detail  │◄───┘
    │  └─────────┘
    │       │
    │       │ 10. Success!
    │       ▼
    └──►┌─────────┐
        │Task List│
        │(Updated)│
        └─────────┘
```

### Steps

1. **Initiate Creation**
   - User taps "+" or "Create Task" button
   - Navigate to Create Task form
   - Form opens (fullscreen or modal)

2. **Select Task Type**
   - Open task type dropdown
   - View available task types
   - Select desired type
   - Form updates with type-specific parameters

3. **Set Priority**
   - Select priority level
   - Options: Low, Medium, High, Urgent
   - Default: Medium

4. **Set Max Attempts**
   - Enter or select max attempts
   - Range: 1-10
   - Default: 3

5. **Fill Parameters**
   - Required parameters marked with *
   - Type-specific fields shown
   - Validation on blur
   - Error messages inline

6. **Add Notes** (Optional)
   - Textarea for additional notes
   - Max 500 characters
   - Optional field

7. **Validate Form**
   - Client-side validation
   - Required fields filled
   - Data types correct
   - Show errors if invalid

8. **Submit**
   - Tap "Create Task" button
   - Loading state shown
   - API request sent

9. **Handle Response**
   - **Success**:
     - Success toast: "Task created successfully"
     - Navigate to task detail
     - Or return to task list
   - **Error**:
     - Error toast with message
     - Keep form open
     - Allow correction and retry

10. **Post-Creation**
    - Task appears in task list
    - Status: Pending
    - Available for workers to claim

### Form Fields

**Task Type** (Required):
- Dropdown selection
- Options: All registered task types
- Example: "PrismQ.YouTube.ScrapeShorts"

**Priority** (Required):
- Dropdown selection
- Options: Low, Medium, High, Urgent
- Default: Medium

**Max Attempts** (Required):
- Number input
- Range: 1-10
- Default: 3

**Parameters** (Type-specific):
- Dynamic based on task type
- Required params marked with *
- Validation per param type

**Notes** (Optional):
- Textarea
- Max 500 characters

### Validation Rules

**Task Type**:
- Required
- Must be valid registered type

**Priority**:
- Required
- Must be one of: Low, Medium, High, Urgent

**Max Attempts**:
- Required
- Must be number
- Range: 1-10

**Parameters**:
- Required params must be filled
- String params: max length validation
- Number params: range validation
- URL params: valid URL format
- JSON params: valid JSON syntax

### Error Scenarios

1. **Validation Errors**
   - Error: "This field is required"
   - Action: Show inline error
   - Highlight problem field
   - Focus on first error

2. **Duplicate Task**
   - Error: "Similar task already exists"
   - Action: Show warning
   - Option to continue anyway

3. **Invalid Parameters**
   - Error: "Invalid parameter value"
   - Action: Show inline error
   - Provide example

4. **Network Error**
   - Error: "Unable to create task"
   - Action: [Retry] button
   - Save form data locally

### Success Criteria

- ✅ User can select task type
- ✅ User can set priority and attempts
- ✅ User can fill required parameters
- ✅ Form validates input
- ✅ User receives immediate feedback
- ✅ Task created successfully
- ✅ Task appears in list

---

## Task Failure Flow

### Purpose
Allow workers to mark tasks as failed when work cannot be completed.

### User Story
> "As a worker, I want to mark a task as failed when I cannot complete it, so the system knows the task needs attention."

### Flow Diagram

```
┌─────────────┐
│  My Tasks   │
│  (Claimed)  │
└──────┬──────┘
       │
       │ 1. Unable to complete work
       ▼
┌─────────────┐
│ Task Detail │
│  (Claimed)  │
└──────┬──────┘
       │
       │ 2. Tap "Fail Task" button
       ▼
┌─────────────┐
│Fail Task    │
│  (Modal)    │
└──────┬──────┘
       │
       │ 3. Select failure reason
       ▼
┌─────────────┐
│ Reason      │
│ Dropdown    │
└──────┬──────┘
       │
       │ 4. Select from:
       │    - Invalid parameters
       │    - Resource unavailable
       │    - Timeout
       │    - Technical error
       │    - Other
       ▼
┌─────────────┐
│  Error      │
│ Description │
└──────┬──────┘
       │
       │ 5. Enter error details
       │    - What went wrong
       │    - Steps attempted
       ▼
┌─────────────┐
│  Confirm    │
│   Failure   │
└──────┬──────┘
       │
       │ 6. Tap "Submit" or "Fail Task"
       ▼
┌─────────────┐
│   Confirm   │
│   Dialog    │
└──────┬──────┘
       │
       │ 7. "Are you sure?"
       │    [Confirm] [Cancel]
       ▼
   ┌───┴───┐
   │Confirm│
   │   ?   │
   └─┬───┬─┘
     │   │
  No │   │ Yes
     │   │
     ▼   ▼
┌────────┐ ┌────────────┐
│ Cancel │ │   Submit   │
│        │ │   Failure  │
└────────┘ └─────┬──────┘
              │
              │ 8. API: POST /tasks/{id}/fail
              ▼
        ┌──────────┐
        │   API    │
        └────┬─────┘
             │
         ┌───┴───┐
         │Success│
         │   ?   │
         └─┬───┬─┘
           │   │
       Yes │   │ No
           │   │
           ▼   ▼
      ┌────────┐ ┌────────┐
      │Success │ │ Error  │
      │ Toast  │ │ Toast  │
      └───┬────┘ └───┬────┘
          │          │
          │          │ Retry?
          │          │
          │ 9. Update UI
          │    - Status: Failed
          │    - Check attempts
          ▼          │
    ┌─────────┐     │
    │Attempts?│     │
    └─┬───┬───┘     │
      │   │         │
   <max│  │>=max    │
      │   │         │
      ▼   ▼         │
  ┌─────┐ ┌────┐   │
  │Retry│ │Done│   │
  │able │ │    │   │
  └─────┘ └────┘   │
      │      │      │
      │      │ 10. Task handling
      ▼      ▼      │
  ┌────────────┐◄──┘
  │ Task List  │
  │  (Updated) │
  └────────────┘
```

### Steps

1. **Encounter Problem**
   - Worker attempts to complete task
   - Encounters issue preventing completion
   - Returns to app

2. **Open Task**
   - Navigate to claimed task
   - View Task Detail
   - Review current state

3. **Initiate Failure**
   - Tap "Fail Task" button (danger button)
   - Modal or bottom sheet opens
   - Form for failure details

4. **Select Reason**
   - Choose failure reason from dropdown
   - Options:
     - Invalid parameters
     - Resource unavailable
     - Timeout
     - Technical error
     - Rate limit exceeded
     - Authentication failed
     - Other

5. **Provide Details**
   - Enter error message/description
   - What went wrong
   - What was attempted
   - Max 500 characters

6. **Review & Confirm**
   - Review entered information
   - Tap "Submit" or "Fail Task"
   - Confirmation dialog appears

7. **Confirm Action**
   - Dialog: "Are you sure you want to fail this task?"
   - Buttons: [Confirm] [Cancel]
   - Warning if this will exhaust attempts

8. **Submit Failure**
   - API request sent
   - Loading state shown
   - Button disabled

9. **Handle Response**
   - **Success**:
     - Success toast: "Task marked as failed"
     - Update task status
     - Check remaining attempts
   - **Error**:
     - Error toast
     - Allow retry

10. **Post-Failure**
    - **Attempts Remaining**:
      - Task status: Failed
      - Task back to "Pending" queue
      - Available for retry
    - **Max Attempts Reached**:
      - Task status: Failed (final)
      - Requires manual intervention
      - Not available for claiming

### Failure Reasons

**Invalid Parameters**:
- Task parameters incorrect
- Missing required data
- Format errors

**Resource Unavailable**:
- External API down
- Website blocked
- Service temporarily unavailable

**Timeout**:
- Operation took too long
- No response from service
- Exceeded time limit

**Technical Error**:
- Unexpected error
- System issue
- Bug encountered

**Rate Limit Exceeded**:
- API quota exceeded
- Too many requests
- Need to wait

**Authentication Failed**:
- Invalid credentials
- Token expired
- Permission denied

**Other**:
- None of the above
- Custom reason

### Error Scenarios

1. **Invalid Error Message**
   - Error: "Please provide error details"
   - Action: Show inline validation
   - Require minimum 10 characters

2. **Network Error**
   - Error: "Unable to submit failure"
   - Action: [Retry] button
   - Save failure data locally

3. **Task State Changed**
   - Error: "Task state has changed"
   - Action: Refresh and retry
   - May have been completed by another worker

### Success Criteria

- ✅ User can fail claimed tasks
- ✅ User must provide failure reason
- ✅ User can add error details
- ✅ Confirmation required before submitting
- ✅ System tracks remaining attempts
- ✅ Task re-queued if attempts remain
- ✅ Task marked final failure if max attempts

---

## Error Recovery Flow

### Purpose
Guide users through recovering from various error states.

### User Story
> "As a user, when something goes wrong, I want clear guidance on how to fix it so I can continue using the app."

### Network Error Recovery

```
┌─────────────┐
│ Using App   │
└──────┬──────┘
       │
       │ Network request
       ▼
┌─────────────┐
│Network Error│
└──────┬──────┘
       │
       │ 1. Show error state
       ▼
┌─────────────┐
│  ⚠ Error    │
│  Message    │
│  [Retry]    │
└──────┬──────┘
       │
       │ 2. User taps Retry
       ▼
┌─────────────┐
│  Checking   │
│ Connection  │
└──────┬──────┘
       │
   ┌───┴───┐
   │Online?│
   └─┬───┬─┘
     │   │
  No │   │ Yes
     │   │
     ▼   ▼
┌────────┐ ┌────────────┐
│  Show  │ │   Retry    │
│Offline │ │  Request   │
│  Tips  │ └─────┬──────┘
└───┬────┘       │
    │            │
    │        ┌───┴───┐
    │        │Success│
    │        │   ?   │
    │        └─┬───┬─┘
    │          │   │
    │      Yes │   │ No
    │          │   │
    │          ▼   ▼
    │     ┌────────┐ ┌────────┐
    │     │Success!│ │ Still  │
    │     │        │ │ Error  │
    │     └────────┘ └───┬────┘
    │                    │
    │                    │ 3. Retry count++
    │                    │
    │                ┌───┴───┐
    │                │Retries│
    │                │  < 3? │
    │                └─┬───┬─┘
    │                  │   │
    │              Yes │   │ No
    │                  │   │
    │                  ▼   ▼
    │             ┌────────┐ ┌──────────┐
    │             │  Retry │ │  Show    │
    │             │  Again │ │ Support  │
    │             └────────┘ │  Contact │
    │                        └──────────┘
    │
    │ 4. Show offline tips
    ▼
┌─────────────┐
│ Offline Tips│
│ - Check WiFi│
│ - Check Data│
│ - Restart   │
└─────────────┘
```

### API Error Recovery

```
┌─────────────┐
│ API Request │
└──────┬──────┘
       │
       │ Server responds
       ▼
┌─────────────┐
│ API Error   │
│ (4xx/5xx)   │
└──────┬──────┘
       │
       │ 1. Parse error
       ▼
   ┌───┴───┐
   │ Error │
   │ Type? │
   └─┬─┬─┬─┘
     │ │ │
  400│ │ │500
  401│ │ │
     │ │ │
     ▼ ▼ ▼
┌─────┐ ┌─────┐ ┌─────┐
│ Bad │ │Auth │ │Server│
│Request│ │Error│ │Error│
└──┬──┘ └──┬──┘ └──┬──┘
   │       │       │
   │       │       │
   ▼       ▼       ▼
┌─────┐ ┌─────┐ ┌─────┐
│Show │ │Re-  │ │Retry│
│Error│ │Login│ │Auto │
│Fix  │ │     │ │     │
│Form │ │     │ │     │
└─────┘ └─────┘ └─────┘
```

### Task State Error Recovery

```
┌─────────────┐
│ Task Action │
│ (Claim/Comp)│
└──────┬──────┘
       │
       │ API call
       ▼
┌─────────────┐
│State Conflict│
│   (409)     │
└──────┬──────┘
       │
       │ 1. Error: Task state changed
       ▼
┌─────────────┐
│ Refresh     │
│ Task Data   │
└──────┬──────┘
       │
       │ 2. Get current state
       ▼
┌─────────────┐
│ Show Current│
│    State    │
└──────┬──────┘
       │
       │ 3. Suggest action
       ▼
   ┌───┴───┐
   │ State?│
   └─┬──┬──┘
     │  │
Claimed│ │Completed
     │  │
     ▼  ▼
┌─────┐ ┌─────┐
│Already│ │Already│
│Claimed│ │Done  │
│View  │ │View  │
│Other │ │Other │
│Tasks │ │Tasks │
└─────┘ └─────┘
```

### Form Validation Error Recovery

```
┌─────────────┐
│ Submit Form │
└──────┬──────┘
       │
       │ Validate
       ▼
┌─────────────┐
│ Validation  │
│   Errors    │
└──────┬──────┘
       │
       │ 1. Collect all errors
       ▼
┌─────────────┐
│ Show Inline │
│   Errors    │
└──────┬──────┘
       │
       │ 2. For each error:
       │    - Red border
       │    - Error message
       │    - Error icon
       ▼
┌─────────────┐
│ Focus First │
│    Error    │
└──────┬──────┘
       │
       │ 3. User fixes errors
       │    - Validate on blur
       │    - Clear error when fixed
       ▼
┌─────────────┐
│ User Corrects│
└──────┬──────┘
       │
       │ 4. Revalidate
       ▼
   ┌───┴───┐
   │ Valid?│
   └─┬───┬─┘
     │   │
  No │   │ Yes
     │   │
     ▼   ▼
┌────────┐ ┌────────┐
│  More  │ │Success!│
│ Errors │ │ Submit │
└───┬────┘ └────────┘
    │
    └─── Back to step 2
```

### Success Criteria

- ✅ Clear error messages
- ✅ Actionable recovery steps
- ✅ Automatic retry for transient errors
- ✅ Manual retry option always available
- ✅ Offline mode gracefully handled
- ✅ Support contact for persistent errors
- ✅ User never stuck in error state

---

## First-Time Onboarding Flow

### Purpose
Welcome new users and guide them through initial setup.

### User Story
> "As a new user, I want to understand the app and set up my worker so I can start claiming tasks."

### Flow Diagram

```
┌─────────────┐
│  First      │
│  Launch     │
└──────┬──────┘
       │
       │ 1. Check if first time
       ▼
   ┌───┴───┐
   │First  │
   │Time?  │
   └─┬───┬─┘
     │   │
  No │   │ Yes
     │   │
     ▼   ▼
┌────────┐ ┌────────────┐
│  Go to │ │  Welcome   │
│  Main  │ │  Screen    │
└────────┘ └─────┬──────┘
              │
              │ 2. Show welcome
              ▼
         ┌─────────────┐
         │  Welcome!   │
         │ PrismQ      │
         │ TaskManager │
         └──────┬──────┘
                │
                │ 3. Tap "Get Started"
                ▼
         ┌─────────────┐
         │  Feature    │
         │  Tour       │
         │  (Carousel) │
         └──────┬──────┘
                │
                │ 4. Swipe through features
                │    - Tasks
                │    - Workers
                │    - Settings
                ▼
         ┌─────────────┐
         │  Worker     │
         │  Setup      │
         └──────┬──────┘
                │
                │ 5. Configure worker
                │    - Worker ID (auto-generated)
                │    - Auto-claim setting
                │    - Max concurrent tasks
                ▼
         ┌─────────────┐
         │  Permissions│
         │  (if needed)│
         └──────┬──────┘
                │
                │ 6. Request permissions
                │    - Notifications
                │    - Background refresh
                ▼
         ┌─────────────┐
         │  All Set!   │
         │  [Start]    │
         └──────┬──────┘
                │
                │ 7. Tap "Start"
                ▼
         ┌─────────────┐
         │  Main App   │
         │  (Task List)│
         └─────────────┘
```

### Onboarding Screens

#### 1. Welcome Screen

```
┌─────────────────────────────────────────┐
│                                         │
│         📋                              │
│                                         │
│      Welcome to                         │
│   PrismQ TaskManager                    │
│                                         │
│  Claim and complete tasks               │
│       efficiently                       │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │      [Get Started]                │   │
│ └───────────────────────────────────┘   │
│                                         │
│         [Skip Tour]                     │
│                                         │
└─────────────────────────────────────────┘
```

#### 2. Feature Tour - Tasks

```
┌─────────────────────────────────────────┐
│                                         │
│         ✓                               │
│                                         │
│      View & Claim Tasks                 │
│                                         │
│  Browse available tasks and             │
│  claim the ones you want to             │
│  work on.                               │
│                                         │
│                                         │
│         ○ ● ○ ○                         │
│                                         │
│ [Skip]                          [Next]  │
│                                         │
└─────────────────────────────────────────┘
```

#### 3. Feature Tour - Workers

```
┌─────────────────────────────────────────┐
│                                         │
│         👤                              │
│                                         │
│      Monitor Your Work                  │
│                                         │
│  Track your claimed tasks,              │
│  view progress, and see                 │
│  statistics.                            │
│                                         │
│                                         │
│         ○ ○ ● ○                         │
│                                         │
│ [Skip]                          [Next]  │
│                                         │
└─────────────────────────────────────────┘
```

#### 4. Feature Tour - Settings

```
┌─────────────────────────────────────────┐
│                                         │
│         ⚙                               │
│                                         │
│     Configure Preferences               │
│                                         │
│  Customize your worker                  │
│  settings and app preferences.          │
│                                         │
│                                         │
│         ○ ○ ○ ●                         │
│                                         │
│ [Skip]                          [Next]  │
│                                         │
└─────────────────────────────────────────┘
```

#### 5. Worker Setup

```
┌─────────────────────────────────────────┐
│ ← Worker Setup                          │
├─────────────────────────────────────────┤
│                                         │
│ Your Worker ID                          │
│ ┌─────────────────────────────────────┐ │
│ │ worker-abc123                       │ │
│ └─────────────────────────────────────┘ │
│ (Auto-generated)                        │
│                                         │
│ Auto-claim tasks                        │
│ ┌─────────────────────────────────────┐ │
│ │ [Toggle OFF]                        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Max concurrent tasks                    │
│ ┌─────────────────────────────────────┐ │
│ │ 3                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │      [Continue]                   │   │
│ └───────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

#### 6. All Set!

```
┌─────────────────────────────────────────┐
│                                         │
│         ✓                               │
│                                         │
│      All Set!                           │
│                                         │
│  You're ready to start claiming         │
│  and completing tasks.                  │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │      [Start Using App]            │   │
│ └───────────────────────────────────┘   │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

### Success Criteria

- ✅ User understands app purpose
- ✅ User completes worker setup
- ✅ User grants necessary permissions
- ✅ User can skip onboarding
- ✅ Onboarding shown only once
- ✅ User ready to use app

---

## Version History

- v1.0.0 (2025-11-09): Initial user flows for Worker11
