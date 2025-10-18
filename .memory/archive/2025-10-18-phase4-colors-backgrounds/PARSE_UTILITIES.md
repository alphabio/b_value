# Phase 4: Parse Utilities for Colors & Backgrounds

## Color Parsing Utilities

### Core Color Parsing Strategy

The color parsing system needs to handle multiple color formats with different syntaxes and validation rules. We'll create specialized parsers for each color format and a master dispatcher that determines which parser to use based on the CSS syntax.

### Color Parser Architecture

```typescript
// src/utils/parse/color.ts

/**
 * Master color parser that dispatches to appropriate color format parser
 */
export function parseColorNode(node: csstree.CssNode): Result<Color, string> {
  // Implementation will try different parsers in order of likelihood
  // 1. Named colors (fastest lookup)
  // 2. Hex colors (regex validation)
  // 3. Color functions (rgb, hsl, hwb, lab, lch, oklab, oklch, color, color-mix)
  // 4. System colors
  // 5. Special colors (currentColor, transparent, light-dark)
}

/**
 * Named color parser - O(1) hash map lookup
 */
export function parseNamedColor(node: csstree.CssNode): Result<NamedColor, string> {
  const name = nodeToString(node).toLowerCase();
  const color = NAMED_COLOR_MAP[name];
  if (!color) {
    return err(`Unknown named color: ${name}`);
  }
  return ok({ kind: 'named', name });
}

/**
 * Hex color parser - optimized regex validation
 */
export function parseHexColor(node: csstree.CssNode): Result<HexColor, string> {
  const value = nodeToString(node);
  if (!HEX_COLOR_REGEX.test(value)) {
    return err(`Invalid hex color format: ${value}`);
  }
  return ok({ kind: 'hex', value });
}

/**
 * RGB color function parser
 */
export function parseRgbColor(nodes: csstree.CssNode[]): Result<RGBColor, string> {
  // Handle: rgb(255, 0, 0), rgb(100%, 0%, 0%), rgb(255 0 0 / 0.5)
  // Parse comma-separated or space-separated values
  // Validate ranges: 0-255 or 0-100%
  // Handle optional alpha
}

/**
 * HSL color function parser
 */
export function parseHslColor(nodes: csstree.CssNode[]): Result<HSLColor, string> {
  // Handle: hsl(360, 100%, 50%), hsl(360deg 100% 50% / 0.5)
  // Parse hue (angle), saturation (percentage), lightness (percentage)
  // Validate ranges: H(0-360), S/L(0-100%)
  // Handle optional alpha
}

/**
 * LAB color function parser
 */
export function parseLabColor(nodes: csstree.CssNode[]): Result<LABColor, string> {
  // Handle: lab(50% -20 30), lab(50% -20 30 / 0.5)
  // Parse lightness (percentage), a (-125 to +125), b (-125 to +125)
  // Handle optional alpha
}

/**
 * LCH color function parser
 */
export function parseLchColor(nodes: csstree.CssNode[]): Result<LCHColor, string> {
  // Handle: lch(50% 30 180), lch(50% 30 180deg / 0.5)
  // Parse lightness (percentage), chroma (0-150), hue (angle)
  // Handle optional alpha
}

/**
 * OKLab color function parser
 */
export function parseOklabColor(nodes: csstree.CssNode[]): Result<OKLabColor, string> {
  // Handle: oklab(0.5 -0.1 0.2), oklab(0.5 -0.1 0.2 / 0.5)
  // Parse lightness (0-1), a (-0.4 to +0.4), b (-0.4 to +0.4)
  // Handle optional alpha
}

/**
 * OKLCH color function parser
 */
export function parseOklchColor(nodes: csstree.CssNode[]): Result<OKLCHColor, string> {
  // Handle: oklch(0.5 0.1 180), oklch(0.5 0.1 180deg / 0.5)
  // Parse lightness (0-1), chroma (0-0.4), hue (angle)
  // Handle optional alpha
}

/**
 * HWB color function parser
 */
export function parseHwbColor(nodes: csstree.CssNode[]): Result<HWBColor, string> {
  // Handle: hwb(180 20% 30%), hwb(180deg 20% 30% / 0.5)
  // Parse hue (angle), whiteness (percentage), blackness (percentage)
  // Validate: whiteness + blackness <= 100%
  // Handle optional alpha
}

/**
 * Color function parser (explicit color space)
 */
export function parseColorFunction(nodes: csstree.CssNode[]): Result<ColorFunctionColor, string> {
  // Handle: color(srgb 0.5 0.2 0.8), color(display-p3 0.5 0.2 0.8 / 0.5)
  // Parse color space identifier
  // Parse channel values for the specified color space
  // Handle optional alpha
}

/**
 * Color-mix function parser
 */
export function parseColorMix(nodes: csstree.CssNode[]): Result<ColorMixColor, string> {
  // Handle: color-mix(in srgb, red 50%, blue)
  // Parse interpolation method (in colorspace hue-method?)
  // Parse first color and optional percentage
  // Parse second color and optional percentage
  // Validate percentages sum to 100% or use 50% default
}

/**
 * Light-dark function parser
 */
export function parseLightDarkColor(nodes: csstree.CssNode[]): Result<LightDarkColor, string> {
  // Handle: light-dark(white, black)
  // Parse first color (light mode)
  // Parse second color (dark mode)
  // Validate both are valid colors
}

/**
 * System color parser
 */
export function parseSystemColor(node: csstree.CssNode): Result<SystemColor, string> {
  // Handle: ButtonText, ActiveBorder, etc.
  // Validate against known system color keywords
}

/**
 * Alpha value parser (shared utility)
 */
export function parseAlphaValue(node: csstree.CssNode): Result<number, string> {
  // Handle: 0.5, 50%, none
  // Normalize to 0-1 range
  // Validate range constraints
}
```

### Color Parsing Utilities

```typescript
// src/utils/parse/color-utils.ts

/**
 * Color format detection utilities
 */
export function detectColorFormat(css: string): ColorFormat | null {
  // Analyze CSS string to determine likely color format
  // Used for optimization - try most likely parsers first
}

export type ColorFormat =
  | 'named'
  | 'hex'
  | 'rgb'
  | 'hsl'
  | 'hwb'
  | 'lab'
  | 'lch'
  | 'oklab'
  | 'oklch'
  | 'color'
  | 'color-mix'
  | 'system'
  | 'light-dark';

/**
 * Color validation utilities
 */
export function validateColorValue(color: Color): Result<Color, string> {
  // Validate color-specific constraints
  // RGB: values in correct ranges
  // HSL: hue 0-360, saturation/lightness 0-100%
  // LAB: lightness 0-100%, a/b -125 to +125
  // etc.
}

/**
 * Color normalization utilities
 */
export function normalizeColor(color: Color): Color {
  // Normalize alpha values to 0-1 range
  // Normalize angle values to 0-360 range
  // Ensure consistent unit handling
}

/**
 * Color space conversion utilities (for validation)
 */
export function convertColorSpace(color: Color, targetSpace: ColorSpace): Result<Color, string> {
  // Convert between color spaces for validation
  // Useful for ensuring color-mix interpolation works correctly
}
```

## Background Parsing Utilities

### Background Parser Architecture

Background parsing is more complex due to:
1. Multiple background layers
2. Complex position syntax
3. Size calculations
4. Shorthand vs longhand properties

```typescript
// src/utils/parse/background.ts

/**
 * Master background parser
 */
export function parseBackgroundNode(node: csstree.CssNode): Result<Background, string> {
  // Handle both shorthand and individual properties
  // Parse background layers from comma-separated values
  // Handle final background-color layer
}

/**
 * Background layer parser
 */
export function parseBackgroundLayer(nodes: csstree.CssNode[]): Result<BackgroundLayer, string> {
  // Parse individual background layer components
  // Handle: image position/size repeat attachment origin clip
  // Use appropriate defaults for missing values
}

/**
 * Background image parser
 */
export function parseBackgroundImage(node: csstree.CssNode): Result<BackgroundImage, string> {
  // Handle: none, url(), gradients, image(), image-set(), element(), cross-fade()
  // Delegate to appropriate image parser
  // Validate URL format for url() values
}

/**
 * Background position parser (reuses position utilities)
 */
export function parseBackgroundPosition(nodes: csstree.CssNode[]): Result<BackgroundPosition, string> {
  // Handle complex position syntax
  // Support: left, center, right, top, bottom, percentages, lengths
  // Handle both 1-value and 2-value syntax
  // Use existing position parsing utilities
}

/**
 * Background size parser
 */
export function parseBackgroundSize(nodes: csstree.CssNode[]): Result<BackgroundSize, string> {
  // Handle: auto, cover, contain, <length>, <percentage>, <length-percentage>{2}
  // Validate non-negative sizes
  // Handle aspect ratio preservation
}

/**
 * Background repeat parser
 */
export function parseBackgroundRepeat(nodes: csstree.CssNode[]): Result<BackgroundRepeat, string> {
  // Handle: repeat-x, repeat-y, repeat, space, round, no-repeat
  // Support both single values and pairs
  // Validate keyword combinations
}

/**
 * Background attachment parser
 */
export function parseBackgroundAttachment(node: csstree.CssNode): Result<BackgroundAttachment, string> {
  // Handle: scroll, fixed, local
  // Simple keyword validation
}

/**
 * Background origin parser
 */
export function parseBackgroundOrigin(node: csstree.CssNode): Result<BackgroundOrigin, string> {
  // Handle: border-box, padding-box, content-box
  // Simple keyword validation
}

/**
 * Background clip parser
 */
export function parseBackgroundClip(node: csstree.CssNode): Result<BackgroundClip, string> {
  // Handle: border-box, padding-box, content-box, text
  // Simple keyword validation
}

/**
 * Background color parser (reuses color utilities)
 */
export function parseBackgroundColor(node: csstree.CssNode): Result<BackgroundColor, string> {
  // Handle: <color> | transparent
  // Delegate to color parser
  // Special handling for transparent keyword
}
```

### Background Parsing Utilities

```typescript
// src/utils/parse/background-utils.ts

/**
 * Background layer combination utilities
 */
export function combineBackgroundLayers(layers: BackgroundLayer[]): BackgroundLayers {
  // Combine multiple layers into single structure
  // Handle layer ordering (later layers on top)
  // Validate layer compatibility
}

/**
 * Background shorthand expansion
 */
export function expandBackgroundShorthand(shorthand: string): Result<Background, string> {
  // Parse shorthand background declaration
  // Expand to individual properties
  // Handle complex combinations
}

/**
 * Background layer validation
 */
export function validateBackgroundLayer(layer: BackgroundLayer): Result<BackgroundLayer, string> {
  // Validate layer property combinations
  // Check for invalid combinations
  // Ensure required properties are present
}

/**
 * Background position calculation utilities
 */
export function calculateBackgroundPosition(
  position: BackgroundPosition,
  containerSize: { width: number; height: number },
  imageSize?: { width: number; height: number }
): { x: number; y: number } {
  // Calculate absolute position from relative values
  // Handle percentage calculations
  // Account for image size when provided
}

/**
 * Background size calculation utilities
 */
export function calculateBackgroundSize(
  size: BackgroundSize,
  containerSize: { width: number; height: number },
  intrinsicSize?: { width: number; height: number }
): { width: number; height: number } {
  // Calculate rendered size from background-size value
  // Handle cover/contain logic
  // Maintain aspect ratios
}
```

## Shared Parsing Utilities

### Enhanced AST Utilities

```typescript
// src/utils/ast/color.ts

/**
 * Color-specific AST node utilities
 */
export function findColorFunctionNode(nodes: csstree.CssNode[]): csstree.CssNode | null {
  // Find color function nodes in AST
  // Handle nested function calls
}

export function extractColorChannels(nodes: csstree.CssNode[]): Result<ColorChannel[], string> {
  // Extract channel values from color function arguments
  // Handle different separators (comma, space)
  // Parse alpha values
}

export function parseColorSpace(nodes: csstree.CssNode[]): Result<ColorSpace, string> {
  // Parse color space identifiers
  // Validate against known color spaces
}
```

```typescript
// src/utils/ast/background.ts

/**
 * Background-specific AST node utilities
 */
export function findBackgroundLayers(ast: csstree.CssNode): csstree.CssNode[][] {
  // Split background declaration into layers by comma
  // Handle nested functions and complex values
  // Return array of node arrays for each layer
}

export function extractBackgroundComponents(nodes: csstree.CssNode[]): {
  image?: csstree.CssNode;
  position?: csstree.CssNode[];
  size?: csstree.CssNode[];
  repeat?: csstree.CssNode;
  attachment?: csstree.CssNode;
  origin?: csstree.CssNode;
  clip?: csstree.CssNode;
} {
  // Extract individual background components from layer nodes
  // Handle various CSS property orders
  // Identify components by type and position
}
```

## Performance Optimizations

### Color Parsing Optimizations:
1. **Format Detection**: Quick string analysis to determine likely color format
2. **Hash Map Lookups**: O(1) named color and keyword lookups
3. **Regex Pre-compilation**: Compile regex patterns once at module load
4. **Lazy Validation**: Only validate when necessary
5. **Caching**: Cache expensive color space conversions

### Background Parsing Optimizations:
1. **Streaming Parsing**: Parse large background declarations incrementally
2. **Component Caching**: Cache parsed components for reuse
3. **Early Termination**: Stop parsing when invalid combinations detected
4. **Memory Efficiency**: Use iterators for large AST traversals

## Error Handling Strategy

### Color Parsing Errors:
- **INVALID_COLOR_SYNTAX**: Malformed color syntax
- **UNKNOWN_COLOR_FORMAT**: Unrecognized color format
- **INVALID_CHANNEL_COUNT**: Wrong number of color channels
- **CHANNEL_OUT_OF_RANGE**: Color channel value out of valid range
- **INVALID_ALPHA_SYNTAX**: Malformed alpha value
- **UNKNOWN_COLOR_SPACE**: Unrecognized color space in color() function
- **INVALID_MIX_SYNTAX**: Malformed color-mix() syntax
- **MIX_RATIO_MISMATCH**: Color-mix percentages don't sum correctly

### Background Parsing Errors:
- **INVALID_BACKGROUND_SYNTAX**: Malformed background syntax
- **INVALID_LAYER_SYNTAX**: Malformed background layer
- **CONFLICTING_PROPERTIES**: Mutually exclusive background properties
- **INVALID_POSITION_SYNTAX**: Malformed background position
- **INVALID_SIZE_SYNTAX**: Malformed background size
- **INVALID_REPEAT_SYNTAX**: Malformed background repeat
- **TOO_MANY_LAYERS**: Exceeded maximum background layers
- **MISSING_REQUIRED_PROPERTY**: Required background property missing

## Integration with Existing Utils

### Reuse Existing Utilities:
1. **Length/Percentage Parsing**: Use existing `parseLengthPercentage` utilities
2. **Position Parsing**: Use existing `parsePositionValue` utilities
3. **Angle Parsing**: Use existing `parseAngle` utilities
4. **AST Walking**: Use existing `findFunctionNode` utilities
5. **Error Handling**: Use existing `Result<T, E>` pattern

### Enhanced Utilities:
1. **Color-Aware Length Parsing**: Enhanced length parsing for color channels
2. **Percentage-Aware Parsing**: Enhanced percentage parsing for color values
3. **Function Argument Parsing**: Enhanced function argument extraction
4. **Comma-Separated Value Parsing**: Enhanced CSV parsing for color stops

## Testing Strategy for Parse Utilities

### Unit Tests:
1. **Individual Color Parsers**: Test each color format parser separately
2. **Edge Cases**: Invalid inputs, boundary values, malformed syntax
3. **Performance Tests**: Parsing speed for large CSS files
4. **Memory Tests**: Memory usage for complex color expressions

### Integration Tests:
1. **Master Color Parser**: Test the dispatcher logic
2. **Background Layer Parsing**: Test complex layer combinations
3. **Shorthand Expansion**: Test background shorthand parsing
4. **Cross-Module Integration**: Test colors in backgrounds, backgrounds with gradients

### Real-World Tests:
1. **MDN Example Parsing**: Validate against MDN color and background examples
2. **Browser Compatibility**: Test parsing of browser-specific syntax
3. **Large File Handling**: Test performance with large CSS files
4. **Complex Combinations**: Test intricate color and background combinations

## Documentation for Parse Utilities

### API Documentation:
1. **Function Signatures**: Complete TypeScript signatures for all utilities
2. **Parameter Descriptions**: Detailed parameter documentation
3. **Return Value Documentation**: Clear return value descriptions
4. **Error Documentation**: Comprehensive error condition documentation
5. **Usage Examples**: Practical examples for each utility

### Implementation Documentation:
1. **Algorithm Descriptions**: How each parser works internally
2. **Performance Notes**: Performance characteristics and optimizations
3. **Validation Rules**: What constraints each parser enforces
4. **Integration Points**: How utilities work together
5. **Testing Coverage**: What scenarios are tested

This comprehensive parse utilities system provides a solid foundation for reliable, efficient parsing of all CSS color and background syntaxes, with excellent error handling and performance characteristics.