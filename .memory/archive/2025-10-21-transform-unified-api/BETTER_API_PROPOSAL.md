# Better API Proposal: CSS Declaration Parsing

**Date**: 2025-10-21T08:41  
**Insight**: Parse CSS declarations, not just values!

---

## 🎯 The Better API

### Old Thinking ❌
```typescript
parse("radial-gradient(red, blue)", {property: "background-image"})
// Awkward - need to repeat property name
```

### New Thinking ✅
```typescript
parse("clip-path: circle(50%)")
parse("color: #ff0000")
parse("background-image: radial-gradient(red, blue)")
parse("filter: blur(5px)")
```

**Why better?**
- ✅ **Natural CSS syntax** - copy/paste from stylesheets!
- ✅ **No duplication** - property is IN the string
- ✅ **Self-documenting** - clear what's being parsed
- ✅ **Flexible** - works with or without property name
- ✅ **Real-world** - matches actual CSS usage

---

## 🔧 Implementation

### Parsing Strategy

```typescript
export function parse(input: string): Result<ParsedDeclaration, string> {
  // Check if it contains a colon (CSS declaration)
  if (input.includes(':')) {
    const [property, value] = input.split(':').map(s => s.trim());
    
    // Map property to module
    const module = PROPERTY_MAP[property];
    
    return {
      property,
      value: routeToModule(module, value)
    };
  }
  
  // Fallback: try heuristic detection (best effort)
  return tryHeuristicParse(input);
}
```

### Examples

```typescript
// Full declaration
parse("clip-path: circle(50%)")
// → { property: "clip-path", value: { kind: "circle", ... } }

parse("color: #ff0000")
// → { property: "color", value: { kind: "hex", r: 255, g: 0, b: 0 } }

parse("background-image: linear-gradient(red, blue)")
// → { property: "background-image", value: { kind: "linear", ... } }

// Value only (fallback to heuristics)
parse("circle(50%)")
// → { value: { kind: "circle", ... } } // Best effort guess

parse("#ff0000")
// → { value: { kind: "hex", ... } }
```

---

## 🎨 API Design Options

### Option 1: Single Function (Recommended)

```typescript
parse("clip-path: circle(50%)")
// OR
parse("circle(50%)")  // Best-effort heuristic
```

**Pros**: Simple, intuitive  
**Cons**: Return type varies (with/without property)

### Option 2: Separate Functions

```typescript
parseDeclaration("clip-path: circle(50%)")  // Returns {property, value}
parseValue("circle(50%)")                    // Returns {value}
```

**Pros**: Clear intent, consistent return types  
**Cons**: Two functions to remember

### Option 3: Overloads

```typescript
parse("clip-path: circle(50%)")  // Returns ParsedDeclaration
parse("circle(50%)", {guess: true})  // Returns ParsedValue
```

**Pros**: Type-safe, flexible  
**Cons**: More complex TypeScript

---

## 💡 Key Insights

### Why This is Better

1. **Matches CSS-in-JS usage**:
```typescript
// CSS-in-JS libraries often work with declarations
const styles = {
  clipPath: "circle(50%)",     // Property + value
  color: "#ff0000"
};

// Now you can parse easily:
parse(`clip-path: ${styles.clipPath}`)
```

2. **Works with extracted CSS**:
```typescript
// Copy from DevTools or stylesheets
const declaration = "background-image: radial-gradient(circle, red, blue)";
parse(declaration);  // Just works!
```

3. **Enables CSS validation**:
```typescript
// Validate entire declarations
const result = parse("clip-path: invalid-value");
if (!result.ok) {
  console.error(`Invalid ${result.property}: ${result.error}`);
}
```

4. **Integrates with b_short**:
```typescript
// Pipeline: shorthand → longhand → parse
import { expand } from "b_short";
import { parse } from "b_value";

// Expand shorthand
const { result } = expand("margin: 10px 20px;");
// → "margin-top: 10px; margin-right: 20px; ..."

// Parse each longhand declaration
result.split(';').forEach(decl => {
  const parsed = parse(decl);  // "margin-top: 10px"
  console.log(parsed);
});
```

---

## 📏 Implementation Estimate

### Phase 1: Declaration Parser (8-12 hours)

**Tasks**:
1. Parse declaration syntax (property: value)
2. Property → module mapping table
3. Route to appropriate module parser
4. Handle malformed input
5. Tests for declaration parsing

**Files**:
- `src/parse.ts` - Main parse function
- `src/property-map.ts` - Property mapping
- `src/parse.test.ts` - Declaration tests

### Phase 2: Heuristic Fallback (4-6 hours)

**Tasks**:
1. Detect common patterns (hex, functions, keywords)
2. Try parsers in order of likelihood
3. Return best match or error
4. Tests for heuristic detection

**Files**:
- `src/heuristic-parser.ts` - Pattern detection
- `src/heuristic-parser.test.ts` - Tests

### Total: 12-18 hours (1.5-2 days)

---

## 🎯 Return Type Design

### Option A: Discriminated Union

```typescript
type ParseResult<T> = 
  | { ok: true; property: string; value: T }
  | { ok: true; value: T }  // No property (heuristic)
  | { ok: false; error: string; property?: string };

// Usage
const result = parse("clip-path: circle(50%)");
if (result.ok) {
  if ('property' in result) {
    console.log(`${result.property}: ${result.value}`);
  } else {
    console.log(`Guessed: ${result.value}`);
  }
}
```

### Option B: Consistent Shape

```typescript
type ParseResult<T> = Result<{
  property?: string;  // Present if parsed from declaration
  value: T;
  source: 'declaration' | 'heuristic';
}, string>;

// Usage
const result = parse("clip-path: circle(50%)");
if (result.ok) {
  console.log(`Source: ${result.value.source}`);
  if (result.value.property) {
    console.log(`Property: ${result.value.property}`);
  }
}
```

---

## 🚀 Benefits Over Original Idea

### Original: `parse(value, {property})`
- ❌ Duplicate property name
- ❌ Not CSS syntax
- ❌ Extra typing
- ❌ Feels awkward

### New: `parse("property: value")`
- ✅ Natural CSS syntax
- ✅ Property embedded
- ✅ Copy/paste friendly
- ✅ Intuitive

### Example Comparison

**Original**:
```typescript
// User types property twice
const prop = "background-image";
const value = "linear-gradient(red, blue)";
parse(value, {property: prop});  // Redundant!
```

**New**:
```typescript
// User types property once
parse("background-image: linear-gradient(red, blue)");  // Natural!

// Or even better - copy from CSS:
const css = `
  clip-path: circle(50%);
  color: #ff0000;
`;
css.split(';').forEach(decl => parse(decl.trim()));
```

---

## 🎓 Additional Benefits

### 1. CSS Snippet Parsing

```typescript
// Parse CSS from any source
const devToolsCopy = "background-image: radial-gradient(red, blue)";
parse(devToolsCopy);  // Just works!
```

### 2. Validation Tools

```typescript
function validateCSS(css: string) {
  const declarations = css.split(';');
  return declarations.map(decl => {
    const result = parse(decl);
    return {
      declaration: decl,
      valid: result.ok,
      error: result.ok ? null : result.error
    };
  });
}
```

### 3. Type Inference

```typescript
// TypeScript can infer types from property names
const result = parse("color: #ff0000");
if (result.ok && result.property === "color") {
  // TypeScript knows result.value is Color type
  result.value.kind; // "hex" | "rgb" | "hsl" | ...
}
```

### 4. IDE Integration

```typescript
// Autocomplete from CSS strings
parse("clip-path: |")  // IDE suggests clip-path values
parse("color: |")      // IDE suggests color formats
```

---

## 🏁 Recommendation

### Implement This New API!

**Phase 1** (1 day): Declaration parser with property mapping  
**Phase 2** (0.5 day): Heuristic fallback for value-only

**Total**: 1.5-2 days

**Why this wins**:
- Natural CSS syntax
- Easier to use
- Better DX (developer experience)
- Enables more use cases
- Cleaner implementation

---

## 🎯 Next Steps

1. ✅ Validate approach with user (you!)
2. Create property → module mapping table
3. Implement declaration parser
4. Add heuristic fallback
5. Comprehensive tests
6. Update documentation

---

**Status**: ✅ Better API identified!  
**Improvement**: Natural CSS syntax vs artificial parameter  
**Recommendation**: Build this instead! 🚀
