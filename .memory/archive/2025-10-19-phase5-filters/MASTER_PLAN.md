# Phase 5: Filter Functions - Master Plan

**Status**: COMPLETE ✅
**Current Session**: Phase 5 Complete
**Tests**: 745 baseline → 994 total (+249 new)

---

## Quick Start

**Phase 5 is COMPLETE!** All 11 filter functions implemented with master APIs.

See:
- Session 12 HANDOVER: `.memory/archive/2025-10-19-session-12/HANDOVER.md`
- All filters: `src/parse/filter/` and `src/generate/filter/`
- Master APIs: `src/parse/filter/index.ts` and `src/generate/filter/index.ts`
- Integration tests: `test/integration/filter.test.ts`

---

## Progress Tracker

| Session | Status | Tests | Date | Agent | Handover |
|---------|--------|-------|------|-------|----------|
| 1. Simple Numeric | ✅ DONE | 102/102 | 2025-10-19 | Claude | [session-1-complete.md](./session-1-complete.md) |
| 2. Blur & Angle | ✅ DONE | 40/40 | 2025-10-19 | Claude | [session-2-complete.md](./session-2-complete.md) |
| 3. Drop Shadow | ✅ DONE | 39/39 | 2025-10-19 | Claude | See Session 11 |
| 4. URL & Master | ✅ DONE | 68/68 | 2025-10-19 | Claude | See Session 12 |

**Phase 5 Status**: ✅ COMPLETE (11/11 filters, master APIs, integration tests)

---

## Session Overview

### Session 1: Simple Numeric Filters (7 filters)
**Time**: 60-90 min | **Tests**: +40 | **Complexity**: LOW
**File**: [session-1.md](./session-1.md)

Implement filters that accept number or percentage values only.

**Filters**:
- `brightness()` - 0 to ∞, 1 = 100%
- `contrast()` - 0 to ∞, 1 = 100%
- `grayscale()` - 0 to 1, where 1 = 100%
- `invert()` - 0 to 1, where 1 = 100%
- `opacity()` - 0 to 1, where 1 = 100%
- `saturate()` - 0 to ∞, 1 = 100%
- `sepia()` - 0 to 1, where 1 = 100%

**Deliverables**:
- ✅ `src/core/types/filter.ts` - All filter types (DONE)
- `src/parse/filter/brightness.ts` - Parser
- `src/parse/filter/contrast.ts` - Parser
- `src/parse/filter/grayscale.ts` - Parser
- `src/parse/filter/invert.ts` - Parser
- `src/parse/filter/opacity.ts` - Parser
- `src/parse/filter/saturate.ts` - Parser
- `src/parse/filter/sepia.ts` - Parser
- `src/generate/filter/brightness.ts` - Generator
- `src/generate/filter/contrast.ts` - Generator
- `src/generate/filter/grayscale.ts` - Generator
- `src/generate/filter/invert.ts` - Generator
- `src/generate/filter/opacity.ts` - Generator
- `src/generate/filter/saturate.ts` - Generator
- `src/generate/filter/sepia.ts` - Generator
- 40+ tests (parse + generate for each)

**Key Patterns**:
- Parse: Accept `number` or `percentage`, normalize to number
- Generate: Output as number (not percentage) for consistency
- Validation: Check value ranges per filter type
- Reuse: Use existing `parseNumberNode()` and `parsePercentage()` from utils

---

### Session 2: Blur & Hue-Rotate
**Time**: 45-60 min | **Tests**: +20 | **Complexity**: LOW-MEDIUM
**File**: [session-2.md](./session-2.md)

Implement filters with specialized value types.

**Filters**:
- `blur()` - Length value (px, em, rem, etc.)
- `hue-rotate()` - Angle value (deg, grad, rad, turn)

**Deliverables**:
- `src/parse/filter/blur.ts` - Length parser
- `src/parse/filter/hue-rotate.ts` - Angle parser
- `src/generate/filter/blur.ts` - Length generator
- `src/generate/filter/hue-rotate.ts` - Angle generator
- 20+ tests with multiple units

**Key Patterns**:
- Reuse: `parseLengthNode()` for blur
- Reuse: Angle parsing from HSL color implementation
- Generate: Preserve original unit

---

### Session 3: Drop Shadow
**Time**: 60-90 min | **Tests**: +20 | **Complexity**: MEDIUM-HIGH
**File**: [session-3.md](./session-3.md)

Implement complex drop-shadow filter.

**Filter**:
- `drop-shadow()` - offset-x offset-y [blur-radius] [color]

**Deliverables**:
- `src/parse/filter/drop-shadow.ts` - Complex parser
- `src/generate/filter/drop-shadow.ts` - Complex generator
- 20+ tests with various combinations

**Key Patterns**:
- Parse: Two required lengths, optional blur length, optional color
- Reuse: Master color parser for color component
- Order: Color can appear anywhere in the parameters
- Defaults: blur-radius defaults to 0, color defaults to currentcolor

---

### Session 4: URL & Master Filter
**Time**: 60-90 min | **Tests**: +20 | **Complexity**: MEDIUM
**File**: [session-4.md](./session-4.md)

Implement URL filter and create master parser/generator.

**Filter**:
- `url()` - Reference to SVG filter

**Master API**:
- `Filter.parse()` - Auto-detect filter function by name
- `Filter.toCss()` - Generate CSS from any filter IR

**Deliverables**:
- `src/parse/filter/url.ts` - URL parser
- `src/generate/filter/url.ts` - URL generator
- `src/parse/filter/index.ts` - Master parser with dispatch
- `src/generate/filter/index.ts` - Master generator with dispatch
- `test/integration/filter.test.ts` - Integration tests
- 20+ tests (URL + master + integration)

**Key Patterns**:
- URL: Extract string from `url(...)` function
- Master parse: Dispatch by function name
- Master generate: Dispatch by `kind` discriminator
- Integration: Test round-trip for all 11 filters

---

## API Design

### Parse API

```typescript
import { Filter } from "@/parse/filter";

// Master parser - auto-detects filter type
const result = Filter.parse("blur(5px)");
const result = Filter.parse("brightness(1.5)");
const result = Filter.parse("drop-shadow(2px 2px 4px rgba(0,0,0,0.5))");

// Individual parsers also accessible
const blurResult = Filter.blur.parse("blur(5px)");
const brightnessResult = Filter.brightness.parse("brightness(150%)");
```

### Generate API

```typescript
import { Filter } from "@/generate/filter";

// Master generator - handles all filter types
const css = Filter.toCss({ kind: "blur", radius: { value: 5, unit: "px" } });
const css = Filter.toCss({ kind: "brightness", value: 1.5 });

// Individual generators also accessible
const blurCss = Filter.blur.toCss(blurFilter);
const brightnessCss = Filter.brightness.toCss(brightnessFilter);
```

---

## Type System

All filter types defined in `src/core/types/filter.ts` with discriminated union:

```typescript
type FilterFunction =
  | BlurFilter           // { kind: "blur", radius: Length }
  | BrightnessFilter     // { kind: "brightness", value: number }
  | ContrastFilter       // { kind: "contrast", value: number }
  | GrayscaleFilter      // { kind: "grayscale", value: number }
  | HueRotateFilter      // { kind: "hue-rotate", angle: Angle }
  | InvertFilter         // { kind: "invert", value: number }
  | OpacityFilter        // { kind: "opacity", value: number }
  | SaturateFilter       // { kind: "saturate", value: number }
  | SepiaFilter          // { kind: "sepia", value: number }
  | DropShadowFilter     // { kind: "drop-shadow", offsetX, offsetY, blurRadius?, color? }
  | UrlFilter            // { kind: "url", url: string }
```

---

## Test Strategy

### Unit Tests (Per Filter)
- Parse valid inputs (number, percentage, units)
- Parse edge cases (0, 1, max values)
- Generate correct CSS output
- Round-trip accuracy: parse → generate → parse = identical

### Integration Tests
- Multiple filters in sequence
- All 11 filters round-trip correctly
- Error handling for invalid inputs
- Edge cases and boundary conditions

### Coverage Target
- Parse: 100% branch coverage
- Generate: 100% branch coverage
- Integration: All filter types tested

---

## Handover Template

After each session, create `HANDOVER.md` in your session archive:

```markdown
# Session N Handover

**Status**: ✅ DONE / ⚠️ PARTIAL / ❌ BLOCKED
**Tests**: X passing (Y new)
**Duration**: X minutes

## Completed
- [x] Task 1
- [x] Task 2

## Next Session
Agent should start with: [brief description]

## Blockers
[None / List any issues]

## Notes
[Key decisions or tricky parts]
```

---

## Quality Gates (Every Session)

**Before handover, all must pass**:

```bash
just check  # Format, lint, types
just test   # All tests passing
```

**Commit message format**:

```
feat(filter): Session N - [topic]

- [what you did]
- X new tests
```

---

## Rules

1. **One session at a time** - Don't jump ahead
2. **All tests must pass** - No exceptions
3. **Update progress table** - Mark your session ✅
4. **Create handover doc** - Next agent needs it
5. **Stay in scope** - Resist feature creep
6. **Follow DRY** - Extract common patterns to utils
7. **Follow KISS** - Keep functions simple and focused

---

## DRY Opportunities

### Existing Utils to Reuse
- `@/utils/parse/nodes.ts`:
  - `parseNumberNode()` - For numeric values
  - `parsePercentage()` - For percentage values
  - `parseLengthNode()` - For length values
  - `parseLengthPercentageNode()` - For length/percentage values
- `@/utils/ast/functions.ts`:
  - Function parsing utilities
- `@/utils/generate/values.ts`:
  - Value generation utilities

### New Utils to Create
If you find yourself copying code 2+ times, extract to utils:
- Percentage-to-number conversion (e.g., `50%` → `0.5`)
- Number-to-percentage validation
- Filter function validation patterns

---

## Need Help?

- Check color parsers for similar patterns (especially HSL for angles)
- Look at gradient parsers for complex multi-value parsing
- Test files show expected behavior
- Previous session's HANDOVER.md has context
- When stuck, ask - don't guess

---

**Ready?** Start with [Session 1](./session-1.md)
