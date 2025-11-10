import { describe, it, expect } from 'vitest'
import {
  sanitizeHtml,
  sanitizeWorkerId,
  sanitizeText,
  isContentSafe,
  validateAndSanitizeWorkerId
} from '@/utils/sanitize'

describe('Sanitization Utilities', () => {
  describe('sanitizeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(sanitizeHtml('<script>alert("xss")</script>'))
        .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;')
    })

    it('should escape ampersands', () => {
      expect(sanitizeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry')
    })

    it('should escape quotes', () => {
      expect(sanitizeHtml('Say "hello"')).toBe('Say &quot;hello&quot;')
      expect(sanitizeHtml("It's fine")).toBe('It&#x27;s fine')
    })

    it('should escape forward slashes', () => {
      expect(sanitizeHtml('a/b/c')).toBe('a&#x2F;b&#x2F;c')
    })

    it('should handle multiple special characters', () => {
      expect(sanitizeHtml('<div class="test" onclick=\'alert("xss")\'></div>'))
        .toBe('&lt;div class=&quot;test&quot; onclick=&#x27;alert(&quot;xss&quot;)&#x27;&gt;&lt;&#x2F;div&gt;')
    })

    it('should handle non-string values', () => {
      expect(sanitizeHtml(123 as any)).toBe('123')
      expect(sanitizeHtml(null as any)).toBe('null')
      expect(sanitizeHtml(undefined as any)).toBe('undefined')
    })

    it('should handle empty string', () => {
      expect(sanitizeHtml('')).toBe('')
    })

    it('should not modify safe text', () => {
      expect(sanitizeHtml('Hello World')).toBe('Hello World')
    })
  })

  describe('sanitizeWorkerId', () => {
    it('should allow valid worker IDs', () => {
      expect(sanitizeWorkerId('frontend-worker-1')).toBe('frontend-worker-1')
      expect(sanitizeWorkerId('worker_123')).toBe('worker_123')
      expect(sanitizeWorkerId('my.worker.01')).toBe('my.worker.01')
    })

    it('should remove special characters', () => {
      expect(sanitizeWorkerId('worker<script>alert(1)</script>'))
        .toBe('workerscriptalert1script')
    })

    it('should remove spaces', () => {
      expect(sanitizeWorkerId('worker 123')).toBe('worker123')
    })

    it('should remove XSS attempts', () => {
      expect(sanitizeWorkerId('worker\'" onclick="alert(1)"')).toBe('workeronclickalert1')
    })

    it('should preserve alphanumeric and allowed characters', () => {
      expect(sanitizeWorkerId('Worker-123_test.v2')).toBe('Worker-123_test.v2')
    })

    it('should handle non-string values', () => {
      expect(sanitizeWorkerId(123 as any)).toBe('')
      expect(sanitizeWorkerId(null as any)).toBe('')
    })

    it('should handle empty string', () => {
      expect(sanitizeWorkerId('')).toBe('')
    })
  })

  describe('sanitizeText', () => {
    it('should trim whitespace', () => {
      expect(sanitizeText('  hello  ')).toBe('hello')
    })

    it('should remove control characters', () => {
      expect(sanitizeText('hello\x00world\x1F')).toBe('helloworld')
    })

    it('should preserve newlines and tabs', () => {
      expect(sanitizeText('hello\nworld\ttest')).toBe('hello\nworld\ttest')
    })

    it('should limit length', () => {
      const longText = 'a'.repeat(1500)
      expect(sanitizeText(longText).length).toBe(1000)
    })

    it('should respect custom max length', () => {
      const text = 'a'.repeat(100)
      expect(sanitizeText(text, 50).length).toBe(50)
    })

    it('should handle non-string values', () => {
      expect(sanitizeText(123 as any)).toBe('123')
    })

    it('should handle empty string', () => {
      expect(sanitizeText('')).toBe('')
    })
  })

  describe('isContentSafe', () => {
    it('should detect script tags', () => {
      expect(isContentSafe('<script>alert(1)</script>')).toBe(false)
      expect(isContentSafe('<SCRIPT>alert(1)</SCRIPT>')).toBe(false)
    })

    it('should detect javascript: protocol', () => {
      expect(isContentSafe('javascript:alert(1)')).toBe(false)
      expect(isContentSafe('JAVASCRIPT:alert(1)')).toBe(false)
    })

    it('should detect event handlers', () => {
      expect(isContentSafe('onclick="alert(1)"')).toBe(false)
      expect(isContentSafe('onload=alert(1)')).toBe(false)
      expect(isContentSafe('onerror="hack()"')).toBe(false)
    })

    it('should detect iframe tags', () => {
      expect(isContentSafe('<iframe src="evil.com"></iframe>')).toBe(false)
    })

    it('should detect object and embed tags', () => {
      expect(isContentSafe('<object data="evil"></object>')).toBe(false)
      expect(isContentSafe('<embed src="evil"></embed>')).toBe(false)
    })

    it('should detect eval calls', () => {
      expect(isContentSafe('eval("alert(1)")')).toBe(false)
    })

    it('should allow safe content', () => {
      expect(isContentSafe('Hello World')).toBe(true)
      expect(isContentSafe('frontend-worker-123')).toBe(true)
      expect(isContentSafe('Task #42 completed')).toBe(true)
    })

    it('should handle non-string values', () => {
      expect(isContentSafe(123 as any)).toBe(true)
      expect(isContentSafe(null as any)).toBe(true)
    })
  })

  describe('validateAndSanitizeWorkerId', () => {
    it('should validate and return valid worker ID', () => {
      const result = validateAndSanitizeWorkerId('frontend-worker-1')
      expect(result.isValid).toBe(true)
      expect(result.value).toBe('frontend-worker-1')
      expect(result.error).toBeUndefined()
    })

    it('should reject empty worker ID', () => {
      const result = validateAndSanitizeWorkerId('')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Worker ID is required')
    })

    it('should reject null/undefined', () => {
      const result1 = validateAndSanitizeWorkerId(null as any)
      expect(result1.isValid).toBe(false)
      expect(result1.error).toBe('Worker ID is required')

      const result2 = validateAndSanitizeWorkerId(undefined as any)
      expect(result2.isValid).toBe(false)
      expect(result2.error).toBe('Worker ID is required')
    })

    it('should reject too short worker ID', () => {
      const result = validateAndSanitizeWorkerId('ab')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Worker ID must be at least 3 characters')
    })

    it('should reject too long worker ID', () => {
      const longId = 'a'.repeat(60)
      const result = validateAndSanitizeWorkerId(longId)
      expect(result.isValid).toBe(false)
      expect(result.value.length).toBe(50)
      expect(result.error).toBe('Worker ID must be at most 50 characters')
    })

    it('should sanitize and validate', () => {
      const result = validateAndSanitizeWorkerId('worker<script>test</script>123')
      expect(result.value).toBe('workerscripttestscript123')
      expect(result.isValid).toBe(true)
    })

    it('should reject worker ID not starting with alphanumeric', () => {
      const result = validateAndSanitizeWorkerId('-worker-123')
      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Worker ID must start with a letter or number')
    })

    it('should trim and validate', () => {
      const result = validateAndSanitizeWorkerId('  worker-123  ')
      expect(result.isValid).toBe(true)
      expect(result.value).toBe('worker-123')
    })

    it('should handle worker ID that becomes empty after sanitization', () => {
      const result = validateAndSanitizeWorkerId('<>')
      expect(result.isValid).toBe(false)
      expect(result.value).toBe('')
      expect(result.error).toBe('Worker ID cannot be empty')
    })

    it('should accept various valid formats', () => {
      const validIds = [
        'worker-1',
        'frontend_worker_123',
        'my.worker.01',
        'Worker123',
        'w123',
        'WORKER-ABC-123'
      ]

      validIds.forEach(id => {
        const result = validateAndSanitizeWorkerId(id)
        expect(result.isValid).toBe(true)
        expect(result.value).toBe(id)
      })
    })
  })
})
