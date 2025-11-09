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

// API Security
// IMPORTANT: Change this to a secure random string for production
// Generate with: openssl rand -hex 32
// Or: php -r "echo bin2hex(random_bytes(32));"
define('API_KEY', 'CHANGE_THIS_TO_A_SECURE_RANDOM_KEY_IN_PRODUCTION');

// CORS Configuration
// For APIs accessed from multiple client types (desktop apps, mobile apps, browsers)
// Use '*' to allow all origins, or specify comma-separated origins for restriction
// Note: Desktop apps and mobile apps typically don't send Origin headers, so '*' is appropriate
// Example: 'https://example.com,https://app.example.com' for browser-only restriction
define('CORS_ALLOWED_ORIGINS', '*');  // Recommended for multi-platform client access (desktop, mobile, web)

// Rate Limiting
define('RATE_LIMIT_ENABLED', true);           // Enable rate limiting
define('RATE_LIMIT_MAX_REQUESTS', 100);       // Max requests per time window
define('RATE_LIMIT_TIME_WINDOW', 60);         // Time window in seconds (60 = 1 minute)

// Request Size Limits
define('MAX_REQUEST_SIZE', 1048576);          // Max request body size in bytes (1MB)

// IP Access Control (optional)
define('IP_WHITELIST_ENABLED', false);        // Enable IP whitelist
define('IP_WHITELIST', '');                   // Comma-separated IP addresses (e.g., '192.168.1.1,10.0.0.1')
define('IP_BLACKLIST_ENABLED', false);        // Enable IP blacklist
define('IP_BLACKLIST', '');                   // Comma-separated IP addresses to block

// Security Headers
define('ENABLE_SECURITY_HEADERS', true);      // Enable security headers (HSTS, CSP, etc.)

// JSON Schema Validation
define('ENABLE_SCHEMA_VALIDATION', true);     // Enable JSON schema validation for task parameters

// Timezone
date_default_timezone_set('UTC');
