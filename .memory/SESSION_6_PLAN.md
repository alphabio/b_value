# Session 6: Focus on Real Coverage Gaps

**Current**: 86.33% | **Target**: 89% (+2.67%)

## 🎯 HIGH-VALUE TARGETS (Real Logic Gaps)

### Gradient Generators (Biggest Impact ~2%)
1. **`generate/gradient/radial.ts`** - 41.81% (58% uncovered)
   - Lines: 179-184, 191-197 uncovered
   
2. **`generate/gradient/conic.ts`** - 47.36% (53% uncovered)
   - Lines: 158-162, 164-165 uncovered
   
3. **`generate/gradient/linear.ts`** - 78.78% (21% uncovered)
   - Lines: 126, 151, 159-160 uncovered

### Position/Transform Utils (Impact ~0.7%)
4. **`generate/position/utils.ts`** - 48% (52% uncovered)
   - Lines: 72, 83-85, 96-98 uncovered
   
5. **`generate/transform/utils.ts`** - 56.47% (44% uncovered)
   - Lines: 252-253, 255-256 uncovered

### Parse Utilities (Impact ~0.5%)
6. **`utils/ast/functions.ts`** - 66.66% (33% uncovered)
   - Lines: 79-97, 142-143 uncovered

7. **`utils/parse/color-components.ts`** - 80.9% (19% uncovered)
   - Lines: 237-238, 288-289 uncovered

## ❌ DO NOT Test (Already 100% or Type Definitions)

- ❌ core/keywords/** - All at 100% via integration
- ❌ core/types/** - Type definitions (Zod schemas)
- ❌ Files already at 100%
- ❌ Index files (barrel exports - excluded)

## 📋 Why This Session is Different

**Session 5 Lesson**: Don't write tests for files already at 100%.  
**Session 6 Focus**: Only test files with ACTUAL uncovered lines.

## 🔧 Commands

```bash
# Start with gradient generators (biggest impact)
just test src/generate/gradient

# Check which lines need coverage
cat src/generate/gradient/radial.ts | sed -n '179,197p'
cat src/generate/gradient/conic.ts | sed -n '158,165p'

# Run coverage after each file
just test:coverage | grep "generate/gradient"
```

## 📊 Expected Outcome

- Gradient tests: +1.5% to +2%
- Utils tests: +0.5% to +0.7%
- **Total gain**: 2.0-2.7% → reaching 89%

