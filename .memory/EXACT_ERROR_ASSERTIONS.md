# Exact Error Message Assertions

**Date**: 2025-10-27  
**Status**: ✅ Implemented

## 🎯 Change

Updated test generator to use **exact error message assertions** instead of partial matching.

### Before
```typescript
expect(result.error).toContain("Expected");  // ❌ Too weak
```

### After
```typescript
expect(result.error).toBe("animation-duration: Expected time dimension or 'auto', got: Number");  // ✅ Exact
```

## 📊 Rationale

1. **Consistent schema**: Enforces `"property-name: error details"` pattern across all properties
2. **Catch regressions**: Tests fail if error messages change
3. **Self-documenting**: Test shows exact error users will see
4. **No false positives**: `toContain()` could match unrelated errors

## 🔧 Changes Made

### 1. Config Interface (`scripts/test-generator/configs/duration.ts`)
```typescript
export interface TestCase {
  input: string;
  description: string;
  category: string;
  expectValid?: boolean;
  expectedError?: string;  // ← NEW
}
```

### 2. Config Data
All invalid test cases now specify exact error:
```typescript
{
  input: "-1s",
  description: "negative duration",
  category: "invalid-negative",
  expectValid: false,
  expectedError: "animation-duration: animation-duration must be non-negative, got: -1"
}
```

### 3. Generator Logic (`scripts/generate-tests.ts`)
Changed from:
```typescript
const errorTerm = errorMsg.match(/Expected|Invalid|must be|Empty/)?.[0] || "";
if (errorTerm) {
  testFile += `\t\t\texpect(result.error).toContain("${errorTerm}");\n`;
}
```

To:
```typescript
testFile += `\t\t\texpect(result.error).toBe("${errorMsg}");\n`;
```

### 4. Documentation (`scripts/test-generator/README.md`)
Added section explaining rationale and showing example.

## ✅ Validation

```bash
tsx scripts/generate-tests.ts duration
pnpm test src/parse/animation/duration
```

**Result**: ✅ 24/24 tests passing with exact error assertions

## 🚀 Next Steps

When creating new property configs:
1. Run generator once without `expectedError` to see actual errors
2. Copy exact error messages into config
3. Regenerate to get exact `.toBe()` assertions
4. Tests will catch any error message changes

## 📝 Example: Finding Error Messages

```bash
# Step 1: Create minimal config without expectedError
# Step 2: Run generator to see actual errors
tsx scripts/generate-tests.ts your-property

# Step 3: Copy error messages from output
# Step 4: Add to config as expectedError
# Step 5: Regenerate
```

Output shows exact errors:
```
❌ [invalid-negative] "-1s"
   Error: animation-duration: animation-duration must be non-negative, got: -1
```

Copy that exact string to config!

