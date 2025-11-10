/**
 * Sanitization utilities for XSS protection
 * These functions help prevent Cross-Site Scripting (XSS) attacks by sanitizing user input
 */

/**
 * Sanitize a string by escaping HTML special characters
 * This prevents XSS attacks by converting potentially dangerous characters to HTML entities
 * 
 * @param input - The input string to sanitize
 * @returns The sanitized string with HTML entities escaped
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') {
    return String(input)
  }
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  
  return input.replace(/[&<>"'/]/g, (char) => map[char])
}

/**
 * Sanitize a Worker ID by removing potentially dangerous characters
 * Allows only alphanumeric characters, hyphens, underscores, and dots
 * 
 * @param workerId - The worker ID to sanitize
 * @returns The sanitized worker ID
 */
export function sanitizeWorkerId(workerId: string): string {
  if (typeof workerId !== 'string') {
    return ''
  }
  
  // Remove any characters that aren't alphanumeric, hyphens, underscores, or dots
  return workerId.replace(/[^a-zA-Z0-9\-_.]/g, '')
}

/**
 * Sanitize a general text input by trimming and limiting length
 * Also removes any control characters that could be problematic
 * 
 * @param input - The input text to sanitize
 * @param maxLength - Maximum allowed length (default: 1000)
 * @returns The sanitized text
 */
export function sanitizeText(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return String(input)
  }
  
  // Remove control characters except newline, carriage return, and tab
  let sanitized = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  
  // Trim whitespace
  sanitized = sanitized.trim()
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }
  
  return sanitized
}

/**
 * Check if a string contains potentially dangerous content
 * This is a basic check for common XSS patterns
 * 
 * @param input - The input to check
 * @returns true if the input appears safe, false if it contains suspicious content
 */
export function isContentSafe(input: string): boolean {
  if (typeof input !== 'string') {
    return true
  }
  
  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // event handlers like onclick=, onload=, etc.
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i,
  ]
  
  return !dangerousPatterns.some(pattern => pattern.test(input))
}

/**
 * Validate and sanitize Worker ID
 * Ensures the worker ID follows the expected format
 * 
 * @param workerId - The worker ID to validate and sanitize
 * @returns Object with sanitized value and validation status
 */
export function validateAndSanitizeWorkerId(workerId: string): { 
  value: string
  isValid: boolean
  error?: string 
} {
  if (!workerId || typeof workerId !== 'string') {
    return {
      value: '',
      isValid: false,
      error: 'Worker ID is required'
    }
  }
  
  const sanitized = sanitizeWorkerId(workerId.trim())
  
  if (sanitized.length === 0) {
    return {
      value: '',
      isValid: false,
      error: 'Worker ID cannot be empty'
    }
  }
  
  if (sanitized.length < 3) {
    return {
      value: sanitized,
      isValid: false,
      error: 'Worker ID must be at least 3 characters'
    }
  }
  
  if (sanitized.length > 50) {
    return {
      value: sanitized.substring(0, 50),
      isValid: false,
      error: 'Worker ID must be at most 50 characters'
    }
  }
  
  // Check if it starts with alphanumeric character
  if (!/^[a-zA-Z0-9]/.test(sanitized)) {
    return {
      value: sanitized,
      isValid: false,
      error: 'Worker ID must start with a letter or number'
    }
  }
  
  return {
    value: sanitized,
    isValid: true
  }
}
