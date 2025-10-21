# START HERE: Universal Parse & Generate API

**Created**: 2025-10-21T02:12  
**Status**: 📋 Planning Complete - Ready for Implementation  
**Estimate**: 16-20 hours (~2 days)

---

## 🎯 Project Goal

Build a **natural CSS declaration API** that makes parse/generate intuitive and seamless.

### The Big Idea

**Instead of this** (current):
```typescript
// User must know which module handles which property
Parse.Color.parse("#ff0000")
Parse.Gradient.parse("radial-gradient(red, blue)")
Generate.Color.Hex.toCss(colorIR)
```

**Users get this** (new):
```typescript
// Natural CSS syntax - just parse the declaration!
parse("color: #ff0000")
parse("background-image: radial-gradient(red, blue)")
generate(ir, {property: "color"})  // Auto-detects format
```

**Why it's better**:
- ✅ Copy-paste CSS directly from stylesheets/DevTools
- ✅ No memorizing 13+ module names
- ✅ Property name tells you what it is
- ✅ Perfect round-trips: parse → modify → generate → parse
- ✅ Seamless b_short integration pipeline

---

## 📋 Complete Specification

### Parse API

```typescript
/**
 * Parse CSS longhand declaration
 * Returns: {ok, value?, property?, issues}
 */
parse("color: #ff0000")
// → { ok: true, property: "color", value: { kind: "hex", ... }, issues: [] }

parse("margin: 10px")  // Shorthand = error!
// → { ok: false, property: "margin", issues: [{ 
//     severity: "error",
//     message: "Shorthand property not supported",
//     suggestion: "Use longhand: margin-top, margin-right, ...",
//     action: 'import { expand } from "b_short"; ...'
//   }]}

/**
 * Parse multiple declarations
 */
parseAll("color: red; clip-path: circle(50%); filter: blur(5px)")
// → [{ ok: true, ... }, { ok: true, ... }, { ok: true, ... }]
```

### Generate API

```typescript
/**
 * Generate CSS from IR (auto-detects format from IR.kind)
 */
generate({ kind: "hex", value: "#FF0000" })
// → "#FF0000"

generate({ kind: "hex", value: "#FF0000" }, { property: "color" })
// → "color: #FF0000"

/**
 * Generate multiple declarations
 */
generateAll([
  { property: "color", value: colorIR },
  { property: "clip-path", value: clipPathIR }
])
// → "color: #ff0000; clip-path: circle(50%)"
```

### Round-Trip Workflow

```typescript
// 1. Parse declaration
const parsed = parse("color: #ff0000");
if (!parsed.ok) throw new Error(parsed.issues[0].message);

// 2. Modify IR (change red → green)
const modified = { ...parsed.value, value: "#00FF00" };

// 3. Generate back to CSS
const css = generate(modified, { property: parsed.property });
// → "color: #00FF00"

// 4. Verify round-trip
const reparsed = parse(css);
expect(reparsed.value).toEqual(modified);  // ✅ Perfect!
```

---

## 🏗️ Type System

```typescript
/**
 * Parse result - always has these fields
 */
type ParseResult = {
  ok: boolean           // Success/failure flag
  value?: CSSValue      // IR object (present when ok=true)
  property?: string     // Property name from declaration
  issues: Issue[]       // Always present, may be empty
}

/**
 * Issues can be errors, warnings, or helpful info
 */
type Issue = {
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string   // "Did you mean 'color'?"
  action?: string       // "Use b_short.expand() first"
}

/**
 * Generate options
 */
type GenerateOptions = {
  property?: string     // If provided, outputs full declaration
  minify?: boolean      // Compact output (future)
  format?: 'modern' | 'legacy'  // CSS syntax version (future)
}

/**
 * CSSValue = union of all IR types
 */
type CSSValue = 
  | HexColor | RGBColor | HSLColor | /* ...all color types */
  | RadialGradient | LinearGradient | ConicGradient
  | ClipPathCircle | ClipPathPolygon | /* ...all clip-path types */
  | FilterBlur | FilterContrast | /* ...all filter types */
  | /* ...all other value types */
```

---

## 🎯 Key Design Decisions

### ✅ What We're Doing

1. **Declaration-based parsing** - `parse("property: value")`
   - Natural CSS syntax
   - Copy-paste friendly
   - Self-documenting

2. **Reject shorthands explicitly**
   - `parse("margin: 10px")` → helpful error
   - Points user to b_short library
   - Shows longhand equivalents
   - Provides code example

3. **Simplified ParseResult**
   - Single `ok` flag to check
   - `issues` array (can hold multiple messages)
   - `property` preserved for context

4. **Auto-detect generation**
   - IR `kind` field → generator function
   - No need to know module names
   - Clean, simple API

5. **Perfect round-trips**
   - Parse → modify → generate → parse
   - Values remain identical
   - Tested for all types

### ❌ What We're NOT Doing

1. **No heuristic value parsing**
   - `parse("#ff0000")` → ERROR (no colon)
   - Too ambiguous (which property?)
   - User must be explicit
   - Better error messages

2. **No shorthand expansion**
   - That's b_short's job
   - Clear separation of concerns
   - Deterministic behavior

---

## 📋 Implementation Phases

### Phase 1: Property Mapping (3-4h) ⬅️ START HERE

**Files to create**:
- `src/property-map.ts` - Property → parser module map
- `src/shorthand-properties.ts` - Shorthand detection
- `src/ir-to-generator.ts` - IR kind → generator function

**Tasks**:
1. Map ~100+ CSS properties → parser modules
   ```typescript
   'color': Parse.Color,
   'background-color': Parse.Color,
   'clip-path': Parse.ClipPath,
   'filter': Parse.Filter,
   // ... etc
   ```

2. Identify all shorthand properties
   ```typescript
   SHORTHAND_PROPERTIES = new Set([
     'margin', 'padding', 'border', 'background',
     'font', 'animation', 'transition', ...
   ])
   ```

3. Map shorthand → longhand (for helpful errors)
   ```typescript
   'margin' → ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']
   'background' → ['background-color', 'background-image', ...]
   ```

4. Map IR kind → generator function
   ```typescript
   'hex' → Generate.Color.Hex.toCss
   'radial' → Generate.Gradient.Radial.toCss
   'clip-path-circle' → Generate.ClipPath.Circle.toCss
   ```

5. Tests for all mappings

---

### Phase 2: Parse API (6-7h)

**Files to create**:
- `src/parse.ts` - Main parse() function
- `src/parse.test.ts` - Comprehensive tests

**Tasks**:
1. Declaration parsing (split on colon)
2. Route to appropriate parser module
3. Shorthand rejection with helpful errors
4. Unknown property detection with "did you mean"
5. Format validation
6. Implement `parseAll()` batch parser
7. 50+ tests covering all cases

**Test coverage**:
- Valid declarations (all property types)
- Missing colon
- Empty property/value
- Shorthand properties
- Unknown properties
- Typos (suggestions)
- Invalid values
- Batch parsing

---

### Phase 3: Generate API (4-5h)

**Files to create**:
- `src/generate.ts` - Main generate() function
- `src/generate.test.ts` - Comprehensive tests

**Tasks**:
1. Auto-detect IR kind
2. Route to appropriate generator
3. Support value-only generation
4. Support full declaration generation
5. Implement `generateAll()` batch generator
6. 30+ tests

**Test coverage**:
- Value generation (all IR types)
- Declaration generation
- Batch generation
- Minified output
- Unknown IR kinds
- Type guards

---

### Phase 4: Round-Trip Tests (1-2h)

**Files to create**:
- `test/round-trip/parse-generate.test.ts`

**Tasks**:
1. Test parse → generate → parse (20+ cases)
2. Test parse → modify → generate → parse
3. Verify identical results
4. Cover all property types

---

### Phase 5: Documentation (2h)

**Files to update**:
- `README.md` - Update with new API
- `docs/api/parse.md` - Parse API reference
- `docs/api/generate.md` - Generate API reference
- `docs/guides/migration.md` - Migration guide
- `docs/guides/b_short.md` - Integration examples

---

## 🎯 Success Criteria

- [ ] All existing tests pass (2390 tests)
- [ ] Parse API tests pass (50+ new tests)
- [ ] Generate API tests pass (30+ new tests)
- [ ] Round-trip tests pass (20+ test cases)
- [ ] `just check && just test` passes
- [ ] Zero breaking changes to existing module API
- [ ] Both APIs coexist (module API still works)
- [ ] Documentation complete

---

## 🚀 Getting Started

**Next agent should**:
1. Read this document
2. Read `MASTER_PLAN.md` for full details
3. Start with Phase 1: Property Mapping
4. Run `just check && just test` before starting
5. Create files incrementally with tests

**Master Plan**: `MASTER_PLAN.md` (full implementation details)

---

## 💡 Integration with b_short

```typescript
// Complete pipeline: shorthand → longhand → parse
import { expand } from "b_short";
import { parse } from "b_value";

// 1. Expand shorthand
const expanded = expand("margin: 10px 20px;");
// → "margin-top: 10px; margin-right: 20px; ..."

// 2. Parse each longhand declaration
const results = parseAll(expanded.result);

// 3. Modify values
const modified = results.map(r => {
  if (r.ok && r.property === "margin-top") {
    return { ...r.value, value: 30, unit: "px" };
  }
  return r.value;
});

// 4. Generate back to CSS
const css = generateAll(modified.map((value, i) => ({
  property: results[i].property!,
  value
})));
```

---

**Ready to implement!** 🎯
