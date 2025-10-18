# Refactoring Issues Found

## 1. css-tree Import Pattern ❌

**Current (incorrect):**
```typescript
const csstree = require("css-tree");
```

**Should be:**
```typescript
import * as csstree from "css-tree";
```

**Why:** Radial gradient parser uses proper ES6 import with type annotation at the top. We inconsistently switched to require() for linear and conic parsers.

**Files to fix:**
- `src/parse/gradient/linear.ts` (line 353)
- `src/parse/gradient/conic.ts` (line 420)

---

## 2. Color Interpolation Keywords ❌

**Current (incorrect):**
```typescript
const validSpaces = [
  "srgb", "srgb-linear", "display-p3", ...
];
if (validSpaces.includes(space)) {
  colorSpace = space as Keyword.ColorInterpolationKeyword;
}
```

**Should use:**
```typescript
import { COLOR_INTERPOLATION_KEYWORDS } from "@/core/keywords";

if (COLOR_INTERPOLATION_KEYWORDS.includes(space)) {
  colorSpace = space as Keyword.ColorInterpolationKeyword;
}
```

**Why:** We already have `COLOR_INTERPOLATION_KEYWORDS` array exported from core that contains all valid values. Duplicating this list violates DRY and risks getting out of sync.

**Files to fix:**
- `src/parse/gradient/linear.ts` (lines 172-195)
- `src/parse/gradient/conic.ts` (lines 232-255)
- `src/parse/gradient/radial.ts` (lines 303-326) - same issue!

---

## 3. Angle Unit Validation ❌

**Current (acceptable but could be better):**
```typescript
if (["deg", "rad", "grad", "turn"].includes(firstNode.unit)) {
  ...
}
```

**Could use:**
```typescript
import { ANGLE_UNITS } from "@/core/units";

if (ANGLE_UNITS.includes(firstNode.unit as any)) {
  ...
}
```

**Why:** We have `ANGLE_UNITS` array exported from core. However, this is less critical because:
- The angle units are stable and unlikely to change
- Using the constant adds minimal value
- The inline array is more readable in this context

**Decision:** Optional improvement, not critical.

---

## 4. MDN Data References ❌

**Current:**
```typescript
* @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient | MDN: linear-gradient()}
* @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients | W3C Spec: Linear Gradients}
```

**Should add:**
```typescript
* @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient | MDN: linear-gradient()}
* @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients | W3C Spec: Linear Gradients}
* @see {@link https://github.com/mdn/data/blob/main/css/functions.json | MDN Data: linear-gradient()}
```

**Why:** Provides direct link to the canonical data source we're implementing.

**Files to update:**
- All gradient parser files (linear, conic, radial)
- All gradient generator files (linear, conic, radial)

---

## Priority

**Must fix:**
1. css-tree import pattern (consistency)
2. Color interpolation keywords (DRY principle)

**Should fix:**
3. Add MDN data references (documentation)

**Optional:**
4. Angle unit validation (minor improvement)
