# Code Review - Action Items

**Review Date**: 2025-10-20  
**Status**: ✅ Review Complete

---

## High Priority (Before v1.0) 🔴

### 1. Increase Test Coverage to 89%+ 
**Current**: 88.06% | **Target**: 89%+  
**Effort**: 1-2 hours  
**Impact**: High confidence gain

**Focus Areas**:
- Filter parsers: grayscale, invert, opacity, sepia (currently 66.66%)
- Color parsers: error path coverage
- Layout parsers: cursor, display, visibility

**Commands**:
```bash
pnpm vitest run --coverage
# Check specific files
pnpm test -- filter/grayscale
pnpm test -- filter/invert
pnpm test -- filter/sepia
```

**Success Criteria**: Coverage ≥89% on statements and lines

---

### 2. Add SECURITY.md
**Effort**: 30 minutes  
**Impact**: High professionalism

**Template**:
```markdown
# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities to: [email]

Do NOT open public issues for security vulnerabilities.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Practices

- All inputs validated via css-tree parser
- No eval or unsafe code execution
- Minimal dependencies (4 production)
- Regular dependency audits
```

**Location**: `/SECURITY.md`

---

### 3. Enable Coverage CI Gate
**Effort**: 15 minutes  
**Impact**: High quality assurance

**Update `.github/workflows/ci.yml`**:
```yaml
- name: Run tests with coverage
  run: pnpm test:coverage
  
- name: Check coverage threshold
  run: |
    if [ $(jq '.total.lines.pct' coverage/coverage-summary.json | cut -d. -f1) -lt 89 ]; then
      echo "Coverage below 89% threshold"
      exit 1
    fi
```

**Success Criteria**: CI fails if coverage drops below 89%

---

### 4. Publish API Documentation
**Effort**: 1 hour  
**Impact**: High user benefit

**Steps**:
```bash
# 1. Generate docs
pnpm run docs:api

# 2. Configure GitHub Pages
# - Enable Pages in repo settings
# - Set source to gh-pages branch

# 3. Add deployment workflow
# .github/workflows/docs.yml
```

**Success Criteria**: Docs live at github.io URL

---

## Medium Priority (Next Quarter) 🟡

### 5. Add Integration Tests
**Effort**: 4-6 hours  
**Impact**: High confidence in complex scenarios

**Test Scenarios**:
- Clip-path + transform combinations
- Gradient + animation combinations
- Color + filter chains
- Complex layout + positioning

**Location**: `test/integration/`

---

### 6. Create Architecture Diagram
**Effort**: 2-3 hours  
**Impact**: High onboarding speed

**Include**:
- Parse → IR → Generate flow
- Core vocabulary layer
- Utils DRY pattern
- Module dependencies

**Tools**: Mermaid, draw.io, or Excalidraw

---

### 7. Add PR Templates
**Effort**: 1 hour  
**Impact**: Medium benefit

**Template**: `.github/pull_request_template.md`
```markdown
## Description
<!-- What changes does this PR introduce? -->

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] `just check` passes
- [ ] `just test` passes
- [ ] Changelog updated (if user-facing)

## Related Issues
<!-- Link to related issues -->
```

---

### 8. Create Roadmap Document
**Effort**: 2 hours  
**Impact**: High clarity

**Outline**:
```markdown
# b_value Roadmap

## v1.0 (Current)
- [x] Colors (12 formats)
- [x] Clip-path (10 shapes)
- [ ] Coverage >89%

## v1.1 (Q1 2026)
- [ ] CSS Variables (var())
- [ ] Calc expressions
- [ ] More filter functions

## v2.0 (Q2 2026)
- [ ] Plugin system
- [ ] Color-mix()
- [ ] Container query properties
```

**Location**: `/ROADMAP.md`

---

### 9. Split nodes.ts Utility
**Effort**: 2-3 hours  
**Impact**: Medium readability gain

**Refactor Plan**:
```
src/utils/parse/nodes.ts (751 lines)
→ src/utils/parse/length.ts
→ src/utils/parse/angle.ts
→ src/utils/parse/percentage.ts
→ src/utils/parse/number.ts
→ src/utils/parse/keywords.ts
```

**Success Criteria**: No file >300 lines

---

## Low Priority (Future) ⚪

### 10. Extract Transform Subparsers
**Effort**: 4-6 hours  
**Impact**: Medium benefit  
**Note**: Not urgent, current code is clean

### 11. Add Performance Budgets to CI
**Effort**: 2 hours  
**Impact**: Medium benefit

### 12. Unit Tests for New Utilities
**Effort**: 2-3 hours  
**Impact**: Medium documentation value

### 13. Fuzz Testing
**Effort**: 8-10 hours  
**Impact**: High confidence gain  
**Note**: Generates random CSS to test robustness

### 14. Plugin System
**Effort**: 20-30 hours  
**Impact**: High flexibility  
**Note**: v2.0 feature

---

## Tracking

| Item | Priority | Status | Effort | Owner |
|------|----------|--------|--------|-------|
| Test Coverage 89%+ | 🔴 High | 📋 TODO | 1-2h | - |
| SECURITY.md | 🔴 High | 📋 TODO | 30m | - |
| Coverage CI Gate | 🔴 High | 📋 TODO | 15m | - |
| API Docs | 🔴 High | 📋 TODO | 1h | - |
| Integration Tests | 🟡 Medium | 📋 TODO | 4-6h | - |
| Architecture Diagram | 🟡 Medium | 📋 TODO | 2-3h | - |
| PR Templates | 🟡 Medium | 📋 TODO | 1h | - |
| Roadmap | 🟡 Medium | 📋 TODO | 2h | - |
| Split nodes.ts | 🟡 Medium | 📋 TODO | 2-3h | - |

---

## Completion Criteria

### Ready for v1.0
- [x] DRY refactoring complete (Gold Standard)
- [x] 2318 tests passing
- [ ] Coverage ≥89%
- [ ] SECURITY.md present
- [ ] Coverage CI gate enabled
- [ ] API docs published

**Estimated Time to v1.0**: 3-4 hours

---

## Notes

- All items reviewed and prioritized
- High priority items block v1.0 release
- Medium priority items enhance quality
- Low priority items are nice-to-haves

**Next Agent**: Start with item #1 (test coverage) if continuing work.

