# Security Guidelines

## Overview
This document describes the security measures implemented in the TaskManager frontend to protect against common web vulnerabilities, particularly Cross-Site Scripting (XSS) attacks.

## Input Validation and Sanitization

### Sanitization Utilities
Located in `src/utils/sanitize.ts`, these utilities provide comprehensive protection against XSS attacks:

#### `sanitizeHtml(input: string): string`
Escapes HTML special characters to prevent XSS attacks.

**Use when:**
- Displaying user-generated content that might contain HTML
- Processing strings that will be rendered in HTML contexts

**Example:**
```typescript
import { sanitizeHtml } from '@/utils/sanitize'

const userInput = '<script>alert("xss")</script>'
const safe = sanitizeHtml(userInput)
// Result: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

**Characters escaped:**
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `"` → `&quot;`
- `'` → `&#x27;`
- `/` → `&#x2F;`

#### `sanitizeWorkerId(workerId: string): string`
Removes potentially dangerous characters from Worker IDs.

**Allowed characters:**
- Alphanumeric: `a-zA-Z0-9`
- Hyphens: `-`
- Underscores: `_`
- Dots: `.`

**Example:**
```typescript
import { sanitizeWorkerId } from '@/utils/sanitize'

const input = 'worker<script>alert(1)</script>'
const safe = sanitizeWorkerId(input)
// Result: 'workerscriptalert1script'
```

#### `sanitizeText(input: string, maxLength?: number): string`
General text sanitization with control character removal and length limiting.

**Features:**
- Trims whitespace
- Removes control characters (except newline, carriage return, tab)
- Limits to specified length (default: 1000 characters)

**Example:**
```typescript
import { sanitizeText } from '@/utils/sanitize'

const input = '  hello\x00world\x1F  '
const safe = sanitizeText(input, 50)
// Result: 'helloworld'
```

#### `isContentSafe(input: string): boolean`
Checks for potentially dangerous XSS patterns.

**Detects:**
- Script tags: `<script>`
- JavaScript protocol: `javascript:`
- Event handlers: `onclick=`, `onload=`, etc.
- IFrames: `<iframe>`
- Object/Embed tags: `<object>`, `<embed>`
- Eval calls: `eval(`
- CSS expressions: `expression(`

**Example:**
```typescript
import { isContentSafe } from '@/utils/sanitize'

isContentSafe('Hello World') // true
isContentSafe('<script>alert(1)</script>') // false
isContentSafe('onclick="hack()"') // false
```

#### `validateAndSanitizeWorkerId(workerId: string)`
Complete validation and sanitization for Worker IDs.

**Returns:**
```typescript
{
  value: string      // Sanitized value
  isValid: boolean   // Validation status
  error?: string     // Error message if invalid
}
```

**Validation rules:**
- Required (cannot be empty)
- Length: 3-50 characters
- Must start with alphanumeric character
- Allowed characters: `a-zA-Z0-9-_.`

**Example:**
```typescript
import { validateAndSanitizeWorkerId } from '@/utils/sanitize'

const result = validateAndSanitizeWorkerId('frontend-worker-1')
// { value: 'frontend-worker-1', isValid: true }

const result2 = validateAndSanitizeWorkerId('ab')
// { value: 'ab', isValid: false, error: 'Worker ID must be at least 3 characters' }
```

## Form Validation

### Enhanced Validation Rules
Located in `src/composables/useFormValidation.ts`, two new validation rules have been added:

#### `validationRules.workerId(message?: string)`
Validates Worker ID format.

**Example:**
```typescript
import { useFormValidation, validationRules } from '@/composables/useFormValidation'

const { registerField } = useFormValidation()

registerField('workerId', 'frontend-worker-1', [
  validationRules.required(),
  validationRules.workerId('Invalid worker ID format')
])
```

#### `validationRules.safeContent(message?: string)`
Validates content safety (XSS protection).

**Example:**
```typescript
registerField('comment', '', [
  validationRules.safeContent('Content contains potentially unsafe characters')
])
```

## Implementation in Components

### Settings View (Worker ID Input)
The Settings view (`src/views/Settings.vue`) implements comprehensive validation:

1. **Registration:** Field is registered with validation rules on mount
2. **Real-time validation:** Validates on blur event
3. **Visual feedback:** Red border and error message for invalid input
4. **Sanitization:** Input is sanitized before saving to localStorage
5. **Double validation:** Both client-side validation and sanitization before storage

**Code example:**
```vue
<template>
  <input
    v-model="workerIdInput"
    @blur="validateField('workerId')"
    :class="fields.workerId?.error ? 'border-red-500' : 'border-gray-300'"
  />
  <p v-if="fields.workerId?.error" class="text-red-600">
    {{ fields.workerId.error }}
  </p>
</template>

<script setup lang="ts">
import { useFormValidation, validationRules } from '../composables/useFormValidation'
import { validateAndSanitizeWorkerId } from '../utils/sanitize'

const { registerField, validateField, fields } = useFormValidation()

registerField('workerId', workerIdInput.value, [
  validationRules.required(),
  validationRules.workerId(),
  validationRules.safeContent()
])

function saveWorkerId() {
  if (!validateField('workerId')) return
  
  const result = validateAndSanitizeWorkerId(workerIdInput.value)
  if (!result.isValid) {
    // Show error
    return
  }
  
  localStorage.setItem('workerId', result.value)
}
</script>
```

## Vue's Built-in XSS Protection

Vue.js provides automatic XSS protection through:

1. **Text interpolation (`{{ }}`)**: Automatically escapes HTML
2. **Attribute binding (`:href`, `:src`)**: Safe by default
3. **No `v-html` usage**: We avoid using `v-html` directive which could introduce XSS vulnerabilities

**Safe (automatically escaped):**
```vue
<p>{{ userInput }}</p>
<div :title="userInput"></div>
```

**Unsafe (avoid):**
```vue
<div v-html="userInput"></div>  <!-- DON'T USE -->
```

## Best Practices

### DO:
✅ Always validate user input before processing
✅ Sanitize data before storing in localStorage
✅ Use validation rules for all form inputs
✅ Display validation errors to users
✅ Use Vue's text interpolation (`{{ }}`) for displaying data
✅ Check for XSS patterns in user input

### DON'T:
❌ Never use `v-html` with unsanitized user input
❌ Never trust user input without validation
❌ Never store unsanitized data
❌ Never bypass validation rules
❌ Never use `eval()` or `Function()` with user input

## Testing

All security features are thoroughly tested:

### Sanitization Tests
- `tests/unit/sanitize.spec.ts` (40 tests)
- Tests cover all sanitization functions
- Tests verify XSS attack prevention
- Tests validate edge cases

### Validation Tests
- `tests/unit/useFormValidation.spec.ts` (63 tests)
- Tests cover all validation rules
- Tests verify worker ID validation
- Tests verify safe content validation

**Run tests:**
```bash
npm run test
```

## Security Checklist

Before deploying:
- [ ] All user inputs are validated
- [ ] Worker ID sanitization is applied
- [ ] No `v-html` usage with user input
- [ ] Form validation is active
- [ ] Tests are passing
- [ ] XSS patterns are detected

## Reporting Security Issues

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Contact the security team directly
3. Provide detailed information about the vulnerability
4. Wait for confirmation before disclosing

## Additional Resources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Vue.js Security Best Practices](https://vuejs.org/guide/best-practices/security.html)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Changelog

### 2025-11-10
- ✅ Added comprehensive sanitization utilities
- ✅ Implemented Worker ID validation
- ✅ Enhanced form validation with XSS protection
- ✅ Added real-time validation feedback in Settings
- ✅ Created 51 new security-focused tests
