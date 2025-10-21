# Master Plan - Readiness Assessment

**Date**: 2025-10-21T02:26  
**Status**: ⚠️ GOOD BUT NEEDS GAPS FILLED

---

## ✅ What's Ready

### 1. **Vision & Motivation** ✅
- Clear problem statement
- Before/after examples
- Benefits explained
- Round-trip workflow shown

### 2. **API Design** ✅
- Parse/generate signatures defined
- Type system complete
- Error handling pattern (issues array)
- Options defined (minify, etc.)

### 3. **Phase Structure** ✅
- 5 phases identified
- Time estimates per phase
- Files to create listed
- Success criteria defined

### 4. **Code Examples** ✅
- Complete implementation for parse()
- Complete implementation for generate()
- Helper functions (levenshtein, findSimilar)
- Test examples provided

### 5. **Test Specifications** ✅
- Test cases for each phase
- Error scenarios covered
- Round-trip test plan
- Coverage goals stated

---

## ⚠️ What's Missing or Incomplete

### 1. **Property Map - INCOMPLETE** ⚠️

**What we have**: Examples (~20 properties)
```typescript
'color': Parse.Color,
'background-color': Parse.Color,
'clip-path': Parse.ClipPath,
// ... ~100+ more properties
```

**What we need**: 
- ❌ Complete list of ALL properties we support
- ❌ Need to audit current codebase for what's implemented
- ❌ Need to verify each property → parser mapping

**Action needed**:
```bash
# Survey what we currently support
grep -r "export.*parse" src/parse/*/index.ts
grep -r "export.*toCss" src/generate/*/index.ts

# Create complete mapping
```

---

### 2. **Shorthand Properties - INCOMPLETE** ⚠️

**What we have**: Examples (~10 shorthands)
```typescript
SHORTHAND_PROPERTIES = new Set([
  'margin', 'padding', 'border', 'background',
  // ... complete list
])
```

**What we need**:
- ❌ Complete list of ALL CSS shorthand properties
- ❌ Shorthand → longhand expansion map (for helpful errors)

**Reference needed**: CSS spec for all shorthand properties
- margin, padding, border*
- background, font, flex, grid
- animation, transition
- place-*, gap, inset
- text-decoration, list-style
- column-rule, mask, offset

**Action needed**: Research and document complete list

---

### 3. **IR Kind → Generator Map - INCOMPLETE** ⚠️

**What we have**: Partial list (~30 IR kinds)
```typescript
'hex': Generate.Color.Hex.toCss,
'radial': Generate.Gradient.Radial.toCss,
// ... all other IR kinds
```

**What we need**:
- ❌ Complete exhaustive list of ALL IR kinds
- ❌ Need to audit all `kind: "..."` literals in codebase
- ❌ Verify each has a generator

**Action needed**:
```bash
# Find all IR kind literals
grep -r "kind.*:" src/core/types/
grep -r "kind: z.literal" src/core/types/

# Verify generators exist
ls src/generate/*/
```

---

### 4. **Edge Cases - PARTIALLY COVERED** ⚠️

**Covered**:
- ✅ Missing colon
- ✅ Empty property/value
- ✅ Shorthand rejection
- ✅ Unknown property
- ✅ Typos (levenshtein)

**Not covered**:
- ❌ Multiple colons in value: `content: "foo: bar"`
- ❌ Semicolons in strings: `content: "hello; world"`
- ❌ URL data URIs with semicolons
- ❌ Empty declarations in parseAll
- ❌ Duplicate properties in generateAll
- ❌ Invalid IR kinds in generateAll
- ❌ Case sensitivity (property names)

**Action needed**: Add test cases for these

---

### 5. **Parser Module Structure - UNCLEAR** ⚠️

**Question**: What's the interface for parser modules?

Currently we assume:
```typescript
Parse.Color.parse(value)     // ✅ This exists
Parse.Gradient.parse(value)  // ✅ This exists
Parse.ClipPath.parse(value)  // ✅ This exists
```

**But we need to verify**:
- ❌ Do all modules export `.parse()`?
- ❌ Is the signature consistent?
- ❌ Do they all return `Result<T, string>`?

**Action needed**:
```bash
# Audit parser interfaces
grep -r "export function parse" src/parse/
grep -r "export.*parse" src/parse/*/index.ts
```

---

### 6. **Generator Module Structure - UNCLEAR** ⚠️

**Question**: What's the interface for generator modules?

Currently we assume:
```typescript
Generate.Color.Hex.toCss(value)
Generate.Gradient.Radial.toCss(value)
```

**But we need to verify**:
- ❌ Do all generators export `.toCss()`?
- ❌ Is the signature consistent `(ir: T) => string`?
- ❌ Are they organized by module.type.toCss?

**Action needed**:
```bash
# Audit generator interfaces
grep -r "export function toCss" src/generate/
ls -la src/generate/*/*.ts
```

---

## 🎯 What We Need Before Starting

### Phase 0: Audit & Documentation (2-3h) ⬅️ DO THIS FIRST

**Task 1: Survey Current Implementation**
```bash
# 1. Find all parsers
find src/parse -name "*.ts" -not -name "*.test.ts" | xargs grep "export.*parse"

# 2. Find all generators  
find src/generate -name "*.ts" -not -name "*.test.ts" | xargs grep "export.*toCss"

# 3. Find all IR kinds
grep -r "kind: z.literal" src/core/types/ | cut -d'"' -f2 | sort -u

# 4. Document in spreadsheet or markdown table
```

**Task 2: Create Complete Property Map**
- List all CSS properties we support
- Map each to its parser module
- Verify parser exists and works

**Task 3: Create Complete IR Kind Map**
- List all IR kinds in codebase
- Map each to its generator function
- Verify generator exists and works

**Task 4: Create Complete Shorthand List**
- Reference CSS spec
- List all shorthand properties
- Map each to its longhand equivalents

**Task 5: Document Edge Cases**
- List all known edge cases
- Add test specifications for each
- Update MASTER_PLAN.md

---

## 📊 Readiness Score

| Component | Status | Notes |
|-----------|--------|-------|
| Vision | ✅ 100% | Crystal clear |
| API Design | ✅ 100% | Complete & validated |
| Type System | ✅ 100% | Defined & documented |
| Phase Structure | ✅ 100% | Well organized |
| Code Examples | ✅ 95% | Minor gaps in edge cases |
| Test Specs | ✅ 90% | Core covered, edges need work |
| Property Map | ⚠️ 20% | Examples only, needs audit |
| Shorthand List | ⚠️ 30% | Partial, needs CSS spec research |
| IR Kind Map | ⚠️ 20% | Examples only, needs audit |
| Parser Interface | ⚠️ 60% | Assumed, needs verification |
| Generator Interface | ⚠️ 60% | Assumed, needs verification |

**Overall**: ⚠️ **70% Ready**

---

## 🚀 Recommendation

### Option A: Start with Phase 0 (Audit)
**Do this if**: You want complete confidence before coding

**Steps**:
1. Spend 2-3 hours auditing codebase
2. Create complete mappings
3. Document edge cases
4. Then start Phase 1

**Pros**: No surprises during implementation  
**Cons**: Delays start by 2-3 hours

---

### Option B: Start Phase 1 with Discovery
**Do this if**: You want to start coding immediately

**Steps**:
1. Start Phase 1 (Property Mapping)
2. Discover properties/IR kinds as you go
3. Build incrementally
4. Refine based on discoveries

**Pros**: Immediate progress  
**Cons**: May need rework if assumptions wrong

---

### Option C: Hybrid Approach (RECOMMENDED)
**Do this if**: You want balance

**Steps**:
1. Quick 30-min audit (just count & verify interfaces)
2. Start Phase 1 with first 10-20 properties
3. Commit & test incrementally
4. Expand as you go

**Pros**: Quick start + validation  
**Cons**: None, this is optimal

---

## ✅ My Recommendation: **Option C - Hybrid**

### Quick Audit (30 min)
```bash
# 1. Count parsers
find src/parse -type d -depth 1 | wc -l

# 2. Pick 3 modules, verify interface
cat src/parse/color/index.ts | grep "export.*parse"
cat src/parse/gradient/index.ts | grep "export.*parse"
cat src/parse/clip-path/index.ts | grep "export.*parse"

# 3. Count generators
find src/generate -type d -depth 1 | wc -l

# 4. Pick 3 modules, verify interface
cat src/generate/color/hex.ts | grep "export.*toCss"
cat src/generate/gradient/radial.ts | grep "export.*toCss"

# 5. Get IR kind samples
grep -r "kind: z.literal" src/core/types/ | head -20
```

### Start Phase 1 (Incremental)
1. Create `src/property-map.ts` with 20 properties
2. Create `src/ir-to-generator.ts` with 20 IR kinds
3. Write tests for what you built
4. Commit
5. Repeat until complete

---

## 🎯 Bottom Line

**Is the plan ready?** ⚠️ **70% Ready**

**Can we start?** ✅ **YES** - with hybrid approach

**What's the risk?** 🟡 **Low-Medium** - might need adjustments

**Recommendation**: 
1. Do 30-min quick audit first
2. Start Phase 1 incrementally
3. Discover & document as you go
4. Commit frequently

The plan is **good enough to start**, but **not perfect**.  
The hybrid approach mitigates risk while maintaining momentum.

---

**Ready to proceed?** 🚀
