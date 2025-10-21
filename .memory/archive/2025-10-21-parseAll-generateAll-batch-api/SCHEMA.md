# Schema: parseAll() & generateAll() Types

**Type definitions for batch API input/output**

---

## 🎯 Overview

The batch API uses TypeScript discriminated unions for type safety. All IR types have a `kind` field for runtime discrimination.

---

## parseAll() Schema

### Input

```typescript
type Input = string  // CSS declaration block
```

**Example**:
```typescript
"color: red; width: 10px; filter: blur(5px)"
```

---

### Output

```typescript
type Output = ParseResult<Record<string, CSSValue | string>>
```

**Expanded**:
```typescript
{
  ok: boolean,
  value?: Record<string, CSSValue | string>,
  issues: Issue[]
}
```

**Where**:
- `ok`: `true` if all properties parsed successfully (warnings ok)
- `value`: Object mapping property names to parsed IR or unparsed strings
- `issues`: Array of all warnings/errors from all properties

---

## generateAll() Schema

### Input

```typescript
type Input = Record<string, CSSValue | string>
```

**Object keys**: CSS property names (e.g., `"color"`, `"width"`)  
**Object values**: IR objects OR strings (for passthrough)

**Example**:
```typescript
{
  color: { kind: "hex", value: "#ff0000" },
  width: { kind: "length", value: 10, unit: "px" },
  border: "1px solid black"  // String passthrough
}
```

---

### Output

```typescript
type Output = string  // CSS declaration block
```

**Example**:
```typescript
"color: #ff0000; width: 10px; border: 1px solid black"
```

---

## CSSValue Type (Union of All IR Types)

**NOTE**: This type doesn't exist yet - we need to create it!

```typescript
/**
 * Union of all CSS value IR types.
 * All types have a 'kind' discriminator for type narrowing.
 */
type CSSValue =
  // Color values
  | HexColor
  | RGBColor
  | HSLColor
  | NamedColor
  | CurrentColor
  
  // Clip-path values
  | ClipPathCircle
  | ClipPathEllipse
  | ClipPathPolygon
  | ClipPathInset
  | ClipPathRect
  | ClipPathXYWH
  | ClipPathPath
  | ClipPathNone
  
  // Gradient values
  | LinearGradient
  | RadialGradient
  | ConicGradient
  | RepeatingLinearGradient
  | RepeatingRadialGradient
  | RepeatingConicGradient
  
  // Filter values
  | FilterBlur
  | FilterBrightness
  | FilterContrast
  | FilterDropShadow
  | FilterGrayscale
  | FilterHueRotate
  | FilterInvert
  | FilterOpacity
  | FilterSaturate
  | FilterSepia
  | FilterUrl
  | FilterNone
  
  // Shadow values
  | BoxShadow
  | TextShadow
  | ShadowNone
  
  // Transform values
  | TransformMatrix
  | TransformTranslate
  | TransformTranslate3d
  | TransformScale
  | TransformScale3d
  | TransformRotate
  | TransformRotate3d
  | TransformSkew
  | TransformPerspective
  | TransformNone
  
  // Position values
  | PositionKeyword
  | PositionTwoValue
  | PositionThreeValue
  | PositionFourValue
  
  // Border values
  | BorderWidth
  | BorderStyle
  | BorderColor
  | BorderRadius
  
  // Outline values
  | OutlineWidth
  | OutlineStyle
  | OutlineOffset
  
  // Animation values
  | AnimationName
  | AnimationDuration
  | AnimationTimingFunction
  | AnimationDelay
  | AnimationIterationCount
  | AnimationDirection
  | AnimationFillMode
  | AnimationPlayState
  
  // Transition values
  | TransitionProperty
  | TransitionDuration
  | TransitionTimingFunction
  | TransitionDelay
  
  // Layout values
  | LengthValue
  | PercentageValue
  | AutoValue
  | DisplayValue
  | PositionValue
  | OverflowValue
  | VisibilityValue
  | CursorValue
  | OpacityValue
  | ZIndexValue
  
  // Text decoration values
  | TextDecorationLine
  | TextDecorationStyle
  | TextDecorationColor
  | TextDecorationThickness
  
  // Background values
  | BackgroundSize
  | BackgroundRepeat
  | BackgroundAttachment
  | BackgroundClip
  | BackgroundOrigin
  | BackgroundImage;
```

---

## Core Types

### ParseResult<T>

```typescript
type ParseResult<T = unknown> = {
  ok: boolean;
  value?: T;
  property?: string;  // Present in Universal API, undefined in Module API
  issues: Issue[];
};
```

**Usage in parseAll()**:
```typescript
ParseResult<Record<string, CSSValue | string>>
```

---

### Issue

```typescript
type Issue = {
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
  action?: string;
  location?: {
    offset: number;
    length: number;
  };
};
```

**For parseAll()**, we should add:
```typescript
type Issue = {
  property?: string;  // ← ADD THIS for batch API
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
  action?: string;
  location?: {
    offset: number;
    length: number;
  };
};
```

---

## Example IR Types

### Color Types

```typescript
type HexColor = {
  kind: "hex";
  value: string;  // e.g., "#ff0000"
};

type RGBColor = {
  kind: "rgb";
  red: number;    // 0-255
  green: number;  // 0-255
  blue: number;   // 0-255
  alpha?: number; // 0-1
};

type HSLColor = {
  kind: "hsl";
  hue: number;        // 0-360
  saturation: number; // 0-100
  lightness: number;  // 0-100
  alpha?: number;     // 0-1
};

type NamedColor = {
  kind: "named";
  value: string;  // e.g., "red", "blue"
};

type CurrentColor = {
  kind: "current";
};
```

---

### Length/Percentage Types

```typescript
type LengthValue = {
  kind: "length";
  value: number;
  unit: "px" | "em" | "rem" | "vh" | "vw" | "vmin" | "vmax" | "ch" | "ex" | "cm" | "mm" | "in" | "pt" | "pc";
};

type PercentageValue = {
  kind: "percentage";
  value: number;  // 0-100
};

type LengthPercentage = LengthValue | PercentageValue;
```

---

### Filter Types

```typescript
type FilterBlur = {
  kind: "filter-blur";
  amount: LengthPercentage;
};

type FilterBrightness = {
  kind: "filter-brightness";
  amount: number | PercentageValue;
};

type FilterContrast = {
  kind: "filter-contrast";
  amount: number | PercentageValue;
};

// ... more filter types
```

---

### Clip-path Types

```typescript
type ClipPathCircle = {
  kind: "clip-path-circle";
  radius: LengthPercentage | "closest-side" | "farthest-side";
  position?: Position;
};

type ClipPathEllipse = {
  kind: "clip-path-ellipse";
  radiusX: LengthPercentage | "closest-side" | "farthest-side";
  radiusY: LengthPercentage | "closest-side" | "farthest-side";
  position?: Position;
};

type ClipPathPolygon = {
  kind: "clip-path-polygon";
  fillRule?: "nonzero" | "evenodd";
  points: Array<{
    x: LengthPercentage;
    y: LengthPercentage;
  }>;
};

type ClipPathInset = {
  kind: "clip-path-inset";
  top: LengthPercentage;
  right: LengthPercentage;
  bottom: LengthPercentage;
  left: LengthPercentage;
  borderRadius?: BorderRadius;
};
```

---

### Gradient Types

```typescript
type LinearGradient = {
  kind: "linear-gradient";
  direction?: LinearDirection;
  colorStops: ColorStop[];
  repeating?: boolean;
};

type RadialGradient = {
  kind: "radial-gradient";
  shape?: "circle" | "ellipse";
  size?: RadialSize;
  position?: Position;
  colorStops: ColorStop[];
  repeating?: boolean;
};

type ConicGradient = {
  kind: "conic-gradient";
  angle?: Angle;
  position?: Position;
  colorStops: ColorStop[];
  repeating?: boolean;
};

type ColorStop = {
  color: Color;
  position?: LengthPercentage;
};
```

---

## Type Guards (Recommended)

```typescript
/**
 * Type guard to check if value is a CSSValue IR object.
 * Returns false for strings (unparsed values).
 */
export function isCSSValue(value: unknown): value is CSSValue {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    typeof (value as { kind: unknown }).kind === "string"
  );
}

/**
 * Type guard to check if value is a string (unparsed).
 */
export function isUnparsedString(value: CSSValue | string): value is string {
  return typeof value === "string";
}
```

**Usage in generateAll()**:
```typescript
for (const [property, value] of Object.entries(values)) {
  if (isUnparsedString(value)) {
    // Pass through string
    declarations.push(`${property}: ${value}`);
  } else {
    // Generate from IR
    const result = generate({ property, value });
    if (result.ok) {
      declarations.push(`${property}: ${result.value}`);
    }
  }
}
```

---

## Schema Validation (Future)

For runtime validation, consider using Zod schemas:

```typescript
import { z } from "zod";

const HexColorSchema = z.object({
  kind: z.literal("hex"),
  value: z.string().regex(/^#[0-9a-f]{6}$/i)
});

const LengthSchema = z.object({
  kind: z.literal("length"),
  value: z.number(),
  unit: z.enum(["px", "em", "rem", "vh", "vw", /* ... */])
});

// Union schema
const CSSValueSchema = z.union([
  HexColorSchema,
  LengthSchema,
  // ... all other schemas
]);

// Validate at runtime
function validateCSSValue(value: unknown): value is CSSValue {
  return CSSValueSchema.safeParse(value).success;
}
```

---

## TODO: Create CSSValue Union Type

**Action items**:

1. **Create `src/core/types/css-value.ts`**:
   ```typescript
   // Re-export all IR types
   export type { HexColor, RGBColor, HSLColor, /* ... */ } from "./color";
   export type { ClipPathCircle, /* ... */ } from "./clip-path";
   export type { LinearGradient, /* ... */ } from "./gradient";
   // ... etc
   
   // Create union
   export type CSSValue = /* union of all above */;
   ```

2. **Update `src/index.ts`**:
   ```typescript
   export type { CSSValue } from "./core/types/css-value";
   ```

3. **Update `src/universal.ts`**:
   ```typescript
   import type { CSSValue } from "./core/types/css-value";
   
   export function parseAll(css: string): ParseResult<Record<string, CSSValue | string>> {
     // ...
   }
   
   export function generateAll(
     values: Record<string, CSSValue | string>,
     options?: { minify?: boolean }
   ): string {
     // ...
   }
   ```

4. **Add type guards**:
   ```typescript
   export function isCSSValue(value: unknown): value is CSSValue;
   export function isUnparsedString(value: CSSValue | string): value is string;
   ```

---

## Type Safety Examples

### TypeScript Inference

```typescript
const result = parseAll("color: red; width: 10px");

if (result.ok) {
  // TypeScript knows value is Record<string, CSSValue | string>
  const colorValue = result.value.color;
  
  // Type narrowing with type guards
  if (isCSSValue(colorValue) && colorValue.kind === "named") {
    console.log(colorValue.value);  // Type: string
  }
  
  // String passthrough
  const borderValue = result.value.border;
  if (typeof borderValue === "string") {
    console.log("Unparsed:", borderValue);
  }
}
```

### Type-Safe Modifications

```typescript
const result = parseAll("color: red; filter: blur(5px)");

if (result.ok && result.value) {
  // Modify color
  result.value.color = { kind: "hex", value: "#00ff00" };
  
  // Modify filter (with type narrowing)
  const filter = result.value.filter;
  if (isCSSValue(filter) && filter.kind === "filter-blur") {
    filter.amount = { kind: "length", value: 10, unit: "px" };
  }
  
  // Generate back
  const css = generateAll(result.value);
}
```

---

## JSON Schema (For Serialization)

If you need to serialize/deserialize IR objects:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CSSValue",
  "oneOf": [
    {
      "title": "HexColor",
      "type": "object",
      "properties": {
        "kind": { "const": "hex" },
        "value": { "type": "string", "pattern": "^#[0-9a-f]{6}$" }
      },
      "required": ["kind", "value"]
    },
    {
      "title": "LengthValue",
      "type": "object",
      "properties": {
        "kind": { "const": "length" },
        "value": { "type": "number" },
        "unit": { "enum": ["px", "em", "rem", "vh", "vw"] }
      },
      "required": ["kind", "value", "unit"]
    }
    // ... more schemas
  ]
}
```

---

**See MASTER_PLAN.md for implementation details.**
