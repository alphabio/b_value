# START HERE: parseAll() & generateAll() Implementation

**Quick reference for implementing batch CSS parsing/generation**

---

## 🎯 What We're Building

Two functions for batch CSS processing, designed for CSS Editor use case:

```typescript
// Parse entire CSS block → Single ParseResult with flat object
parseAll("color: red; width: 10px") 
// → { ok: true, value: { color: {...}, width: {...} }, issues: [] }

// Generate CSS from flat object → Plain string
generateAll({ color: {...}, width: {...} })
// → "color: red; width: 10px"
```

---

## 🚀 Quick Start

### Step 1: Read MASTER_PLAN.md
- Complete API design
- All edge cases documented
- Implementation strategy
- Test plan

### Step 2: Implement parseAll() (Session 1)
```typescript
// src/universal.ts
export function parseAll(css: string): ParseResult<Record<string, CSSValue | string>> {
  // 1. Split by semicolon
  // 2. Parse each property with parse()
  // 3. Detect duplicates → warning
  // 4. Handle shorthand → error + b_short promotion
  // 5. Handle invalid → error + return string
  // 6. Merge into single ParseResult
}
```

### Step 3: Implement generateAll() (Session 2)
```typescript
// src/universal.ts
export function generateAll(
  values: Record<string, CSSValue | string>,
  options?: { minify?: boolean }
): string {
  // 1. For each property:
  //    - If string → pass through
  //    - If IR → call generate()
  // 2. Join with "; " (or ";" if minify)
}
```

### Step 4: Test & Document (Session 3)
```bash
just check && just test  # Must pass!
```

---

## ⚡ Critical Edge Cases

1. **Duplicates** → Last wins + warning (not error!)
2. **Invalid** → Return input string + error
3. **Shorthand** → Return input string + error + **promote b_short**
4. **Unknown** → Return input string + error
5. **Empty** → Ignore silently

---

## 📊 Expected Results

**Before**: 2610 tests passing  
**After parseAll()**: ~2630 tests passing  
**After generateAll()**: ~2645 tests passing

---

## 🎯 Success

- ✅ parseAll() returns single ParseResult (not array!)
- ✅ generateAll() returns string (not Result!)
- ✅ Shorthand detection with b_short promotion
- ✅ String passthrough in generateAll()
- ✅ All tests green

---

**Read MASTER_PLAN.md for complete details!**
