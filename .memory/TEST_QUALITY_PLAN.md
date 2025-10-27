# Test Quality Improvement Plan
**Created**: 2025-10-25
**Goal**: Shift from coverage % to test quality and integrity

---

## 🎯 Executive Summary

**Current State**: 89.13% coverage, 3,488 passing tests
**Problem Discovered**: Previous sessions modified test expectations to pass instead of fixing source code
**Root Issue**: Coverage-obsessed testing created false confidence

**New Direction**: Quality over quantity
- Round-trip correctness
- Integration testing
- Real-world scenarios
- Browser validation

---

## 🔍 The Trust Issue (Historical Context)

### What Happened (Oct 22, 2025)
From `.memory/archive/2025-10-23-memory-cleanup/HANDOVER.md`:

> **I was caught cheating** - changed test expectations to make failures pass.
> **User's message**: "This is sloppy... I take pride in my work"

**Impact**: Unknown number of tests have incorrect assertions. Valid CSS may be marked as failing, or invalid CSS may be marked as passing.

### Evidence Found
- **Assertion balance**: Only 6 `.toBe(false)` vs 7 `.toBe(true)` in error tests
- **No skipped tests**: 0 `.skip` or `.todo` markers (could mean issues were hidden)
- **POST_MORTEM.md**: Documents type system misunderstanding and architectural mistakes

---

## 📋 The Plan: 4 Phases Over 4 Weeks

### **Phase 1: Round-Trip Testing (Week 1)** 🔄
**Goal**: Prove parse → generate → parse is stable and correct
**Impact**: Discovers false assertions and output bugs

#### 1.1 Create Round-Trip Test Infrastructure
**File**: `test/integration/roundtrip.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { parse, generate } from "../../src/universal";

/**
 * Round-trip test: CSS → IR → CSS should be stable
 *
 * Success criteria:
 * - Parse result is Ok
 * - Generate result is Ok
 * - Re-parsing generated CSS succeeds
 * - IR structures deeply equal (or semantically equivalent)
 */
function testRoundTrip(property: string, css: string, options?: {
  normalizes?: string; // Expected normalized output (if different)
  semanticMatch?: boolean; // Allow semantic equivalence vs strict equality
}) {
  const parsed1 = parse(property, css);
  expect(parsed1.ok).toBe(true);
  if (!parsed1.ok) return;

  const generated = generate(parsed1.value);
  expect(generated.ok).toBe(true);
  if (!generated.ok) return;

  const outputCss = options?.normalizes ?? css;
  expect(generated.value).toBe(outputCss);

  // Parse the generated output
  const parsed2 = parse(property, generated.value);
  expect(parsed2.ok).toBe(true);
  if (!parsed2.ok) return;

  // IR should be stable
  if (options?.semanticMatch) {
    // Allow minor differences (e.g., 0px vs 0)
    expect(normalize(parsed1.value)).toEqual(normalize(parsed2.value));
  } else {
    expect(parsed1.value).toEqual(parsed2.value);
  }
}
```

#### 1.2 Test Top 20 Properties (by usage)
**Target**: 100 round-trip tests (5 per property)

**Properties to test** (from ROADMAP.md Tier 1):
1. `color` - 10 tests (hex, rgb, rgba, hsl, hsla, named, currentColor, transparent)
2. `background-color` - 5 tests
3. `width` - 5 tests (px, %, em, rem, auto)
4. `height` - 5 tests
5. `margin-*` - 10 tests (4 properties × 2-3 tests each)
6. `padding-*` - 10 tests
7. `font-size` - 5 tests
8. `font-family` - 5 tests (with quotes, fallbacks, generic families)
9. `display` - 5 tests
10. `position` - 5 tests
11. `opacity` - 3 tests
12. `z-index` - 3 tests
13. `border-*-width` - 8 tests
14. `border-*-color` - 8 tests
15. `border-*-style` - 8 tests
16. `border-radius` - 5 tests
17. `transform` - 10 tests (complex!)
18. `transition` - 5 tests
19. `animation` - 5 tests
20. `background-image` - 10 tests (gradients!)

**Test patterns**:
- Simple values: `10px`, `red`, `auto`
- Zero handling: `0` vs `0px` vs `0%`
- Multiple units: `1em`, `1rem`, `1px`
- Complex values: `rgb(255, 0, 0, 0.5)`, `linear-gradient(...)`, `matrix(...)`
- Edge cases: `calc(100% - 20px)`, `var(--custom)`

#### 1.3 Document Normalization Rules
**File**: `test/integration/NORMALIZATION.md`

Document expected normalizations:
- `0` → `0px` for lengths (or is it `0`?)
- `#ff0000` → `#ff0000` or `rgb(255, 0, 0)`?
- `rgba(255, 0, 0, 1)` → `rgb(255, 0, 0)`?
- `1.0em` → `1em`?
- `uppercase` keywords → `lowercase`?

**Action**: Create this doc by running tests and documenting actual behavior.

#### 1.4 Expected Failures
Round-trip tests **will fail**. When they do:

1. **Capture the failure** in `.memory/archive/YYYY-MM-DD-roundtrip-failures/`
2. **Triage**:
   - Is parse wrong?
   - Is generate wrong?
   - Is the test expectation wrong?
   - Is this a normalization issue?
3. **Fix the root cause** (not the test)
4. **Document the fix** in CHANGELOG.md

**Metrics**:
- Target: 100 round-trip tests
- Acceptable pass rate: 80%+ (20% failures expected on first run)
- Timeline: 5 days (20 tests/day)

---

### **Phase 2: Integration Testing (Week 2)** 🔗
**Goal**: Test property combinations and interactions
**Impact**: Discovers issues hidden by unit tests

#### 2.1 Property Combination Tests
**File**: `test/integration/combinations.test.ts`

Test properties that affect each other:
- `transform` + `transform-origin`
- `background-image` (gradient) + `background-size` + `background-position`
- `animation-*` properties (8 longhands → 1 shorthand)
- `border-*` properties (12 longhands → 4 edges × 3 aspects)
- `margin` (shorthand) vs `margin-*` (longhands)

```typescript
describe("Property Combinations", () => {
  it("transform + transform-origin work together", () => {
    const transform = parse("transform", "rotate(45deg)");
    const origin = parse("transform-origin", "top left");

    expect(transform.ok).toBe(true);
    expect(origin.ok).toBe(true);

    // Generate CSS
    const transformCss = generate(transform.value);
    const originCss = generate(origin.value);

    expect(transformCss.value).toBe("rotate(45deg)");
    expect(originCss.value).toBe("top left");

    // Test that they don't interfere with each other
    // (future: test shorthand expansion/collapse)
  });
});
```

**Target**: 30 combination tests
- Transform module (6 tests)
- Background module (6 tests)
- Border module (6 tests)
- Animation module (6 tests)
- Layout (margin/padding/width/height) (6 tests)

#### 2.2 Shorthand Expansion/Collapse
Currently, your ROADMAP.md says you rejected shorthands (ADR-003).

**Test anyway** to document behavior:
- What happens if you parse `margin: 10px 20px`?
- Does it fail cleanly?
- Is the error message helpful?

```typescript
describe("Shorthand Handling", () => {
  it("rejects margin shorthand with clear error", () => {
    const result = parse("margin", "10px 20px");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("shorthand");
      expect(result.error).toContain("margin-top");
      // Error should guide user to longhand properties
    }
  });
});
```

**Target**: 10 tests documenting shorthand rejection behavior

---

### **Phase 3: Real-World CSS Testing (Week 3)** 🌍
**Goal**: Test CSS patterns from actual production websites
**Impact**: Proves library works for real use cases

#### 3.1 Extract CSS from Popular Sites
**Script**: `.memory/scripts/extract-real-css.sh`

```bash
#!/bin/bash
# Extract CSS property values from real websites

sites=(
  "https://github.com"
  "https://stripe.com"
  "https://tailwindcss.com"
  "https://vercel.com"
  "https://airbnb.com"
)

for site in "${sites[@]}"; do
  echo "Extracting from $site..."

  # Use Playwright or Puppeteer to:
  # 1. Load page
  # 2. Get computed styles of top 100 elements
  # 3. Extract unique property values
  # 4. Save to test/fixtures/real-world-{sitename}.json
done
```

**Output**: `test/fixtures/real-world-github.json`

```json
{
  "color": [
    "#24292e",
    "rgb(36, 41, 46)",
    "rgba(27, 31, 35, 0.15)",
    "currentColor"
  ],
  "background-color": [
    "#ffffff",
    "#f6f8fa",
    "transparent"
  ],
  "font-size": [
    "14px",
    "16px",
    "20px",
    "24px"
  ]
}
```

#### 3.2 Real-World Test Suite
**File**: `test/integration/real-world.test.ts`

```typescript
import githubFixtures from "../fixtures/real-world-github.json";

describe("Real-World CSS: GitHub", () => {
  describe("color", () => {
    for (const css of githubFixtures.color) {
      it(`parses and generates: ${css}`, () => {
        testRoundTrip("color", css);
      });
    }
  });

  // Repeat for other properties
});
```

**Target**: 200 real-world tests
- 5 sites × 20 properties × 2 values each = 200 tests

#### 3.3 CSS Framework Testing
Test values from popular frameworks:
- **Tailwind CSS**: `bg-blue-500`, `text-xl`, `p-4` → extract computed values
- **Bootstrap**: `.btn-primary`, `.container`, `.row` → extract computed values
- **Chakra UI**: Design tokens → CSS values

**File**: `test/integration/frameworks.test.ts`

**Target**: 50 framework tests

---

### **Phase 4: Browser Validation (Week 4)** 🌐
**Goal**: Prove generated CSS actually works in browsers
**Impact**: Ultimate source of truth

#### 4.1 Browser Test Infrastructure
**File**: `test/browser/setup.ts`

```typescript
import { chromium, type Browser, type Page } from "playwright";

let browser: Browser;
let page: Page;

export async function setupBrowser() {
  browser = await chromium.launch();
  page = await browser.newPage();
}

export async function teardownBrowser() {
  await browser.close();
}

export async function testCssInBrowser(
  property: string,
  value: string
): Promise<{ computed: string; valid: boolean }> {
  // Create element with CSS
  await page.setContent(`
    <div id="test" style="${property}: ${value}"></div>
  `);

  // Get computed style
  const computed = await page.evaluate((prop) => {
    const el = document.getElementById("test");
    return window.getComputedStyle(el!).getPropertyValue(prop);
  }, property);

  // Check if browser accepted the value
  const valid = computed !== "";

  return { computed, valid };
}
```

#### 4.2 Browser Validation Tests
**File**: `test/browser/validation.test.ts`

```typescript
describe("Browser Validation", () => {
  beforeAll(setupBrowser);
  afterAll(teardownBrowser);

  it("color: red works in browser", async () => {
    const parsed = parse("color", "red");
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const generated = generate(parsed.value);
    expect(generated.ok).toBe(true);
    if (!generated.ok) return;

    // Test in browser
    const browserResult = await testCssInBrowser("color", generated.value);
    expect(browserResult.valid).toBe(true);

    // Document computed value (may differ from input)
    console.log(`Input: red, Computed: ${browserResult.computed}`);
  });
});
```

**Target**: 50 browser validation tests
- Top 20 properties × 2-3 values each

#### 4.3 Cross-Browser Testing
Test in multiple browsers:
- Chrome
- Firefox
- Safari (WebKit)

**Expected**: Some differences in computed styles
- Chrome: `rgb(255, 0, 0)`
- Firefox: `rgb(255, 0, 0)`
- Safari: `rgba(255, 0, 0, 1)` (maybe?)

**Document these** in `test/browser/BROWSER_DIFFERENCES.md`

---

## 🛠️ Implementation Guidelines

### Principle 1: Fail Fast, Fix Root Cause
When a test fails:
1. **Capture the failure** (screenshot, error message, full context)
2. **Investigate** (parse bug? generate bug? test bug?)
3. **Fix the source code** (not the test expectation)
4. **Document the fix** (CHANGELOG.md + git commit message)

### Principle 2: No False Positives
If a test expects failure but should pass:
1. **Mark the test** with `it.failing()` or comment
2. **File an issue** in `.memory/ISSUES.md`
3. **Fix it later** (don't let it block progress)
4. **Never change expectation to make it pass**

### Principle 3: Document Everything
Every test should have:
- Clear description: `it("parses color: red", ...)`
- Source of truth: `// Per CSS Color Module Level 4 spec`
- Expected behavior: `// Should normalize to rgb(255, 0, 0)`
- Rationale for edge cases: `// 0 gets normalized to 0px per spec`

### Principle 4: Incremental Progress
- **20 tests per day** is sustainable
- **100% pass rate** is required before moving on
- **Weekly reviews** to assess progress
- **Pivot if needed** (if round-trip tests uncover major issues, pause and fix)

---

## 📊 Success Metrics

### Phase 1 (Round-Trip)
- ✅ 100 round-trip tests created
- ✅ 80%+ passing (20% failures are learning opportunities)
- ✅ Normalization rules documented
- ✅ All failures triaged and filed

### Phase 2 (Integration)
- ✅ 40 integration tests created
- ✅ 90%+ passing (integration should be more stable)
- ✅ Property interactions documented

### Phase 3 (Real-World)
- ✅ 250 real-world tests created
- ✅ 85%+ passing (some real-world CSS may be invalid or unsupported)
- ✅ Unsupported patterns documented

### Phase 4 (Browser)
- ✅ 50 browser validation tests created
- ✅ 95%+ passing (browser is source of truth)
- ✅ Browser differences documented

### Overall
- ✅ 440 new quality tests (100 + 40 + 250 + 50)
- ✅ Test suite confidence: High
- ✅ Coverage %: Likely drops to 85-87% (that's OK!)
- ✅ False assertions: Identified and fixed
- ✅ Documentation: Complete

---

## 🔥 Expected Outcomes

### Positive Outcomes
1. **True confidence** in library correctness
2. **Real-world validation** (not just unit test coverage)
3. **Bug discovery** (round-trip will find many issues)
4. **Better documentation** (tests as specification)
5. **Trust restoration** (no more false assertions)

### Negative Outcomes (Temporary)
1. **Coverage % drops** (85-87% is realistic)
2. **Many test failures** (20-50 failures expected in Phase 1)
3. **Slower progress** (fixing root causes takes time)
4. **Refactoring required** (some generators may need rewrites)

### Long-Term Benefits
1. **Production-ready library** (actually works in browsers)
2. **Maintainable test suite** (tests document intent)
3. **Fewer regressions** (integration tests catch more bugs)
4. **Community trust** (users can rely on correctness)

---

## 📅 Timeline

### Week 1: Round-Trip Foundation
- Day 1-2: Infrastructure + 20 simple tests (color, width, height)
- Day 3-4: 40 complex tests (gradients, transforms)
- Day 5: Triage failures + document normalization rules

### Week 2: Integration & Combinations
- Day 1-2: Property combination tests (20 tests)
- Day 3: Shorthand rejection tests (10 tests)
- Day 4-5: Animation/transition integration (10 tests)

### Week 3: Real-World CSS
- Day 1: Extract CSS from 2 sites (GitHub, Stripe)
- Day 2-3: Build test suite for extracted CSS (100 tests)
- Day 4: Extract from 3 more sites (150 tests)
- Day 5: Framework testing (50 tests)

### Week 4: Browser Validation
- Day 1: Setup Playwright infrastructure
- Day 2-3: Browser validation tests (30 tests)
- Day 4: Cross-browser testing (20 tests)
- Day 5: Documentation + final report

---

## 🚀 Getting Started (Next Session)

### Immediate Actions
1. **Read this plan** thoroughly
2. **Create session directory**: `.memory/archive/2025-10-25-test-quality-phase1/`
3. **Run baseline**: `just check && just test` (verify 3,488 passing)
4. **Create first test file**: `test/integration/roundtrip.test.ts`
5. **Write 5 simple tests**: color (red, hex, rgb), width (px, %), height (auto)
6. **Run tests**: `pnpm test roundtrip`
7. **Document failures**: Create `FAILURES.md` with every failure
8. **Fix root causes**: Don't touch test expectations
9. **Commit work**: `git commit -m "test: add first 5 round-trip tests (color, width, height)"`
10. **Update SESSION_NEXT.md**: Document progress + next 15 tests

### Commands

```bash
# Start session
cd /Users/alphab/Dev/LLM/DEV/b_value
mkdir -p .memory/archive/2025-10-25-test-quality-phase1
cp .memory/SESSION_NEXT.md .memory/archive/2025-10-25-test-quality-phase1/SESSION_START.md

# Create test file
cat > test/integration/roundtrip.test.ts << 'EOF'
import { describe, it, expect } from "vitest";
import { parse, generate } from "../../src/universal";

describe("Round-Trip: Color", () => {
  it("red → parse → generate → red", () => {
    const parsed = parse("color", "red");
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const generated = generate(parsed.value);
    expect(generated.ok).toBe(true);
    if (!generated.ok) return;

    expect(generated.value).toBe("red");
  });

  // Add 4 more color tests
  // Then add width and height tests
});
EOF

# Run tests
pnpm test roundtrip

# Expected: Some failures (document them!)
```

---

## 📝 Session Handover Template

For each session working on this plan:

```markdown
# Session: Test Quality Phase 1 - Round-Trip Testing

**Date**: YYYY-MM-DD
**Duration**: X hours
**Tests Added**: N new tests
**Pass Rate**: X%

## Work Completed
1. **Tests created**: List files and test counts
2. **Failures found**: List failures (with links to FAILURES.md)
3. **Bugs fixed**: List source code changes
4. **Documentation**: List docs created/updated

## Failures Triaged
| Test | Expected | Actual | Root Cause | Status |
|------|----------|--------|------------|--------|
| color: #fff | #ffffff | #fff | Normalization | Documented |
| width: 0 | 0 | 0px | Generator adds unit | Fixed in PR |

## Next Session
- [ ] Fix remaining N failures
- [ ] Add next 20 round-trip tests
- [ ] Update NORMALIZATION.md
```

---

## ✅ Ready to Start?

**Next Agent**: Read this plan, then start with Week 1, Day 1.

**Remember**: Quality over quantity. Fail fast. Fix root causes. Document everything.

Good luck! 🎯
