-- TaskManager Database Schema
-- Lightweight task management system for shared hosting (MySQL/MariaDB)
-- No long-running processes - all operations are on-demand via HTTP

-- Task Types Table
-- Stores registered task types with their JSON schema for parameter validation
CREATE TABLE IF NOT EXISTS task_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    version VARCHAR(50) NOT NULL,
    param_schema_json TEXT NOT NULL,  -- JSON Schema for validating task parameters
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tasks Table
-- Stores individual tasks with their parameters, status, and results
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    status ENUM('pending', 'claimed', 'completed', 'failed') DEFAULT 'pending',
    params_json TEXT NOT NULL,        -- Task parameters (validated against type's schema)
    dedupe_key VARCHAR(64) NOT NULL,  -- Hash of type + params for deduplication
    result_json TEXT,                 -- Task result (populated on completion)
    error_message TEXT,               -- Error details if failed
    attempts INT DEFAULT 0,           -- Number of execution attempts
    claimed_by VARCHAR(255),          -- Worker identifier that claimed this task
    claimed_at TIMESTAMP NULL,        -- When task was claimed
    completed_at TIMESTAMP NULL,      -- When task was completed/failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES task_types(id) ON DELETE CASCADE,
    UNIQUE KEY unique_dedupe (dedupe_key),
    INDEX idx_type_status (type_id, status),
    INDEX idx_status (status),
    INDEX idx_dedupe (dedupe_key),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Task execution history (optional, for audit trail)
CREATE TABLE IF NOT EXISTS task_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    status_change VARCHAR(50) NOT NULL,
    worker_id VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
