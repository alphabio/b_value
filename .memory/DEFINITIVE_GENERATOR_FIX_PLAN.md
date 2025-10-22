# DEFINITIVE GENERATOR FIX PLAN
**Clean API | No Hacks | No Noise | Fool-Proof Execution**

**Last Updated**: 2025-10-22T14:20:00Z  
**Status**: 🔴 READY TO EXECUTE  
**Estimated Time**: 6-8 hours

---

## The Clean API We Want

**Every generator MUST**:
1. Be named `generate()` (not `toCss`)
2. Return `GenerateResult` (not `string`)
3. Validate IR structure (no exceptions thrown)
4. Return errors gracefully

**No exceptions. No shortcuts. No variations.**

---

## The Pattern (Copy-Paste Template)

### Template 1: Simple Leaf Generator (Most Common - 110+ files)

**BEFORE**:
```typescript
export function toCss(keyword: BackgroundClipKeyword): string {
	return keyword;
}
```

**AFTER**:
```typescript
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

export function generate(keyword: BackgroundClipKeyword): GenerateResult {
	// 1. Validate input exists
	if (keyword === undefined || keyword === null) {
		return generateErr("invalid-ir", "Keyword must not be null or undefined");
	}
	
	// 2. Validate input type
	if (typeof keyword !== "string") {
		return generateErr("invalid-ir", `Expected string keyword, got ${typeof keyword}`);
	}
	
	// 3. Generate CSS
	return generateOk(keyword);
}
```

**Rule**: Add type validation, wrap in `generateOk()`. That's it.

---

### Template 2: Value Type Generator (20+ files)

**BEFORE**:
```typescript
export function toCss(value: PositionValue): string {
	if (typeof value === "string") {
		return value;
	}
	return `${value.value}${value.unit}`;
}
```

**AFTER**:
```typescript
import { type GenerateResult, generateErr, generateOk } from "@/core/result";

export function generate(value: PositionValue): GenerateResult {
	// 1. Validate input exists
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "Value must not be null or undefined");
	}
	
	// 2. Handle string case
	if (typeof value === "string") {
		return generateOk(value);
	}
	
	// 3. Validate object structure
	if (typeof value !== "object") {
		return generateErr("invalid-ir", `Expected string or object, got ${typeof value}`);
	}
	
	if (!("value" in value) || !("unit" in value)) {
		return generateErr("missing-required-field", "Length-percentage must have 'value' and 'unit' fields");
	}
	
	// 4. Generate CSS
	return generateOk(`${value.value}${value.unit}`);
}
```

**Rule**: Validate both branches of union types.

---

### Template 3: Dispatcher Generator (11 files)

**BEFORE**:
```typescript
export function generate(color: Type.Color): GenerateResult {
	if (!color || typeof color !== "object" || !("kind" in color)) {
		return generateErr("missing-required-field", "Invalid color IR: missing 'kind' field");
	}
	
	switch (color.kind) {
		case "hex":
			return generateOk(Hex.toCss(color));  // ❌ WRONG - calls toCss()
		case "rgb":
			return generateOk(Rgb.toCss(color));  // ❌ WRONG
		// ...
	}
}
```

**AFTER**:
```typescript
export function generate(color: Type.Color): GenerateResult {
	// 1. Validate IR structure
	if (!color || typeof color !== "object" || !("kind" in color)) {
		return generateErr("missing-required-field", "Invalid color IR: missing 'kind' field");
	}
	
	// 2. Dispatch to sub-generators (just forward their results)
	switch (color.kind) {
		case "hex":
			return Hex.generate(color);  // ✅ CORRECT - forward result
		case "rgb":
			return Rgb.generate(color);  // ✅ CORRECT
		// ...
		default:
			return generateErr("unsupported-kind", `Unknown color kind: ${color.kind}`);
	}
}
```

**Rule**: Dispatchers just forward results. No wrapping in `generateOk()`.

---

### Template 4: Test Update

**BEFORE**:
```typescript
import * as Gen from "./width";

test("generates width", () => {
	const css = Gen.toCss({ kind: "width", value: { value: 200, unit: "px" } });
	expect(css).toBe("200px");
});
```

**AFTER**:
```typescript
import * as Gen from "./width";

test("generates width", () => {
	const result = Gen.generate({ kind: "width", value: { value: 200, unit: "px" } });
	expect(result.ok).toBe(true);
	if (result.ok) {
		expect(result.value).toBe("200px");
	}
});

test("validates width IR", () => {
	const result = Gen.generate(null as any);
	expect(result.ok).toBe(false);
	if (!result.ok) {
		expect(result.issues[0].code).toBe("invalid-ir");
	}
});
```

**Rule**: Update all assertions + add one validation test per generator.

---

## Execution Order (Sequential - No Parallelism)

### Phase 1: Fix Leaf Generators First (Bottom-Up)

**DO NOT touch dispatchers until ALL leaf generators are fixed.**

Work module by module in this exact order:

#### Module 1: Color (12 files) - START HERE
1. `src/generate/color/hex.ts`
2. `src/generate/color/named.ts`
3. `src/generate/color/rgb.ts`
4. `src/generate/color/hsl.ts`
5. `src/generate/color/hwb.ts`
6. `src/generate/color/lab.ts`
7. `src/generate/color/lch.ts`
8. `src/generate/color/oklab.ts`
9. `src/generate/color/oklch.ts`
10. `src/generate/color/system.ts`
11. `src/generate/color/special.ts`
12. `src/generate/color/color-function.ts`

**After each file**: Run `pnpm test src/generate/color`

#### Module 2: Background (6 files)
1. `src/generate/background/attachment.ts`
2. `src/generate/background/clip.ts`
3. `src/generate/background/origin.ts`
4. `src/generate/background/position-x.ts`
5. `src/generate/background/position-y.ts`
6. `src/generate/background/repeat.ts`

**After module**: Run `pnpm test src/generate/background`

#### Module 3: Border (3 files)
1. `src/generate/border/color.ts`
2. `src/generate/border/radius.ts`
3. `src/generate/border/width.ts`

#### Module 4: Typography (11 files)
1. `src/generate/typography/font-style.ts`
2. `src/generate/typography/font-weight.ts`
3. `src/generate/typography/letter-spacing.ts`
4. `src/generate/typography/line-height.ts`
5. `src/generate/typography/overflow-wrap.ts`
6. `src/generate/typography/text-align.ts`
7. `src/generate/typography/text-decoration-line.ts`
8. `src/generate/typography/text-decoration-style.ts`
9. `src/generate/typography/text-transform.ts`
10. `src/generate/typography/vertical-align.ts`
11. `src/generate/typography/word-break.ts`

#### Module 5: Layout (34 files)
1. `src/generate/layout/bottom.ts`
2. `src/generate/layout/clear.ts`
3. `src/generate/layout/display.ts`
4. `src/generate/layout/float.ts`
5. `src/generate/layout/height.ts`
6. `src/generate/layout/left.ts`
7. `src/generate/layout/margin-bottom.ts`
8. `src/generate/layout/margin-left.ts`
9. `src/generate/layout/margin-right.ts`
10. `src/generate/layout/margin-top.ts`
11. `src/generate/layout/max-height.ts`
12. `src/generate/layout/max-width.ts`
13. `src/generate/layout/min-height.ts`
14. `src/generate/layout/min-width.ts`
15. `src/generate/layout/overflow.ts`
16. `src/generate/layout/overflow-x.ts`
17. `src/generate/layout/overflow-y.ts`
18. `src/generate/layout/padding-bottom.ts`
19. `src/generate/layout/padding-left.ts`
20. `src/generate/layout/padding-right.ts`
21. `src/generate/layout/padding-top.ts`
22. `src/generate/layout/position.ts`
23. `src/generate/layout/right.ts`
24. `src/generate/layout/top.ts`
25. `src/generate/layout/visibility.ts`
26. `src/generate/layout/width.ts`
27. `src/generate/layout/z-index.ts`
28. All others in layout/

#### Module 6: Flexbox (11 files)
1. `src/generate/flexbox/align-content.ts`
2. `src/generate/flexbox/align-items.ts`
3. `src/generate/flexbox/align-self.ts`
4. `src/generate/flexbox/flex-basis.ts`
5. `src/generate/flexbox/flex-direction.ts`
6. `src/generate/flexbox/flex-grow.ts`
7. `src/generate/flexbox/flex-shrink.ts`
8. `src/generate/flexbox/flex-wrap.ts`
9. `src/generate/flexbox/justify-content.ts`
10. `src/generate/flexbox/order.ts`
11. `src/generate/flexbox/gap.ts`

#### Module 7: Animation (8 files)
1. `src/generate/animation/delay.ts`
2. `src/generate/animation/direction.ts`
3. `src/generate/animation/duration.ts`
4. `src/generate/animation/fill-mode.ts`
5. `src/generate/animation/iteration-count.ts`
6. `src/generate/animation/name.ts`
7. `src/generate/animation/play-state.ts`
8. `src/generate/animation/timing-function.ts`

#### Module 8: Transition (4 files)
1. `src/generate/transition/delay.ts`
2. `src/generate/transition/duration.ts`
3. `src/generate/transition/property.ts`
4. `src/generate/transition/timing-function.ts`

#### Module 9: Clip-Path (10 files)
1. `src/generate/clip-path/circle.ts`
2. `src/generate/clip-path/ellipse.ts`
3. `src/generate/clip-path/inset.ts`
4. `src/generate/clip-path/path.ts`
5. `src/generate/clip-path/polygon.ts`
6. All others in clip-path/

#### Module 10: Filter (11 files)
1. `src/generate/filter/blur.ts`
2. `src/generate/filter/brightness.ts`
3. `src/generate/filter/contrast.ts`
4. `src/generate/filter/drop-shadow.ts`
5. `src/generate/filter/grayscale.ts`
6. `src/generate/filter/hue-rotate.ts`
7. `src/generate/filter/invert.ts`
8. `src/generate/filter/opacity.ts`
9. `src/generate/filter/saturate.ts`
10. `src/generate/filter/sepia.ts`
11. `src/generate/filter/url.ts`

#### Module 11: Gradient (3 files)
1. `src/generate/gradient/linear.ts`
2. `src/generate/gradient/radial.ts`
3. `src/generate/gradient/conic.ts`

#### Module 12: Shadow (2 files)
1. `src/generate/shadow/box-shadow.ts`
2. `src/generate/shadow/text-shadow.ts`

#### Module 13: Text (4 files)
1. `src/generate/text/text-decoration.ts`
2. `src/generate/text/text-shadow.ts`
3. All others in text/

#### Module 14: Outline (3 files)
1. `src/generate/outline/color.ts`
2. `src/generate/outline/offset.ts`
3. `src/generate/outline/width.ts`

#### Module 15: Interaction (2 files)
1. `src/generate/interaction/pointer-events.ts`
2. `src/generate/interaction/user-select.ts`

#### Module 16: Visual (2 files)
1. `src/generate/visual/background-blend-mode.generate.ts` (rename function)
2. `src/generate/visual/mix-blend-mode.generate.ts` (rename function)

#### Module 17: Transform (1 file)
1. `src/generate/transform/origin.ts`

**Checkpoint**: Run `just test` - ALL 2938+ tests must pass

---

### Phase 2: Fix Dispatcher Generators (11 files)

**ONLY AFTER Phase 1 is 100% complete.**

These files call sub-generators. Just change `.toCss()` → `.generate()` and remove `generateOk()` wrapping.

1. `src/generate/animation/animation.ts` - calls delay, duration, etc.
2. `src/generate/border/border.ts` - calls color, width, radius
3. `src/generate/clip-path/clip-path.ts` - calls circle, ellipse, etc.
4. `src/generate/color/color.ts` - calls hex, rgb, hsl, etc.
5. `src/generate/filter/filter.ts` - calls blur, brightness, etc.
6. `src/generate/gradient/gradient.ts` - calls linear, radial, conic
7. `src/generate/outline/outline.ts` - calls color, width, offset
8. `src/generate/position/position.ts` - calls position-x, position-y
9. `src/generate/shadow/shadow.ts` - calls box-shadow, text-shadow
10. `src/generate/transform/transform.ts` - calls transform functions
11. `src/generate/transition/transition.ts` - calls delay, duration, etc.

**Checkpoint**: Run `just test` - ALL tests must still pass

---

### Phase 3: Update Test Files (53 files)

**Pattern for EVERY test file**:
1. Change `const css = Gen.toCss(...)` → `const result = Gen.generate(...)`
2. Change `expect(css).toBe(...)` → `expect(result.ok).toBe(true); if (result.ok) expect(result.value).toBe(...)`
3. Add ONE validation test: `expect(Gen.generate(null as any).ok).toBe(false)`

Test files to update (same order as generators):
- `src/generate/color/*.test.ts` (12 files)
- `src/generate/background/*.test.ts` (6 files)
- `src/generate/border/*.test.ts` (3 files)
- ... (continue for all modules)

**Checkpoint**: Run `just test` after EACH module

---

### Phase 4: Update Parse Test Files That Use Generators

Some parse tests call generators for round-trip validation. Update these:

```bash
grep -r "\.toCss(" src/parse --include="*.test.ts"
```

Update each occurrence:
- `Generate.X.toCss(...)` → `Generate.X.generate(...).value!`

**Checkpoint**: Run `just test`

---

### Phase 5: Final Verification

```bash
# 1. No toCss() calls should remain
grep -r "\.toCss(" src/ --include="*.ts" | grep -v "test.ts" | wc -l
# Expected: 0

# 2. All tests pass
just test
# Expected: 2938+ passing

# 3. No lint errors
just check
# Expected: clean

# 4. Verify all generators return GenerateResult
find src/generate -name "*.ts" -type f ! -name "*.test.ts" -exec grep -L "GenerateResult" {} \;
# Expected: empty (only index.ts files)
```

---

## Decision Log (No Ambiguity)

### Q1: What validation do we add?
**A**: Type validation only. Check `null/undefined`, check `typeof`. No semantic validation (e.g., valid color values).

### Q2: Do we validate the `kind` field in leaf generators?
**A**: No. Leaf generators don't have `kind` fields (they receive primitive values). Only dispatchers validate `kind`.

### Q3: Do we validate all fields of complex IR?
**A**: Yes. If IR has `{ value, unit }`, check both exist.

### Q4: What about generators that take multiple parameters?
**A**: Same rules. Validate each parameter.

### Q5: Do we add validation tests to test files?
**A**: Yes. ONE test per generator that validates null/undefined handling.

---

## Atomic Commits (Optional but Recommended)

```bash
# After Phase 1 (all leaf generators)
git add src/generate
git commit -m "refactor(generate): convert leaf generators to return GenerateResult

- Change toCss() → generate() for 128 leaf generators
- Add input validation (type checking)
- Return GenerateResult instead of string
- All tests updated

BREAKING CHANGE: All generator functions now return GenerateResult"

# After Phase 2 (dispatchers)
git commit -m "refactor(generate): update dispatcher generators

- Change .toCss() calls → .generate() calls
- Forward results directly (no wrapping)"

# After Phase 3-5 (tests + verification)
git commit -m "test(generate): update all generator tests

- Update assertions for GenerateResult
- Add validation tests
- Update parse round-trip tests"
```

---

## Rollback Plan

If anything breaks:
```bash
git reset --hard HEAD~1  # Undo last commit
just test                 # Verify baseline restored
```

---

## Success Criteria (Binary - No Grey Area)

- [ ] Zero `.toCss(` calls in src/ (excluding test files)
- [ ] 128 leaf generators return `GenerateResult`
- [ ] 11 dispatcher generators call `.generate()`
- [ ] All 2938+ tests passing
- [ ] No lint errors
- [ ] No type errors

**If ALL boxes checked**: ✅ SUCCESS  
**If ANY box unchecked**: ❌ INCOMPLETE - DO NOT COMMIT

---

## Ready to Execute?

This plan has:
- ✅ Exact templates (copy-paste ready)
- ✅ Exact execution order (no ambiguity)
- ✅ Clear validation rules (no interpretation needed)
- ✅ Test patterns (copy-paste ready)
- ✅ Binary success criteria (no grey area)
- ✅ Rollback plan (safety net)

**LET'S GO! 🚀**
