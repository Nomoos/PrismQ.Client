<?php
/**
 * TaskManager Configuration
 * 
 * Configure database connection and system parameters for the TaskManager.
 * Copy this file to config.php and update with your database credentials.
 */

// Database Configuration
define('DB_HOST', 'localhost');          // Database host
define('DB_NAME', 'taskmanager');        // Database name
define('DB_USER', 'your_db_user');       // Database username
define('DB_PASS', 'your_db_password');   // Database password
define('DB_CHARSET', 'utf8mb4');         // Character set

// Task Configuration
define('TASK_CLAIM_TIMEOUT', 300);       // Time in seconds before claimed task can be reclaimed (5 minutes)
define('MAX_TASK_ATTEMPTS', 3);          // Maximum number of retry attempts per task
define('ENABLE_TASK_HISTORY', true);     // Whether to log task status changes to history table

// API Configuration
define('API_RESPONSE_CACHE_CONTROL', 'no-store, no-cache, must-revalidate, max-age=0');

// JSON Schema Validation
define('ENABLE_SCHEMA_VALIDATION', true); // Enable JSON schema validation for task parameters

// Timezone
date_default_timezone_set('UTC');
