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
