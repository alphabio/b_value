# ADR-003: Shorthand Property Rejection

**Status**: ✅ **LOCKED** - DO NOT REVISIT  
**Date**: 2025-10-21  
**Category**: API Design, Scope Boundary  
**Priority**: **CRITICAL** - Core architectural decision

---

## Decision

**b_value SHALL reject shorthand properties with a helpful error pointing to b_short.**

This is a **PERMANENT, NON-NEGOTIABLE** decision. Do not discuss, debate, or revisit.

---

## Rationale

### Clear Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│  b_short - Shorthand expansion/compression                  │
│  - Expands: background → background-image, background-color  │
│  - Compresses: longhand → shorthand                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  b_value - Longhand value parsing/generation                │
│  - Parses: background-image: linear-gradient(...)            │
│  - Generates: linear-gradient(...) → IR → CSS                │
└─────────────────────────────────────────────────────────────┘
```

### Single Responsibility
- **b_short**: Property expansion/compression
- **b_value**: Value parsing/generation
- **No overlap**: Clean architecture

---

## Implementation

### Detection

When `parseAll()` encounters a property name:

1. Check if property is shorthand (use known list or b_short API)
2. If shorthand → Return error immediately
3. If longhand → Proceed with parsing

### Error Format

```typescript
// Input: background: linear-gradient(red, blue);

const result = parseAll("background: linear-gradient(red, blue)");

// Result:
{
  ok: false,
  issues: [{
    severity: "error",
    message: "Shorthand property not supported: 'background'",
    suggestion: "Expand shorthand first using b_short library",
    action: "import { expand } from 'b_short'; const longhand = expand('background: ...');"
  }]
}
```

### Integration with b_short

**Option A: Hard error (recommended)**
- b_value does NOT import b_short
- User must expand shorthands before passing to b_value
- Clean dependency graph

**Option B: Soft error with helper**
- b_value imports b_short as peer dependency
- Helper function: `expandAndParse(css)` that auto-expands
- Main API still rejects shorthands
- User opts into convenience

**Decision**: Option A for now. Option B can be added later without breaking changes.

---

## Example Workflow

```typescript
import { expand } from 'b_short';
import { parseAll, generateAll } from 'b_value';

// 1. User input (may contain shorthands)
const userCSS = `
  background: linear-gradient(red, blue);
  border: 1px solid red;
`;

// 2. Expand shorthands with b_short
const longhandCSS = expand(userCSS);
// Result:
// background-image: linear-gradient(red, blue);
// background-position: 0% 0%;
// background-size: auto auto;
// background-repeat: repeat;
// background-origin: padding-box;
// background-clip: border-box;
// background-attachment: scroll;
// background-color: transparent;
// border-width: 1px;
// border-style: solid;
// border-color: red;

// 3. Parse with b_value
const parsed = parseAll(longhandCSS);

// 4. Modify IR
if (parsed.ok) {
  parsed.value[0].value[0].colorStops[0].color = newColor;
}

// 5. Generate back
const generated = generateAll(parsed.value);

// 6. (Optional) Compress with b_short
const compressed = compress(generated.value);
```

---

## Consequences

### Positive
- ✅ Clean separation of concerns
- ✅ Simple, focused codebase
- ✅ Easy to test (no shorthand edge cases)
- ✅ Clear error messages guide users
- ✅ No dependency on b_short (optional peer)

### Negative
- ⚠️ User must call b_short separately (extra step)
- ⚠️ Not "just works" for shorthand input

### Mitigation
- Provide clear documentation
- Show example workflow above
- Consider convenience wrapper (Option B) later

---

## Status

**LOCKED** - This decision is final.

Do not open discussions about:
- "Should we support shorthands?"
- "Can we auto-expand?"
- "What if user doesn't want b_short?"

The answer is always: **Use b_short for shorthands. b_value only handles longhand.**

---

## References

- b_short: [GitHub link when available]
- MDN: CSS Shorthand Properties
- Related: ADR-002 (Three-Layer API Architecture)

---

**Last Updated**: 2025-10-21  
**Author**: Development Team  
**Review Date**: Never (decision is permanent)
