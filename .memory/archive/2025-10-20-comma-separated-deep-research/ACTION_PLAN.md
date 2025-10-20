# Comma-Separated Parsing: Actionable Implementation Plan

**Date**: 2025-10-20  
**Quest Type**: 🔀 SIDE QUEST (Infrastructure)  
**Est. Time**: 3-5 hours total  
**Risk**: Low (pure refactoring + new utilities)

---

## Quick Decision Matrix

| Option | What | Time | Impact | Risk |
|--------|------|------|--------|------|
| **A** | Complete Pattern 1 only | 1-2h | 🟡 Medium | 🟢 Low |
| **B** | Implement Pattern 2 only | 2-3h | 🟢 High | 🟢 Low |
| **C** | Both patterns (sequence) | 3-5h | 🟢 Very High | 🟢 Low |
| **D** | Skip, return to clip-path | 0h | 🔴 None | 🟢 None |

**Recommendation**: **Option B** - Implement Pattern 2 (function args) first

**Why**:
- Pattern 1 is already 33% done (4/12 properties)
- Pattern 2 is MORE important for current work (polygon uses it!)
- Pattern 2 has broader impact (gradients + shapes)
- Can finish Pattern 1 anytime (no blockers)
- Pattern 2 immediately improves polygon implementation

---

## The Two Patterns (TL;DR)

### Pattern 1: Property Layer/Stack
**What**: Top-level comma-separated values  
**Example**: `animation-name: fade, slide, bounce`  
**When**: Property syntax is `<value>#`  
**Solution**: Preprocess CSS string → split → parse each  
**Utility**: `parseCommaSeparatedSingle()` ✅ EXISTS  
**Status**: 4/12 properties refactored, needs completion

### Pattern 2: Function Arguments
**What**: Commas inside function calls  
**Example**: `polygon(50% 0%, 100% 50%, 0% 100%)`  
**When**: Function syntax has comma-separated args  
**Solution**: Split AST nodes by comma operators  
**Utility**: `splitNodesByComma()` ❌ MISSING  
**Status**: Not started, duplicated across 7 functions

---

## Recommended Plan: Implement Pattern 2 First

### Why This Order?

1. **Immediate value**: polygon() is being implemented NOW
2. **Broader impact**: Improves 7 functions vs 8 properties
3. **Higher complexity**: Pattern 2 is more interesting/valuable
4. **Pattern 1 can wait**: No blockers, can finish anytime
5. **Learning**: Pattern 2 teaches AST manipulation (valuable)

### Time Estimate: 2-3 hours

| Phase | Time | Description |
|-------|------|-------------|
| Create utility | 30 min | splitNodesByComma + helpers |
| Write tests | 45 min | 15-20 comprehensive tests |
| Refactor polygon | 20 min | Use new utility |
| Refactor linear-gradient | 20 min | Use new utility |
| Refactor radial-gradient | 20 min | Use new utility |
| Refactor conic-gradient | 20 min | Use new utility |
| Documentation | 15 min | Update docs |
| **Total** | **2h 30min** | |

---

## Implementation: Pattern 2 (Function Arguments)

### Step 1: Create Utility Function (30 min)

**File**: `src/utils/ast/split-by-comma.ts`

```typescript
import type * as csstree from "css-tree";

export interface SplitByCommaOptions {
  startIndex?: number;
  allowEmpty?: boolean;
  trimWhitespace?: boolean;
}

/**
 * Split array of AST nodes by comma operators.
 *
 * Used for parsing comma-separated function arguments.
 */
export function splitNodesByComma(
  nodes: csstree.CssNode[],
  options: SplitByCommaOptions = {}
): csstree.CssNode[][] {
  const { 
    startIndex = 0, 
    allowEmpty = false, 
    trimWhitespace = true 
  } = options;

  const groups: csstree.CssNode[][] = [];
  let currentGroup: csstree.CssNode[] = [];

  for (let i = startIndex; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node) continue;

    if (trimWhitespace && node.type === "WhiteSpace") {
      continue;
    }

    if (node.type === "Operator" && "value" in node && node.value === ",") {
      if (currentGroup.length > 0 || allowEmpty) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    } else {
      currentGroup.push(node);
    }
  }

  if (currentGroup.length > 0 || allowEmpty) {
    groups.push(currentGroup);
  }

  return groups;
}

export function skipComma(nodes: csstree.CssNode[], index: number): number {
  const node = nodes[index];
  if (node?.type === "Operator" && "value" in node && node.value === ",") {
    return index + 1;
  }
  return index;
}
```

**Create file**:
```bash
# Create utility
touch src/utils/ast/split-by-comma.ts

# Add export
echo "export * from './split-by-comma';" >> src/utils/ast/index.ts
```

### Step 2: Write Tests (45 min)

**File**: `src/utils/ast/split-by-comma.test.ts`

**Test cases** (15-20 tests):
1. Basic splitting (single node per group)
2. Multi-node groups
3. startIndex option
4. Empty groups (reject by default)
5. allowEmpty option
6. Whitespace handling
7. Edge cases (no commas, all commas, empty input)
8. skipComma helper

**Create file**:
```bash
touch src/utils/ast/split-by-comma.test.ts
```

### Step 3: Refactor Polygon (20 min)

**Before** (current code):
```typescript
// Manual comma skipping
while (idx < children.length) {
  const xNode = children[idx];
  if (!xNode) break;

  if (xNode.type === "Operator" && xNode.value === ",") {
    idx++;
    continue;
  }

  const xResult = ParseUtils.parseLengthPercentageNode(xNode);
  // ... parse x and y
  idx += 2;
}
```

**After** (with utility):
```typescript
import { splitNodesByComma } from "@/utils/ast";

// After parsing fill-rule, split remaining nodes into point pairs
const pointGroups = splitNodesByComma(children, { 
  startIndex: idx  // Start after fill-rule
});

for (const group of pointGroups) {
  if (group.length !== 2) {
    return err("Each point must have exactly 2 coordinates (x y)");
  }

  const [xNode, yNode] = group;
  const xResult = ParseUtils.parseLengthPercentageNode(xNode);
  if (!xResult.ok) return xResult;
  
  const yResult = ParseUtils.parseLengthPercentageNode(yNode);
  if (!yResult.ok) return yResult;

  points.push({ x: xResult.value, y: yResult.value });
}
```

**Benefits**:
- Clearer intent (splitting by comma is explicit)
- Less manual index manipulation
- Easier to understand
- Reusable pattern

### Step 4: Refactor Linear Gradient (20 min)

**Before** (manual comma handling):
```typescript
// Skip comma after direction
const commaNode = children[idx];
if (commaNode?.type === "Operator" && "value" in commaNode && commaNode.value === ",") {
  idx++;
}

// Parse color stops
for (; idx < children.length; idx++) {
  const node = children[idx];
  if (node.type === "Operator" && "value" in node && node.value === ",") {
    if (currentStopNodes.length > 0) {
      colorStopNodes.push(currentStopNodes);
      currentStopNodes = [];
    }
  } else {
    currentStopNodes.push(node);
  }
}
```

**After** (with utility):
```typescript
import { splitNodesByComma, skipComma } from "@/utils/ast";

// Skip comma after direction if present
idx = skipComma(children, idx);

// Split remaining nodes into color stop groups
const stopGroups = splitNodesByComma(children, { startIndex: idx });

// Parse each color stop
const colorStops: Type.ColorStop[] = [];
for (const stopNodes of stopGroups) {
  const stopResult = ColorStop.fromNodes(stopNodes);
  if (stopResult.ok) {
    colorStops.push(stopResult.value);
  } else {
    return err(`Invalid color stop: ${stopResult.error}`);
  }
}
```

### Step 5: Refactor Radial Gradient (20 min)

Same pattern as linear gradient:
1. Import utility
2. Replace manual comma loop with `splitNodesByComma()`
3. Process groups instead of manual iteration

### Step 6: Refactor Conic Gradient (20 min)

Same pattern as above.

### Step 7: Documentation (15 min)

Update:
1. Add JSDoc to utility functions
2. Update gradient parser documentation
3. Add usage examples
4. Update CONTINUE.md with new utility

---

## Testing Strategy

### Unit Tests (Utility)
```bash
pnpm test -- split-by-comma
```

**Coverage**:
- Basic splitting
- Options (startIndex, allowEmpty, trimWhitespace)
- Edge cases
- Helper functions

### Integration Tests (Existing)
```bash
pnpm test -- gradient
pnpm test -- polygon
```

**Should pass without changes** (behavior unchanged)

### Full Suite
```bash
just check && just test
```

**Should show same number of passing tests** (pure refactoring)

---

## Commit Strategy

**Atomic commits** (easy rollback):

1. `feat(utils): add splitNodesByComma utility for function argument parsing`
   - Add utility + tests
   - Export from index

2. `refactor(clip-path): use splitNodesByComma in polygon parser`
   - Update polygon.ts
   - Verify tests pass

3. `refactor(gradient): use splitNodesByComma in linear-gradient`
   - Update linear.ts
   - Verify tests pass

4. `refactor(gradient): use splitNodesByComma in radial-gradient`
   - Update radial.ts
   - Verify tests pass

5. `refactor(gradient): use splitNodesByComma in conic-gradient`
   - Update conic.ts
   - Verify tests pass

6. `docs: update documentation for comma-separated parsing utilities`
   - Update CONTINUE.md
   - Add usage examples

---

## Success Criteria

### Phase 2 Complete When:
- [x] `splitNodesByComma()` utility created
- [x] 15-20 tests written and passing
- [x] Polygon refactored
- [x] Linear gradient refactored
- [x] Radial gradient refactored
- [x] Conic gradient refactored
- [x] All existing tests still pass
- [x] Code reduction achieved (~150 lines)
- [x] Committed to git
- [x] Documentation updated

### Quality Gates
```bash
just check  # Must pass
just test   # Must show 2195 tests passing (or more)
```

---

## Alternative: Pattern 1 Completion

If you prefer to finish Pattern 1 first:

### Time: 1-2 hours

1. Commit existing helper (if not done)
2. Refactor animation-name
3. Refactor animation-delay
4. Refactor animation-duration
5. Refactor animation-direction
6. Refactor animation-fill-mode
7. Refactor animation-iteration-count
8. Refactor animation-play-state
9. Refactor animation-timing-function
10. Update docs

**Pros**:
- Completes started work
- Cleans up animation domain
- Quick wins (similar pattern)

**Cons**:
- Doesn't help polygon
- Less interesting/educational
- Lower immediate value

---

## Recommended Execution Path

### Option B (Recommended): Pattern 2 Only

```bash
# 1. Create session directory
mkdir -p .memory/archive/2025-10-20-function-comma-utility

# 2. Implement utility
# - Create split-by-comma.ts
# - Create split-by-comma.test.ts
# - Export from index

# 3. Test utility
pnpm test -- split-by-comma

# 4. Commit utility
git add src/utils/ast/
git commit -m "feat(utils): add splitNodesByComma for function argument parsing"

# 5. Refactor functions (one at a time)
# - polygon
# - linear-gradient
# - radial-gradient
# - conic-gradient

# 6. Verify after each
just check && pnpm test -- [function-name]

# 7. Commit after each
git commit -am "refactor([domain]): use splitNodesByComma in [function]"

# 8. Final verification
just check && just test

# 9. Create handover
# Document results, update CONTINUE.md

# 10. Return to main quest
# Resume clip-path polygon() session
```

### Option C: Both Patterns (Ambitious)

Do Pattern 2 first (2-3h), then Pattern 1 (1-2h).  
Total: 3-5 hours.

---

## Files to Create

### Pattern 2 (Function Arguments)
```
src/utils/ast/split-by-comma.ts        # Utility implementation
src/utils/ast/split-by-comma.test.ts   # Tests
src/utils/ast/index.ts                 # Update export
```

### Documentation
```
.memory/archive/2025-10-20-function-comma-utility/
├── RESEARCH.md                        # (already created)
├── IMPLEMENTATION_PLAN.md             # This file
└── HANDOVER.md                        # Create after completion
```

---

## Risk Assessment

**Overall Risk**: 🟢 LOW

**Why**:
- Pure refactoring (Pattern 2) or continuation (Pattern 1)
- No behavior changes
- Full test coverage exists
- Easy rollback (atomic commits)
- Can verify after each step

**Mitigations**:
- Test after each refactoring
- Commit frequently
- Keep old code in git history
- Verify full test suite before final commit

---

## Next Steps

### Decision Point

Choose one:

1. **Implement Pattern 2** (recommended)
   - Follow "Option B" execution path
   - Time: 2-3 hours
   - High value, helps polygon

2. **Complete Pattern 1**
   - Follow "Alternative" path
   - Time: 1-2 hours
   - Finishes started work

3. **Both** (ambitious)
   - Do Pattern 2, then Pattern 1
   - Time: 3-5 hours
   - Maximum impact

4. **Skip**
   - Return to clip-path main quest
   - Come back to this later

**Recommendation**: **Option 1** (Pattern 2 only)

---

## Questions to Answer

Before starting:

1. **Time available**: Do you have 2-3 hours for Pattern 2?
2. **Priority**: Is infrastructure work or feature work more important now?
3. **Energy level**: Refactoring or new features?

If answers are:
- 2-3 hours available → Pattern 2
- 1-2 hours available → Pattern 1
- <1 hour available → Skip, return to clip-path
- Want features → Skip
- Want infrastructure → Pattern 2

---

## After Completion

### Update CONTINUE.md

Add to "Quick Reference" section:

```markdown
### Comma-Separated Parsing

**Two patterns, two utilities**:

1. **Property layer** (`animation-name: a, b, c`):
   ```typescript
   import { parseCommaSeparatedSingle } from "@/utils/parse";
   const result = parseCommaSeparatedSingle(css, itemParser, "property-name");
   ```

2. **Function args** (`polygon(x y, x y, x y)`):
   ```typescript
   import { splitNodesByComma } from "@/utils/ast";
   const groups = splitNodesByComma(nodes, { startIndex: idx });
   ```
```

### Create Handover

Document:
- What was done
- Code reduction achieved
- Functions refactored
- Commits made
- Next steps (if Pattern 1 still pending)

---

**Ready to execute?** Choose your path and let's go! 🚀
