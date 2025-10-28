# Border Module Design Philosophy

**Status**: Active Design Document  
**Date**: 2025-10-28  
**Topic**: Pragmatic API Design for Multi-Side Properties

---

## 🎯 Core Problem

### The Client Perspective

When updating border properties, clients face a choice:

**Option A: Pure CSS Longhand (Tedious)**
```typescript
// Update all 4 corners - requires 4 separate calls
parse("border-top-left-radius", "10px")
parse("border-top-right-radius", "10px")
parse("border-bottom-right-radius", "10px")
parse("border-bottom-left-radius", "10px")
```

**Option B: CSS Shorthand (Out of Scope)**
```typescript
// CSS shorthand - belongs in b_short
parse("border-radius", "10px")  // ❌ Not in b_value
```

**Option C: Pragmatic Convenience API (Our Solution)**
```typescript
// Single call, updates all corners
Border.Radius.parse("10px")
// → Returns IR that applies to all 4 corners
```

---

## 📐 Design Philosophy

### Principle 1: Longhand Foundation

**b_value processes LONGHAND properties only.**

The API ultimately operates on individual longhand properties:
- `border-top-width`
- `border-left-color`
- `border-bottom-left-radius`
- etc.

### Principle 2: Pragmatic Convenience

**90% of use cases apply the same value to all sides.**

Examples:
```css
/* Want uniform border */
border-top-width: 2px;
border-right-width: 2px;
border-bottom-width: 2px;
border-left-width: 2px;

/* Want uniform radius */
border-top-left-radius: 8px;
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;
border-bottom-left-radius: 8px;
```

**Forcing 4 separate calls is ergonomically poor.**

### Principle 3: Fine-Tuning When Needed

**10% of use cases need per-side control.**

The API should support BOTH:
- ✅ Convenience: `Border.Width.parse("2px")` → applies to all 4 sides
- ✅ Fine-tuning: Individual side parsing when needed

---

## 🏗️ API Evolution Roadmap

### Phase 1: Current State (Individual Property APIs)
```typescript
// Color module
Parse.Color.Oklch.parse("oklch(65% 0.2 250 / 0.5)")
Parse.Color.Hex.parse("#ff0000")
Parse.Color.Rgb.parse("rgb(255 0 0)")
```

**Characteristics**:
- ✅ Explicit type routing (know exactly what you're parsing)
- ✅ Type-safe (Oklahoma only accepts oklch syntax)
- ❌ Requires knowing color format upfront

### Phase 2: Universal Type Parsers (Future)
```typescript
// Any color format
Parse.Color.parse("oklch(65% 0.2 250 / 0.5)")
Parse.Color.parse("#ff0000")
Parse.Color.parse("rgb(255 0 0)")
```

**Characteristics**:
- ✅ Convenience (don't need to know format)
- ✅ Auto-detection of type
- ⚠️ Slightly less explicit

### Phase 3: Multi-Declaration Parser (Future)
```typescript
// Multiple declarations at once
Parse.parse(`
  color: red;
  background: blue;
  border-width: 2px;
`)
```

**Characteristics**:
- ✅ Batch processing
- ✅ Stylesheet-like input
- ✅ Each declaration is still a LONGHAND property

---

## 🔧 Border Module: The Challenge

### Why Border is Special

Most properties map 1:1:
- `opacity: 0.5` → one property, one value
- `color: red` → one property, one value
- `width: 100px` → one property, one value

Border properties have **combinatorial explosion**:
- 4 sides × 3 properties (width, style, color) = **12 properties**
- 4 corners × 1 property (radius) = **4 properties**
- **Total: 16 longhand properties**

### The Ergonomics Problem

**Client wants uniform border:**
```typescript
// Without convenience API - 12 calls!
parse("border-top-width", "2px")
parse("border-right-width", "2px")
parse("border-bottom-width", "2px")
parse("border-left-width", "2px")
parse("border-top-style", "solid")
parse("border-right-style", "solid")
// ... 6 more calls
```

**With convenience API:**
```typescript
Border.Width.parse("2px")   // → applies to all 4 sides
Border.Style.parse("solid") // → applies to all 4 sides
Border.Color.parse("red")   // → applies to all 4 sides
```

---

## 💡 Proposed Solution: Convenience APIs That Generate Longhand IR

### Concept

The convenience APIs are **not CSS shorthands**. They are:
- Helper functions that accept a single value
- Generate IR for multiple longhand properties
- Pragmatic bridge between client ergonomics and spec compliance

### Implementation Pattern

```typescript
// API: Border.Width.parse("2px")
export function parse(css: string): Result<BorderWidthIR> {
  const value = parseSingleWidth(css);
  
  return {
    kind: "border-width-all",  // Convenience type
    value,
    // Expands to 4 longhand properties:
    // - border-top-width
    // - border-right-width
    // - border-bottom-width
    // - border-left-width
  };
}

// Fine-tuning: Direct longhand access
Border.Top.Width.parse("2px")  // → { kind: "border-top-width", value }
```

### Key Distinction

**Not a CSS Shorthand**:
```css
/* CSS shorthand (b_short territory) */
border-width: 1px 2px 3px 4px;  /* 4 different values */
border-radius: 10px 20px;        /* 2 values with special semantics */
```

**Convenience API (b_value territory)**:
```typescript
/* Apply SAME value to multiple longhands */
Border.Width.parse("2px")  // All 4 sides get 2px
Border.Radius.parse("8px") // All 4 corners get 8px
```

---

## 📊 Comparison Matrix

| Approach | API Calls | CSS Spec Compliance | Client Ergonomics | Implementation Complexity |
|----------|-----------|---------------------|-------------------|---------------------------|
| **Pure Longhand** | 16 | ✅ Perfect | ❌ Poor (tedious) | ✅ Simple |
| **CSS Shorthand** | 1-4 | ✅ Per spec | ✅ Good | ❌ Complex (variable values) |
| **Convenience API** | 4 | ✅ Generates longhands | ✅ Good | ✅ Medium (single value) |

---

## 🎯 Decision: Defer Border Implementation

### Rationale

1. **Design complexity**: Need to decide between pure longhand vs convenience API
2. **Type definitions**: Current types conflate convenience with shorthand
3. **Test strategy**: Unclear whether to test as shorthand or longhand
4. **Client API**: Need to finalize multi-declaration parser design first

### What We Know

✅ **Confirmed**: Each individual longhand property is simple (single value)
✅ **Confirmed**: Border module needs pragmatic convenience layer
✅ **Confirmed**: Not true CSS shorthands (no variable-length value lists)
❌ **Unresolved**: Exact API shape for convenience layer
❌ **Unresolved**: Type definitions for multi-side IR

### Future Work

When implementing border:
1. Define convenience API pattern clearly
2. Implement 16 individual longhand parsers (simple)
3. Add convenience layer on top (4 APIs: width, style, color, radius)
4. Ensure fine-tuning path exists for per-side control
5. Document the pragmatic design choice

---

## 📚 Key Takeaways

### For Contributors

1. **Border is special** - don't treat it like other properties
2. **Defer until design is finalized** - skip in dual test expansion
3. **It's not a shorthand** - it's a convenience API for ergonomics
4. **Longhand foundation** - still operates on individual CSS properties

### For Agents

1. **Skip border module** in test expansion plans
2. **Don't create dual tests** for current border implementation
3. **Reference this doc** when questions arise about multi-side properties
4. **Wait for explicit instruction** before implementing border properly

### For Future Design

Questions to resolve:
- How does convenience API integrate with multi-declaration parser?
- Should IR represent "all sides" or individual sides?
- How do clients override individual sides after setting "all"?
- What's the story for CSS-in-JS integration?

---

## 🔗 Related Documents

- **AGENTS.md**: Shorthand scope clarification
- **BORDER_AUDIT.md**: Technical analysis of current implementation
- **DUAL_TEST_EXPANSION_PLAN.md**: Phase 4 should skip border
- **README.md**: b_value vs b_short scope boundaries

---

**Status**: Active design consideration, implementation deferred.
