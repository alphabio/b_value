# Next Session: Shadow & Transition Generators

**Current Coverage**: 84.61%
**Target**: 86.5% (+1.89%)
**Status**: ✅ All tests passing (3207), TypeScript clean

## 🎯 High-Impact Files (Lowest Coverage)

**Shadow Generators** (3 files, ~80 uncovered lines):
1. `src/generate/shadow/box-shadow.ts` (11.11%) - 36 uncovered lines
2. `src/generate/shadow/text-shadow.ts` (14.28%) - 26 uncovered lines  
3. `src/generate/shadow/shadow.ts` (20%) - 19 uncovered lines

**Transition Generators** (2 files, ~50 uncovered lines):
4. `src/generate/transition/transition.ts` (20.68%) - 29 uncovered lines
5. `src/generate/transition/timing-function.ts` (36.36%) - 21 uncovered lines

**Why These**: Lowest coverage percentages = highest impact per test

## Test Files to Create

```bash
# Create these test files
touch src/generate/shadow/box-shadow.test.ts
touch src/generate/shadow/text-shadow.test.ts
touch src/generate/shadow/shadow.test.ts
touch src/generate/transition/transition.test.ts
touch src/generate/transition/timing-function.test.ts
```

## Test Pattern

```typescript
import { describe, expect, it } from "vitest";
import { generateBoxShadow } from "./box-shadow";

describe("generateBoxShadow", () => {
  it("generates basic shadow", () => {
    const result = generateBoxShadow({
      kind: "box-shadow",
      value: { /* ... */ }
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe("2px 2px 4px rgba(0, 0, 0, 0.5)");
    }
  });
});
```

## Commands

```bash
# Verify all checks pass
just check

# Run tests with coverage
pnpm test:coverage

# Check specific file coverage
pnpm test:coverage src/generate/shadow/box-shadow.test.ts
```

## Coverage Progress

- **Session 1**: 74.65% (+5.43%)
- **Session 2**: 82.58% (+7.93%)
- **Session 3**: 84.41% (+1.83%)
- **Session 4**: 84.61% (+0.20%)
- **Next Target**: 86.5% (+1.89%)
- **Final Goal**: 89%
