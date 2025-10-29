# Dual Test Generator Expansion Plan

**Created**: 2025-10-27
**Status**: Animation module complete (8/8 properties), infrastructure proven
**Goal**: Expand dual test coverage (parse + generate + roundtrip) to all 94 implemented properties

---

## 🎯 Strategy

### Phase 1: Validate Infrastructure (DONE ✅)
- ✅ Animation module (8 properties) - proven working
- ✅ Refactored to module-based structure
- ✅ Both generators support new syntax
- ✅ All 3,816 tests passing

---

## ⚠️ CRITICAL RULES

### 1. File Naming Convention (DO NOT DEVIATE!)

**Parse Tests:**

```
✅ CORRECT: src/parse/{module}/{property}.test.ts
✅ CORRECT: src/parse/{module}/{property}.failure.test.ts

❌ WRONG: src/parse/{module}/{property}.parse.test.ts
❌ WRONG: src/parse/{module}/{property}.parse.failure.test.ts
```

**Generate Tests:**

```
✅ CORRECT: src/generate/{module}/{property}.test.ts
✅ CORRECT: src/generate/{module}/{property}.failure.test.ts

❌ WRONG: src/generate/{module}/{property}.generate.test.ts
❌ WRONG: src/generate/{module}/{property}.generate.failure.test.ts
```

**Examples from Animation Module:**

```
src/parse/animation/delay.test.ts           ✅
src/parse/animation/delay.failure.test.ts   ✅
src/generate/animation/delay.test.ts        ✅
src/generate/animation/delay.failure.test.ts ✅
```

### 2. NEVER Manually Edit Generated Tests

**❌ DO NOT:**
- Edit generated test files directly
- Fix type errors by changing test code
- Add/remove test cases in generated files
- "Quick fix" failing tests

**✅ ALWAYS:**
- Fix the config file in `scripts/{parse,generate}-test-generator/configs/{module}/{property}.ts`
- Regenerate tests using the generator scripts
- Verify all tests pass after regeneration

**Why?**
- Manual edits will be lost on next regeneration
- Config is the source of truth
- Maintains consistency across all properties
- Enables bulk regeneration when generator changes

### 3. Config Regeneration Workflow

```bash
# 1. Identify issue in generated test
# 2. Fix config file
vi scripts/parse-test-generator/configs/{module}/{property}.ts

# 3. Delete old generated tests
rm src/parse/{module}/{property}.test.ts
rm src/parse/{module}/{property}.failure.test.ts

# 4. Regenerate
pnpm tsx scripts/generate-parse-tests.ts {module}/{property}
pnpm tsx scripts/generate-generate-tests.ts {module}/{property}

# 5. Verify
just test
just check
```

### 4. Correct Config Format

**Parse Test Config:**

```typescript
export const config: PropertyConfig = {
  propertyName: "delay",
  module: "animation",
  sourceFile: "src/parse/animation/delay.ts",
  importPath: "../src/parse/animation/delay.js",
  outputPath: "src/parse/animation/delay.test.ts",  // ✅ NO .parse prefix!
  cases: [ /* test cases */ ],
};
```

**Generate Test Config:**

```typescript
export const config: PropertyConfig = {
  propertyName: "delay",
  module: "animation",
  sourceFile: "src/generate/animation/delay.ts",
  importPath: "../src/generate/animation/delay.js",
  parseImportPath: "../src/parse/animation/delay.js",
  outputPath: "src/generate/animation/delay.test.ts",  // ✅ NO .generate prefix!
  cases: [ /* test cases */ ],
};
```

**Common Mistakes:**

```typescript
// ❌ WRONG
outputPath: "src/parse/layout/box-sizing.parse.test.ts"
outputPath: "src/generate/layout/box-sizing.generate.test.ts"

// ✅ CORRECT
outputPath: "src/parse/layout/box-sizing.test.ts"
outputPath: "src/generate/layout/box-sizing.test.ts"
```

---

### Phase 2: Adjacent Modules (Next)
Expand to modules that share properties with animation:
1. **Transition** (5 properties) - shares duration, delay, timing-function
2. **Visual** (2 properties) - opacity, visibility

### Phase 3: Simple Enums (After Phase 2)
Focus on properties with enum values (easiest to test):
1. **Interaction** (2 properties) - cursor, pointer-events
2. **Layout basics** - display, position, overflow, visibility
3. **Flexbox/Grid alignment** - justify-content, align-items, etc.

### Phase 4: Value-Based Properties
Properties with numeric/length values:
1. **Border** (width, radius)
2. **Typography** (font-size, line-height)
3. **Box Model** (margin, padding, width, height)

### Phase 5: Complex Properties
1. **Transform** (complex functions)
2. **Filter** (filter functions)
3. **Clip-path** (shape functions)
4. **Background** (multiple values, gradients)

---

## 📋 Detailed Module Plan

### Phase 2A: Transition Module (IMMEDIATE NEXT)

**Effort**: ~30-40 minutes
**Priority**: HIGH - validates cross-module property handling

**Properties** (5):
1. ✅ transition-duration - copy animation config
2. ✅ transition-delay - copy animation config
3. ✅ transition-timing-function - copy animation config
4. ⚠️ transition-property - NEW config (CSS property names + all/none)
5. ⚠️ transition - NEW config (shorthand, optional)

**Steps**:

```bash
# 1. Create directories
mkdir -p scripts/parse-test-generator/configs/transition
mkdir -p scripts/generate-test-generator/configs/transition

# 2. Copy shared properties
for prop in duration delay timing-function; do
  cp scripts/parse-test-generator/configs/animation/$prop.ts \
     scripts/parse-test-generator/configs/transition/$prop.ts
  cp scripts/generate-test-generator/configs/animation/$prop.ts \
     scripts/generate-test-generator/configs/transition/$prop.ts
done

# 3. Update module field in all 6 files
# Change: module: "animation" → module: "transition"
# Change paths: /animation/ → /transition/

# 4. Create transition-property config (NEW)
# Test: all, none, width, background-color, opacity

# 5. Generate all tests
for prop in duration delay timing-function property; do
  pnpm tsx scripts/generate-parse-tests.ts transition/$prop
  pnpm tsx scripts/generate-generate-tests.ts transition/$prop
done

# 6. Verify
just test
```

**Success Criteria**:
- [ ] All generate functions have Zod validation (CRITICAL!)
- [ ] All 5 properties have parse + generate configs
- [ ] All tests generated and passing
- [ ] Roundtrip validation works for all
- [ ] Results organized in transition/ subdirectories

---

### Phase 2B: Visual Module (Simple)

**Effort**: ~20 minutes
**Priority**: MEDIUM - very simple properties

**Properties** (2):
1. opacity - number 0-1 or percentage
2. visibility - enum (visible, hidden, collapse)

**Test Cases**:
- opacity: 0, 0.5, 1, 50%, inherit, invalid
- visibility: visible, hidden, collapse, VISIBLE, invalid

---

### Phase 3: Enum-Heavy Modules

**STATUS: ⚠️ NEEDS CLEANUP**
- 14 properties completed with dual tests
- ❌ Configs have wrong `outputPath` (includes `.parse` and `.generate` prefixes)
- ❌ Some tests were manually edited (box-sizing, cursor, display)
- ❌ 2 properties skipped (clear, float) due to generator escaping bug

**Cleanup Required:**

```bash
# 1. Fix all Phase 3 config outputPath values
# Remove .parse and .generate from outputPath in:
scripts/parse-test-generator/configs/{layout,flexbox,typography}/*.ts
scripts/generate-test-generator/configs/{layout,flexbox,typography}/*.ts

# 2. Delete all incorrectly named files
rm src/parse/*/*.parse.test.ts
rm src/parse/*/*.parse.failure.test.ts
rm src/generate/*/*.generate.test.ts
rm src/generate/*/*.generate.failure.test.ts

# 3. Regenerate all Phase 3 tests
for module in layout flexbox typography; do
  for config in scripts/parse-test-generator/configs/$module/*.ts; do
    prop=$(basename $config .ts)
    pnpm tsx scripts/generate-parse-tests.ts $module/$prop
    pnpm tsx scripts/generate-generate-tests.ts $module/$prop
  done
done

# 4. Verify
just test
just check
```

#### Interaction (2 properties)
- cursor - enum + url()
- pointer-events - enum

#### Layout Core (5 properties)
- display - enum (block, inline, flex, grid, none, etc.)
- position - enum (static, relative, absolute, fixed, sticky)
- overflow-x - enum (visible, hidden, scroll, auto)
- overflow-y - enum (visible, hidden, scroll, auto)
- visibility - enum (done in Phase 2B)

#### Flexbox Alignment (6 properties)
- justify-content - enum
- align-items - enum
- align-content - enum
- flex-direction - enum
- flex-wrap - enum
- align-self - enum

**Total Phase 3**: ~13 properties, mostly enums

---

### Phase 4: Value-Based Modules

#### Border (17 properties)
Already implemented, need configs:
- border-{top,right,bottom,left}-width
- border-{top,right,bottom,left}-color
- border-{top,right,bottom,left}-style
- border-{top-left,top-right,bottom-right,bottom-left}-radius
- border-collapse

#### Typography (11 properties)
- font-size, font-weight, font-family, font-style
- line-height, letter-spacing, word-spacing
- text-align, text-decoration, text-transform
- white-space

#### Box Model (25 properties)
- width, height, min/max-width, min/max-height
- margin-{top,right,bottom,left}
- padding-{top,right,bottom,left}
- box-sizing

**Total Phase 4**: ~53 properties

---

### Phase 5: Complex Modules

#### Transform (2+ properties)
- transform - complex functions (translate, rotate, scale, etc.)
- transform-origin

#### Filter (12 properties)
- filter - filter functions
- Individual filter properties (blur, brightness, contrast, etc.)

#### Clip-path (11 properties)
- clip-path - shape functions (circle, ellipse, polygon, inset, etc.)

#### Shadow (3 properties)
- box-shadow - multiple shadows
- text-shadow
- drop-shadow (in filter)

**Total Phase 5**: ~28 properties

---

## 📊 Coverage Goals

### Current State

```
Animation:     8/8   (100%) ✅
Transition:    0/5   (0%)
Visual:        0/2   (0%)
Interaction:   0/2   (0%)
Layout:        0/30  (0%)
Flexbox:       0/11  (0%)
Border:        0/17  (0%)
Typography:    0/11  (0%)
Box Model:     0/25  (0%)
Others:        0/~28 (0%)
-----------------------------------
TOTAL:         8/94  (8.5%)
```

### Phase Targets

```
After Phase 2:  15/94  (16%)  ← Transition + Visual
After Phase 3:  28/94  (30%)  ← + Enums
After Phase 4:  81/94  (86%)  ← + Value-based
After Phase 5:  94/94  (100%) ← Complete!
```

---

## ⚠️ CRITICAL: Generate Function Validation

**Before creating generate test configs**, ensure the generate function includes Zod validation:

### Required Pattern

```typescript
// src/generate/{module}/{property}.ts
import { zodErrorToIssues } from "@/generate/utils";
import { {propertyName}Schema } from "@/core/types/{module}";

export function generate(ir: Type.{PropertyName}): GenerateResult {
  // 1. Validate IR with Zod schema (REQUIRED!)
  const validation = {propertyName}Schema.safeParse(ir);

  if (!validation.success) {
    // Convert Zod errors to Issue array
    const issues = zodErrorToIssues(validation.error);
    return { ok: false, issues };
  }

  // 2. Generate CSS (existing logic)
  return generateOk(/* CSS string */);
}
```

### Example (animation-delay)

```typescript
export function generate(ir: Type.AnimationDelay): GenerateResult {
  // Validate IR with Zod schema
  const validation = animationDelaySchema.safeParse(ir);

  if (!validation.success) {
    const issues = zodErrorToIssues(validation.error);
    return { ok: false, issues };
  }

  // Generate CSS
  return generateOk(
    ir.delays.map((time) => `${time.value}${time.unit}`).join(", ")
  );
}
```

### Why This Matters
- ✅ Catches invalid IR before generating CSS
- ✅ Provides consistent error messages
- ✅ Test generator can verify error handling
- ✅ Enables `.failure.test.ts` generation
- ❌ **Without validation, generate tests will be incomplete**

### Implementation Checklist
For each property:
1. [ ] Check if Zod schema exists in `@/core/types/{module}`
2. [ ] Import schema and `zodErrorToIssues` utility
3. [ ] Add validation at start of generate function
4. [ ] Return `{ ok: false, issues }` on validation failure
5. [ ] Verify with a failing test case

---

## 🔧 Automation Opportunities

### Create Config Templates

```bash
# scripts/create-config.sh <module> <property> <type>
# Types: enum, length, number, color, keyword, complex

# Auto-generates skeleton config based on type
# User fills in specific test cases
```

### Bulk Config Generation
For modules with many similar properties (border, box-model):

```bash
# scripts/bulk-create-configs.sh border width,style,color
# Creates 3 configs with shared structure
```

### Config Validator

```bash
# scripts/validate-config.sh <module> <property>
# Checks:
# - module field present
# - importPath correct
# - outputPath correct
# - at least 5 test cases
```

---

## 🎯 Success Metrics

### Per Module
- [ ] All properties have parse configs
- [ ] All properties have generate configs
- [ ] All generated tests passing
- [ ] Roundtrip validation for all properties
- [ ] No ISSUES.md files (all mismatches resolved)
- [ ] Results organized in module subdirectory

### Overall
- [ ] 94/94 properties with dual test coverage
- [ ] ~6,000+ total tests (from current 3,816)
- [ ] Module completion tracked in ROADMAP.md
- [ ] Documentation updated for all modules

---

## 📅 Estimated Timeline

**Phase 2**: 1-2 hours (transition + visual)
**Phase 3**: 3-4 hours (enum properties)
**Phase 4**: 8-10 hours (value-based properties)
**Phase 5**: 6-8 hours (complex properties)

**Total**: 18-24 hours of work

**Recommended pace**: 2-3 properties per session, ~30-45 min per session

---

## 🚀 Quick Start (Transition Module)

```bash
# 1. Create structure
mkdir -p scripts/{parse,generate}-test-generator/configs/transition

# 2. Copy animation configs
for prop in duration delay timing-function; do
  for gen in parse generate; do
    cp scripts/${gen}-test-generator/configs/animation/$prop.ts \
       scripts/${gen}-test-generator/configs/transition/$prop.ts
  done
done

# 3. Update all 6 copied files
# - Change module: "animation" → module: "transition"
# - Change /animation/ → /transition/ in all paths
# - Update comments/descriptions

# 4. Test one property
pnpm tsx scripts/generate-parse-tests.ts transition/duration
pnpm tsx scripts/generate-generate-tests.ts transition/duration
just test

# 5. Repeat for delay, timing-function
# 6. Create new configs for property and transition (shorthand)
```

---

## 📚 References

- Current implementation: `src/parse/*/` and `src/generate/*/`
- Config examples: `scripts/parse-test-generator/configs/animation/`
- Generator scripts: `scripts/generate-{parse,generate}-tests.ts`
- ROADMAP: `.memory/ROADMAP.md` (property inventory)
- Session notes: `.memory/SESSION_NEXT.md`
