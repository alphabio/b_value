# MASTER PLAN: Phase 0.5 - Module API Unification

**Created**: 2025-10-21T03:06:00
**Goal**: Add unified `parse()` to modules lacking it
**Baseline**: 2406 tests passing, zero TypeScript errors
**Target**: Add ~60-80 new tests, keep baseline green

---

## 🎯 The Mission

**Make module APIs consistent** - ALL modules should expose:

```typescript
Parse.Animation.parse(value) // Auto-detect & parse any animation value
Parse.Color.parse(value)     // ✅ Already exists
Parse.ClipPath.parse(value)  // ✅ Already exists
// etc...
```

**NOT implementing**: Universal API (that's Phase 1, later)

---

## ✅ What Works: The Gold Standard

### Color Module (12 formats, auto-detection)

```typescript
// src/parse/color/color.ts
export function parse(value: string): Result<Type.Color, string> {
  const ast = cssTree.parse(value, { context: "value" });
  const first = ast.children.first;
  return parseNode(first);
}

export function parseNode(node: CssNode): Result<Type.Color, string> {
  // Try hex
  if (node.type === "Hash") {
    return Hex.parse(`#${node.value}`);
  }

  // Try RGB/HSL/etc functions
  if (node.type === "Function") {
    const css = cssTree.generate(node);
    switch (node.name.toLowerCase()) {
      case "rgb": case "rgba": return Rgb.parse(css);
      case "hsl": case "hsla": return Hsl.parse(css);
      // ... 8 more formats
    }
  }

  // Try named/special
  if (node.type === "Identifier") {
    const named = Named.parse(value);
    if (named.ok) return named;

    const special = Special.parse(value);
    if (special.ok) return special;

    return System.parse(value);
  }

  return err("No color format matched");
}
```

**Key points**:
- ✅ Single `value: string` parameter (NO property name)
- ✅ Returns `Result<Type.Color, string>` (proper typing, no `any`)
- ✅ Try parsers in logical order
- ✅ First successful parse wins
- ✅ Uses AST for disambiguation

### ClipPath Module (10 shapes, auto-detection)

```typescript
// src/parse/clip-path/clip-path.ts
export function parse(value: string): Result<Type.ClipPath, string> {
  const ast = cssTree.parse(value, { context: "value" });
  const first = ast.children.first;
  return parseNode(first);
}

export function parseNode(node: CssNode): Result<Type.ClipPath, string> {
  if (node.type === "Function") {
    const css = cssTree.generate(node);
    switch (node.name.toLowerCase()) {
      case "circle": return Circle.parse(css);
      case "ellipse": return Ellipse.parse(css);
      case "polygon": return Polygon.parse(css);
      // ... 7 more shapes
    }
  }

  if (node.type === "Url") {
    return Url.parse(cssTree.generate(node));
  }

  if (node.type === "Identifier" && node.name === "none") {
    return None.parse("none");
  }

  return err("No clip-path format matched");
}
```

**Pattern**: Same as Color - AST-based dispatch, try all parsers

---

## 📊 Module Audit

### ✅ Already Have Unified parse() (4 modules)

1. **Color** - 12 formats, AST-based
2. **ClipPath** - 10 shapes, AST-based
3. **Filter** - 11 functions, AST-based
4. **Gradient** - 6 types, AST-based

### ✅ Have parse() but different purpose (2 modules)

5. **Position** - Single parser for `<position>` syntax
6. **Transform** - Single parser for `transform-list`

**Note**: These DON'T need changes - they handle a single value type

### ❌ Need Unified parse() (8 modules)

#### Simple Modules (try-all pattern, no AST needed)

7. **Animation** - 8 value types:
   - Time values (delay, duration)
   - Timing functions (ease, cubic-bezier, etc)
   - Identifiers (name)
   - Keywords (direction, fill-mode, play-state)
   - Numbers (iteration-count)

8. **Transition** - 4 value types:
   - Time values (delay, duration)
   - Timing functions
   - Identifiers (property)

9. **Outline** - 3 value types:
   - Colors (outline-color)
   - Keywords (outline-style: solid, dashed, etc)
   - Lengths (outline-width)

10. **Shadow** - 2 value types:
    - box-shadow syntax
    - text-shadow syntax

#### Delegating Modules (defer to existing parsers)

11. **Background** - 5 value types:
    - Colors → `Color.parse()`
    - Gradients → `Gradient.parse()`
    - Images (url, image-set)
    - Keywords (attachment, clip, origin, repeat, size)

12. **Border** - 4 value types:
    - Colors → `Color.parse()`
    - Lengths (width)
    - Keywords (style: solid, dashed, etc)
    - Border-radius values

13. **Text** - 7 value types:
    - Colors → `Color.parse()`
    - Lengths (letter-spacing, word-spacing, etc)
    - Keywords (align, transform, decoration, etc)

#### Complex Module (lots of keywords)

14. **Layout** - 17+ value types:
    - Lengths (width, height, top, left, etc)
    - Keywords (position, display, overflow, etc)
    - Numbers (z-index, opacity)
    - Auto values

---

## 🎯 Implementation Strategy

### Pattern A: Simple Try-All (Animation, Transition)

**Use when**: Module has multiple parsers, no ambiguity

```typescript
// src/parse/animation/animation.ts
import { cssTree } from "css-tree";
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Delay from "./delay";
import * as Duration from "./duration";
import * as TimingFunction from "./timing-function";
import * as Name from "./name";
// ... import all 8 sub-parsers

/**
 * Parse animation value with auto-detection.
 *
 * Tries each animation value type:
 * - Time (delay/duration)
 * - Timing function (ease, cubic-bezier, etc)
 * - Name (identifier)
 * - Direction (normal, reverse, etc)
 * - Fill mode (forwards, backwards, etc)
 * - Play state (running, paused)
 * - Iteration count (number or infinite)
 */
export function parse(value: string): Result<Type.Animation.Kinds, string> {
  // Try time values first (most common)
  const delay = Delay.parse(value);
  if (delay.ok) return delay;

  const duration = Duration.parse(value);
  if (duration.ok) return duration;

  // Try timing function
  const timing = TimingFunction.parse(value);
  if (timing.ok) return timing;

  // Try keywords
  const direction = Direction.parse(value);
  if (direction.ok) return direction;

  const fillMode = FillMode.parse(value);
  if (fillMode.ok) return fillMode;

  const playState = PlayState.parse(value);
  if (playState.ok) return playState;

  // Try iteration count
  const count = IterationCount.parse(value);
  if (count.ok) return count;

  // Try name last (most permissive)
  const name = Name.parse(value);
  if (name.ok) return name;

  return err("No animation value parser matched");
}
```

**Estimate**: 20 minutes per module

### Pattern B: Delegate to Existing (Background, Border, Text)

**Use when**: Module can reuse other module parsers

```typescript
// src/parse/background/background.ts
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Color from "../color/color";
import * as Gradient from "../gradient/gradient";
import * as Attachment from "./attachment";
import * as Clip from "./clip";
// ... etc

/**
 * Parse background value with auto-detection.
 *
 * Tries:
 * - Color (from Color module)
 * - Gradient (from Gradient module)
 * - Image (url, image-set)
 * - Keywords (attachment, clip, origin, repeat, size)
 */
export function parse(value: string): Result<Type.Background.Kinds, string> {
  // Try color first
  const color = Color.parse(value);
  if (color.ok) return color;

  // Try gradient
  const gradient = Gradient.parse(value);
  if (gradient.ok) return gradient;

  // Try keywords
  const attachment = Attachment.parse(value);
  if (attachment.ok) return attachment;

  const clip = Clip.parse(value);
  if (clip.ok) return clip;

  // ... try remaining background-specific parsers

  return err("No background value parser matched");
}
```

**Estimate**: 15 minutes per module

### Pattern C: Complex with AST (Layout - skip for now)

**Layout is special**: 17+ parsers, many overlapping patterns

**Decision**: SKIP Layout for Phase 0.5, handle separately later

---

## 📋 Implementation Phases

### Phase 1: Simple Modules (2-3 hours)

**Order** (simplest first):
1. **Shadow** (2 parsers) - 15 min
2. **Outline** (3 parsers) - 15 min
3. **Transition** (4 parsers) - 20 min
4. **Animation** (8 parsers) - 30 min

**Per module workflow**:

```bash
# 1. Create animation.ts with parse() function
# 2. Add tests in animation.test.ts
# 3. Export from index.ts
# 4. Run checks
just check
just test
# 5. Commit when green
git add -A
git commit -m "feat(animation): add unified parse() dispatcher"
```

### Phase 2: Delegating Modules (1-2 hours)

**Order**:
5. **Text** (7 parsers, delegates to Color) - 25 min
6. **Background** (5 parsers, delegates to Color + Gradient) - 25 min
7. **Border** (4 parsers, delegates to Color) - 25 min

**Same workflow**: Create → Test → Check → Commit

### Phase 3: Skip Complex (Layout handled later)

8. **Layout** - SKIP (too complex, needs separate session)

---

## ✅ Success Criteria

- [ ] 7 modules get new `parse()` function
- [ ] Each module: 5-12 new tests
- [ ] Total: ~60-80 new tests
- [ ] All tests pass: 2406 → 2470-2490
- [ ] Zero TypeScript errors
- [ ] Zero breaking changes
- [ ] Each module committed separately

---

## 🎓 Critical Rules

### Type System Rules

1. ✅ **Use proper Result<T, E> type**:

   ```typescript
   Result<Type.Animation.Kinds, string>  // ✅ Good
   Result<any, string>                   // ❌ Never use 'any'
   ParseResult                           // ❌ Doesn't exist
   ```

2. ✅ **Error returns are simple strings**:

   ```typescript
   return err("No animation value matched");  // ✅ Good
   return { ok: false, error: "...", issues: [...] };  // ❌ No 'issues' field
   ```

3. ✅ **Import Result from core**:

   ```typescript
   import { err, type Result } from "@/core/result";  // ✅ Good
   ```

### Architecture Rules

1. ✅ **Module API = value-only parameter**:

   ```typescript
   parse(value: string)  // ✅ Module API
   parse(property: string, value: string)  // ❌ That's Universal API
   ```

2. ✅ **Try-all approach, no property routing**:

   ```typescript
   // ✅ Module tries all its parsers
   const delay = Delay.parse(value);
   if (delay.ok) return delay;

   // ❌ Module shouldn't route by property name
   switch (property) {
     case 'animation-delay': return Delay.parse(value);
   }
   ```

3. ✅ **Use existing union types**:

   ```typescript
   // Check what exists in core/types.ts
   Type.Animation.Kinds  // Union of all animation IR types
   Type.Color            // Union of all color IR types
   ```

### Testing Rules

1. ✅ **Test each sub-parser value**:

   ```typescript
   test("parses delay", () => {
     const result = parse("100ms");
     expect(result.ok).toBe(true);
     if (result.ok) {
       expect(result.value.kind).toBe("animation-delay");
     }
   });
   ```

2. ✅ **Test error case**:

   ```typescript
   test("rejects invalid value", () => {
     const result = parse("not-valid");
     expect(result.ok).toBe(false);
   });
   ```

### Workflow Rules

1. ✅ **One module at a time**
2. ✅ **Run `just check` after each file**
3. ✅ **Run `just test` before commit**
4. ✅ **Commit when green, not before**
5. ✅ **Clear commit messages**: `feat(module): add unified parse() dispatcher`

---

## 🚀 Getting Started

**Start with Shadow** (simplest - only 2 parsers):

```bash
# Check what exists
ls -la src/parse/shadow/

# Create the unified parser
touch src/parse/shadow/shadow.ts
```

Then implement following the Pattern A example above.

---

## 📊 Estimated Timeline

- **Phase 1** (4 simple modules): 2-3 hours
- **Phase 2** (3 delegating modules): 1-2 hours
- **Total**: 3-5 hours (with testing and commits)

**Why slower than last session?**
- Testing after EACH module
- No type errors allowed
- Proper patterns, no shortcuts

**Why faster than estimated in previous plan?**
- Skip Layout (too complex)
- Skip property-name routing (wrong pattern)
- Follow proven Color/ClipPath pattern

---

## 🎯 What's Next (After Phase 0.5)

**Phase 1**: Universal API (top-level parse/generate)
**Phase 2**: Batch APIs (parseCSS/generateCSS)
**Phase 3**: Layout module unified API (separate session)

But first: **Nail these 7 modules with rock-solid implementation** 🎸

---

**Ready to start!** Begin with Shadow module (see "Getting Started" section).
