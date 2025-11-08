-- Migration: Add priority column to tasks table
-- Date: 2025-11-08
-- Description: Adds priority field to support priority-based task claiming

-- Add priority column with default value 0
ALTER TABLE tasks 
ADD COLUMN priority INT DEFAULT 0 
AFTER error_message;

-- Add index for efficient priority-based queries
ALTER TABLE tasks 
ADD INDEX idx_priority (priority);
