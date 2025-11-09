-- Migration: Add index on claimed_at column
-- Date: 2025-11-09
-- Description: Adds index on claimed_at to optimize task claiming queries that check for timed-out tasks
--              This improves performance of the claim endpoint when filtering by claimed_at timestamp

-- Add index for efficient claimed_at-based queries (timeout detection)
ALTER TABLE tasks 
ADD INDEX idx_claimed_at (claimed_at);
