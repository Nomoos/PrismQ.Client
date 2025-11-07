-- Seed Data for Data-Driven API Endpoints
-- This file populates the api_endpoints table with default TaskManager endpoints

-- Health check endpoint
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/health', 'GET', 'Health check endpoint', 'custom', 
'{
    "handler": "health_check",
    "response": {
        "status": "healthy",
        "timestamp": "{{NOW}}"
    }
}', TRUE);

-- Register/Update Task Type
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/task-types/register', 'POST', 'Register or update a task type', 'custom',
'{
    "handler": "task_type_register",
    "required_fields": ["name", "version", "param_schema"]
}', TRUE);

-- Get Task Type by Name
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/task-types/:name', 'GET', 'Get task type by name', 'query',
'{
    "table": "task_types",
    "select": ["id", "name", "version", "param_schema_json as param_schema", "is_active", "created_at", "updated_at"],
    "where": {"name": "{{path.name}}"},
    "transform": {
        "param_schema": "json_decode"
    }
}', TRUE);

-- List All Task Types
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/task-types', 'GET', 'List all task types', 'query',
'{
    "table": "task_types",
    "select": ["id", "name", "version", "is_active", "created_at", "updated_at"],
    "where_optional": {"is_active": "{{query.active_only}}"},
    "order": "name ASC"
}', TRUE);

-- Create Task
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/tasks', 'POST', 'Create a new task', 'custom',
'{
    "handler": "task_create",
    "required_fields": ["type", "params"]
}', TRUE);

-- Claim Task
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/tasks/claim', 'POST', 'Claim an available task for processing', 'custom',
'{
    "handler": "task_claim",
    "required_fields": ["worker_id"]
}', TRUE);

-- Complete Task
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/tasks/:id/complete', 'POST', 'Complete a claimed task', 'custom',
'{
    "handler": "task_complete",
    "required_fields": ["worker_id", "success"]
}', TRUE);

-- Get Task by ID
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/tasks/:id', 'GET', 'Get task status and details', 'query',
'{
    "table": "tasks t",
    "joins": [
        {"type": "INNER", "table": "task_types tt", "on": "t.type_id = tt.id"}
    ],
    "select": [
        "t.id", 
        "tt.name as type", 
        "t.status", 
        "t.params_json as params", 
        "t.result_json as result",
        "t.error_message",
        "t.attempts",
        "t.claimed_by",
        "t.claimed_at",
        "t.completed_at",
        "t.created_at"
    ],
    "where": {"t.id": "{{path.id}}"},
    "transform": {
        "params": "json_decode",
        "result": "json_decode"
    }
}', TRUE);

-- List Tasks
INSERT INTO api_endpoints (path, method, description, action_type, action_config_json, is_active) VALUES
('/tasks', 'GET', 'List tasks with optional filters', 'query',
'{
    "table": "tasks t",
    "joins": [
        {"type": "INNER", "table": "task_types tt", "on": "t.type_id = tt.id"}
    ],
    "select": [
        "t.id",
        "tt.name as type",
        "t.status",
        "t.attempts",
        "t.claimed_by",
        "t.created_at",
        "t.completed_at"
    ],
    "where_optional": {
        "t.status": "{{query.status}}",
        "tt.name": "{{query.type}}"
    },
    "order": "t.created_at DESC",
    "limit": "{{query.limit:50}}",
    "offset": "{{query.offset:0}}"
}', TRUE);

-- Add validations for task creation
INSERT INTO api_validations (endpoint_id, param_name, param_source, validation_rules_json, error_message)
SELECT id, 'type', 'body', '{"type": "string", "required": true, "minLength": 1}', 'Task type is required'
FROM api_endpoints WHERE path = '/tasks' AND method = 'POST';

INSERT INTO api_validations (endpoint_id, param_name, param_source, validation_rules_json, error_message)
SELECT id, 'params', 'body', '{"type": "object", "required": true}', 'Task parameters are required'
FROM api_endpoints WHERE path = '/tasks' AND method = 'POST';

-- Add validations for task claim
INSERT INTO api_validations (endpoint_id, param_name, param_source, validation_rules_json, error_message)
SELECT id, 'worker_id', 'body', '{"type": "string", "required": true, "minLength": 1}', 'Worker ID is required'
FROM api_endpoints WHERE path = '/tasks/claim' AND method = 'POST';
