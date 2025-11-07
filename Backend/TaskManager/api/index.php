<?php
/**
 * TaskManager API Router
 * 
 * Main entry point for all TaskManager API requests.
 * Routes requests to appropriate endpoints.
 */

// Set headers to prevent caching
header('Cache-Control: ' . API_RESPONSE_CACHE_CONTROL);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle OPTIONS requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load configuration
require_once __DIR__ . '/../config/config.php';

// Load required files
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/ApiResponse.php';
require_once __DIR__ . '/TaskTypeController.php';
require_once __DIR__ . '/TaskController.php';

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path); // Remove /api prefix if present

// Remove trailing slash
$path = rtrim($path, '/');

// Route the request
try {
    if ($path === '/task-types/register' && $method === 'POST') {
        // Register a new task type
        $controller = new TaskTypeController();
        $controller->register();
        
    } elseif (preg_match('/^\/task-types\/(.+)$/', $path, $matches) && $method === 'GET') {
        // Get task type by name
        $controller = new TaskTypeController();
        $controller->get($matches[1]);
        
    } elseif ($path === '/task-types' && $method === 'GET') {
        // List all task types
        $controller = new TaskTypeController();
        $controller->listAll();
        
    } elseif ($path === '/tasks' && $method === 'POST') {
        // Create a new task
        $controller = new TaskController();
        $controller->create();
        
    } elseif ($path === '/tasks/claim' && $method === 'POST') {
        // Claim an available task
        $controller = new TaskController();
        $controller->claim();
        
    } elseif (preg_match('/^\/tasks\/(\d+)\/complete$/', $path, $matches) && $method === 'POST') {
        // Complete a task
        $controller = new TaskController();
        $controller->complete($matches[1]);
        
    } elseif (preg_match('/^\/tasks\/(\d+)$/', $path, $matches) && $method === 'GET') {
        // Get task status
        $controller = new TaskController();
        $controller->get($matches[1]);
        
    } elseif ($path === '/tasks' && $method === 'GET') {
        // List tasks (with filters)
        $controller = new TaskController();
        $controller->listTasks();
        
    } elseif ($path === '/health' && $method === 'GET') {
        // Health check endpoint
        ApiResponse::success(['status' => 'healthy', 'timestamp' => time()]);
        
    } else {
        // Route not found
        ApiResponse::error('Route not found', 404);
    }
    
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    ApiResponse::error('Internal server error: ' . $e->getMessage(), 500);
}
