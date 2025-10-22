# Universal API Implementation Plan

**Date**: 2025-10-22T13:02:00Z  
**Status**: 🚧 IN PROGRESS  
**Decision**: Adapter pattern with Result<T, string> boundary

---

## 🎯 Goal

Build universal API on top of existing 109 property parsers/generators.

**User API**:
```typescript
import { parse, generate } from "b_value";

// Parse CSS string → IR objects
const result = parse("color: red; width: 100px");
// → { color: ColorIR, width: LengthIR }

// Generate IR objects → CSS string
const css = generate({ color: ColorIR, width: LengthIR });
// → "color: red; width: 100px"
```

---

## 📋 Implementation Steps

### Step 1: Create Universal Parser (60 min)

**File**: `src/universal.ts`

**Structure**:
```typescript
import { ok, err, type Result } from "@/core/result";
import type { ParseResult } from "@/core/result";

// Type adapter
function adaptParseResult<T>(result: ParseResult<T>): Result<T, string> {
  if (result.ok) return ok(result.value);
  const msg = result.issues.map(i => i.message).join("; ");
  return err(msg);
}

// Parser registry
const PARSERS: Record<string, (value: string) => Result<any, string>> = {
  // TODO: Register all 109 properties
};

// Generator registry  
const GENERATORS: Record<string, (value: any) => string> = {
  // TODO: Register all 109 properties
};

// CSS declaration parser
function parseDeclarations(css: string): Array<{prop: string, value: string}> {
  // Split "color: red; width: 100px" into declarations
  // Handle edge cases: trailing semicolon, whitespace, etc.
}

// Universal parse function
export function parse(css: string): Result<Record<string, any>, string> {
  const declarations = parseDeclarations(css);
  const result: Record<string, any> = {};
  
  for (const {prop, value} of declarations) {
    const parser = PARSERS[prop];
    if (!parser) {
      return err(`Unknown property: ${prop}`);
    }
    
    const parsed = parser(value);
    if (!parsed.ok) {
      return err(`Failed to parse ${prop}: ${parsed.error}`);
    }
    
    result[prop] = parsed.value;
  }
  
  return ok(result);
}

// Universal generate function
export function generate(values: Record<string, any>): Result<string, string> {
  const declarations: string[] = [];
  
  for (const [prop, value] of Object.entries(values)) {
    const generator = GENERATORS[prop];
    if (!generator) {
      return err(`Unknown property: ${prop}`);
    }
    
    const css = generator(value);
    declarations.push(`${prop}: ${css}`);
  }
  
  return ok(declarations.join("; "));
}
```

### Step 2: Build Parser Registry (30 min)

**Map all 109 properties**:

1. Import all parser modules
2. For each property, add to PARSERS:
   - If returns `Result<T, string>`: Direct map
   - If returns `ParseResult<T>`: Wrap with adaptParseResult

**Script to generate the list**:
```bash
# Get all parser files
find src/parse -name "*.ts" -type f ! -name "*.test.ts" ! -name "index.ts" ! -name "types.ts" | sort
```

### Step 3: Build Generator Registry (30 min)

**Map all 109 generators**:

1. Import all generator modules
2. For each property, add to GENERATORS
3. Most generators return raw strings - direct map

### Step 4: Write Tests (30 min)

**File**: `src/universal.test.ts`

```typescript
import { describe, expect, it } from "vitest";
import { parse, generate } from "./universal";

describe("parse", () => {
  it("parses single property", () => {
    const result = parse("color: red");
    expect(result.ok).toBe(true);
  });

  it("parses multiple properties", () => {
    const result = parse("color: red; width: 100px");
    expect(result.ok).toBe(true);
  });

  it("handles unknown property", () => {
    const result = parse("unknown: value");
    expect(result.ok).toBe(false);
  });

  it("handles parse error", () => {
    const result = parse("color: invalid-color");
    expect(result.ok).toBe(false);
  });
});

describe("generate", () => {
  it("generates single property", () => {
    const result = generate({ color: { kind: "named", name: "red" } });
    expect(result.ok).toBe(true);
  });

  it("generates multiple properties", () => {
    const result = generate({
      color: { kind: "named", name: "red" },
      width: { kind: "length", value: 100, unit: "px" }
    });
    expect(result.ok).toBe(true);
  });
});
```

### Step 5: Export from Index (5 min)

**File**: `src/index.ts`

Add:
```typescript
export { parse, generate } from "./universal";
```

### Step 6: Verify (15 min)

```bash
just check  # Lint + TypeScript
just test   # All tests (2938+ new ones)
```

---

## 🚫 DO NOT

1. ❌ Don't modify existing parsers
2. ❌ Don't modify existing generators  
3. ❌ Don't change any test files
4. ❌ Don't break existing Module.Property.parse() API
5. ❌ Don't skip any of the 109 properties

---

## ✅ Checklist

- [ ] Step 1: Create src/universal.ts core
- [ ] Step 2: Register 109 parsers
- [ ] Step 3: Register 109 generators
- [ ] Step 4: Write comprehensive tests
- [ ] Step 5: Export from src/index.ts
- [ ] Step 6: Verify baseline (just check && just test)
- [ ] Step 7: Commit with clear message

---

## 📦 Expected Deliverables

1. `src/universal.ts` - Universal API implementation
2. `src/universal.test.ts` - Universal API tests  
3. Updated `src/index.ts` - Exports parse/generate
4. Clean baseline (2938+ tests passing)
5. Git commit

---

**Ready to implement. Starting with Step 1.** 🚀
