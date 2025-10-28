# Layout Module Organization Audit

**Date**: 2025-10-28  
**Reference**: MDN Data (mdm-data/css/properties.json)  
**Goal**: Align b_value module structure with CSS specification groups

---

## 🎯 Problem

Our `layout/` module is a catch-all containing properties from different CSS specification groups:

```
src/parse/layout/
├── opacity.ts          ← CSS Color group
├── visibility.ts       ← CSS Display group
├── display.ts          ← CSS Display group
├── position.ts         ← CSS Positioned Layout group
├── overflow-x.ts       ← CSS Overflow group
├── width.ts            ← CSS Box Sizing group
├── margin-top.ts       ← CSS Box Model group
└── ... many more
```

---

## 📊 CSS Specification Groups (per MDN Data)

### Properties Currently in layout/

| Property | CSS Spec Group | Should Be In Module |
|----------|---------------|---------------------|
| **opacity** | CSS Color | `color/` |
| **visibility** | CSS Display | `display/` or `layout/` |
| **display** | CSS Display | `display/` or `layout/` |
| **position** | CSS Positioned Layout | `position/` or `layout/` |
| **overflow-x/y** | CSS Overflow | `overflow/` or `layout/` |
| **width/height** | CSS Box Sizing | `box/` or `layout/` |
| **margin-***, **padding-*** | CSS Box Model | `box/` or `layout/` |
| **top/right/bottom/left** | CSS Positioned Layout | `position/` or `layout/` |
| **box-sizing** | CSS Box Sizing | `box/` or `layout/` |
| **cursor** | CSS Basic User Interface | `ui/` or `interaction/` |

---

## 🤔 Analysis

### Option 1: Strict CSS Spec Alignment
Create modules matching CSS specification groups:
```
src/parse/
├── color/
│   ├── opacity.ts          ← CSS Color group
│   └── ...
├── display/
│   ├── display.ts          ← CSS Display
│   └── visibility.ts       ← CSS Display
├── position/
│   ├── position.ts         ← CSS Positioned Layout
│   ├── top.ts
│   ├── left.ts
│   └── ...
├── box/
│   ├── width.ts            ← CSS Box Sizing
│   ├── margin-top.ts       ← CSS Box Model
│   └── ...
```

**Pros**:
- ✅ Perfect alignment with CSS specs
- ✅ Easy to find properties (follow MDN grouping)
- ✅ Clear semantic organization

**Cons**:
- ❌ Requires major restructuring
- ❌ Breaks existing imports
- ❌ Many small modules

### Option 2: Pragmatic Grouping (Current + Refinement)
Keep practical categories, refine where obvious:
```
src/parse/
├── layout/              ← Box model, sizing, positioning
│   ├── width.ts
│   ├── margin-top.ts
│   ├── position.ts
│   └── ...
├── visual/              ← Appearance, visibility, effects
│   ├── opacity.ts       ← MOVE from layout/
│   ├── visibility.ts    ← MOVE from layout/
│   ├── mix-blend-mode.ts
│   └── ...
├── interaction/         ← User interaction
│   ├── cursor.ts        ← MOVE from layout/
│   └── ...
```

**Pros**:
- ✅ Minimal restructuring
- ✅ More intuitive grouping
- ✅ Fewer modules to navigate

**Cons**:
- ⚠️ Doesn't perfectly match CSS specs
- ⚠️ Subjective categorization

### Option 3: Hybrid Approach
Core layout stays, split out obvious mismatches:
```
src/parse/
├── layout/              ← Core layout (box model, positioning)
├── color/               ← Color-related (includes opacity)
├── visual/              ← Visual effects (visibility, blend modes)
├── interaction/         ← UI interaction
```

---

## 💡 Recommendation: Option 2 (Pragmatic + Refinement)

### Immediate Moves

**Move to visual/**:
- `opacity.ts` (currently in layout/) → CSS Color group
- `visibility.ts` (currently in layout/) → CSS Display group
- Both relate to "visual appearance" more than "layout"

**Move to interaction/** (future):
- `cursor.ts` (currently in layout/) → CSS Basic User Interface

**Keep in layout/**:
- Box model: margin, padding, width, height
- Positioning: position, top, left, bottom, right
- Display modes: display
- Overflow: overflow-x, overflow-y
- Box sizing: box-sizing

### Why This Makes Sense

1. **Visual module semantic**:
   - opacity = how transparent
   - visibility = whether visible
   - blend modes = how to blend
   - All about "visual appearance", not layout flow

2. **Layout module semantic**:
   - Box dimensions and spacing
   - Element positioning in flow
   - Display modes affecting layout
   - Overflow behavior

3. **Minimal disruption**:
   - Only move 2-3 files now (opacity, visibility)
   - Existing test structure preserved
   - Can refine further later

---

## 🚀 Implementation Plan

### Phase 1: Move opacity and visibility to visual/

```bash
cd /Users/alphab/Dev/LLM/DEV/b_value

# Parse functions
mv src/parse/layout/opacity.ts src/parse/visual/opacity.ts
mv src/parse/layout/opacity.test.ts src/parse/visual/opacity.test.ts
mv src/parse/layout/visibility.ts src/parse/visual/visibility.ts  
mv src/parse/layout/visibility.test.ts src/parse/visual/visibility.test.ts

# Generate functions
mv src/generate/layout/opacity.ts src/generate/visual/opacity.ts
mv src/generate/layout/opacity.test.ts src/generate/visual/opacity.test.ts
mv src/generate/layout/visibility.ts src/generate/visual/visibility.ts
mv src/generate/layout/visibility.test.ts src/generate/visual/visibility.test.ts

# Update imports in index.ts files
# Update any cross-references
```

### Phase 2: Create dual test configs for visual/

```bash
# Create parse configs
scripts/parse-test-generator/configs/visual/opacity.ts
scripts/parse-test-generator/configs/visual/visibility.ts

# Create generate configs  
scripts/generate-test-generator/configs/visual/opacity.ts
scripts/generate-test-generator/configs/visual/visibility.ts

# Generate tests
pnpm tsx scripts/generate-parse-tests.ts visual/opacity
pnpm tsx scripts/generate-generate-tests.ts visual/opacity
pnpm tsx scripts/generate-parse-tests.ts visual/visibility
pnpm tsx scripts/generate-generate-tests.ts visual/visibility
```

### Phase 3: Update type definitions

Ensure IR types reflect the module organization:
```typescript
// src/core/types/visual.ts (if separate from layout.ts)
export const opacitySchema = ...
export const visibilitySchema = ...
```

---

## 📋 Benefits of This Reorganization

1. **Better semantic grouping**:
   - Visual module = appearance properties
   - Layout module = spatial/flow properties

2. **Aligns with common understanding**:
   - opacity/visibility are "visual effects"
   - margin/padding are "layout/spacing"

3. **Sets precedent for future**:
   - Clear pattern for where properties go
   - Easy to explain to contributors

4. **Matches user mental model**:
   - "I want to change how it looks" → visual/
   - "I want to change where it is" → layout/

---

## ✅ Decision

**Move opacity and visibility from layout/ to visual/**

Rationale:
- Both properties affect visual appearance, not layout flow
- opacity is in "CSS Color" spec group
- visibility is in "CSS Display" spec group (but more about appearance)
- visual/ already exists with blend modes
- Minimal disruption, clear improvement

**Implementation**: During Phase 2B (Visual Module) of dual test expansion!

---

## 📚 Reference

**MDN Data Source**: `/Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json`

**Check property group**:
```bash
cat /Users/alphab/Dev/LLM/DEV/mdm-data/css/properties.json | jq '."property-name".groups'
```

**Opacity**:
```json
{"groups": ["CSS Color"]}
```

**Visibility**:
```json
{"groups": ["CSS Display", "Scalable Vector Graphics"]}
```

