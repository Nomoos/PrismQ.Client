<?php
/**
 * Action Executor
 * 
 * Executes actions defined in endpoint configurations.
 * Supports query, insert, update, delete, and custom actions.
 */

class ActionExecutor {
    private $db;
    
    public function __construct($db) {
        $this->db = $db;
    }
    
    /**
     * Execute an endpoint action
     */
    public function execute($endpoint, $requestData) {
        $actionType = $endpoint['action_type'];
        $config = json_decode($endpoint['action_config_json'], true);
        
        switch ($actionType) {
            case 'query':
                return $this->executeQuery($config, $requestData);
            
            case 'insert':
                return $this->executeInsert($config, $requestData);
            
            case 'update':
                return $this->executeUpdate($config, $requestData);
            
            case 'delete':
                return $this->executeDelete($config, $requestData);
            
            case 'custom':
                return $this->executeCustom($config, $requestData);
            
            default:
                throw new Exception("Unknown action type: $actionType");
        }
    }
    
    /**
     * Execute a SELECT query
     */
    private function executeQuery($config, $requestData) {
        $table = $config['table'];
        $select = isset($config['select']) ? $config['select'] : ['*'];
        
        // Build SELECT clause
        $selectClause = implode(', ', $select);
        $sql = "SELECT $selectClause FROM $table";
        
        // Add JOINs
        if (isset($config['joins'])) {
            foreach ($config['joins'] as $join) {
                $joinType = $join['type'] ?? 'INNER';
                $sql .= " $joinType JOIN {$join['table']} ON {$join['on']}";
            }
        }
        
        // Build WHERE clause
        $params = [];
        $whereClauses = [];
        
        if (isset($config['where'])) {
            foreach ($config['where'] as $field => $value) {
                $resolved = $this->resolveValue($value, $requestData);
                $whereClauses[] = "$field = ?";
                $params[] = $resolved;
            }
        }
        
        // Add optional WHERE conditions (only if values are provided)
        if (isset($config['where_optional'])) {
            foreach ($config['where_optional'] as $field => $value) {
                $resolved = $this->resolveValue($value, $requestData);
                if ($resolved !== null && $resolved !== '') {
                    // Handle LIKE patterns
                    if (strpos($field, 'LIKE') !== false || strpos($resolved, '%') !== false) {
                        $whereClauses[] = "$field LIKE ?";
                    } else {
                        $whereClauses[] = "$field = ?";
                    }
                    $params[] = $resolved;
                }
            }
        }
        
        if (!empty($whereClauses)) {
            $sql .= " WHERE " . implode(' AND ', $whereClauses);
        }
        
        // Add ORDER BY
        if (isset($config['order'])) {
            $sql .= " ORDER BY {$config['order']}";
        }
        
        // Add LIMIT and OFFSET
        if (isset($config['limit'])) {
            $limit = $this->resolveValue($config['limit'], $requestData);
            $sql .= " LIMIT " . intval($limit);
        }
        
        if (isset($config['offset'])) {
            $offset = $this->resolveValue($config['offset'], $requestData);
            $sql .= " OFFSET " . intval($offset);
        }
        
        // Execute query
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        // Fetch results
        $isSingleResult = isset($config['single']) && $config['single'];
        
        if ($isSingleResult) {
            $result = $stmt->fetch();
            
            if (!$result) {
                throw new Exception("Record not found", 404);
            }
            
            // Apply transformations
            if (isset($config['transform'])) {
                $result = $this->applyTransformations($result, $config['transform']);
            }
            
            return $result;
        } else {
            $results = $stmt->fetchAll();
            
            // Apply transformations to each result
            if (isset($config['transform'])) {
                foreach ($results as &$result) {
                    $result = $this->applyTransformations($result, $config['transform']);
                }
            }
            
            return [
                'items' => $results,
                'count' => count($results)
            ];
        }
    }
    
    /**
     * Execute an INSERT query
     */
    private function executeInsert($config, $requestData) {
        $table = $config['table'];
        $fields = [];
        $values = [];
        $params = [];
        
        foreach ($config['fields'] as $field => $valueExpr) {
            $fields[] = $field;
            $values[] = '?';
            $params[] = $this->resolveValue($valueExpr, $requestData);
        }
        
        $sql = "INSERT INTO $table (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $values) . ")";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        return [
            'id' => $this->db->lastInsertId(),
            'affected_rows' => $stmt->rowCount()
        ];
    }
    
    /**
     * Execute an UPDATE query
     */
    private function executeUpdate($config, $requestData) {
        $table = $config['table'];
        $setClauses = [];
        $params = [];
        
        foreach ($config['set'] as $field => $valueExpr) {
            $setClauses[] = "$field = ?";
            $params[] = $this->resolveValue($valueExpr, $requestData);
        }
        
        $sql = "UPDATE $table SET " . implode(', ', $setClauses);
        
        // WHERE clause
        if (isset($config['where'])) {
            $whereClauses = [];
            foreach ($config['where'] as $field => $value) {
                $whereClauses[] = "$field = ?";
                $params[] = $this->resolveValue($value, $requestData);
            }
            $sql .= " WHERE " . implode(' AND ', $whereClauses);
        }
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        return ['affected_rows' => $stmt->rowCount()];
    }
    
    /**
     * Execute a DELETE query
     */
    private function executeDelete($config, $requestData) {
        $table = $config['table'];
        $sql = "DELETE FROM $table";
        $params = [];
        
        if (isset($config['where'])) {
            $whereClauses = [];
            foreach ($config['where'] as $field => $value) {
                $whereClauses[] = "$field = ?";
                $params[] = $this->resolveValue($value, $requestData);
            }
            $sql .= " WHERE " . implode(' AND ', $whereClauses);
        }
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        return ['affected_rows' => $stmt->rowCount()];
    }
    
    /**
     * Execute a custom handler
     */
    private function executeCustom($config, $requestData) {
        $handler = $config['handler'];
        
        // Load custom handlers
        require_once __DIR__ . '/CustomHandlers.php';
        
        $handlers = new CustomHandlers($this->db);
        
        if (!method_exists($handlers, $handler)) {
            throw new Exception("Unknown custom handler: $handler");
        }
        
        return $handlers->$handler($requestData, $config);
    }
    
    /**
     * Resolve a value expression (e.g., {{query.limit:50}}, {{path.id}})
     */
    private function resolveValue($expr, $requestData) {
        // If not a template expression, return as-is
        if (!is_string($expr) || !preg_match('/^{{(.+)}}$/', $expr, $matches)) {
            return $expr;
        }
        
        $path = $matches[1];
        
        // Handle default values (e.g., {{query.limit:50}})
        $defaultValue = null;
        if (strpos($path, ':') !== false) {
            list($path, $defaultValue) = explode(':', $path, 2);
        }
        
        // Special values
        if ($path === 'NOW') {
            return time();
        }
        
        // Parse path (e.g., "query.limit" -> ["query", "limit"])
        $parts = explode('.', $path);
        $value = $requestData;
        
        foreach ($parts as $part) {
            if (is_array($value) && isset($value[$part])) {
                $value = $value[$part];
            } else {
                return $defaultValue;
            }
        }
        
        return $value !== null ? $value : $defaultValue;
    }
    
    /**
     * Apply transformations to result data
     */
    private function applyTransformations($data, $transforms) {
        foreach ($transforms as $field => $transform) {
            if (!isset($data[$field])) {
                continue;
            }
            
            switch ($transform) {
                case 'json_decode':
                    $data[$field] = json_decode($data[$field], true);
                    break;
                
                case 'json_encode':
                    $data[$field] = json_encode($data[$field]);
                    break;
                
                case 'uppercase':
                    $data[$field] = strtoupper($data[$field]);
                    break;
                
                case 'lowercase':
                    $data[$field] = strtolower($data[$field]);
                    break;
            }
        }
        
        return $data;
    }
}
