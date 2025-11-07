# Hosting Information - Vedos/Wedos

This document contains information about the Vedos/Wedos webhosting account where TaskManager is deployed or intended to be deployed.

## Account Information

| Field | Value |
|-------|-------|
| **Order Number** | 3218052549 |
| **Status** | Aktivní (Active) |
| **Ordered** | 16.05.2018 11:17:11 |
| **Provisioned** | 16.05.2018 11:33:17 |
| **Operating System** | Linux |

## Resource Allocation

| Resource | Current Usage | Notes |
|----------|--------------|-------|
| **Website Size** | 356 MB | Total web content storage |
| **Email Size** | 6 MB | Email storage allocation |
| **Database Size** | 7 MB | MySQL/MariaDB storage |
| **Total Used** | 369 MB | Combined storage across all services |

## Hosting Plan Details

| Field | Value |
|-------|-------|
| **Plan Variant** | NoLimit |
| **Expiration** | 16.05.2026 |
| **Days Until Expiration** | 190 days (as of documentation date) |
| **VAT Billing** | No (Účtování bez DPH: ne) |

## Deployment Considerations

### Resource Planning
- **Available Space**: Significant capacity remains (NoLimit plan)
- **Database Space**: 7 MB currently used, sufficient for TaskManager
- **Growth Headroom**: NoLimit plan provides flexibility for expansion

### TaskManager Deployment
- **Estimated TaskManager Size**: < 1 MB (API files + documentation)
- **Database Requirements**: Minimal (< 5 MB for active task queue)
- **Email Requirements**: Not applicable for TaskManager
- **Projected Total Impact**: < 10 MB additional usage

### Capacity Monitoring
- Regular monitoring recommended as task queue grows
- Database size will increase with task history
- Consider implementing task history cleanup if needed
- NoLimit plan provides buffer for growth

## Hosting Provider Details

**Provider**: Vedos/Wedos  
**Hosting Type**: Shared Linux Hosting  
**Control Panel**: Standard cPanel/Plesk (typical for Vedos)  
**Support**: Available through Vedos support channels

## Renewal Information

- **Next Renewal**: 16.05.2026
- **Renewal Period**: Annual (based on 2018 order to 2026 expiration)
- **Action Required**: Renewal before 16.05.2026
- **Current Status**: Active with 190 days remaining

## Security Notes

⚠️ **Important**: This document contains account information but should not contain credentials.

- Database credentials: Store in `config/config.php` (not version controlled)
- FTP/SFTP credentials: Keep secure, not in repository
- Control panel credentials: Maintain separately from code repository
- API keys (if any): Use environment variables or secure config files

## Deployment Checklist

When deploying to this hosting account:

- [ ] Verify sufficient database space (7 MB → will grow to ~10-15 MB)
- [ ] Confirm PHP version compatibility (7.4+ required)
- [ ] Check MySQL/MariaDB version (5.7+/10.2+ required)
- [ ] Verify Apache mod_rewrite availability
- [ ] Test FTP/SFTP access
- [ ] Backup existing data before deployment
- [ ] Configure database credentials in config.php
- [ ] Test API endpoints after deployment
- [ ] Monitor resource usage post-deployment

## Related Documentation

- [Deployment Guide](DEPLOYMENT.md) - Step-by-step deployment instructions
- [API Reference](API_REFERENCE.md) - API documentation
- [TaskManager README](../README.md) - System overview

## Update History

| Date | Update | Notes |
|------|--------|-------|
| 2025-01-07 | Initial documentation | Documented hosting account details from order information |

---

**Note**: Keep this information updated as hosting details change or when the account is renewed.
