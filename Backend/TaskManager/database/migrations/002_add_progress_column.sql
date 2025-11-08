-- Migration: Add progress column to tasks table
-- Date: 2025-11-08
-- Description: Adds progress field to support real-time task progress tracking (0-100%)

-- Add progress column with default value 0
ALTER TABLE tasks 
ADD COLUMN progress INT DEFAULT 0 
AFTER priority;

-- Add index for efficient progress-based queries
ALTER TABLE tasks 
ADD INDEX idx_progress (progress);

-- Add constraint to ensure progress is between 0 and 100
-- Note: MySQL doesn't support CHECK constraints in older versions,
-- so validation should also be done at application level
