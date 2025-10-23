# ⚡ SESSION START PROTOCOL (OPTIMIZED)

**Goal**: Get to work in <30 seconds, not 3 minutes.

---

## 🚀 INSTANT START (Run This First)

```bash
# ONE command to get baseline + context
cd /Users/alphab/Dev/LLM/DEV/b_value && \
just test 2>&1 | tail -3 && \
echo "📊 Coverage Status:" && \
pnpm test:coverage 2>&1 | grep "Coverage for" && \
echo "📁 Branch:" && git branch --show-current && \
echo "🎯 Next Task:" && tail -5 .memory/SESSION_NEXT.md
```

**Expected output**:
- ✅ Test count (should be ~2149+)
- 📊 Coverage % (tracking toward 90%)
- 📁 Current branch (probably `coverage/90-percent`)
- 🎯 What to do next

---

## 📋 SESSION_NEXT.md (THE ONLY FILE TO READ)

After each session, write this file:

```markdown
# Next Session: Continue Here

**Current Coverage**: XX.XX%
**Tests Added This Session**: +NN tests
**Last Completed**: [description]

## 🎯 NEXT TASK (Do This Immediately)

[Specific next batch/file to test]

## 📊 Progress Tracking

- Phase 1 Quick Wins: [X/25 batches]
- Coverage: 69.22% → XX.XX% (+X.XX%)
```

---

## 🚫 STOP DOING THESE (Waste Time)

❌ Reading STATUS.md (too long)  
❌ Reading EXECUTE_90_PERCENT.md (reference only)  
❌ Checking git log (24h history)  
❌ Running full coverage report first  
❌ Searching for recent archives

**Why**: All you need is:
1. Tests passing? ✅
2. Current coverage? XX.XX%
3. What's next? See SESSION_NEXT.md

---

## ✅ EFFICIENT WORKFLOW

### First Message (30 seconds)
1. Run instant start command
2. Read SESSION_NEXT.md (5 lines)
3. Start working

### Working (Batches)
1. Pick next file from SESSION_NEXT.md
2. Create test file (copy existing pattern)
3. Run: `pnpm vitest src/path/to/file.test.ts --run`
4. Fix if needed
5. Commit: `git add . && git commit -m "test(module): +N tests"`
6. Repeat 5-10 times

### End of Session (2 minutes)
1. Run full test suite: `just test`
2. Get coverage: `pnpm test:coverage 2>&1 | grep "Coverage for"`
3. Update SESSION_NEXT.md
4. Commit: `git add .memory/SESSION_NEXT.md && git commit -m "docs: session handover"`

---

## 📝 TEST FILE TEMPLATE (Copy This)

```typescript
import { describe, expect, test } from "vitest";
import { generate } from "./file-name";

describe("property-name generator", () => {
  test("should generate valid value", () => {
    const result = generate("keyword");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe("keyword");
  });

  test("should error on null", () => {
    // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
    const result = generate(null as any);
    expect(result.ok).toBe(false);
  });

  test("should error on undefined", () => {
    // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
    const result = generate(undefined as any);
    expect(result.ok).toBe(false);
  });
});
```

---

## 🎯 THE GOAL

**Every session should**:
- Start working in <30 seconds
- Add 20-40 tests (4-8 files)
- Commit 5-10 times
- Leave clear "next task" for next session

**No session should**:
- Spend >1 minute reading documentation
- Run coverage report more than 2x (start + end)
- Re-verify things that are already passing
- Write long planning documents

---

**Last Updated**: 2025-10-23  
**Philosophy**: Measure once, cut many times. Context → Action.
