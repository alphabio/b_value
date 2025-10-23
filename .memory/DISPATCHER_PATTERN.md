# Dispatcher Pattern in b_value

## What is the Dispatcher Pattern?

Files like `border/border.ts`, `outline/outline.ts`, `text/text.ts`, `background/background.ts`, and `transition/transition.ts` implement a **dispatcher pattern**.

## Purpose

These dispatchers are **convenience functions** that:
- Accept a CSS value string when the user doesn't know which specific longhand property it belongs to
- Try multiple related longhand property parsers in sequence
- Return the first successful parse result

## Not Shorthand Expansion

**Important distinction:**
- ❌ NOT shorthand expansion: `border: 1px solid red` → `border-width`, `border-style`, `border-color` (this is **b_short's job**)
- ✅ Dispatcher: `"1px"` → tries `Width.parse`, `Style.parse`, `Radius.parse`, `Color.parse` → returns match

## API Pattern

```typescript
// Dispatcher - tries all border-related parsers
const result = Parse.Border.parse("1px");
// Tries: Width, Style, Radius, Color parsers

// Specific longhand parser
const result = Parse.Border.Width.parse("1px");
// Only parses border-width values
```

## Scope

- **b_value**: Parses VALUES for LONGHAND CSS properties (this library)
- **b_short**: Expands SHORTHAND CSS properties to LONGHAND properties (separate library)

## Testing

Dispatcher files **should have tests** that verify:
1. They correctly route to each underlying longhand parser
2. They reject invalid values
3. They return appropriate error messages with suggestions

## Examples

```typescript
// border/border.ts - tries Width, Style, Radius, Color
Parse.Border.parse("2px")    // → Width parser matches
Parse.Border.parse("solid")  // → Style parser matches
Parse.Border.parse("red")    // → Color parser matches

// outline/outline.ts - tries Width, Style, Color, Offset
Parse.Outline.parse("3px")   // → Width parser matches
Parse.Outline.parse("dotted") // → Style parser matches

// text/text.ts - tries Line, Style, Thickness, Color
Parse.Text.parse("underline") // → Line parser matches
Parse.Text.parse("wavy")      // → Style parser matches

// background/background.ts - tries Size, Repeat, Attachment, Clip, Origin
Parse.Background.parse("cover")      // → Size parser matches
Parse.Background.parse("no-repeat")  // → Repeat parser matches

// transition/transition.ts - tries Duration, Delay, TimingFunction, Property
Parse.Transition.parse("1s")     // → Duration parser matches
Parse.Transition.parse("ease")   // → TimingFunction parser matches
```

## When to Use

Use dispatchers when:
- Building tools that receive CSS values without property context
- Providing a simpler API for common use cases
- The user has a value but doesn't know which specific longhand it belongs to

Use specific longhand parsers when:
- You know exactly which CSS property value you're parsing
- You want type-safe, specific results
- Performance is critical (avoids trying multiple parsers)
