# Phase 4: Generate Utilities for Colors & Backgrounds

## Color Generation Utilities

### Core Color Generation Strategy

Color generation is generally more straightforward than parsing since we have structured data to work with. However, we need to handle multiple output formats and ensure we generate the most appropriate CSS representation for each color type.

### Color Generator Architecture

```typescript
// src/utils/generate/color.ts

/**
 * Master color generator that dispatches to appropriate color format generator
 */
export function colorToCss(color: Color): string {
  switch (color.kind) {
    case 'rgb': return rgbColorToCss(color);
    case 'hsl': return hslColorToCss(color);
    case 'hwb': return hwbColorToCss(color);
    case 'lab': return labColorToCss(color);
    case 'lch': return lchColorToCss(color);
    case 'oklab': return oklabColorToCss(color);
    case 'oklch': return oklchColorToCss(color);
    case 'color': return colorFunctionToCss(color);
    case 'color-mix': return colorMixToCss(color);
    case 'named': return namedColorToCss(color);
    case 'hex': return hexColorToCss(color);
    case 'system': return systemColorToCss(color);
    case 'light-dark': return lightDarkColorToCss(color);
    default: throw new Error(`Unknown color kind: ${(color as any).kind}`);
  }
}

/**
 * RGB color generator
 */
export function rgbColorToCss(color: RGBColor): string {
  const { r, g, b, alpha } = color;

  // Determine if we should use comma or space syntax
  // Use space syntax for modern CSS: rgb(255 0 0 / 0.5)
  // Fall back to comma syntax for compatibility: rgb(255, 0, 0, 0.5)

  if (alpha !== undefined) {
    return `rgb(${r} ${g} ${b} / ${alpha})`;
  }
  return `rgb(${r} ${g} ${b})`;
}

/**
 * HSL color generator
 */
export function hslColorToCss(color: HSLColor): string {
  const { h, s, l, alpha } = color;

  if (alpha !== undefined) {
    return `hsl(${h}deg ${s}% ${l}% / ${alpha})`;
  }
  return `hsl(${h}deg ${s}% ${l}%)`;
}

/**
 * LAB color generator
 */
export function labColorToCss(color: LABColor): string {
  const { l, a, b, alpha } = color;

  if (alpha !== undefined) {
    return `lab(${l}% ${a} ${b} / ${alpha})`;
  }
  return `lab(${l}% ${a} ${b})`;
}

/**
 * LCH color generator
 */
export function lchColorToCss(color: LCHColor): string {
  const { l, c, h, alpha } = color;

  if (alpha !== undefined) {
    return `lch(${l}% ${c} ${h}deg / ${alpha})`;
  }
  return `lch(${l}% ${c} ${h}deg)`;
}

/**
 * OKLab color generator
 */
export function oklabColorToCss(color: OKLabColor): string {
  const { l, a, b, alpha } = color;

  if (alpha !== undefined) {
    return `oklab(${l} ${a} ${b} / ${alpha})`;
  }
  return `oklab(${l} ${a} ${b})`;
}

/**
 * OKLCH color generator
 */
export function oklchColorToCss(color: OKLCHColor): string {
  const { l, c, h, alpha } = color;

  if (alpha !== undefined) {
    return `oklch(${l} ${c} ${h}deg / ${alpha})`;
  }
  return `oklch(${l} ${c} ${h}deg)`;
}

/**
 * HWB color generator
 */
export function hwbColorToCss(color: HWBColor): string {
  const { h, w, b, alpha } = color;

  if (alpha !== undefined) {
    return `hwb(${h}deg ${w}% ${b}% / ${alpha})`;
  }
  return `hwb(${h}deg ${w}% ${b}%)`;
}

/**
 * Color function generator (explicit color space)
 */
export function colorFunctionToCss(color: ColorFunctionColor): string {
  const { colorSpace, channels, alpha } = color;

  const channelStr = channels.map(ch => {
    if (ch.unit === 'none') return 'none';
    return ch.unit === '%' ? `${ch.value}%` : ch.value.toString();
  }).join(' ');

  if (alpha !== undefined) {
    return `color(${colorSpace} ${channelStr} / ${alpha})`;
  }
  return `color(${colorSpace} ${channelStr})`;
}

/**
 * Color-mix generator
 */
export function colorMixToCss(color: ColorMixColor): string {
  const { interpolationMethod, firstColor, secondColor, mixRatio } = color;

  const methodStr = interpolationMethod.hueInterpolation
    ? `in ${interpolationMethod.colorSpace} ${interpolationMethod.hueInterpolation} hue`
    : `in ${interpolationMethod.colorSpace}`;

  if (mixRatio !== undefined) {
    return `color-mix(${methodStr}, ${colorToCss(firstColor)} ${mixRatio}%, ${colorToCss(secondColor)})`;
  }
  return `color-mix(${methodStr}, ${colorToCss(firstColor)}, ${colorToCss(secondColor)})`;
}

/**
 * Named color generator
 */
export function namedColorToCss(color: NamedColor): string {
  return color.name;
}

/**
 * Hex color generator
 */
export function hexColorToCss(color: HexColor): string {
  return color.value;
}

/**
 * System color generator
 */
export function systemColorToCss(color: SystemColor): string {
  return color.name;
}

/**
 * Light-dark color generator
 */
export function lightDarkColorToCss(color: LightDarkColor): string {
  return `light-dark(${colorToCss(color.lightColor)}, ${colorToCss(color.darkColor)})`;
}
```

### Color Generation Utilities

```typescript
// src/utils/generate/color-utils.ts

/**
 * Color format selection utilities
 */
export function selectOptimalColorFormat(color: Color): string {
  // Choose the most appropriate CSS representation
  // Prefer named colors for common colors
  // Prefer hex for simple colors
  // Prefer modern formats for complex colors
  // Consider browser support and CSS version
}

/**
 * Color channel formatting utilities
 */
export function formatColorChannel(value: number, unit?: string): string {
  // Format channel values with appropriate precision
  // Handle percentage vs number formatting
  // Round to appropriate decimal places
}

/**
 * Alpha value formatting utilities
 */
export function formatAlphaValue(alpha: number): string {
  // Format alpha values for CSS output
  // Use appropriate precision (0.5 vs 50%)
  // Handle edge cases (0, 1)
}

/**
 * Color space formatting utilities
 */
export function formatColorSpace(colorSpace: ColorSpace): string {
  // Format color space names for CSS output
  // Handle color space aliases and preferences
}

/**
 * Color validation for generation
 */
export function validateColorForGeneration(color: Color): Result<Color, string> {
  // Validate color before generation
  // Ensure all required fields are present
  // Check value ranges for CSS compatibility
}
```

## Background Generation Utilities

### Background Generator Architecture

Background generation needs to handle:
1. Individual background properties
2. Background layers
3. Shorthand vs longhand generation
4. Optimal CSS output formatting

```typescript
// src/utils/generate/background.ts

/**
 * Master background generator
 */
export function backgroundToCss(background: Background): string {
  // Handle both shorthand and individual property generation
  // Optimize for readability and compatibility
  // Handle multi-layer backgrounds
}

/**
 * Background layer generator
 */
export function backgroundLayerToCss(layer: BackgroundLayer): string {
  // Generate individual background layer CSS
  // Handle optional properties with appropriate defaults
  // Optimize property ordering for CSS output
}

/**
 * Background image generator
 */
export function backgroundImageToCss(image: BackgroundImage): string {
  switch (image.kind) {
    case 'none': return 'none';
    case 'url': return `url("${image.url}")`;
    case 'gradient': return generateGradientToCss(image.gradient);
    case 'image': return generateImageToCss(image.image);
    case 'cross-fade': return generateCrossFadeToCss(image.crossFade);
    default: throw new Error(`Unknown background image kind: ${(image as any).kind}`);
  }
}

/**
 * Background position generator (reuses position utilities)
 */
export function backgroundPositionToCss(position: BackgroundPosition): string {
  // Use existing position generation utilities
  // Handle both 1-value and 2-value syntax
  // Optimize for common cases (center center, etc.)
}

/**
 * Background size generator
 */
export function backgroundSizeToCss(size: BackgroundSize): string {
  if (typeof size === 'string') {
    return size; // 'auto', 'cover', 'contain'
  }

  if ('width' in size && 'height' in size) {
    const w = lengthPercentageToCss(size.width);
    const h = lengthPercentageToCss(size.height);
    return `${w} ${h}`;
  }

  // Single dimension cases
  return lengthPercentageToCss(size.width || size.height);
}

/**
 * Background repeat generator
 */
export function backgroundRepeatToCss(repeat: BackgroundRepeat): string {
  if (typeof repeat === 'string') {
    return repeat;
  }

  // Two-value syntax
  return `${repeat.horizontal} ${repeat.vertical}`;
}

/**
 * Background attachment generator
 */
export function backgroundAttachmentToCss(attachment: BackgroundAttachment): string {
  return attachment;
}

/**
 * Background origin generator
 */
export function backgroundOriginToCss(origin: BackgroundOrigin): string {
  return origin;
}

/**
 * Background clip generator
 */
export function backgroundClipToCss(clip: BackgroundClip): string {
  return clip;
}

/**
 * Background color generator (reuses color utilities)
 */
export function backgroundColorToCss(color: BackgroundColor): string {
  if (color === 'transparent') return 'transparent';
  return colorToCss(color);
}
```

### Background Generation Utilities

```typescript
// src/utils/generate/background-utils.ts

/**
 * Background layer optimization utilities
 */
export function optimizeBackgroundLayers(layers: BackgroundLayer[]): BackgroundLayer[] {
  // Remove redundant layers
  // Combine compatible layers
  // Optimize property ordering
  // Minimize CSS output size
}

/**
 * Background shorthand generation
 */
export function generateBackgroundShorthand(background: Background): string {
  // Generate optimal shorthand CSS
  // Handle complex combinations
  // Maintain CSS validity
  // Prefer readability over brevity when appropriate
}

/**
 * Background layer ordering utilities
 */
export function orderBackgroundProperties(layer: BackgroundLayer): string[] {
  // Order properties for optimal CSS output
  // Follow common CSS property ordering conventions
  // Group related properties together
}

/**
 * Background size calculation for generation
 */
export function calculateOptimalBackgroundSize(
  size: BackgroundSize,
  containerSize: { width: number; height: number },
  imageSize?: { width: number; height: number }
): string {
  // Calculate optimal size representation for CSS output
  // Choose between absolute values, percentages, keywords
  // Optimize for the specific use case
}

/**
 * Background position optimization
 */
export function optimizeBackgroundPosition(position: BackgroundPosition): string {
  // Optimize position representation
  // Use keywords when possible (center vs 50%)
  // Minimize CSS output while maintaining accuracy
}
```

## Enhanced Value Generation Utilities

### Color-Aware Value Generation

```typescript
// src/utils/generate/values.ts (enhanced existing file)

/**
 * Enhanced color value generation
 */
export function colorValueToCss(value: ColorValue): string {
  // Handle both string and object color values
  // Delegate to appropriate color generator
  if (typeof value === 'string') {
    return value; // Named color, system color, etc.
  }
  return colorToCss(value);
}

/**
 * Enhanced length-percentage generation for colors
 */
export function colorChannelToCss(channel: ColorChannel): string {
  // Format color channels with appropriate units
  // Handle percentage vs number formatting
  // Apply appropriate precision
}

/**
 * Enhanced angle generation for colors
 */
export function colorAngleToCss(angle: number): string {
  // Format angles for color functions
  // Choose appropriate units (deg, rad, grad, turn)
  // Apply appropriate precision
}
```

## Performance Optimizations

### Color Generation Optimizations:
1. **Format Selection**: Choose optimal CSS representation for each color
2. **Precision Optimization**: Use appropriate decimal precision for each color space
3. **Keyword Preference**: Use named colors and keywords when possible
4. **String Interning**: Reuse common color strings
5. **Lazy Generation**: Generate CSS only when needed

### Background Generation Optimizations:
1. **Property Ordering**: Optimize CSS property order for better compression
2. **Shorthand Detection**: Use shorthand syntax when possible
3. **Layer Optimization**: Combine compatible layers
4. **Default Omission**: Omit default values when appropriate
5. **CSS Minification**: Optimize for smaller CSS output

## Integration with Existing Generate Utils

### Reuse Existing Utilities:
1. **Length/Percentage Generation**: Use existing `lengthPercentageToCss` utilities
2. **Position Generation**: Use existing `positionValueToCss` utilities
3. **Angle Generation**: Use existing `angleToCss` utilities
4. **Value Joining**: Use existing `joinCssValues` utilities
5. **CSS Formatting**: Use existing CSS formatting patterns

### Enhanced Utilities:
1. **Color-Aware Formatting**: Enhanced formatting for color-specific values
2. **Background-Aware Formatting**: Enhanced formatting for background-specific values
3. **Multi-Layer Support**: Enhanced support for complex background combinations
4. **Shorthand Detection**: Enhanced shorthand syntax detection and generation

## Testing Strategy for Generate Utilities

### Unit Tests:
1. **Individual Color Generators**: Test each color format generator
2. **Edge Cases**: Boundary values, precision handling, format selection
3. **Performance Tests**: Generation speed for complex color structures
4. **Output Validation**: Ensure generated CSS is valid and parseable

### Integration Tests:
1. **Round-trip Testing**: Parse → generate → parse cycle validation
2. **Background Layer Generation**: Test complex background combinations
3. **Shorthand Generation**: Test background shorthand generation
4. **Cross-Module Integration**: Test colors in backgrounds, backgrounds with gradients

### Real-World Tests:
1. **CSS Validity**: Ensure all generated CSS is valid
2. **Browser Compatibility**: Test generated CSS in multiple browsers
3. **Compression Testing**: Test CSS output size optimization
4. **Performance Testing**: Test generation speed with large structures

## Documentation for Generate Utilities

### API Documentation:
1. **Function Signatures**: Complete TypeScript signatures for all generators
2. **Parameter Descriptions**: Detailed parameter documentation
3. **Return Value Documentation**: Clear return value descriptions
4. **Usage Examples**: Practical examples for each generator
5. **Performance Notes**: Performance characteristics of each generator

### Implementation Documentation:
1. **Algorithm Descriptions**: How each generator works internally
2. **Format Selection Logic**: How optimal formats are chosen
3. **Precision Handling**: How decimal precision is managed
4. **CSS Optimization**: How CSS output is optimized
5. **Integration Points**: How generators work with existing utilities

## Advanced Features

### Color Format Selection:
1. **Named Color Preference**: Use named colors for common colors (red, blue, etc.)
2. **Hex Preference**: Use hex for simple RGB colors (#ff0000)
3. **Modern Format Preference**: Use modern formats for complex colors (oklch, lab)
4. **Browser Support**: Consider browser compatibility when selecting formats
5. **CSS Version**: Consider target CSS version when selecting formats

### Background Optimization:
1. **Shorthand Detection**: Automatically use shorthand when possible
2. **Layer Combination**: Combine compatible background layers
3. **Default Omission**: Omit default values to reduce CSS size
4. **Property Ordering**: Order properties for optimal gzip compression
5. **Keyword Preference**: Use keywords instead of equivalent values

This comprehensive generate utilities system ensures that all color and background IR objects can be converted back to optimal, valid CSS strings with excellent performance and formatting options.