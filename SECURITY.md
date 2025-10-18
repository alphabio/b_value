# Security Policy

## Reporting Security Vulnerabilities

We take security seriously. If you discover a security vulnerability, please report it to us privately so we can fix it before it becomes public knowledge.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Email us directly** at: `security@b_typescript_template.dev`
2. **Use our security reporting form** (if available)
3. **Report via GitHub Security Advisory** (for GitHub users)

### What to Include

When reporting a vulnerability, please include:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Affected versions** (if known)
- **Potential impact** of the vulnerability
- **Any suggested fixes** (if you have them)

### Response Process

1. **Acknowledgment** - We'll respond within 24-48 hours
2. **Investigation** - We'll investigate the report and determine if it's a valid security issue
3. **Fix development** - If valid, we'll develop a fix
4. **Testing** - We'll thoroughly test the fix
5. **Release** - We'll release a patched version
6. **Public disclosure** - We'll coordinate public disclosure with you

### Response Timeline

- **Initial response**: 24-48 hours
- **Status updates**: Every 3-5 days during investigation
- **Fix timeline**: Varies based on complexity (typically 1-4 weeks)

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | ✅ Yes            |
| < 0.1.0 | ❌ No             |

## Security Best Practices

### For Users

- Keep your dependencies updated
- Use tools like `npm audit` or `pnpm audit` regularly
- Report suspicious behavior immediately

### For Contributors

- Follow secure coding practices
- Write tests for security-sensitive code
- Review security implications of new features
- Keep dependencies updated

## Security Updates

When security updates are released:

- We'll publish a new version with the fix
- Update the CHANGELOG.md with security-related changes
- Send notifications to affected users (if applicable)

## Acknowledgments

We appreciate the security research community and thank all reporters for helping keep our project secure.

---

*This security policy is inspired by [Express.js security policy](https://github.com/expressjs/express/security/policy)*
