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

### Issue (With Schema Enforcement)

```typescript
/**
 * Longhand CSS property names - properties supported by b_value
 */
type CSSLonghandProperty = 
  // Color
  | "color"
  | "background-color"
  | "border-color" | "border-top-color" | "border-right-color" | "border-bottom-color" | "border-left-color"
  | "outline-color"
  | "text-decoration-color"
  
  // Clip-path
  | "clip-path"
  
  // Background
  | "background-image"
  | "background-position"
  | "background-size"
  | "background-repeat"
  | "background-attachment"
  | "background-clip"
  | "background-origin"
  
  // Gradient (used in background-image)
  // Handled by background-image property
  
  // Filter
  | "filter"
  | "backdrop-filter"
  
  // Transform
  | "transform"
  | "transform-origin"
  
  // Shadow
  | "box-shadow"
  | "text-shadow"
  
  // Border
  | "border-width" | "border-top-width" | "border-right-width" | "border-bottom-width" | "border-left-width"
  | "border-style" | "border-top-style" | "border-right-style" | "border-bottom-style" | "border-left-style"
  | "border-radius" | "border-top-left-radius" | "border-top-right-radius" | "border-bottom-right-radius" | "border-bottom-left-radius"
  
  // Outline
  | "outline-width"
  | "outline-style"
  | "outline-offset"
  
  // Animation
  | "animation-name"
  | "animation-duration"
  | "animation-timing-function"
  | "animation-delay"
  | "animation-iteration-count"
  | "animation-direction"
  | "animation-fill-mode"
  | "animation-play-state"
  
  // Transition
  | "transition-property"
  | "transition-duration"
  | "transition-timing-function"
  | "transition-delay"
  
  // Layout
  | "width" | "height"
  | "min-width" | "min-height"
  | "max-width" | "max-height"
  | "top" | "right" | "bottom" | "left"
  | "position"
  | "display"
  | "overflow" | "overflow-x" | "overflow-y"
  | "visibility"
  | "z-index"
  | "opacity"
  | "cursor"
  
  // Text decoration
  | "text-decoration-line"
  | "text-decoration-style"
  | "text-decoration-thickness";

/**
 * Shorthand CSS property names - NOT supported, but need to detect
 */
type CSSShorthandProperty =
  | "border" | "border-top" | "border-right" | "border-bottom" | "border-left"
  | "margin" | "padding"
  | "background"
  | "font"
  | "text-decoration"
  | "animation"
  | "transition"
  | "outline"
  | "flex"
  | "grid"
  | "place-items" | "place-content" | "place-self"
  | "gap" | "row-gap" | "column-gap"
  | "inset" | "inset-block" | "inset-inline"
  | "border-block" | "border-inline"
  | "border-radius"  // Can be shorthand
  | "overflow";      // Can be shorthand

/**
 * All CSS property names (longhand + shorthand for detection)
 */
type CSSPropertyName = CSSLonghandProperty | CSSShorthandProperty;

/**
 * Issue severity levels
 */
type IssueSeverity = "error" | "warning" | "info";

/**
 * Known error/warning codes for categorization
 */
type IssueCode =
  // Parse errors
  | "invalid-value"
  | "unknown-property"
  | "shorthand-not-supported"
  | "invalid-syntax"
  | "missing-value"
  
  // Parse warnings
  | "duplicate-property"
  | "deprecated-syntax"
  | "legacy-syntax"
  
  // Generate errors
  | "invalid-ir"
  | "missing-required-field"
  | "unsupported-kind";

/**
 * Issue reported during parsing or generation.
 * All fields are strongly typed - no arbitrary strings.
 */
type Issue = {
  /** Property name that caused the issue */
  property?: CSSPropertyName;
  
  /** Issue severity */
  severity: IssueSeverity;
  
  /** Categorized error/warning code */
  code: IssueCode;
  
  /** Human-readable message */
  message: string;
  
  /** Optional suggestion for fixing */
  suggestion?: string;
  
  /** Optional action to take */
  action?: string;
  
  /** Optional location in input string */
  location?: {
    offset: number;
    length: number;
  };
};
```

**Benefits**:
- ✅ `property` is strongly typed to known CSS properties (longhand + shorthand)
- ✅ `code` provides machine-readable categorization
- ✅ Type safety prevents typos
- ✅ Autocomplete in IDEs
- ✅ Easy to filter issues by code

**Type Guards**:
```typescript
function isLonghandProperty(prop: string): prop is CSSLonghandProperty {
  // Check against longhand list
}

function isShorthandProperty(prop: string): prop is CSSShorthandProperty {
  // Check against shorthand list
}
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

## Issue Creation Helpers

```typescript
/**
 * Create a strongly-typed issue
 */
function createIssue(
  code: IssueCode,
  message: string,
  options?: {
    property?: CSSPropertyName;
    severity?: IssueSeverity;
    suggestion?: string;
    action?: string;
    location?: { offset: number; length: number };
  }
): Issue {
  return {
    code,
    message,
    severity: options?.severity ?? (code.includes("warning") ? "warning" : "error"),
    property: options?.property,
    suggestion: options?.suggestion,
    action: options?.action,
    location: options?.location,
  };
}

/**
 * Predefined issue creators for common cases
 */
const Issues = {
  duplicateProperty(property: CSSLonghandProperty, count: number): Issue {
    return createIssue(
      "duplicate-property",
      `Duplicate property '${property}' declared ${count} times - using last value`,
      { property, severity: "warning" }
    );
  },
  
  invalidValue(property: CSSLonghandProperty, value: string): Issue {
    return createIssue(
      "invalid-value",
      `Invalid value '${value}' for property '${property}'`,
      { property, severity: "error" }
    );
  },
  
  shorthandNotSupported(property: CSSShorthandProperty, longhands: string[]): Issue {
    return createIssue(
      "shorthand-not-supported",
      `Shorthand property '${property}' is not supported in b_value. Use longhand properties: ${longhands.join(", ")}. For shorthand support, use the 'b_short' library.`,
      { 
        property,
        severity: "error",
        suggestion: "Use b_short to expand shorthands first"
      }
    );
  },
  
  unknownProperty(property: string): Issue {
    return createIssue(
      "unknown-property",
      `Unknown CSS property '${property}'`,
      { severity: "error" }
    );
  },
  
  invalidSyntax(message: string, location?: { offset: number; length: number }): Issue {
    return createIssue(
      "invalid-syntax",
      message,
      { severity: "error", location }
    );
  }
};
```

**Usage in parseAll()**:
```typescript
// Detect duplicate
if (duplicateCount > 1) {
  issues.push(Issues.duplicateProperty("color", duplicateCount));
}

// Invalid value
if (!result.ok) {
  issues.push(Issues.invalidValue("width", "not-a-number"));
}

// Shorthand detected
if (isShorthandProperty(property)) {
  issues.push(Issues.shorthandNotSupported("border", [
    "border-width",
    "border-style", 
    "border-color"
  ]));
}
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
