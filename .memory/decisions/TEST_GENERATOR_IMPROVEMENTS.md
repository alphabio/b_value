# Test Generator Improvements

**Status**: Living Document
**Created**: 2025-10-29
**Last Updated**: 2025-10-29

This document tracks identified improvements and planned refactoring for the test generation scripts (`generate-generate-tests.ts` and `generate-parse-tests.ts`).

---

## 🎯 Goals

1. **Better issue surfacing** - Make problems more visible and actionable
2. **Cleaner output** - Reduce noise, highlight important information
3. **Comprehensive validation** - Catch all types of problems
4. **Developer experience** - Make it easy to understand what's wrong and how to fix it

---

## 🐛 Current Issues Identified

### 1. Spec URL Validation Warnings Get Buried

**Problem**:
- Broken spec URLs (like trailing `}` characters) generate warnings
- Warnings are printed to console but easily missed
- No persistent record in ISSUES file
- Developers might not notice broken documentation links

**Example**:

```
🔗 Validating spec reference URLs...
   ⚠️  mdn: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility} (HTTP 404)
```

**Impact**:
- Broken documentation links in generated test files
- Source file JSDoc has incorrect URLs
- Poor developer experience when following links

**Proposed Solution**:

```markdown
# Issues Found: visual/visibility (Generate)

## 📖 Spec Reference Issues (1)

❌ MDN URL returns 404
   URL: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
   Status: HTTP 404
   Location: src/generate/visual/visibility.ts @see comment
   Fix: Remove trailing } from {@link URL} syntax

## ⚙️ Generator Issues (0)

No generator issues found.
```

**Implementation Notes**:
- Track spec validation failures alongside test issues
- Include HTTP status code and source file location
- Suggest fix (common issue: trailing `}` from regex bug - now fixed)
- Only create ISSUES file if there are spec OR test problems

---

### 2. Regex Bug in URL Extraction (FIXED ✅)

**Problem**:
- Regex captured closing `}` from `{@link URL}` syntax as part of URL
- Pattern: `/@see\s+\{@link\s+(https?:\/\/[^\s|]+)[^}]*\}/g`
- Would match `https://example.com}` instead of `https://example.com`

**Fix Applied**: 2025-10-29
- Updated pattern to: `/@see\s+\{@link\s+(https?:\/\/[^\s|}]+)/g`
- Now stops at `}`, `|`, or whitespace
- Handles both `{@link URL}` and `{@link URL | text}` formats
- Applied to both `generate-generate-tests.ts` and `generate-parse-tests.ts`

---

### 3. ISSUES File Cleanup (IMPLEMENTED ✅)

**Problem**:
- Old ISSUES files persisted after problems were resolved
- No automatic cleanup mechanism
- Stale files caused confusion

**Fix Applied**: 2025-10-29
- Modified `saveIssues()` function in both scripts
- Now deletes ISSUES file when `issues.length === 0`
- Prints confirmation: `✅ No issues - removed old ISSUES file`
- Clean, self-maintaining results directory

---

## 🔮 Future Improvements

### Output Formatting

**Current State**:
- Mix of emojis, text, and structured output
- Important warnings can be missed
- No clear visual hierarchy

**Proposals**:
- Group related output (spec validation, test execution, summary)
- Use consistent formatting (tables for summaries?)
- Highlight errors/warnings more prominently
- Consider color coding (if terminal supports it)

### Issue Categories

**Current**: Single flat list of issues

**Proposed**: Categorize issues by type
- 📖 Spec/Documentation issues
- ⚙️ Generator logic issues
- 🔄 Roundtrip failures
- ✅ Validation failures
- 🔧 Configuration issues

### Configuration Validation

**Proposed**: Add config validation before running tests
- Check required fields present
- Validate file paths exist
- Warn about deprecated patterns
- Suggest fixes for common mistakes

### Progress Indicators

**Proposed**: For large test suites
- Show progress (test N of M)
- Estimated time remaining
- Ability to continue from failure point

---

## 📝 Implementation Checklist

### Phase 1: Spec URL Issue Tracking (NEXT)

- [ ] Modify `validateSpecRefs()` to return validation results
- [ ] Add spec issues to ISSUES file as separate section
- [ ] Include HTTP status, source location, and suggested fix
- [ ] Update ISSUES file logic to handle both spec and test issues
- [ ] Test with properties that have broken URLs

### Phase 2: Output Improvements

- [ ] Design better output format (sketch in this doc)
- [ ] Implement grouped output sections
- [ ] Add summary table at end
- [ ] Test with various property types

### Phase 3: Enhanced Validation

- [ ] Add config validation
- [ ] Validate source files exist before extraction
- [ ] Check for common config mistakes
- [ ] Provide actionable error messages

---

## 💡 Design Sketches

### Proposed Output Format

```
🧪 Running generate tests for: visual/visibility

📋 Configuration
   Module:     visual
   Property:   visibility
   Source:     src/generate/visual/visibility.ts
   Tests:      11 cases (3 valid, 8 invalid)

📖 Spec References
   ✅ mdn: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility

🧪 Test Execution
   ✅ [valid-basic] visible keyword 🔄
   ✅ [valid-basic] hidden keyword 🔄
   ✅ [valid-basic] collapse keyword 🔄
   ❌ [invalid-null] null input
   ❌ [invalid-keyword] invalid keyword auto
   ... (collapsed)

📊 Summary
   ┌─────────────┬───────┐
   │ Category    │ Count │
   ├─────────────┼───────┤
   │ Valid       │   3   │
   │ Invalid     │   8   │
   │ Roundtrip   │  3/3  │
   │ Issues      │   0   │
   └─────────────┴───────┘

✅ Done! No issues found.
   Tests: src/generate/visual/visibility.test.ts
```

### Proposed ISSUES Format

```markdown
# Issues Found: visual/visibility

**Date**: 2025-10-29
**Source**: src/generate/visual/visibility.ts

---

## 📖 Spec Reference Issues (1)

### ❌ MDN URL validation failed

**URL**: `https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}`
**Status**: HTTP 404
**Location**: Line 16 in source file
**Issue**: Trailing `}` character in URL

**Fix**:
```diff
- @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}}
+ @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
```

---

## ⚙️ Generator Issues (0)

No generator issues found.

---

## 🔄 Roundtrip Issues (0)

No roundtrip issues found.

---

## 📋 Actions Required

1. Fix spec URL in source file (1 issue)
2. Regenerate tests after fixing source

**After fixing, run**: `tsx scripts/generate-generate-tests.ts visual/visibility`

```

---

## 🤔 Open Questions

1. **Severity levels**: Should we distinguish between warnings vs errors?
2. **Auto-fix**: Can we auto-fix common issues (like trailing `}`)?
3. **CI Integration**: Should failed URL validation fail the test generation?
4. **Historical tracking**: Keep history of resolved issues?
5. **Templates**: Create issue templates for common problem types?

---

## 📚 References

- Test generator scripts:
  - `scripts/generate-generate-tests.ts`
  - `scripts/generate-parse-tests.ts`
- Issue tracking pattern based on linter output
- Inspiration: ESLint, TypeScript compiler error formatting

---

## 🔄 Change Log

### 2025-10-29
- **Added**: Initial document structure
- **Fixed**: Regex bug in URL extraction (trailing `}`)
- **Implemented**: Automatic ISSUES file cleanup
- **Identified**: Spec URL validation warning visibility issue
