# Session 1: Implement background-image List Support

**Duration**: 45 minutes  
**Goal**: Fix background-image to support comma-separated gradients/URLs  
**Priority**: P0 - Critical (User's immediate need)

---

## Prerequisites

- [x] Session 0 complete (baseline clean)
- [ ] TypeScript: 0 errors
- [ ] Tests: All passing
- [ ] Utility: `parseCommaSeparatedSingle` verified

---

## Overview

**Current**:
```typescript
parse("background-image: linear-gradient(red, blue)")
// Returns: ParseResult<Gradient> ✅ Single gradient works

parse("background-image: grad1, grad2, grad3")
// Returns: ParseResult<Gradient> ❌ Only parses grad1, ignores rest
```

**Target**:
```typescript
parse("background-image: linear-gradient(red, blue)")
// Returns: ParseResult<Gradient[]> ✅ Array with 1 element

parse("background-image: grad1, grad2, grad3")
// Returns: ParseResult<Gradient[]> ✅ Array with 3 elements
```

---

## Implementation Plan

### Step 1.1: Create Type Definitions (5 min)

**File**: `src/parse/background/image.ts` (create new)

```typescript
// b_path:: src/parse/background/image.ts

import { err, ok, type Result } from "@/core/result";
import { parseErr, toParseResult, type ParseResult } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";
import * as GradientParse from "@/parse/gradient/gradient";

/**
 * Background image layer - can be gradient, URL, or none.
 */
export type BackgroundImageLayer = 
  | { kind: "none" }
  | { kind: "url"; url: string }
  | Type.Gradient;

/**
 * Background image value - array of layers.
 */
export type BackgroundImage = BackgroundImageLayer[];
```

**Validation**:
```bash
pnpm run typecheck src/parse/background/image.ts
# Should compile cleanly
```

---

### Step 1.2: Implement Single Layer Parser (10 min)

Add to `src/parse/background/image.ts`:

```typescript
/**
 * Parse a single background-image layer.
 * 
 * @param value - Single layer value (no commas)
 * @returns Result with layer or error
 * 
 * @internal
 */
function parseSingleLayer(value: string): Result<BackgroundImageLayer, string> {
  const trimmed = value.trim();
  
  // Check for 'none' keyword
  if (trimmed === "none") {
    return ok({ kind: "none" });
  }
  
  // Check for url() function
  if (trimmed.startsWith("url(")) {
    return parseURL(trimmed);
  }
  
  // Must be a gradient
  const gradientResult = GradientParse.parse(trimmed);
  if (!gradientResult.ok) {
    return err(gradientResult.issues[0]?.message || "Invalid gradient syntax");
  }
  
  return ok(gradientResult.value);
}

/**
 * Parse url() function.
 * 
 * @param value - url(...) string
 * @returns Result with URL layer or error
 * 
 * @internal
 */
function parseURL(value: string): Result<BackgroundImageLayer, string> {
  // Match: url("...") or url('...') or url(...)
  const match = value.match(/^url\(\s*(['"]?)([^'"()]+)\1\s*\)$/);
  
  if (!match) {
    return err("Invalid url() syntax");
  }
  
  return ok({
    kind: "url",
    url: match[2],
  });
}
```

**Validation**:
- Single layer parsing logic
- Handles: none, url(...), gradients
- Returns proper error messages

---

### Step 1.3: Implement List Parser (5 min)

Add public parse function to `src/parse/background/image.ts`:

```typescript
/**
 * Parse background-image value.
 * 
 * Supports comma-separated list of:
 * - Gradients: linear-gradient(), radial-gradient(), conic-gradient()
 * - URLs: url(...)
 * - Keyword: none
 * 
 * @param value - CSS background-image value
 * @returns ParseResult with array of layers
 * 
 * @example
 * ```typescript
 * parse("linear-gradient(red, blue)");
 * // Returns: [{ kind: "linear", ... }]
 * 
 * parse("url(bg.png), linear-gradient(red, blue)");
 * // Returns: [{ kind: "url", url: "bg.png" }, { kind: "linear", ... }]
 * 
 * parse("none");
 * // Returns: [{ kind: "none" }]
 * ```
 * 
 * @public
 */
export function parse(value: string): ParseResult<BackgroundImage> {
  const result = parseCommaSeparatedSingle(
    value,
    parseSingleLayer,
    "background-image"
  );
  
  return toParseResult(result);
}
```

**Validation**:
- Uses existing `parseCommaSeparatedSingle` utility
- Returns `ParseResult<BackgroundImage>` (array type)
- Delegates to single layer parser

---

### Step 1.4: Add Export to Index (2 min)

**File**: `src/parse/background/index.ts`

Check current exports:
```bash
cat src/parse/background/index.ts
```

Add image export:
```typescript
export * as Image from "./image";
```

Or if no index exists, create it:
```typescript
// b_path:: src/parse/background/index.ts

export * as Attachment from "./attachment";
export * as Clip from "./clip";
export * as Image from "./image";  // NEW
export * as Origin from "./origin";
export * as Repeat from "./repeat";
export * as Size from "./size";
```

---

### Step 1.5: Update Universal Registration (5 min)

**File**: `src/universal.ts`

1. **Add import** (around line 38):
```typescript
import * as BackgroundImage from "./parse/background/image";
```

2. **Update PROPERTY_PARSERS** (around line 141):
```typescript
// OLD
"background-image": GradientParse.parse, // ❌ Single gradient only

// NEW
"background-image": BackgroundImage.parse, // ✅ Array of gradients/URLs
```

**Validation**:
```bash
pnpm run typecheck
# Should compile cleanly
```

---

### Step 1.6: Create Tests (15 min)

**File**: `src/parse/background/image.test.ts` (create new)

```typescript
// b_path:: src/parse/background/image.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "./image";

describe("background-image", () => {
  describe("single values", () => {
    it("parses single linear gradient", () => {
      const result = parse("linear-gradient(red, blue)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].kind).toBe("linear");
      }
    });

    it("parses single radial gradient", () => {
      const result = parse("radial-gradient(circle, red, blue)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].kind).toBe("radial");
      }
    });

    it("parses single conic gradient", () => {
      const result = parse("conic-gradient(red, blue)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0].kind).toBe("conic");
      }
    });

    it("parses url()", () => {
      const result = parse("url(image.png)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0]).toEqual({ kind: "url", url: "image.png" });
      }
    });

    it("parses url() with quotes", () => {
      const result = parse('url("image.png")');
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value[0]).toEqual({ kind: "url", url: "image.png" });
      }
    });

    it("parses none", () => {
      const result = parse("none");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(1);
        expect(result.value[0]).toEqual({ kind: "none" });
      }
    });
  });

  describe("multiple values", () => {
    it("parses two gradients", () => {
      const result = parse("linear-gradient(red, blue), radial-gradient(green, yellow)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0].kind).toBe("linear");
        expect(result.value[1].kind).toBe("radial");
      }
    });

    it("parses three gradients", () => {
      const result = parse(`
        linear-gradient(red, blue),
        radial-gradient(green, yellow),
        conic-gradient(red, blue)
      `);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(3);
      }
    });

    it("parses mixed layers (url + gradient)", () => {
      const result = parse("url(bg.png), linear-gradient(red, blue)");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0].kind).toBe("url");
        expect(result.value[1].kind).toBe("linear");
      }
    });

    it("parses mixed layers (gradient + none)", () => {
      const result = parse("linear-gradient(red, blue), none");
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0].kind).toBe("linear");
        expect(result.value[1].kind).toBe("none");
      }
    });
  });

  describe("complex gradients (user's example)", () => {
    it("parses 7-layer gradient stack", () => {
      const css = `
        radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%),
        radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.3) 13%, rgba(255,255,255,0) 14%),
        radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%, rgba(255,255,255,.43) 19%, rgba(255,255,255,0) 20%),
        radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%),
        radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%),
        radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.2) 13%, rgba(255,255,255,0) 14%),
        linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%)
      `;
      const result = parse(css);
      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.value).toHaveLength(7);
        expect(result.value[0].kind).toBe("radial");
        expect(result.value[6].kind).toBe("linear");
      }
    });
  });

  describe("error handling", () => {
    it("returns error for invalid gradient", () => {
      const result = parse("invalid-gradient(red, blue)");
      expect(result.ok).toBe(false);
    });

    it("returns error for malformed url", () => {
      const result = parse("url(");
      expect(result.ok).toBe(false);
    });

    it("handles partial failures in list", () => {
      const result = parse("linear-gradient(red, blue), invalid");
      // First gradient parses, second fails
      expect(result.ok).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
    });
  });
});
```

**Run tests**:
```bash
pnpm test src/parse/background/image.test.ts
```

**Expected**: All tests passing (20+ tests)

---

### Step 1.7: Test with User's Example (5 min)

Create integration test file:

```bash
cat > /tmp/test-user-example.ts << 'EOF'
import { parse, parseAll } from "./src/index";

// Test 1: Direct background-image parse
console.log("=== TEST 1: Parse background-image directly ===");
const imageResult = parse(`background-image: 
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%),
  radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%),
  linear-gradient(45deg, #343702 0%, #184500 20%)
`);

if (imageResult.ok) {
  console.log(`✅ Parsed ${imageResult.value.length} gradient layers`);
  console.log(`   First: ${imageResult.value[0].kind}`);
  console.log(`   Last: ${imageResult.value[imageResult.value.length - 1].kind}`);
} else {
  console.log(`❌ Failed: ${imageResult.issues[0]?.message}`);
}

// Test 2: Full expanded CSS (simulating b_short output)
console.log("\n=== TEST 2: Parse full expanded CSS ===");
const fullCSS = `
  background-image: radial-gradient(red, blue), linear-gradient(green, yellow);
  background-position: 0 0, center;
  background-size: 100px 100px, cover;
  background-color: #840b2a;
`;

const allResult = parseAll(fullCSS);
if (allResult.ok) {
  console.log("✅ Parsed all properties:");
  console.log(`   background-image: ${Array.isArray(allResult.value['background-image']) ? 'Array' : 'Single'}`);
  console.log(`   background-position: ${Array.isArray(allResult.value['background-position']) ? 'Array' : 'Single'}`);
  console.log(`   background-size: ${Array.isArray(allResult.value['background-size']) ? 'Array' : 'Single'}`);
} else {
  console.log("❌ Failed to parse");
}
EOF

pnpm tsx /tmp/test-user-example.ts
```

**Expected output**:
```
=== TEST 1: Parse background-image directly ===
✅ Parsed 3 gradient layers
   First: radial
   Last: linear

=== TEST 2: Parse full expanded CSS ===
✅ Parsed all properties:
   background-image: Array
   background-position: Array (or Single - not fixed yet)
   background-size: Array (or Single - not fixed yet)
```

---

## Verification Checklist

- [ ] `src/parse/background/image.ts` created
- [ ] Type definitions added
- [ ] Single layer parser implemented
- [ ] List parser using `parseCommaSeparatedSingle`
- [ ] Export added to background/index.ts
- [ ] Universal registration updated
- [ ] Tests created and passing (20+ tests)
- [ ] User's example works
- [ ] TypeScript clean
- [ ] No lint warnings

---

## Success Criteria

### Must Have
- [x] `background-image` accepts comma-separated gradients
- [ ] User's 7-layer example parses correctly
- [ ] Returns `ParseResult<BackgroundImage>` (array type)
- [ ] All tests passing
- [ ] TypeScript clean

### Should Have
- [ ] Handles url(), gradients, and none
- [ ] Error messages helpful
- [ ] Performance acceptable

---

## Commit Message

```bash
git add src/parse/background/image.ts
git add src/parse/background/image.test.ts
git add src/parse/background/index.ts
git add src/universal.ts

git commit -m "feat(background): add comma-separated list support for background-image

- Create dedicated background-image parser using parseCommaSeparatedSingle
- Support gradients, url(), and none keyword
- Handle 7+ layer stacks (user's use case)
- Add 20+ tests for single/multi-value scenarios
- Update universal.ts registration

Fixes layered background parsing - was only parsing first gradient.
Now correctly returns array of all background layers.

Related: Session 1 of comma-separated layers implementation"
```

---

## Troubleshooting

### If tests fail on complex gradients

Check for AST parsing issues with nested commas:
```typescript
// Debug: Log what parseCommaSeparatedSingle sees
console.log("Segments:", segments);
```

The utility should handle `rgba(255,0,0,0.5)` correctly (not split on internal commas).

### If TypeScript errors on Gradient type

Ensure proper import:
```typescript
import type * as Type from "@/core/types";
```

And use `Type.Gradient` not just `Gradient`.

### If url() parsing fails

Test regex separately:
```typescript
const match = "url(image.png)".match(/^url\(\s*(['"]?)([^'"()]+)\1\s*\)$/);
console.log(match); // Should match
```

---

## Time Tracking

| Task | Estimated | Actual | Notes |
|------|-----------|--------|-------|
| 1.1 Type defs | 5 min | | |
| 1.2 Single parser | 10 min | | |
| 1.3 List parser | 5 min | | |
| 1.4 Add export | 2 min | | |
| 1.5 Update universal | 5 min | | |
| 1.6 Tests | 15 min | | |
| 1.7 User example | 5 min | | |
| **Total** | **47 min** | | |

---

## Next Steps

After Session 1:
1. Validate background-image works end-to-end
2. Review Session 2 plan (background-position, background-size)
3. Decide: Continue with background properties or validate approach first?

**Status**: Ready to implement  
**Blocker**: None (baseline fixed)  
**Next**: Task 1.1 - Create type definitions
