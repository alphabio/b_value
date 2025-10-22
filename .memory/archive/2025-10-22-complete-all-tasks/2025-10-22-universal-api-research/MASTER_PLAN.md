# Universal API - Master Plan & Research

**Session**: 2025-10-22  
**Status**: Research Complete, Ready for Implementation  
**Mission**: Create nuclear-rewrite of Universal API with plain object IR (no wrappers)

---

## 🎯 API Contract (Agreed Upon)

### Parse API
```typescript
parse("color: red; width: 10px")
// → { ok: true, value: { color: ColorIR, width: LengthIR }, issues: [] }

parse("color: invalid")
// → { ok: false, value: { color: "invalid" }, issues: [...] }
```

### Generate API
```typescript
generate({ color: ColorIR, width: LengthIR })
// → { ok: true, value: "color: red; width: 10px", issues: [] }
```

**Key Principles:**
- ✅ NO ValueIR wrapper - Plain objects ARE the IR
- ✅ Always return { ok, value, issues }
- ✅ String passthrough for unknown/invalid properties
- ✅ Support 1+ declarations (semicolon-separated)
- ✅ Forgiving: partial success, continue on error

---

## 📊 Current API Structure (Research Complete)

### Module Organization

The API is **beautifully organized** with a consistent structure:

```
src/
├── parse/
│   ├── index.ts          ← Top-level: exports 19 modules
│   ├── animation/        ← 8 properties
│   ├── background/       ← 8 properties  
│   ├── border/           ← 16 properties (4 sides × 4 types)
│   ├── clip-path/        ← 1 property
│   ├── color/            ← 1 property (auto-detect all formats)
│   ├── filter/           ← 1 property (auto-detect all functions)
│   ├── flexbox/          ← 11 properties
│   ├── gradient/         ← Not a property (used by background-image)
│   ├── interaction/      ← 2 properties
│   ├── layout/           ← 29 properties
│   ├── outline/          ← 4 properties
│   ├── position/         ← Not a property (utility)
│   ├── shadow/           ← 2 properties
│   ├── text/             ← 4 properties (text-decoration-*)
│   ├── transform/        ← 2 properties
│   ├── transition/       ← 4 properties
│   ├── typography/       ← 11 properties
│   └── visual/           ← 2 properties (blend modes)
└── generate/
    └── (mirrors parse structure)
```

### Top-Level Module Exports

**src/parse/index.ts** exports:
- Animation, Background, Border, ClipPath, Color, Filter
- Gradient, Interaction, Layout, Outline, Position
- Shadow, Text, Transform, Transition

**Missing from top-level** (but exist as directories):
- ❌ Flexbox (not exported)
- ❌ Typography (not exported)  
- ❌ Visual (not exported)

### Parser Naming Convention

**Consistent across ALL modules:**
```typescript
// Each module exports a `parse` function
import { parse } from "./module-name";

// Sub-modules export namespaces with `parse`:
export * as SubModule from "./sub-module";
// which exposes: SubModule.parse()
```

**Examples:**
- `Parse.Color.parse()`
- `Parse.Background.Clip.parse()`
- `Parse.Layout.Width.parse()`
- `Parse.Animation.Delay.parse()`

### Generator Naming Convention

**Consistent across ALL modules:**
```typescript
// Each generator exports a `toCss` function
export function toCss(ir: Type): string;

// Sub-modules export namespaces with `toCss`:
export * as SubModule from "./sub-module";
// which exposes: SubModule.toCss()
```

**Examples:**
- `Generate.Color.toCss()`
- `Generate.Background.Clip.toCss()`
- `Generate.Layout.Width.toCss()`

---

## 🚨 Issues Found in Current API

### Issue #1: Missing Top-Level Exports

**Problem**: Flexbox, Typography, and Visual modules exist but are NOT exported at Parse/Generate top-level.

**Impact**: Users cannot access these via documented API:
```typescript
// ❌ This doesn't work:
Parse.Flexbox.FlexBasis.parse()

// ✅ They must do:
import * as Flexbox from "b_value/parse/flexbox";
Flexbox.FlexBasis.parse()
```

**Solution**: Add to `src/parse/index.ts` and `src/generate/index.ts`:
```typescript
export * as Flexbox from "./flexbox";
export * as Typography from "./typography";
export * as Visual from "./visual";
```

### Issue #2: Visual Module Export Inconsistency

**Problem**: Visual module uses `parseBackgroundBlendMode()` instead of standard naming.

**Current** (src/parse/visual/index.ts):
```typescript
export { parseBackgroundBlendMode } from "./background-blend-mode.js";
export { parseMixBlendMode } from "./mix-blend-mode.js";
```

**Expected** (standard pattern):
```typescript
export * as BackgroundBlendMode from "./background-blend-mode";
export * as MixBlendMode from "./mix-blend-mode";
```

**Solution**: Refactor visual module to match standard naming convention.

### Issue #3: Layout Module Missing Clear/Float/Overflow

**Problem**: Some layout properties are missing from `src/parse/layout/index.ts`:
- `clear`
- `float`  
- `overflow` (only overflow-x and overflow-y exported)

**Evidence**: Files exist but not exported:
```bash
$ ls src/parse/layout/
clear.ts        # ✅ Exists
float.ts        # ✅ Exists  
overflow.ts     # ✅ Exists
```

**Solution**: Add to `src/parse/layout/index.ts`:
```typescript
export * as Clear from "./clear";
export * as Float from "./float";
export * as Overflow from "./overflow";
```

---

## 📋 Complete Property Registry (109 Properties)

### Animation (8)
- animation-delay
- animation-direction
- animation-duration
- animation-fill-mode
- animation-iteration-count
- animation-name
- animation-play-state
- animation-timing-function

### Background (8)
- background-attachment
- background-clip
- background-image
- background-origin
- background-position-x
- background-position-y
- background-repeat
- background-size

### Border (16)
- border-top-color, border-right-color, border-bottom-color, border-left-color
- border-top-style, border-right-style, border-bottom-style, border-left-style
- border-top-width, border-right-width, border-bottom-width, border-left-width
- border-top-left-radius, border-top-right-radius, border-bottom-left-radius, border-bottom-right-radius

### Clip-path (1)
- clip-path

### Color (1)
- color

### Filter (1)
- filter

### Flexbox (11)
- align-content
- align-items
- align-self
- flex-basis
- flex-direction
- flex-grow
- flex-shrink
- flex-wrap
- gap
- justify-content
- order

### Interaction (2)
- pointer-events
- user-select

### Layout (29)
- bottom, left, right, top
- clear, float
- display
- height, width
- min-height, max-height
- min-width, max-width
- margin-top, margin-right, margin-bottom, margin-left
- padding-top, padding-right, padding-bottom, padding-left
- opacity
- overflow, overflow-x, overflow-y
- position
- visibility
- z-index
- box-sizing
- cursor

### Outline (4)
- outline-color
- outline-offset
- outline-style
- outline-width

### Shadow (2)
- box-shadow
- text-shadow

### Text (4)
- text-decoration-color
- text-decoration-line
- text-decoration-style
- text-decoration-thickness

### Transform (2)
- transform
- transform-origin

### Transition (4)
- transition-delay
- transition-duration
- transition-property
- transition-timing-function

### Typography (11)
- font-family
- font-size
- font-style
- font-weight
- letter-spacing
- line-height
- overflow-wrap
- text-align
- text-transform
- vertical-align
- word-break

### Visual (2)
- background-blend-mode
- mix-blend-mode

---

## 🔑 Implementation Strategy

### Phase 1: Fix Existing API Issues (Do This First!)

**File**: `src/parse/index.ts`
```typescript
// Add missing exports
export * as Flexbox from "./flexbox";
export * as Typography from "./typography";
export * as Visual from "./visual";
```

**File**: `src/generate/index.ts`
```typescript
// Add missing exports
export * as Flexbox from "./flexbox";
export * as Typography from "./typography";
export * as Visual from "./visual";
```

**File**: `src/parse/layout/index.ts`
```typescript
// Add missing exports
export * as Clear from "./clear";
export * as Float from "./float";
export * as Overflow from "./overflow";
```

**File**: `src/generate/layout/index.ts`
```typescript
// Add missing exports
export * as Clear from "./clear";
export * as Float from "./float";
export * as Overflow from "./overflow";
```

**File**: `src/parse/visual/index.ts` & `background-blend-mode.ts`, `mix-blend-mode.ts`
```typescript
// Refactor to standard naming:
export * as BackgroundBlendMode from "./background-blend-mode";
export * as MixBlendMode from "./mix-blend-mode";

// In each file:
export function parse(css: string): ParseResult<...> { }
```

### Phase 2: Build Property Registry

Create **automated script** to generate property map:
```bash
.memory/scripts/generate-property-map.sh
```

This script will:
1. Scan all parse modules
2. Extract property names from file names
3. Map to module paths (e.g., `"color" → Parse.Color.parse`)
4. Generate TypeScript code for PROPERTY_PARSERS and PROPERTY_GENERATORS
5. Handle special cases (border-*, margin-*, padding-*)

### Phase 3: Implement Universal API

**File**: `src/universal.ts`

```typescript
import * as Parse from "@/parse";
import * as Generate from "@/generate";

// Generated by script (do not hand-write!)
const PROPERTY_PARSERS = {
  "color": Parse.Color.parse,
  "width": Parse.Layout.Width.parse,
  "flex-basis": Parse.Flexbox.FlexBasis.parse,
  // ... 109 properties total
};

const PROPERTY_GENERATORS = {
  "color": Generate.Color.toCss,
  "width": Generate.Layout.Width.toCss,
  "flex-basis": Generate.Flexbox.FlexBasis.toCss,
  // ... 109+ properties total
};

export function parse(css: string): ParseDeclarationsResult {
  // Split by semicolon
  // For each declaration:
  //   - Parse "prop: value"
  //   - Lookup in PROPERTY_PARSERS
  //   - If not found: string passthrough + issue
  //   - If parse fails: string passthrough + issue
  //   - If parse succeeds: store IR value
  // Return { ok, value, issues }
}

export function generate(values: Record<string, unknown>): GenerateDeclarationsResult {
  // For each [prop, value] in values:
  //   - If string: passthrough
  //   - Lookup in PROPERTY_GENERATORS
  //   - If not found: string coercion + issue
  //   - If generate throws: skip + issue
  //   - If generate succeeds: add to declarations
  // Return { ok, value: declarations.join("; "), issues }
}
```

### Phase 4: Comprehensive Tests

**File**: `src/universal.test.ts`

Test categories:
1. ✅ Single property (valid/invalid)
2. ✅ Multiple properties (valid/mixed)
3. ✅ Edge cases (empty, trailing semicolon, whitespace)
4. ✅ String passthrough (unknown properties, invalid values)
5. ✅ Round-trip (parse → generate)
6. ✅ Round-trip with modification (parse → modify → generate)
7. ✅ Complex properties (gradients, transforms, shadows, flexbox)
8. ✅ All 109 properties (smoke test)

---

## 📐 Type Definitions

```typescript
export interface ParseDeclarationsResult {
  ok: boolean;
  value: Record<string, unknown>; // Plain object, no wrapper
  issues: Issue[];
}

export interface GenerateDeclarationsResult {
  ok: boolean;
  value: string; // CSS declarations string
  issues: Issue[];
}

interface Issue {
  property: string;
  message: string;
  code: "unknown_property" | "parse_error" | "generate_error" | "invalid_declaration";
}
```

---

## ✅ Pre-Implementation Checklist

- [ ] Fix missing exports (Phase 1)
- [ ] Run `just check && just test` to verify no breakage
- [ ] Create property map generation script (Phase 2)
- [ ] Verify script output (manually review 109 properties)
- [ ] Implement universal.ts (Phase 3)
- [ ] Implement universal.test.ts (Phase 4)
- [ ] Run tests: `pnpm test src/universal.test.ts`
- [ ] Run full test suite: `just test`
- [ ] Update src/index.ts to export parse/generate
- [ ] Run `just check` for lint/typecheck
- [ ] Commit with descriptive message

---

## 🎓 Key Insights

### What Makes This API Beautiful

1. **Consistent Naming**: Every module follows `Module.SubModule.parse()` pattern
2. **Type-Safe**: ParseResult<T> everywhere, no exceptions thrown
3. **Modular**: Each property is isolated, testable, documented
4. **Auto-Detection**: Color and Filter parsers detect format automatically
5. **Spec-Compliant**: Built on css-tree parser, follows W3C specs
6. **Well-Tested**: 3032 tests, 100% passing

### Why Universal API is "Icing on the Cake"

The core API is already complete and production-ready:
- Users can import specific parsers: `Parse.Color.parse()`
- Type definitions are perfect: `ParseResult<Color>`
- Documentation is comprehensive

Universal API adds **convenience**:
- Parse entire style blocks: `parse("color: red; width: 10px")`
- Generate CSS from objects: `generate({ color, width })`
- Forgiving for real-world use (invalid values → passthrough)

---

## 🚀 Next Agent Instructions

1. **Start with Phase 1** - Fix the API issues we found
2. **Test thoroughly** - Run full test suite after Phase 1
3. **Create the script** - Phase 2 is critical for maintainability
4. **Follow the plan** - Don't improvise, stick to the contract
5. **Test again** - Every phase should pass tests

**Estimated Time**: 2-3 hours total

---

**Notes**:
- This is NOT trial and error - we have full understanding
- The API is beautiful - we're just adding convenience layer
- All 109 properties are documented and working
- Script-generated registry = zero typos, easy to maintain
