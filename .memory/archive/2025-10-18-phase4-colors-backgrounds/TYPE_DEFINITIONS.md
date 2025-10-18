# Phase 4: Color & Background Type Definitions

## Color Type System Design

### Core Color Interfaces

```typescript
// Base color value interface
interface ColorValue {
  kind: 'rgb' | 'hsl' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'color' | 'color-mix';
  alpha?: number; // 0-1 range, normalized
}

// RGB Color (sRGB color space)
interface RGBColor extends ColorValue {
  kind: 'rgb';
  r: number;      // 0-255 or 0-100% (percentage)
  g: number;      // 0-255 or 0-100% (percentage)
  b: number;      // 0-255 or 0-100% (percentage)
  // alpha inherited from ColorValue
}

// HSL Color
interface HSLColor extends ColorValue {
  kind: 'hsl';
  h: number;      // 0-360 degrees
  s: number;      // 0-100% (percentage)
  l: number;      // 0-100% (percentage)
  // alpha inherited from ColorValue
}

// HWB Color (Hue, Whiteness, Blackness)
interface HWBColor extends ColorValue {
  kind: 'hwb';
  h: number;      // 0-360 degrees
  w: number;      // 0-100% (percentage)
  b: number;      // 0-100% (percentage)
  // alpha inherited from ColorValue
}

// LAB Color (L*a*b* color space)
interface LABColor extends ColorValue {
  kind: 'lab';
  l: number;      // 0-100% (percentage) - Lightness
  a: number;      // -125 to +125 - Green-Red axis
  b: number;      // -125 to +125 - Blue-Yellow axis
  // alpha inherited from ColorValue
}

// LCH Color (LCH color space)
interface LCHColor extends ColorValue {
  kind: 'lch';
  l: number;      // 0-100% (percentage) - Lightness
  c: number;      // 0-150 - Chroma
  h: number;      // 0-360 degrees - Hue
  // alpha inherited from ColorValue
}

// OKLab Color (OKLab color space)
interface OKLabColor extends ColorValue {
  kind: 'oklab';
  l: number;      // 0-1 - Lightness
  a: number;      // -0.4 to +0.4 - Green-Red axis
  b: number;      // -0.4 to +0.4 - Blue-Yellow axis
  // alpha inherited from ColorValue
}

// OKLCH Color (OKLCH color space)
interface OKLCHColor extends ColorValue {
  kind: 'oklch';
  l: number;      // 0-1 - Lightness
  c: number;      // 0-0.4 - Chroma
  h: number;      // 0-360 degrees - Hue
  // alpha inherited from ColorValue
}

// Color Function (explicit color space)
interface ColorFunctionColor extends ColorValue {
  kind: 'color';
  colorSpace: ColorSpace;  // srgb, srgb-linear, display-p3, etc.
  channels: ColorChannel[]; // R, G, B, alpha values for the color space
}

// Color Mix (mix two colors)
interface ColorMixColor extends ColorValue {
  kind: 'color-mix';
  interpolationMethod: ColorInterpolationMethod; // in srgb, in oklch, etc.
  firstColor: ColorValue;
  secondColor: ColorValue;
  mixRatio?: number; // 0-100% (optional, defaults to 50%)
}

// Named Color
interface NamedColor extends ColorValue {
  kind: 'named';
  name: NamedColorKeyword; // 'red', 'aliceblue', etc.
}

// Hex Color
interface HexColor extends ColorValue {
  kind: 'hex';
  value: string; // '#RGB', '#RRGGBB', '#RRGGBBAA'
}

// System Color
interface SystemColor extends ColorValue {
  kind: 'system';
  name: SystemColorKeyword; // 'ButtonText', 'ActiveBorder', etc.
}

// Light-Dark Color (adaptive color)
interface LightDarkColor extends ColorValue {
  kind: 'light-dark';
  lightColor: ColorValue;
  darkColor: ColorValue;
}

// Union type for all color values
type Color =
  | RGBColor
  | HSLColor
  | HWBColor
  | LABColor
  | LCHColor
  | OKLabColor
  | OKLCHColor
  | ColorFunctionColor
  | ColorMixColor
  | NamedColor
  | HexColor
  | SystemColor
  | LightDarkColor;
```

### Color Supporting Types

```typescript
// Color space enumeration
type ColorSpace =
  | 'srgb'
  | 'srgb-linear'
  | 'display-p3'
  | 'a98-rgb'
  | 'prophoto-rgb'
  | 'rec2020'
  | 'lab'
  | 'oklab'
  | 'xyz'
  | 'xyz-d50'
  | 'xyz-d65'
  | 'hsl'
  | 'hwb'
  | 'lch'
  | 'oklch';

// Color interpolation method for color-mix()
interface ColorInterpolationMethod {
  kind: 'in';
  colorSpace: ColorSpace;
  hueInterpolation?: HueInterpolationMethod; // shorter, longer, increasing, decreasing
}

// Hue interpolation method
type HueInterpolationMethod =
  | 'shorter'
  | 'longer'
  | 'increasing'
  | 'decreasing';

// Color channel for color() function
interface ColorChannel {
  value: number;
  unit?: '%' | 'none'; // percentage or none for alpha
}

// Named color keywords (147+ colors)
type NamedColorKeyword =
  | 'aliceblue' | 'antiquewhite' | 'aqua' | 'aquamarine' | 'azure'
  | 'beige' | 'bisque' | 'black' | 'blanchedalmond' | 'blue'
  | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' | 'chartreuse'
  | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson'
  | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray'
  | 'darkgreen' | 'darkgrey' | 'darkkhaki' | 'darkmagenta' | 'darkolivegreen'
  | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen'
  | 'darkslateblue' | 'darkslategray' | 'darkslategrey' | 'darkturquoise'
  | 'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey'
  | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'fuchsia'
  | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'gray'
  | 'green' | 'greenyellow' | 'grey' | 'honeydew' | 'hotpink'
  | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender'
  | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral'
  | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' | 'lightgrey'
  | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray'
  | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' | 'limegreen'
  | 'linen' | 'magenta' | 'maroon' | 'mediumaquamarine' | 'mediumblue'
  | 'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen'
  | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose'
  | 'moccasin' | 'navajowhite' | 'navy' | 'oldlace' | 'olive'
  | 'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod'
  | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff'
  | 'peru' | 'pink' | 'plum' | 'powderblue' | 'purple'
  | 'rebeccapurple' | 'red' | 'rosybrown' | 'royalblue' | 'saddlebrown'
  | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna'
  | 'silver' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey'
  | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'teal'
  | 'thistle' | 'tomato' | 'turquoise' | 'violet' | 'wheat'
  | 'white' | 'whitesmoke' | 'yellow' | 'yellowgreen';

// System color keywords
type SystemColorKeyword =
  | 'AccentColor' | 'AccentColorText' | 'ActiveText' | 'ButtonBorder'
  | 'ButtonFace' | 'ButtonText' | 'Canvas' | 'CanvasText' | 'Field'
  | 'FieldText' | 'GrayText' | 'Highlight' | 'HighlightText' | 'LinkText'
  | 'Mark' | 'MarkText' | 'SelectedItem' | 'SelectedItemText' | 'VisitedText'
  | 'ActiveBorder' | 'ActiveCaption' | 'AppWorkspace' | 'Background'
  | 'ButtonHighlight' | 'ButtonShadow' | 'CaptionText' | 'InactiveBorder'
  | 'InactiveCaption' | 'InactiveCaptionText' | 'InfoBackground' | 'InfoText'
  | 'Menu' | 'MenuText' | 'Scrollbar' | 'ThreeDDarkShadow' | 'ThreeDFace'
  | 'ThreeDHighlight' | 'ThreeDLightShadow' | 'ThreeDShadow' | 'Window'
  | 'WindowFrame' | 'WindowText';
```

## Background Type System Design

### Background Layer Architecture

```typescript
// Single background layer
interface BackgroundLayer {
  image?: BackgroundImage;
  position?: BackgroundPosition;  // 2D position value
  size?: BackgroundSize;
  repeat?: BackgroundRepeat;
  attachment?: BackgroundAttachment;
  origin?: BackgroundOrigin;
  clip?: BackgroundClip;
}

// Multiple background layers (CSS allows multiple backgrounds)
interface BackgroundLayers {
  layers: BackgroundLayer[];
}

// Background image value
type BackgroundImage =
  | { kind: 'none' }
  | { kind: 'url'; url: string }
  | { kind: 'gradient'; gradient: GradientValue } // Integration with existing gradient types
  | { kind: 'image'; image: ImageValue }
  | { kind: 'cross-fade'; crossFade: CrossFadeValue };

// Background position (reuses position types from existing position module)
interface BackgroundPosition {
  horizontal: PositionValue;
  vertical: PositionValue;
}

// Background size
type BackgroundSize =
  | 'auto'
  | 'cover'
  | 'contain'
  | { width: LengthPercentage; height: LengthPercentage }
  | { width: LengthPercentage; height: 'auto' }
  | { width: 'auto'; height: LengthPercentage };

// Background repeat
type BackgroundRepeat =
  | 'repeat-x' | 'repeat-y'
  | 'repeat' | 'space' | 'round' | 'no-repeat'
  | { horizontal: BackgroundRepeatValue; vertical: BackgroundRepeatValue };

// Background attachment
type BackgroundAttachment =
  | 'scroll' | 'fixed' | 'local';

// Background origin
type BackgroundOrigin =
  | 'border-box' | 'padding-box' | 'content-box';

// Background clip
type BackgroundClip =
  | 'border-box' | 'padding-box' | 'content-box' | 'text';

// Supporting types for background
type BackgroundRepeatValue =
  | 'repeat' | 'space' | 'round' | 'no-repeat';

type LengthPercentage =
  | { value: number; unit: 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%' | 'cm' | 'mm' | 'in' | 'pt' | 'pc' }
  | number; // For unitless values where applicable

type PositionValue =
  | 'left' | 'center' | 'right' | 'top' | 'bottom'
  | LengthPercentage;

// Background color (reuses Color type)
type BackgroundColor = Color | 'transparent';

// Complete background declaration
interface Background {
  color?: BackgroundColor;
  image?: BackgroundImage;
  position?: BackgroundPosition;
  size?: BackgroundSize;
  repeat?: BackgroundRepeat;
  attachment?: BackgroundAttachment;
  origin?: BackgroundOrigin;
  clip?: BackgroundClip;
  // For multi-layer support
  layers?: BackgroundLayer[];
}
```

## Zod Schema Design

### Color Schemas

```typescript
// Base color schema with alpha validation
const colorValueSchema = z.object({
  alpha: z.number().min(0).max(1).optional()
    .describe('Alpha value between 0 and 1')
});

// RGB color schema
const rgbColorSchema = colorValueSchema.extend({
  kind: z.literal('rgb'),
  r: z.union([z.number().min(0).max(255), percentageSchema]),
  g: z.union([z.number().min(0).max(255), percentageSchema]),
  b: z.union([z.number().min(0).max(255), percentageSchema])
}).describe('RGB color with optional alpha');

// HSL color schema
const hslColorSchema = colorValueSchema.extend({
  kind: z.literal('hsl'),
  h: angleSchema.describe('Hue angle 0-360 degrees'),
  s: percentageSchema.describe('Saturation percentage 0-100%'),
  l: percentageSchema.describe('Lightness percentage 0-100%')
}).describe('HSL color with optional alpha');

// LAB color schema
const labColorSchema = colorValueSchema.extend({
  kind: z.literal('lab'),
  l: percentageSchema.describe('Lightness percentage 0-100%'),
  a: z.number().min(-125).max(125).describe('Green-Red axis -125 to +125'),
  b: z.number().min(-125).max(125).describe('Blue-Yellow axis -125 to +125')
}).describe('LAB color with optional alpha');

// Named color schema
const namedColorSchema = z.object({
  kind: z.literal('named'),
  name: namedColorKeywordsSchema.describe('Named color keyword')
}).describe('Named color value');

// Hex color schema
const hexColorSchema = z.object({
  kind: z.literal('hex'),
  value: z.string().regex(/^#[0-9A-Fa-f]{3,8}$/).describe('Hex color value')
}).describe('Hex color value');

// Union of all color schemas
const colorSchema = z.union([
  rgbColorSchema,
  hslColorSchema,
  hwbColorSchema,
  labColorSchema,
  lchColorSchema,
  oklabColorSchema,
  oklchColorSchema,
  colorFunctionSchema,
  colorMixSchema,
  namedColorSchema,
  hexColorSchema,
  systemColorSchema,
  lightDarkColorSchema
]).describe('Any valid CSS color value');

// TypeScript type inference
export type Color = z.infer<typeof colorSchema>;
```

### Background Schemas

```typescript
// Background image schema
const backgroundImageSchema = z.union([
  z.object({ kind: z.literal('none') }),
  z.object({
    kind: z.literal('url'),
    url: z.string().url().describe('Image URL')
  }),
  z.object({
    kind: z.literal('gradient'),
    gradient: gradientSchema.describe('Gradient value')
  }),
  z.object({
    kind: z.literal('image'),
    image: imageSchema.describe('Image value')
  })
]).describe('Background image value');

// Background position schema (reuses position schema)
const backgroundPositionSchema = position2DSchema.describe('Background position');

// Background size schema
const backgroundSizeSchema = z.union([
  z.enum(['auto', 'cover', 'contain']),
  z.object({
    width: lengthPercentageSchema,
    height: lengthPercentageSchema
  }),
  z.object({
    width: lengthPercentageSchema,
    height: z.literal('auto')
  }),
  z.object({
    width: z.literal('auto'),
    height: lengthPercentageSchema
  })
]).describe('Background size value');

// Background layer schema
const backgroundLayerSchema = z.object({
  image: backgroundImageSchema.optional(),
  position: backgroundPositionSchema.optional(),
  size: backgroundSizeSchema.optional(),
  repeat: backgroundRepeatSchema.optional(),
  attachment: backgroundAttachmentSchema.optional(),
  origin: backgroundOriginSchema.optional(),
  clip: backgroundClipSchema.optional()
}).describe('Single background layer');

// Background layers schema
const backgroundLayersSchema = z.object({
  layers: z.array(backgroundLayerSchema).min(1)
    .describe('Array of background layers')
}).describe('Multiple background layers');

// Background schema (shorthand)
const backgroundSchema = z.union([
  backgroundLayersSchema,
  z.object({
    color: backgroundColorSchema.optional(),
    image: backgroundImageSchema.optional(),
    position: backgroundPositionSchema.optional(),
    size: backgroundSizeSchema.optional(),
    repeat: backgroundRepeatSchema.optional(),
    attachment: backgroundAttachmentSchema.optional(),
    origin: backgroundOriginSchema.optional(),
    clip: backgroundClipSchema.optional()
  })
]).describe('Complete background declaration');

// TypeScript type inference
export type Background = z.infer<typeof backgroundSchema>;
export type BackgroundLayer = z.infer<typeof backgroundLayerSchema>;
export type BackgroundLayers = z.infer<typeof backgroundLayersSchema>;
```

## Integration with Existing Types

### Enhanced Color Stop (for gradients)

```typescript
// Existing color stop interface (from gradient types)
interface ColorStop {
  color: Color; // Now uses new Color type instead of string
  position?: {
    value: number;
    unit: '%' | 'px' | 'em' | 'rem';
  };
}

// Enhanced gradient interfaces
interface RadialGradient {
  kind: 'radial';
  shape?: 'circle' | 'ellipse';
  size?: RadialSize;
  position?: Position2D; // Reuses existing position type
  colorStops: ColorStop[];
  repeating?: boolean;
}

interface LinearGradient {
  kind: 'linear';
  direction?: Angle | Position2D; // Reuses existing angle and position types
  colorStops: ColorStop[];
  repeating?: boolean;
}

interface ConicGradient {
  kind: 'conic';
  position?: Position2D; // Reuses existing position type
  angle?: Angle; // Reuses existing angle type
  colorStops: ColorStop[];
  repeating?: boolean;
}
```

## Validation Rules

### Color Validation:
1. **Alpha values**: Must be between 0 and 1 (inclusive)
2. **RGB values**: R, G, B must be valid for their ranges (0-255 or 0-100%)
3. **HSL values**: H (0-360°), S/L (0-100%)
4. **LAB values**: L (0-100%), A/B (-125 to +125)
5. **LCH values**: L (0-100%), C (0-150), H (0-360°)
6. **OKLab values**: L (0-1), A/B (-0.4 to +0.4)
7. **OKLCH values**: L (0-1), C (0-0.4), H (0-360°)
8. **Hex colors**: Must match #RGB, #RRGGBB, or #RRGGBBAA format
9. **Named colors**: Must be valid CSS named color keyword
10. **Color-mix ratios**: Must be between 0% and 100%

### Background Validation:
1. **Background layers**: At least one layer required for multi-layer backgrounds
2. **Background position**: Must be valid position values
3. **Background size**: Width/height must be non-negative
4. **Background repeat**: Must be valid repeat keywords
5. **Background attachment**: Must be valid attachment keywords
6. **Background origin/clip**: Must be valid box keywords

## Error Handling Strategy

### Color Parsing Errors:
- `INVALID_COLOR_FORMAT`: Unknown color format
- `INVALID_RGB_VALUES`: RGB values out of range
- `INVALID_HSL_VALUES`: HSL values out of range
- `INVALID_LAB_VALUES`: LAB values out of range
- `INVALID_LCH_VALUES`: LCH values out of range
- `INVALID_OKLAB_VALUES`: OKLab values out of range
- `INVALID_OKLCH_VALUES`: OKLCH values out of range
- `INVALID_HEX_FORMAT`: Malformed hex color
- `UNKNOWN_NAMED_COLOR`: Unknown named color keyword
- `UNKNOWN_SYSTEM_COLOR`: Unknown system color keyword
- `INVALID_ALPHA_VALUE`: Alpha value out of 0-1 range
- `INVALID_COLOR_SPACE`: Unknown color space in color() function
- `INVALID_MIX_RATIO`: Color-mix ratio out of 0-100% range

### Background Parsing Errors:
- `INVALID_BACKGROUND_LAYER`: Malformed background layer
- `INVALID_BACKGROUND_POSITION`: Invalid background position
- `INVALID_BACKGROUND_SIZE`: Invalid background size
- `INVALID_BACKGROUND_REPEAT`: Invalid background repeat
- `INVALID_BACKGROUND_ATTACHMENT`: Invalid background attachment
- `INVALID_BACKGROUND_ORIGIN`: Invalid background origin
- `INVALID_BACKGROUND_CLIP`: Invalid background clip
- `EMPTY_BACKGROUND_LAYERS`: No background layers specified

## Performance Considerations

### Color Parsing Performance:
1. **Keyword lookup**: Use hash maps for O(1) named color lookups
2. **Hex parsing**: Optimize hex string parsing with regex validation
3. **Color space conversion**: Cache conversion results where possible
4. **Alpha normalization**: Normalize alpha values once during parsing

### Background Parsing Performance:
1. **Layer parsing**: Parse layers incrementally to avoid large object creation
2. **Position calculation**: Cache computed position values
3. **Size resolution**: Optimize size calculations for common cases
4. **Memory usage**: Use streaming for large background declarations

## Testing Strategy

### Color Tests:
1. **Unit tests**: Each color format (RGB, HSL, LAB, etc.)
2. **Edge cases**: Boundary values, invalid inputs, error handling
3. **Round-trip tests**: Parse → generate → parse cycle
4. **Color space conversion**: Accuracy validation
5. **Alpha handling**: 0, 0.5, 1, and boundary values
6. **Integration tests**: Colors in gradients, backgrounds

### Background Tests:
1. **Unit tests**: Each background property
2. **Multi-layer tests**: Complex background combinations
3. **Shorthand tests**: Background shorthand parsing
4. **Edge cases**: Invalid combinations, missing values
5. **Integration tests**: Backgrounds with gradients, complex layouts

## Documentation Strategy

### API Documentation:
1. **Color module**: Complete documentation for all color types and functions
2. **Background module**: Complete documentation for all background properties
3. **Usage examples**: Real-world examples for each feature
4. **Migration guide**: How to use new types with existing code
5. **Type definitions**: Inline documentation for all interfaces

### User Documentation:
1. **Color guide**: How to work with different color formats
2. **Background guide**: How to create complex backgrounds
3. **Best practices**: Performance tips, common patterns
4. **Troubleshooting**: Common issues and solutions

## Future Extensions

### Potential Phase 5+ Features:
1. **Color interpolation**: Advanced color animation support
2. **Color profiles**: ICC color profile support
3. **Background patterns**: CSS pattern support
4. **Advanced backgrounds**: Background-blend-mode, backdrop-filter
5. **Color themes**: CSS color scheme support

This type system provides a solid foundation for comprehensive color and background support in the b_value CSS parser, with full type safety and excellent error handling.