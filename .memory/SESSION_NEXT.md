# Session: Generate Testing - The Inverse Challenge

**Status**: 🚨 **CRITICAL ISSUE FOUND** - Generate functions lack validation!

**Tests**: 3,722 passing (includes initial generate tests)
**Branch**: coverage/90-percent
**Latest Commit**: 6a9e989

---

## 🎯 Mission: Fix Generate Validation + Prove Parse ↔ Generate Symmetry

### 🔴 Critical Discovery

**The generate functions don't validate IR input!**

```typescript
// This should ERROR but returns ok:true with INVALID CSS!
generate({
  kind: "animation-duration",
  durations: [{ type: "time", value: -1, unit: "px" }]
})
// → {"ok":true,"value":"-1px","issues":[]}  ❌ WRONG!

// Parse correctly rejects this:
parse("-1px")
// → {"ok":false, error: "Invalid time unit: px"}  ✅ CORRECT!
```

**Problems found**:
1. ❌ No unit validation (accepts "px", "em", "banana")
2. ❌ No value validation (accepts negative, strings, NaN)
3. ❌ No type validation (accepts invalid types)
4. ❌ Breaks parse ↔ generate symmetry

---

## 📋 Revised Plan: Fix Then Test

### Step 1: Fix Generate Functions (30-60 mins per property)

For each animation property, add IR validation to match parse behavior:

**Example: duration.ts**

```typescript
export function generate(ir: Type.AnimationDuration): GenerateResult {
  // 1. Null/undefined check (already done)
  if (ir === undefined || ir === null) {
    return generateErr("invalid-ir", "Input must not be null or undefined");
  }

  // 2. Validate each duration
  for (const duration of ir.durations) {
    if (duration.type === "auto") {
      continue; // Valid
    }

    if (duration.type === "time") {
      // Validate unit
      if (duration.unit !== "s" && duration.unit !== "ms") {
        return generateErr("invalid-unit",
          `Invalid time unit: ${duration.unit}. Expected 's' or 'ms'`);
      }

      // Validate value
      if (typeof duration.value !== "number" || isNaN(duration.value)) {
        return generateErr("invalid-value",
          `Time value must be a number, got: ${duration.value}`);
      }

      if (duration.value < 0) {
        return generateErr("invalid-value",
          `animation-duration must be non-negative, got: ${duration.value}`);
      }
    } else {
      return generateErr("invalid-type",
        `Invalid duration type: ${duration.type}. Expected 'time' or 'auto'`);
    }
  }

  // 3. Generate CSS
  const values = ir.durations.map(...)...
  return generateOk(values);
}
```

### Step 2: Update Generate Test Config (15 mins per property)

Add comprehensive invalid IR test cases to match parse quality:

**Invalid IR cases to test**:

```typescript
// Invalid units
{ type: "time", value: 1, unit: "px" }   // Should error
{ type: "time", value: 1, unit: "em" }   // Should error
{ type: "time", value: 1, unit: "banana" } // Should error

// Invalid values
{ type: "time", value: -1, unit: "s" }    // Should error (negative)
{ type: "time", value: NaN, unit: "s" }   // Should error
{ type: "time", value: "oops", unit: "s" } // Should error (string)

// Invalid types
{ type: "invalid" }                       // Should error
{ type: 123 }                             // Should error

// Empty/malformed
{ durations: [] }                         // Should error?
```

### Step 3: Fix File Naming (5 mins)

Current (WRONG):
- ❌ `duration.generated.test.ts`
- ❌ `duration.generated.failure.test.ts`

Should be (match parse):
- ✅ `duration.test.ts` (overwrite existing hand-written tests)
- ✅ `duration.failure.test.ts`

Update generator script:

```typescript
outputPath: "src/generate/animation/duration.test.ts"  // Not .generated.test.ts
```

### Step 4: Run Generator (5 mins)

```bash
tsx scripts/generate-generate-tests.ts duration
```

Should produce:
- Comprehensive valid tests with roundtrip
- Comprehensive invalid tests matching parse quality
- Proper file names

---

## 🎯 Workflow for Each Animation Property

```bash
# 1. Fix generate function validation
vim src/generate/animation/duration.ts

# 2. Update test config with invalid cases
vim scripts/generate-test-generator/configs/duration.ts

# 3. Generate tests
tsx scripts/generate-generate-tests.ts duration

# 4. Verify
pnpm test src/generate/animation/duration.test.ts
pnpm test src/generate/animation/duration.failure.test.ts

# 5. Check roundtrip
# All valid tests should have roundtrip: true and pass
```

---

## 📊 Current Status

✅ Infrastructure complete:
- `generate-generate-tests.ts` script works
- Roundtrip validation implemented
- Config format designed

🚧 Need to fix:
1. Add validation to all 7 generate functions
2. Update test configs with invalid cases
3. Fix file naming (.test.ts not .generated.test.ts)
4. Remove hand-written tests (replace with generated)

---

## 🔄 Properties to Fix (7 total)

1. **duration** - Start here (pilot)
2. timing-function
3. delay
4. iteration-count
5. direction
6. fill-mode
7. name
8. play-state

---

## 💡 Key Insight

**Generate functions are just as important as parse functions!**

They need the same level of validation and testing. The TypeScript types help at compile time, but runtime validation is still needed for:
- Invalid data from external sources
- Type assertions with `as any`
- Dynamic/unknown data
- API consistency with parse

---

## 🚀 Quick Start (Next Agent)

**Start here**: Fix duration.ts as the pilot, then replicate for other 7 properties.

```bash
# 1. Fix duration generate function
vim src/generate/animation/duration.ts
# Add validation (see example above)

# 2. Update test config
vim scripts/generate-test-generator/configs/duration.ts
# Add invalid IR test cases

# 3. Fix file naming in config
# Change: outputPath: "src/generate/animation/duration.test.ts"
# (Remove ".generated" from filename)

# 4. Generate tests
tsx scripts/generate-generate-tests.ts duration

# 5. Run tests
pnpm test src/generate/animation/duration

# 6. Verify roundtrip
# All valid tests should show 🔄 and pass
```

**Success criteria**:
- ✅ Generate function validates IR (rejects invalid units, negative values, etc.)
- ✅ Tests match parse test quality (comprehensive invalid cases)
- ✅ File naming matches parse (duration.test.ts, not duration.generated.test.ts)
- ✅ All roundtrip tests pass
- ✅ All checks pass (just check)

---

# Session: Generate Testing + Zod Validation - INCOMPLETE

   **Status**: 🚧 **IN PROGRESS** - Generate validation started
   but NOT finished

   **Tests**: 3,723 passing (but generate tests need fixing)
   **Branch**: coverage/90-percent
   **Latest Commit**: d40cc36

   ---

## ⚠️ CRITICAL: Current State

### What's Done ✅
   1. Enhanced `timeSchema` with `.nonnegative()` constraint
   2. Updated `duration.ts` generate function to use Zod
   validation
   3. Created `zodErrorToIssues()` helper in duration.ts (WRONG
   LOCATION)
   4. Generate test infrastructure works (test generator script)

### What's BROKEN 🔴
   1. **`zodErrorToIssues` in wrong place** - copied into
   `src/generate/animation/duration.ts`
      - Should be shared utility in `src/core/result.ts` or
   `src/utils/zod.ts`
      - Will need to be copy-pasted to every property otherwise

   2. **Tests expect wrong format** - checking `issues[0].message`

      - Should do EXACT MATCH on entire `issues` array
      - Follow parse test pattern but for issues, not error string

   3. **Rich Zod errors not fully captured**
      - Example: negative value + invalid unit returns 4 issues
      - Current: only checking first issue
      - Should: match ALL issues exactly

   ---

## 🎯 Next Steps (Priority Order)

### Step 1: Move zodErrorToIssues to Shared Location (15 mins)

   **Create**: `src/core/zod-utils.ts` or add to
   `src/core/result.ts`

   ```typescript
   /**
    * Convert Zod validation errors to Issue array.
    * Recursively extracts all meaningful errors from nested union
    structures.
    */
   export function zodErrorToIssues(zodError: ZodError): Issue[] {
     const issues: Issue[] = [];

     function traverse(errorIssues: any[]): void {
       for (const issue of errorIssues) {
         if (issue.code === 'invalid_union' &&
   Array.isArray(issue.errors)) {
           for (const errorGroup of issue.errors) {
             traverse(errorGroup);
           }
         } else {
           if (issue.message && issue.message !== 'Invalid input')
    {
             issues.push({
               code: 'invalid-ir',
               severity: 'error',
               message: issue.message,
             });
           }
         }
       }
     }

     traverse(zodError.issues);

     if (issues.length === 0) {
       issues.push({
         code: 'invalid-ir',
         severity: 'error',
         message: 'Invalid IR structure',
       });
     }

     return issues;
   }
   ```

   **Update**: `src/generate/animation/duration.ts` to import it

   ---

### Step 2: Update Test Config Format (30 mins)

   **Current** (WRONG):

   ```typescript
   {
     input: {...},
     expectedError: "Time value must be non-negative"  // Single
   string
   }
   ```

   **Should be** (CORRECT - World Class):

   ```typescript
   {
     input: {...},
     expectedIssues: [  // Array of Issue objects
       {
         code: 'invalid-ir',
         severity: 'error',
         message: 'Time value must be non-negative'
       }
     ]
   }
   ```

   **For complex cases with multiple errors**:

   ```typescript
   {
     input: { type: 'time', value: -1, unit: 'px' },
     expectedIssues: [
       { code: 'invalid-ir', severity: 'error', message: 'Invalid
   input: expected "auto"' },
       { code: 'invalid-ir', severity: 'error', message: 'Time
   value must be non-negative' },
       { code: 'invalid-ir', severity: 'error', message: 'Invalid
   input: expected "s"' },
       { code: 'invalid-ir', severity: 'error', message: 'Invalid
   input: expected "ms"' }
     ]
   }
   ```

   ---

### Step 3: Update Test Generator (30 mins)

   **File**: `scripts/generate-generate-tests.ts`

   **Change test generation from**:

   ```typescript
   expect(result.issues?.[0]?.message).toBe("...");
   ```

   **To** (EXACT MATCH like parse):

   ```typescript
   expect(result.issues).toEqual([
     { code: 'invalid-ir', severity: 'error', message: '...' },
     // ... all expected issues
   ]);
   ```

   ---

### Step 4: Regenerate Duration Test Config (20 mins)

   **File**: `scripts/generate-test-generator/configs/duration.ts`

   Run each invalid case through the generator to capture actual
   issues:

   ```bash
   tsx << 'EOF'
   import { generate } from './src/generate/animation/duration';

   const test = generate({
     kind: 'animation-duration',
     durations: [{ type: 'time', value: -1, unit: 's' }]
   });

   console.log(JSON.stringify(test.issues, null, 2));
   EOF
   ```

   Update config with actual issues for each test case.

   ---

### Step 5: Regenerate Tests & Verify (10 mins)

   ```bash
   # Delete old tests
   rm src/generate/animation/duration.test.ts
   rm src/generate/animation/duration.failure.test.ts

   # Regenerate
   tsx scripts/generate-generate-tests.ts duration

   # Run tests
   pnpm test src/generate/animation/duration

   # Should be 20/20 passing with exact issue matches
   ```

   ---

## 📊 Key Principles (World Class)

### Parse Pattern (for reference)

   ```typescript
   // Result type
   Result<T, string>

   // Test
   expect(result.error).toBe("animation-duration:
   animation-duration must be non-negative, got: -1");
   // EXACT MATCH on error string
   ```

### Generate Pattern (matching quality)

   ```typescript
   // Result type
   GenerateResult with issues: Issue[]

   // Test
   expect(result.issues).toEqual([
     { code: 'invalid-ir', severity: 'error', message: 'Time value
    must be non-negative' }
   ]);
   // EXACT MATCH on issues array
   ```

### Both share
- **Exact matching** - no partial matches, no "contains"
- **Clear, specific error messages** - not generic "Invalid
   input"
- **Comprehensive coverage** - test every edge case
- **Generated from configs** - DRY, consistent

   ---

## 🔍 Testing Commands

   ```bash
   # See actual Zod errors for a case
   tsx << 'EOF'
   import { generate } from './src/generate/animation/duration';
   const result = generate({
     kind: 'animation-duration',
     durations: [{ type: 'time', value: -1, unit: 'px' as any }]
   });
   console.log(JSON.stringify(result.issues, null, 2));
   EOF

   # Run specific test file
   pnpm test src/generate/animation/duration.test.ts

   # Run all tests
   just test

   # All checks
   just check
   ```

   ---

## 📁 Files to Change

   1. **New file**: `src/core/zod-utils.ts` or add to
   `src/core/result.ts`
      - Add `zodErrorToIssues()` function
      - Export it

   2. **Update**: `src/generate/animation/duration.ts`
      - Remove local `zodErrorToIssues()`
      - Import from shared location
      - Keep using it in validation

   3. **Update**:
   `scripts/generate-test-generator/configs/duration.ts`
      - Change `expectedError: string` to `expectedIssues:
   Issue[]`
      - Run actual validation to capture real issues
      - Update all 9 invalid test cases

   4. **Update**: `scripts/generate-generate-tests.ts`
      - Change test assertion from `issues[0].message` to `issues`
    array
      - Use `toEqual()` for exact match
      - Handle cases with multiple issues

   5. **Delete & regenerate**:
      - `src/generate/animation/duration.test.ts`
      - `src/generate/animation/duration.failure.test.ts`

   ---

## 🎓 What We Learned

   1. **Zod errors are deeply nested** - need recursive traversal
   2. **Multiple validation errors happen** - can't just check
   first one
   3. **World Class = Exact Match** - no shortcuts, no partial
   matching
   4. **Shared utilities matter** - don't copy-paste to every file
   5. **Test what you ship** - capture actual error output, don't
   guess

   ---

## ✅ Success Criteria

- [ ] `zodErrorToIssues()` in shared location
- [ ] All generate functions import it (just duration for now)
- [ ] Test config uses `expectedIssues: Issue[]` format
- [ ] Tests do exact match:
   `expect(result.issues).toEqual([...])`
- [ ] All 20 duration tests pass (11 valid + 9 invalid)
- [ ] All 3,723 tests still passing
- [ ] `just check` passes

   **Then**: Apply pattern to remaining 6 animation properties.

   ---
