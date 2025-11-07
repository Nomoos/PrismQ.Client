<?php
/**
 * Performance Monitor
 * 
 * Minimal-overhead performance monitoring for production use.
 * Only logs operations that exceed the configured threshold.
 * 
 * Usage:
 *   $result = PerformanceMonitor::measure('operation_name', function() {
 *       // Your code here
 *       return $result;
 *   });
 * 
 * Or manually:
 *   $start = microtime(true);
 *   // Your code
 *   $duration = (microtime(true) - $start) * 1000;
 *   PerformanceMonitor::time('operation_name', $duration);
 */
class PerformanceMonitor {
    /**
     * Threshold in milliseconds - only log if operation exceeds this
     * Default: 200ms
     */
    private static $threshold = 200;
    
    /**
     * Enable/disable performance monitoring
     * Can be controlled via environment variable
     */
    private static $enabled = true;
    
    /**
     * Measure execution time of a callback function
     * 
     * @param string $operation Operation name for logging
     * @param callable $callback Function to measure
     * @return mixed Result from the callback
     */
    public static function measure($operation, $callback) {
        if (!self::$enabled) {
            return $callback();
        }
        
        $start = microtime(true);
        $result = $callback();
        $duration = (microtime(true) - $start) * 1000; // Convert to milliseconds
        
        self::time($operation, $duration);
        
        return $result;
    }
    
    /**
     * Log timing for an operation if it exceeds threshold
     * 
     * @param string $operation Operation name
     * @param float $duration Duration in milliseconds
     */
    public static function time($operation, $duration) {
        if (!self::$enabled) {
            return;
        }
        
        if ($duration > self::$threshold) {
            self::logSlow($operation, $duration);
        }
    }
    
    /**
     * Log a slow operation
     * 
     * @param string $operation Operation name
     * @param float $duration Duration in milliseconds
     */
    private static function logSlow($operation, $duration) {
        $timestamp = date('Y-m-d H:i:s');
        $message = sprintf(
            "SLOW [%s]: %.2fms at %s",
            $operation,
            $duration,
            $timestamp
        );
        
        error_log($message);
    }
    
    /**
     * Set the threshold for logging slow operations
     * 
     * @param int $milliseconds Threshold in milliseconds
     */
    public static function setThreshold($milliseconds) {
        self::$threshold = $milliseconds;
    }
    
    /**
     * Get current threshold
     * 
     * @return int Threshold in milliseconds
     */
    public static function getThreshold() {
        return self::$threshold;
    }
    
    /**
     * Enable performance monitoring
     */
    public static function enable() {
        self::$enabled = true;
    }
    
    /**
     * Disable performance monitoring
     */
    public static function disable() {
        self::$enabled = false;
    }
    
    /**
     * Check if monitoring is enabled
     * 
     * @return bool
     */
    public static function isEnabled() {
        return self::$enabled;
    }
}

// Initialize from environment if available
if (isset($_ENV['PERFORMANCE_MONITOR_THRESHOLD'])) {
    PerformanceMonitor::setThreshold((int)$_ENV['PERFORMANCE_MONITOR_THRESHOLD']);
}

if (isset($_ENV['PERFORMANCE_MONITOR_ENABLED'])) {
    if ($_ENV['PERFORMANCE_MONITOR_ENABLED'] === 'false' || $_ENV['PERFORMANCE_MONITOR_ENABLED'] === '0') {
        PerformanceMonitor::disable();
    }
}
