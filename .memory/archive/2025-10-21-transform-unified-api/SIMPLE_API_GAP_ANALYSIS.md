# Simple API Gap Analysis

**Date**: 2025-10-21T08:36  
**Goal**: Assess distance to unified `parse("any value")` API

---

## 🎯 Desired API

```typescript
import { parse, generate } from "b_value";

// Universal parser - detects type automatically
const result = parse("radial-gradient(red, blue)");
// OR
const result = parse("#ff0000");
// OR  
const result = parse("circle(50%)");

if (result.ok) {
  console.log(result.value); // Typed IR
} else {
  console.log(result.error); // Error message
}

// Universal generator
const css = generate(irValue); // Auto-detects IR type
```

---

## 📊 Current State

### Current API (Namespaced)

```typescript
import { Parse, Generate } from "b_value";

// Must specify module path
Parse.Gradient.Radial.parse("radial-gradient(red, blue)");
Parse.Color.Hex.parse("#ff0000");
Parse.ClipPath.Circle.parse("circle(50%)");

// With unified dispatcher (4 modules):
Parse.Gradient.parse("radial-gradient(red, blue)"); // ✅ Auto-detects
Parse.Color.parse("#ff0000");                       // ✅ Auto-detects
Parse.Filter.parse("blur(5px)");                    // ✅ Auto-detects
Parse.ClipPath.parse("circle(50%)");               // ✅ Auto-detects

// Still need module name
Parse.Animation.Delay.parse("1s");
Parse.Border.Width.parse("1px");
Parse.Transform.parse("translateX(10px) rotate(45deg)");
```

---

## 🔍 Gap Analysis

### What We Have ✅

**Module-level auto-detection** (4 modules):
- `Parse.ClipPath.parse()` - detects 10 shape types
- `Parse.Color.parse()` - detects 12 color formats
- `Parse.Filter.parse()` - detects 11 filter functions
- `Parse.Gradient.parse()` - detects 6 gradient variants

**Progress**: 4/13 modules with auto-detection (~31%)

### What We Need ❌

**Top-level auto-detection**:
```typescript
parse("any value") // Needs to determine:
                   // 1. Which module? (ClipPath, Color, Filter, etc.)
                   // 2. Which type within module?
```

**Challenges**:
1. **Ambiguity** - Same syntax, different meanings
   - `none` → clip-path keyword OR gradient keyword OR filter value
   - `url(...)` → clip-path OR filter OR background-image
   - `0` → number OR length OR opacity
   - `center` → position OR gradient position

2. **Context required** - CSS values need property context
   - `50%` means different things for:
     - `width: 50%` (percentage of parent)
     - `background-position: 50%` (center)
     - `filter: brightness(50%)` (50% brightness)

3. **Type disambiguation** - Need hints or heuristics
   - `circle(50%)` is clearly clip-path
   - But `50%` alone is ambiguous
   - `red` could be color, but in what context?

---

## 🎨 Possible Approaches

### Approach 1: Context Parameter (Recommended)

```typescript
// User provides property name as context
parse("radial-gradient(red, blue)", { property: "background-image" });
parse("#ff0000", { property: "color" });
parse("circle(50%)", { property: "clip-path" });

// Library maps property → parser module
```

**Pros**:
- ✅ Accurate - no ambiguity
- ✅ Matches real-world usage (values come with properties)
- ✅ Clean API
- ✅ Extensible

**Cons**:
- ❌ Requires property name
- ❌ Need property → parser mapping table

### Approach 2: Heuristic Detection (Risky)

```typescript
// Library guesses based on value syntax
parse("radial-gradient(red, blue)"); // Detects "gradient" from function name
parse("#ff0000");                     // Detects "color" from hex pattern
parse("circle(50%)");                 // Detects "clip-path" from function name
```

**Pros**:
- ✅ No context needed
- ✅ Simple user API

**Cons**:
- ❌ Ambiguity issues (url, none, keywords)
- ❌ False positives possible
- ❌ Fragile - breaks with new CSS features
- ❌ Can't handle `red`, `50%`, `0`, etc.

### Approach 3: Try-All Fallback (Slow)

```typescript
// Try every parser until one succeeds
parse("red"); // Tries Color, then Layout, then Animation, then...
```

**Pros**:
- ✅ No context needed
- ✅ Eventually finds correct parser

**Cons**:
- ❌ Slow - O(n) where n = # of parsers
- ❌ First match might not be correct match
- ❌ Confusing error messages when all fail

### Approach 4: Hybrid (Context + Heuristics)

```typescript
// Optional context, falls back to heuristics
parse("radial-gradient(red, blue)");                    // Heuristic: gradient
parse("red", { property: "color" });                     // Context: color
parse("50%", { property: "background-position" });       // Context: position
```

**Pros**:
- ✅ Flexible - works with or without context
- ✅ Fast for unambiguous values
- ✅ Accurate for ambiguous values with context

**Cons**:
- ❌ Complex implementation
- ❌ Potential for confusion (when does it use context vs heuristic?)

---

## 📏 Implementation Estimate

### Approach 1: Context Parameter (Recommended)

**Tasks**:
1. Create property → module mapping table
2. Implement top-level `parse(value, options)` function
3. Route to correct module based on property
4. Add TypeScript overloads for type inference
5. Comprehensive tests
6. Documentation

**Estimate**: 1-2 days

**Files to create**:
- `src/parse.ts` - Top-level parse function
- `src/parse.test.ts` - Tests
- `src/property-mapping.ts` - Property → parser map

**Example implementation**:
```typescript
// src/parse.ts
export function parse(
  value: string,
  options: { property: string }
): Result<AnyValue, string> {
  const module = PROPERTY_MAP[options.property];
  
  switch (module) {
    case "color":
      return Parse.Color.parse(value);
    case "gradient":
      return Parse.Gradient.parse(value);
    case "clip-path":
      return Parse.ClipPath.parse(value);
    // ... more cases
  }
}
```

---

## 🚧 Prerequisites

### Must Have First

1. ✅ **Module-level auto-detection** (4/13 done)
   - Need 9 more modules unified (if applicable)
   - OR skip simple modules, only unify complex ones

2. ❌ **Property → Module mapping**
   - Complete list of CSS properties
   - Map each to parser module
   - Handle aliases (e.g., background-color → Color)

3. ❌ **Union type for all values**
   - `type AnyValue = ClipPathValue | Color | FilterFunction | ...`
   - Needed for return type

### Nice to Have

1. ⚪ **Generator auto-detection**
   - `generate(irValue)` detects IR type via discriminant
   - Much easier - IR has `kind` field!

2. ⚪ **TypeScript magic**
   - Overloads for property-based type inference
   - `parse(value, {property: "color"})` returns `Result<Color, string>`

---

## 📊 Current vs Desired

### Current API Depth

```
Parse.Module.Type.parse()
└─ 3 levels deep
```

**Examples**:
- `Parse.Gradient.Radial.parse()`
- `Parse.Color.Hex.parse()`
- `Parse.Filter.Blur.parse()`

**With unified dispatchers** (4 modules):
```
Parse.Module.parse()
└─ 2 levels deep
```

**Examples**:
- `Parse.Gradient.parse()` ✅
- `Parse.Color.parse()` ✅
- `Parse.Filter.parse()` ✅
- `Parse.ClipPath.parse()` ✅

### Desired API Depth

```
parse(value, {property})
└─ 1 level (top-level function)
```

**Gap**: Need to go from 2 levels → 1 level

---

## 🎯 Recommendation

### Path Forward: Phased Approach

**Phase 1** (Current): ✅ DONE
- Module-level auto-detection for complex modules
- 4 modules complete (ClipPath, Color, Filter, Gradient)

**Phase 2**: Property mapping
- Create comprehensive property → parser mapping
- Estimated: 4-6 hours
- Deliverable: `PROPERTY_MAP` table

**Phase 3**: Top-level parser
- Implement `parse(value, {property})` function
- Use property mapping for routing
- Estimated: 1-2 days
- Deliverable: Unified parse API

**Phase 4** (Optional): Heuristic fallback
- Add heuristic detection for unambiguous values
- Estimated: 2-3 days
- Deliverable: Context-optional API

**Phase 5** (Optional): Generator unification
- Implement `generate(irValue)` auto-detection
- Much easier - uses discriminated unions
- Estimated: 4-6 hours
- Deliverable: Unified generate API

---

## 📈 Distance Assessment

### How far are we?

**From where we are now**: ~2-3 days of focused work

**Breakdown**:
- Property mapping: 4-6 hours
- Top-level parser: 8-12 hours
- Tests & docs: 4-6 hours
- **Total**: ~16-24 hours (2-3 days)

**What makes it feasible**:
- ✅ 4 major modules already have auto-detection
- ✅ Pattern is established and proven
- ✅ Remaining modules are simpler (direct mapping)
- ✅ Context-based approach avoids heuristic complexity

**What makes it challenging**:
- ❌ Need comprehensive property mapping (150+ CSS properties)
- ❌ Edge cases and property aliases
- ❌ TypeScript type inference complexity
- ❌ Maintaining backward compatibility

---

## 💡 Quick Win Alternative

### Minimal API (1 day)

```typescript
// Don't try to parse everything, just unified modules
import { parseValue } from "b_value";

// Only works for modules with unified dispatchers
parseValue("radial-gradient(red, blue)", { type: "gradient" });
parseValue("#ff0000", { type: "color" });
parseValue("blur(5px)", { type: "filter" });
parseValue("circle(50%)", { type: "clip-path" });
```

**Pros**:
- ✅ Very quick to implement (4-6 hours)
- ✅ Leverages existing unified dispatchers
- ✅ Clean API for 80% of complex use cases
- ✅ No ambiguity

**Cons**:
- ❌ Still need to specify type (not fully universal)
- ❌ Doesn't cover simple properties
- ❌ Not quite the `parse("any value")` dream

---

## 🏁 Final Answer

### How far away?

**Shortest path** (minimal API): **4-6 hours**
- Route to 4 unified modules by type hint
- Clean API for complex values
- Quick win

**Full solution** (universal parser): **2-3 days**
- Property-based routing
- Comprehensive mapping
- Handles all CSS properties
- True `parse(value, {property})` API

**Your call**: Quick win or full solution? 🚀

---

**Status**: Gap analysis complete  
**Recommendation**: Start with property mapping table (4-6 hours)  
**Next**: Decide on scope (minimal vs full)
