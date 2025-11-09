# Worker05 Security Hardening - Quick Reference

**Status**: ✅ Complete  
**Date**: 2025-11-09  
**Tests**: 27/27 passing

## What Was Hardened

### 1. API Authentication ✅
- **Feature**: API key authentication with timing-attack resistance
- **Config**: `API_KEY` in config.php
- **Testing**: Use `X-API-Key` header in all requests

### 2. Rate Limiting ✅
- **Feature**: Per-IP, per-endpoint rate limiting
- **Config**: `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_TIME_WINDOW`
- **Default**: 100 requests per 60 seconds
- **Response**: Returns 429 with `Retry-After` header when exceeded

### 3. Request Size Limits ✅
- **Feature**: Prevent DoS via large payloads
- **Config**: `MAX_REQUEST_SIZE`
- **Default**: 1MB (1048576 bytes)
- **Response**: Returns 413 Payload Too Large

### 4. IP Access Control ✅
- **Feature**: Optional IP whitelist/blacklist
- **Config**: `IP_WHITELIST`, `IP_BLACKLIST`
- **Default**: Disabled
- **Use Case**: Restrict to office IPs or block malicious IPs

### 5. Security Headers ✅
- **Feature**: Modern security headers
- **Config**: `ENABLE_SECURITY_HEADERS`
- **Headers**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, etc.
- **Protection**: Clickjacking, MIME sniffing, XSS

### 6. CORS Configuration ✅
- **Feature**: Multi-platform client support
- **Config**: `CORS_ALLOWED_ORIGINS`
- **Default**: `'*'` (recommended for desktop/mobile/web)
- **Reason**: Desktop apps and mobile apps don't send Origin headers

### 7. Security Logging ✅
- **Feature**: JSON-formatted security event logs
- **Log File**: `.auth_failures.log`
- **Events**: Auth failures, rate limits, IP blocks, oversized requests

## Quick Start

### 1. Generate API Key

```bash
# Using OpenSSL
openssl rand -hex 32

# Using PHP
php -r "echo bin2hex(random_bytes(32));"

# Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### 2. Configure Security (config.php)

```php
// Required: Change from default!
define('API_KEY', 'your-generated-key-here');

// Recommended for multi-platform access
define('CORS_ALLOWED_ORIGINS', '*');

// Enable rate limiting
define('RATE_LIMIT_ENABLED', true);
define('RATE_LIMIT_MAX_REQUESTS', 100);
define('RATE_LIMIT_TIME_WINDOW', 60);

// Set request size limit
define('MAX_REQUEST_SIZE', 1048576); // 1MB

// Enable security headers
define('ENABLE_SECURITY_HEADERS', true);
```

### 3. Test Security

```bash
# Run all security tests
php tests/security/SecurityTest.php
php tests/security/SecurityHardeningTest.php

# Expected: 27 tests pass
```

## Client Examples

### Desktop Python Client

```python
import requests

API_URL = "https://your-domain.com/api"
API_KEY = "your-api-key-here"

headers = {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json"
}

# Create a task
response = requests.post(
    f"{API_URL}/tasks",
    headers=headers,
    json={
        "type": "Task.Example",
        "params": {"name": "test"}
    }
)

print(response.json())
```

### Mobile App (JavaScript/React Native)

```javascript
const API_URL = 'https://your-domain.com/api';
const API_KEY = 'your-api-key-here';

async function createTask() {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'Task.Example',
      params: { name: 'test' }
    })
  });
  
  return await response.json();
}
```

### Web Browser (JavaScript)

```javascript
const API_URL = 'https://your-domain.com/api';
const API_KEY = 'your-api-key-here';

fetch(`${API_URL}/tasks`, {
  method: 'POST',
  headers: {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'Task.Example',
    params: { name: 'test' }
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Mobile Browser (Same as Web)

Mobile browsers use the same JavaScript fetch API as desktop browsers.

## Rate Limiting Details

### Response Headers

All responses include rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1699531200
```

### When Rate Limited (429 Response)

```json
{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again in 45 seconds.",
  "retry_after": 45,
  "limit": 100,
  "window": 60,
  "timestamp": "2025-11-09T10:30:00+00:00"
}
```

### Handling Rate Limits in Clients

**Python Example:**
```python
import time

def api_call_with_retry():
    response = requests.get(url, headers=headers)
    
    if response.status_code == 429:
        retry_after = response.json()['retry_after']
        print(f"Rate limited. Waiting {retry_after} seconds...")
        time.sleep(retry_after)
        return api_call_with_retry()
    
    return response.json()
```

**JavaScript Example:**
```javascript
async function apiCallWithRetry() {
  const response = await fetch(url, { headers });
  
  if (response.status === 429) {
    const data = await response.json();
    console.log(`Rate limited. Waiting ${data.retry_after} seconds...`);
    await new Promise(resolve => setTimeout(resolve, data.retry_after * 1000));
    return apiCallWithRetry();
  }
  
  return await response.json();
}
```

## Security Checklist

### Pre-Production

- [ ] Generate secure API key (32+ bytes)
- [ ] Update `API_KEY` in config.php
- [ ] Configure `CORS_ALLOWED_ORIGINS` (keep `'*'` for multi-platform)
- [ ] Enable rate limiting
- [ ] Set appropriate `MAX_REQUEST_SIZE`
- [ ] Enable security headers
- [ ] Configure HTTPS (SSL certificate)
- [ ] Run all 27 security tests
- [ ] Test from desktop app
- [ ] Test from mobile app
- [ ] Test from web browser

### Post-Production

- [ ] Monitor `.auth_failures.log` for security events
- [ ] Check rate limit usage
- [ ] Rotate API key quarterly
- [ ] Review security logs weekly
- [ ] Update dependencies monthly

## Troubleshooting

### 401 Unauthorized

**Problem**: API key is invalid or missing

**Solution**:
1. Check `X-API-Key` header is included
2. Verify API key matches config.php
3. Ensure config.php has `API_KEY` defined

### 429 Too Many Requests

**Problem**: Rate limit exceeded

**Solution**:
1. Check `retry_after` in response
2. Implement exponential backoff in client
3. Reduce request frequency
4. Contact admin to increase limits if legitimate

### 413 Payload Too Large

**Problem**: Request body exceeds size limit

**Solution**:
1. Reduce request size
2. Split into multiple requests
3. Contact admin to increase `MAX_REQUEST_SIZE` if needed

### 403 Forbidden (IP blocked)

**Problem**: IP is blacklisted or not whitelisted

**Solution**:
1. Check if IP whitelist/blacklist is enabled
2. Verify your IP is allowed
3. Contact admin to update IP access list

## Multi-Platform CORS Explained

### Why CORS = '*' is Correct

**Desktop Apps**: Python, Electron, Qt apps don't send `Origin` headers
**Mobile Apps**: Native iOS/Android apps don't send `Origin` headers  
**CORS**: Only enforced by web browsers, not native apps

**Security**: Protected by API key authentication, NOT CORS

### When to Restrict CORS

Only restrict CORS if:
- API is ONLY for web browsers
- You control all client origins
- You want additional browser-specific protection

For multi-platform APIs, `'*'` is the standard and recommended approach.

## Documentation

- **Full Security Guide**: `Backend/TaskManager/_meta/docs/SECURITY.md`
- **Configuration Example**: `Backend/TaskManager/_meta/config/config.example.php`
- **Security Tests**: `Backend/TaskManager/tests/security/`

## Support

**Issue**: Worker05 Security Hardening  
**Status**: ✅ Complete  
**Tests**: 27/27 passing  
**Documentation**: Complete

---

**Last Updated**: 2025-11-09  
**Version**: 1.0.0  
**Worker**: Worker05 - Security & Validation Expert
