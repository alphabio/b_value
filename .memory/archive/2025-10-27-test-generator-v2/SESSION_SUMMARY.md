
---

## 🎯 Next Session: Pivot to Generate Testing

### Decision: Option 2 Selected ✅

**Rationale**:
1. **Symmetry matters** - parse without generate is half the story
2. **Animation complete** - perfect time to prove the full cycle
3. **New challenge** - generate testing is unexplored, higher value
4. **ROI** - roundtrip tests validate both directions
5. **Context available** - enough to design generate workflow

### Proposed Plan

**Phase 1: Setup**

```bash
# 1. Rename existing generator
mv scripts/generate-tests.ts scripts/generate-parse-tests.ts
mv scripts/test-generator/ scripts/parse-test-generator/

# 2. Create inverse generator
scripts/generate-generate-tests.ts
  └─ Inputs: IR objects (from configs)
     Runs: generate() function
     Validates: CSS output matches expected
     Roundtrip: parse(generate(IR)) === IR
```

**Phase 2: Pilot (animation-duration)**
- Simplest property to validate approach
- Already has parse tests
- Define config format for generate tests
- Validate roundtrip: `parse(generate({value:1,unit:"s"})) === input`

**Phase 3: Animation Package**
- Apply to all 7 animation properties
- Prove generate-tests.ts workflow
- Document patterns

**Phase 4: Master Plan** (future)
Create `.memory/PROPERTY_COMPLETION_PLAN.md`:

```
Property | Parse Tests | Generate Tests | Roundtrip
---------|-------------|----------------|----------
duration | ✅          | [ ]            | [ ]
delay    | ✅          | [ ]            | [ ]
...
```

Then return to remaining parse properties with dual-generator approach.

---

## 📦 Handover for Next Session

**Files to review**:
- `scripts/generate-tests.ts` - rename to `generate-parse-tests.ts`
- `scripts/test-generator/` - rename to `parse-test-generator/`
- Animation parsers in `src/parse/animation/` - have generate counterparts
- This summary for context

**First task**: Design generate test config format and pilot on duration

**Context**: 89% used, clean state, all tests passing

---

**Session end**: 2025-10-27T15:47:00Z
