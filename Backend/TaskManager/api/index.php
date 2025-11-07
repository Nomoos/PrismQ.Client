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
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');

// Handle OPTIONS requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Parse and normalize request path
 */
function parseRequestPath() {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = str_replace('/api', '', $path);
    $path = rtrim($path, '/');
    return $path === '' ? '/' : $path;
}

// Parse request path once
$requestPath = parseRequestPath();

// Skip authentication for health check endpoint
if ($requestPath !== '/health') {
    // Get API key from header
    $apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
    
    // Validate API key using hash_equals to prevent timing attacks
    // Check if API_KEY is defined first to avoid warnings
    if (!defined('API_KEY')) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode([
            'error' => 'Configuration Error',
            'message' => 'API_KEY not configured. Please check your config.php file.',
            'timestamp' => date('c')
        ]);
        exit();
    }
    
    if (!hash_equals(API_KEY, $apiKey)) {
        header('HTTP/1.1 401 Unauthorized');
        echo json_encode([
            'error' => 'Unauthorized',
            'message' => 'Invalid or missing API key. Include X-API-Key header with your request.',
            'timestamp' => date('c')
        ]);
        exit();
    }
}

// Load required files
require_once __DIR__ . '/../database/Database.php';
require_once __DIR__ . '/ApiResponse.php';
require_once __DIR__ . '/EndpointRouter.php';
require_once __DIR__ . '/ActionExecutor.php';

// Get HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Route the request using data-driven router
try {
    $router = new EndpointRouter();
    $router->route($method, $requestPath);
    
} catch (Exception $e) {
    error_log("API Error: " . $e->getMessage());
    
    // Check if it's a known error with status code
    if (method_exists($e, 'getCode') && $e->getCode() >= 400 && $e->getCode() < 600) {
        ApiResponse::error($e->getMessage(), $e->getCode());
    }
    
    // Don't expose internal error details in production
    ApiResponse::error('Internal server error', 500);
}
