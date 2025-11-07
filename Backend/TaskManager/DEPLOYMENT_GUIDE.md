# TaskManager Deployment Guide

## Overview

This guide explains how to deploy TaskManager to a server using the automated deployment script (`deploy.php`).

## Prerequisites

Before deployment, ensure your server meets these requirements:

- **PHP**: 7.4 or higher
- **MySQL**: 5.7+ or MariaDB 10.2+
- **PHP Extensions**: PDO, PDO_MySQL, JSON, cURL
- **Apache**: mod_rewrite enabled
- **Permissions**: Write access to deployment directory

## Security Setup

### IMPORTANT: Change Admin Password

Before running the deployment script, **you must change the admin password**:

1. Open `deploy.php` in a text editor
2. Find this line near the top:
   ```php
   define('ADMIN_PASSWORD', 'changeme123'); // TODO: Change this to a secure password
   ```
3. Replace `'changeme123'` with a strong password
4. Save the file

**Example:**
```php
define('ADMIN_PASSWORD', 'MyStr0ng!P@ssw0rd#2025');
```

## Deployment Methods

### Method 1: Web-Based Deployment (Recommended for Shared Hosting)

1. **Upload Files**
   - Upload `deploy.php` to your server (e.g., via FTP or cPanel File Manager)
   - Place it in the directory where you want TaskManager installed
   - Example: `/home/yourusername/public_html/taskmanager/`

2. **Access Deploy Script**
   - Open your browser and navigate to:
     ```
     https://yourdomain.com/taskmanager/deploy.php
     ```

3. **Complete the Form**
   - Enter the admin password (the one you set in deploy.php)
   - Fill in database configuration:
     - **Database Host**: Usually `localhost` (check with your hosting provider)
     - **Database Name**: Create a database via cPanel/phpMyAdmin first
     - **Database User**: Your MySQL username
     - **Database Password**: Your MySQL password
   - Optionally check "Skip database setup" if you've already configured it

4. **Run Deployment**
   - Click "Deploy TaskManager"
   - The script will:
     - Validate your environment
     - Download files from GitHub
     - Create database tables
     - Generate configuration files
     - Set appropriate permissions
     - Validate the installation

5. **Post-Deployment**
   - Test your installation: `https://yourdomain.com/taskmanager/api/health`
   - Review the configuration in `config/config.php`

### Method 2: Command-Line Deployment

For servers with SSH access:

1. **Upload deploy.php**
   ```bash
   scp deploy.php user@yourserver.com:/path/to/taskmanager/
   ```

2. **SSH into server**
   ```bash
   ssh user@yourserver.com
   cd /path/to/taskmanager
   ```

3. **Run deployment**
   ```bash
   php deploy.php
   ```

4. **Follow prompts**
   - Enter admin password
   - Provide database configuration
   - Wait for completion

## What the Deploy Script Does

### Step 1: Authentication
- Verifies admin password before proceeding
- Prevents unauthorized deployment

### Step 2: Environment Validation
- Checks PHP version (7.4+)
- Verifies required PHP extensions
- Checks directory write permissions

### Step 3: Configuration Collection
- Gathers database credentials
- Allows skipping database setup if already configured

### Step 4: GitHub File Download
Downloads these files from the repository:
```
api/.htaccess
api/index.php
api/ApiResponse.php
api/TaskController.php
api/TaskTypeController.php
api/JsonSchemaValidator.php
database/Database.php
database/schema.sql
_meta/config/config.example.php
```

### Step 5: Database Setup
- Creates database if it doesn't exist
- Imports schema (creates tables: task_types, tasks, task_history)
- Configures character set (UTF-8)

### Step 6: Application Configuration
- Creates `config/config.php` from template
- Inserts your database credentials
- Sets up system parameters

### Step 7: File Permissions
- Sets config.php to 640 (secure)
- Sets API files to 644 (readable)

### Step 8: Installation Validation
- Tests database connection
- Verifies all files are present
- Checks configuration

## Directory Structure After Deployment

```
TaskManager/
├── deploy.php
├── api/
│   ├── .htaccess
│   ├── index.php
│   ├── ApiResponse.php
│   ├── TaskController.php
│   ├── TaskTypeController.php
│   └── JsonSchemaValidator.php
├── config/
│   ├── config.php          (Generated, contains credentials)
│   └── config.example.php
└── database/
    ├── Database.php
    └── schema.sql
```

## Post-Deployment Verification

### 1. Test Health Check
```bash
curl https://yourdomain.com/taskmanager/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "TaskManager API is healthy",
  "data": {
    "status": "healthy",
    "timestamp": "2025-11-07T13:00:00Z"
  }
}
```

### 2. Check Database Tables
Log into MySQL and verify:
```sql
USE taskmanager;
SHOW TABLES;
```

Should show:
- `task_types`
- `tasks`
- `task_history`

### 3. Test API Endpoint
Try registering a task type:
```bash
curl -X POST https://yourdomain.com/taskmanager/api/task-types/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TestTask",
    "version": "1.0.0",
    "param_schema": {
      "type": "object",
      "properties": {
        "message": {"type": "string"}
      }
    }
  }'
```

## Troubleshooting

### Error: "Authentication failed"
- **Cause**: Wrong password entered
- **Solution**: Check the ADMIN_PASSWORD in deploy.php matches what you entered

### Error: "PHP version too old"
- **Cause**: Server has PHP < 7.4
- **Solution**: 
  - Upgrade PHP via hosting control panel
  - Or contact hosting provider

### Error: "Required PHP extension not found"
- **Cause**: Missing PDO, PDO_MySQL, JSON, or cURL extension
- **Solution**: 
  - Enable via php.ini or hosting control panel
  - Contact hosting provider if you can't enable

### Error: "Installation directory is not writable"
- **Cause**: Insufficient permissions
- **Solution**: 
  ```bash
  chmod 755 /path/to/taskmanager
  ```

### Error: "Failed to download files from GitHub"
- **Cause**: Server can't reach GitHub, or files moved
- **Solution**: 
  - Check server internet connectivity
  - Verify GitHub repository is accessible
  - Check GITHUB_PATH in deploy.php is correct

### Error: "Database connection failed"
- **Cause**: Wrong credentials or MySQL not running
- **Solution**: 
  - Verify database credentials
  - Check database exists
  - Ensure MySQL service is running
  - Check firewall rules

### Warning: "File not found" during validation
- **Cause**: Some files failed to download
- **Solution**: 
  - Check internet connectivity
  - Re-run deployment
  - Manually download missing files from GitHub

## Shared Hosting Specific Notes

### cPanel
1. Create MySQL database via "MySQL Databases"
2. Create MySQL user and assign to database
3. Note the database host (usually `localhost`)
4. Upload deploy.php via File Manager or FTP
5. Access deploy.php via browser

### Plesk
1. Go to "Databases" → "Add Database"
2. Create database and user
3. Upload deploy.php via File Manager
4. Access deploy.php via browser

### DirectAdmin
1. Go to "MySQL Management" → "Create new database"
2. Create user and assign permissions
3. Upload deploy.php
4. Access via browser

## Security Best Practices

### After Deployment

1. **Secure config.php**
   ```bash
   chmod 640 config/config.php
   ```

2. **Add .htaccess protection** (optional)
   Create `/config/.htaccess`:
   ```apache
   Deny from all
   ```

3. **Use HTTPS only**
   - Enable SSL certificate
   - Force HTTPS in .htaccess

4. **Consider API authentication**
   - Add API key validation
   - Implement rate limiting
   - Add IP whitelisting

### Regular Maintenance

1. **Backup regularly**
   - Database dumps
   - Configuration files
   - API code

2. **Monitor logs**
   - Check Apache error logs
   - Monitor database performance
   - Track API usage

3. **Update when needed**
   - Pull latest code from GitHub
   - Test before production

## Advanced Configuration

### Custom Installation Path

Edit deploy.php constants:
```php
define('INSTALL_PATH', '/custom/path/to/taskmanager');
define('GITHUB_BRANCH', 'develop'); // Use different branch
```

### Skip Database Setup

If you've already set up the database manually:
1. Check "Skip database setup" in web form
2. Or answer "y" when prompted in CLI mode

### Manual Configuration

If deployment fails, you can set up manually:

1. **Download files** from GitHub manually
2. **Create config.php**:
   ```bash
   cp config/config.example.php config/config.php
   nano config/config.php  # Edit credentials
   ```
3. **Import schema**:
   ```bash
   mysql -u username -p database_name < database/schema.sql
   ```

## Support

For issues or questions:
1. Check the [main README](README.md)
2. Review [API documentation](docs/API_REFERENCE.md)
3. Check the [troubleshooting section](#troubleshooting) above

## Next Steps

After successful deployment:

1. **Configure workers** to claim and process tasks
2. **Register task types** via API
3. **Monitor** task queue and performance
4. **Set up backups** for database
5. **Review security** settings

See [README.md](README.md) for API usage and worker implementation examples.
