<?php
/**
 * TaskManager API Router
 * 
 * Main entry point for all TaskManager API requests.
 * Uses data-driven endpoint routing from database.
 */

// Load configuration first
require_once __DIR__ . '/../config/config.php';

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

// Load required files
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/ApiResponse.php';
require_once __DIR__ . '/EndpointRouter.php';
require_once __DIR__ . '/ActionExecutor.php';

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path); // Remove /api prefix if present

// Remove trailing slash
$path = rtrim($path, '/');

// If path is empty, set to root
if ($path === '') {
    $path = '/';
}

// Route the request using data-driven router
try {
    $router = new EndpointRouter();
    $router->route($method, $path);
    
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    
    // Check if it's a known error with status code
    if (method_exists($e, 'getCode') && $e->getCode() >= 400 && $e->getCode() < 600) {
        ApiResponse::error($e->getMessage(), $e->getCode());
    }
    
    // Don't expose internal error details in production
    ApiResponse::error('Internal server error', 500);
}
