# ISSUE-TASKMANAGER-008: Performance Optimization and Monitoring

## Status
🔴 NOT STARTED

## Component
Backend/TaskManager (Performance)

## Type
Performance / Optimization

## Priority
Medium

## Assigned To
Worker09 - Performance & Optimization Expert

## Description
Analyze and optimize TaskManager performance, implement monitoring, and create performance benchmarks.

## Problem Statement
To ensure TaskManager performs well under load and meets performance targets:
- API response times should be < 100ms for most operations
- Database queries should be optimized
- Memory usage should be minimal
- Concurrent requests should be handled efficiently
- Bottlenecks should be identified and resolved

## Solution
Implement comprehensive performance optimization:
1. Profile current performance
2. Optimize database queries and indexes
3. Implement caching where appropriate
4. Optimize PHP code
5. Add performance monitoring
6. Create benchmarking tools
7. Document performance characteristics

## Acceptance Criteria
- [ ] Performance profiling complete
- [ ] Database queries optimized
- [ ] Indexes reviewed and optimized
- [ ] Response time targets met (< 100ms)
- [ ] Caching strategy implemented
- [ ] Memory usage optimized
- [ ] Concurrent request handling tested
- [ ] Performance monitoring tools created
- [ ] Benchmark results documented
- [ ] Performance guide created

## Dependencies
- ISSUE-TASKMANAGER-002 (API endpoints) ✅
- ISSUE-TASKMANAGER-005 (Testing)

## Related Issues
- ISSUE-TASKMANAGER-007 (PHP refactoring)
- ISSUE-TASKMANAGER-010 (Review)

## Performance Targets

| Operation | Target | Current | Status |
|-----------|--------|---------|--------|
| Task Creation | < 50ms | TBD | 🔴 |
| Task Claim | < 100ms | TBD | 🔴 |
| Task Complete | < 50ms | TBD | 🔴 |
| Task Get | < 20ms | TBD | 🔴 |
| Task List | < 100ms | TBD | 🔴 |
| Task Type Register | < 30ms | TBD | 🔴 |
| Health Check | < 10ms | TBD | 🔴 |

## Profiling Areas

### 1. Database Performance
**Analyze**:
- Query execution times
- Index usage
- Table scan frequency
- Connection overhead
- Transaction duration

**Tools**:
```sql
-- Enable query profiling
SET profiling = 1;

-- Run queries
SELECT ...;

-- View profile
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;
```

### 2. PHP Performance
**Analyze**:
- Function execution times
- Memory allocation
- File I/O operations
- JSON encoding/decoding
- Regular expression performance

**Tools**:
- Xdebug profiler
- Blackfire.io
- Custom timing functions

### 3. API Performance
**Analyze**:
- Request parsing time
- Response generation time
- Header overhead
- JSON serialization time

## Optimization Strategies

### Database Optimization

**1. Index Optimization**
```sql
-- Analyze current indexes
SHOW INDEX FROM tasks;

-- Add composite indexes for common queries
CREATE INDEX idx_type_status_created ON tasks(type_id, status, created_at);

-- Analyze query performance
EXPLAIN SELECT * FROM tasks WHERE type_id = ? AND status = 'pending';
```

**2. Query Optimization**
```php
// Before: Multiple queries
$taskType = getTaskType($typeName);
$tasks = getTasks($taskType['id']);

// After: Single join query
$tasks = getTasksWithType($typeName);
```

**3. Connection Pooling**
```php
// Reuse connections instead of creating new ones
// Already implemented via singleton pattern
```

### PHP Optimization

**1. Opcode Caching**
```php
// Ensure OPcache is enabled in php.ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
```

**2. JSON Optimization**
```php
// Use JSON_UNESCAPED_UNICODE only when needed
$json = json_encode($data, JSON_UNESCAPED_SLASHES);

// Cache decoded JSON schemas
static $schemaCache = [];
if (!isset($schemaCache[$typeId])) {
    $schemaCache[$typeId] = json_decode($schema, true);
}
```

**3. Memory Optimization**
```php
// Unset large variables when done
unset($largeArray);

// Use generators for large datasets
function getTasks() {
    while ($row = $stmt->fetch()) {
        yield $row;
    }
}
```

### Caching Strategy

**1. Schema Caching**
```php
// Cache parsed JSON schemas in memory
class SchemaCache {
    private static $cache = [];
    
    public static function get($typeId, $schemaJson) {
        if (!isset(self::$cache[$typeId])) {
            self::$cache[$typeId] = json_decode($schemaJson, true);
        }
        return self::$cache[$typeId];
    }
}
```

**2. Response Caching** (if appropriate)
```php
// Cache GET responses for a short time
// Note: Must consider Cache-Control: no-store requirement
// Only cache non-critical reads if safe
```

## Monitoring Implementation

### 1. Performance Logging
```php
class PerformanceLogger {
    private $startTime;
    
    public function start() {
        $this->startTime = microtime(true);
    }
    
    public function end($operation) {
        $duration = (microtime(true) - $this->startTime) * 1000; // ms
        error_log("Performance: $operation took {$duration}ms");
        
        if ($duration > 100) {
            error_log("WARNING: Slow operation: $operation");
        }
    }
}
```

### 2. Query Logging
```php
// Log slow queries
class QueryLogger {
    public function logQuery($query, $duration) {
        if ($duration > 50) { // 50ms threshold
            error_log("Slow query: $query ({$duration}ms)");
        }
    }
}
```

### 3. Metrics Collection
```php
// Collect metrics for monitoring
class Metrics {
    public static function record($metric, $value) {
        // Store in file or send to monitoring service
        $line = time() . ",$metric,$value\n";
        file_put_contents('/tmp/metrics.log', $line, FILE_APPEND);
    }
}
```

## Benchmarking Tools

### 1. Apache Bench (ab)
```bash
# Test task creation endpoint
ab -n 1000 -c 10 -p task.json -T application/json \
   http://localhost/api/tasks

# Test health endpoint
ab -n 10000 -c 50 http://localhost/api/health
```

### 2. Custom Benchmark Script
```php
// benchmark.php
class Benchmark {
    public function runBenchmarks() {
        $this->benchmarkTaskCreation();
        $this->benchmarkTaskClaim();
        $this->benchmarkTaskComplete();
        $this->generateReport();
    }
    
    private function benchmarkTaskCreation() {
        $times = [];
        for ($i = 0; $i < 1000; $i++) {
            $start = microtime(true);
            // Create task
            $times[] = (microtime(true) - $start) * 1000;
        }
        
        return [
            'avg' => array_sum($times) / count($times),
            'min' => min($times),
            'max' => max($times),
            'p95' => $this->percentile($times, 95),
            'p99' => $this->percentile($times, 99),
        ];
    }
}
```

### 3. Load Testing
```bash
# Using Apache JMeter or similar
# Test scenarios:
# - 100 concurrent task creations
# - 50 concurrent task claims
# - Mixed read/write operations
```

## Performance Report Template

```markdown
# TaskManager Performance Report

## Test Environment
- PHP Version: 8.0
- MySQL Version: 8.0
- Server: Apache 2.4
- Hardware: 2 CPU, 4GB RAM

## Results

### API Response Times
| Endpoint | Avg | P95 | P99 | Status |
|----------|-----|-----|-----|--------|
| POST /tasks | 45ms | 67ms | 89ms | ✅ |
| POST /tasks/claim | 78ms | 98ms | 120ms | ⚠️ |
| ...

### Database Performance
| Query | Avg Time | Status |
|-------|----------|--------|
| INSERT task | 12ms | ✅ |
| SELECT task (claim) | 45ms | ⚠️ |
| ...

### Load Testing
- Concurrent users: 50
- Requests per second: 245
- Error rate: 0.1%
- Avg response time: 67ms

## Bottlenecks Identified
1. Task claim query is slow (needs index)
2. JSON schema validation CPU-intensive
3. ...

## Optimizations Applied
1. Added composite index on (type_id, status, created_at)
2. Cached parsed JSON schemas
3. ...

## Recommendations
1. Enable OPcache in production
2. Consider read replicas for heavy read loads
3. Monitor slow query log
```

## Estimated Effort
- Performance profiling: 2 days
- Database optimization: 2 days
- PHP optimization: 2 days
- Caching implementation: 1 day
- Monitoring tools: 2 days
- Benchmarking: 1 day
- Documentation: 1 day
- **Total: 11 days**

## Success Criteria
✅ All performance targets met  
✅ Bottlenecks identified and documented  
✅ Optimizations implemented and tested  
✅ Monitoring tools in place  
✅ Benchmark results documented  
✅ Performance guide created  
✅ Worker10 review passed
