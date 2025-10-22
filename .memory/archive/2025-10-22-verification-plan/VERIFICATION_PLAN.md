# B_Value Verification Plan - "Eating Our Own Dog Food"

**Created**: 2025-10-19
**Purpose**: Comprehensive validation of b_value library by using it in real-world scenarios
**Status**: 🚧 Draft - Ready for review and execution

---

## Philosophy

**"Eat your own dog food"** = Use b_value to test b_value. This plan validates:
1. **API usability**: Is the public API intuitive and complete?
2. **Real-world fitness**: Does it handle actual CSS values from production sites?
3. **Round-trip integrity**: Parse → Generate → Parse = identical results
4. **Edge case coverage**: Does it handle malformed, unusual, or extreme inputs gracefully?
5. **Documentation accuracy**: Do examples in README/JSDoc actually work?

---

## Execution Strategy

### Phase 1: Internal Validation (Quick - 30 min)
Use b_value to validate itself by running against all test fixtures.

### Phase 2: Real-World CSS Mining (Medium - 1 hour)
Extract CSS from popular sites and validate parsing/generation.

### Phase 3: Interactive REPL (Medium - 1 hour)
Build a simple CLI tool to interactively test parsing/generation.

### Phase 4: Stress Testing (Long - 2 hours)
Generate massive datasets and validate performance/correctness.

### Phase 5: Documentation Validation (Quick - 20 min)
Run all code examples from README and JSDoc to ensure they work.

---

## Phase 1: Internal Validation

### Goal
Validate that all test fixtures can be parsed and regenerated correctly.

### Tasks

#### 1.1 Extract All CSS Test Fixtures

```bash
# Find all CSS strings in test files
grep -r "parse\(.*['\"]" test/ src/ --include="*.test.ts" > fixtures.txt

# Extract unique CSS values
node scripts/extract-fixtures.js
```

#### 1.2 Build Fixture Validator
Create `scripts/validate-fixtures.ts`:

```typescript
import { Parse, Generate } from "../src";

// For each fixture:
// 1. Parse CSS → IR
// 2. Generate IR → CSS
// 3. Re-parse CSS → IR2
// 4. Compare IR === IR2 (deep equality)
// 5. Report any mismatches
```

#### 1.3 Run Validation

```bash
pnpm tsx scripts/validate-fixtures.ts
# Expected: 100% round-trip success on all known-good fixtures
```

**Success Criteria**:
- ✅ 100% of test fixtures round-trip successfully
- ✅ No IR differences after round-trip
- ✅ Generated CSS is valid (parseable)

---

## Phase 2: Real-World CSS Mining

### Goal
Validate against CSS from production websites.

### Tasks

#### 2.1 Collect CSS Samples

```bash
# Popular sites to test
sites=(
  "https://github.com"
  "https://tailwindcss.com"
  "https://stripe.com"
  "https://airbnb.com"
  "https://netflix.com"
)

# Extract computed styles from browser
node scripts/mine-css.js
```

#### 2.2 Build CSS Miner
Create `scripts/mine-css.ts`:

```typescript
// Use Puppeteer/Playwright to:
// 1. Visit each site
// 2. Extract all computed styles
// 3. Filter for properties we support
// 4. Save to JSON
```

#### 2.3 Build Real-World Validator
Create `scripts/validate-real-world.ts`:

```typescript
import { Parse, Generate } from "../src";

// For each real-world CSS value:
// 1. Try to parse
// 2. If successful, generate and re-parse
// 3. Track success/failure rates by property type
// 4. Report failures with details
```

#### 2.4 Run Real-World Validation

```bash
pnpm tsx scripts/validate-real-world.ts
# Expected: >95% success rate on supported properties
```

**Success Criteria**:
- ✅ >95% parse success rate for supported properties
- ✅ 100% round-trip success on successfully parsed values
- ✅ Clear error messages for unsupported values
- ✅ No crashes on malformed input

---

## Phase 3: Interactive REPL

### Goal
Build a CLI tool for manual exploration and testing.

### Tasks

#### 3.1 Build REPL Tool
Create `scripts/repl.ts`:

```typescript
#!/usr/bin/env node
import { Parse, Generate } from "../src";
import readline from "readline";

// Interactive REPL:
// > parse gradient radial-gradient(circle, red, blue)
// > generate gradient { kind: "radial", ... }
// > roundtrip gradient radial-gradient(...)
// > help
// > exit
```

#### 3.2 Add to package.json

```json
{
  "scripts": {
    "repl": "tsx scripts/repl.ts"
  },
  "bin": {
    "b_value": "./scripts/repl.ts"
  }
}
```

#### 3.3 Test REPL Manually

```bash
pnpm repl
> parse gradient radial-gradient(circle at center, red 0%, blue 100%)
> generate gradient <paste IR>
> roundtrip gradient radial-gradient(...)
```

**Success Criteria**:
- ✅ Parse command works for all property types
- ✅ Generate command works for all IR types
- ✅ Roundtrip command validates bidirectional conversion
- ✅ Error messages are clear and actionable
- ✅ Help text is comprehensive

---

## Phase 4: Stress Testing

### Goal
Validate performance and correctness at scale.

### Tasks

#### 4.1 Build Stress Test Generator
Create `scripts/stress-test.ts`:

```typescript
// Generate massive datasets:
// 1. 10,000 random gradients
// 2. 10,000 random colors
// 3. 10,000 random transforms
// 4. 10,000 random positions
// etc.
```

#### 4.2 Build Stress Test Validator

```typescript
// For each generated value:
// 1. Parse → Generate → Parse
// 2. Validate round-trip integrity
// 3. Measure parse/generate performance
// 4. Track memory usage
```

#### 4.3 Run Stress Tests

```bash
pnpm tsx scripts/stress-test.ts
# Expected: 100% round-trip success, <10ms avg per value
```

**Success Criteria**:
- ✅ 100% round-trip success on generated values
- ✅ <10ms average parse time
- ✅ <1ms average generate time
- ✅ No memory leaks over 10,000 iterations
- ✅ No crashes on edge cases

---

## Phase 5: Documentation Validation

### Goal
Ensure all code examples in documentation actually work.

### Tasks

#### 5.1 Extract Code Examples

```bash
# Extract all TypeScript code blocks from README
node scripts/extract-examples.js README.md > examples.ts

# Extract all @example blocks from JSDoc
node scripts/extract-jsdoc-examples.js src/ > jsdoc-examples.ts
```

#### 5.2 Build Example Validator
Create `scripts/validate-examples.ts`:

```typescript
// For each code example:
// 1. Execute in isolated environment
// 2. Verify output matches expected (if present)
// 3. Report any errors or type issues
```

#### 5.3 Run Example Validation

```bash
pnpm tsx scripts/validate-examples.ts
# Expected: 100% of examples execute without errors
```

**Success Criteria**:
- ✅ 100% of README examples work
- ✅ 100% of JSDoc examples work
- ✅ No type errors in examples
- ✅ Examples use latest API patterns

---

## Metrics to Track

### Parse Success Rate

```
Parse Success Rate = (Successful Parses / Total Attempts) * 100
Target: >98% for known-good input, >95% for real-world input
```

### Round-Trip Integrity

```
Round-Trip Success = (Identical IR / Successful Parses) * 100
Target: 100% (any failure is a bug)
```

### Generate Validity

```
Generate Validity = (Valid CSS / Total Generations) * 100
Target: 100% (generated CSS must be parseable)
```

### Performance

```
Parse Time = avg(parse_duration) across all inputs
Generate Time = avg(generate_duration) across all inputs
Target: <10ms parse, <1ms generate (95th percentile)
```

### Coverage

```
Property Coverage = (Properties Supported / Properties Tested) * 100
Target: 100% of implemented properties work correctly
```

---

## Implementation Priority

### Immediate (Do First)
1. **Phase 1**: Internal validation (30 min) - Validates existing tests
2. **Phase 5**: Documentation validation (20 min) - Ensures examples work

### Short-Term (This Week)
3. **Phase 3**: Interactive REPL (1 hour) - Manual testing tool
4. **Phase 2**: Real-world CSS mining (1 hour) - Production validation

### Long-Term (Next Sprint)
5. **Phase 4**: Stress testing (2 hours) - Performance and edge cases

---

## Script Structure

```
scripts/
├── extract-fixtures.ts        # Extract all test fixtures
├── validate-fixtures.ts       # Validate test fixtures round-trip
├── mine-css.ts                # Extract CSS from websites
├── validate-real-world.ts     # Validate real-world CSS
├── repl.ts                    # Interactive REPL
├── stress-test.ts             # Generate and validate at scale
├── extract-examples.ts        # Extract code examples from docs
├── validate-examples.ts       # Validate documentation examples
└── shared/
    ├── types.ts               # Common types
    ├── fixtures.ts            # Fixture loading utilities
    └── metrics.ts             # Metrics tracking
```

---

## Integration with CI/CD

Add to `.github/workflows/ci.yml`:

```yaml
- name: Validate Fixtures
  run: pnpm tsx scripts/validate-fixtures.ts

- name: Validate Documentation Examples
  run: pnpm tsx scripts/validate-examples.ts

- name: Stress Test (Nightly Only)
  if: github.event_name == 'schedule'
  run: pnpm tsx scripts/stress-test.ts
```

---

## Success Definition

This verification plan succeeds when:

1. ✅ **100% fixture round-trip**: All test fixtures parse and regenerate identically
2. ✅ **>95% real-world success**: Real-world CSS parses successfully (for supported properties)
3. ✅ **100% documentation accuracy**: All examples in README and JSDoc execute without errors
4. ✅ **<10ms parse performance**: 95th percentile parse time under 10ms
5. ✅ **<1ms generate performance**: 95th percentile generate time under 1ms
6. ✅ **Zero crashes**: No crashes on any input (malformed or otherwise)
7. ✅ **Clear error messages**: All parse failures return actionable error messages

---

## Known Limitations

### Not in Scope
- **Shorthand properties**: b_value handles individual values only (use b_short for shorthands)
- **Browser compatibility**: We follow CSS specs, not browser quirks
- **Vendor prefixes**: Not supported (-webkit-, -moz-, etc.)

### Expected Failures
- **Unsupported properties**: Will fail gracefully with clear error message
- **Malformed CSS**: Will return error Result, not crash
- **Browser-specific syntax**: May not parse (e.g., Chrome-only features)

---

## Next Steps

1. **Review this plan** - Ensure approach makes sense
2. **Prioritize phases** - Which to do first?
3. **Implement Phase 1** - Start with internal validation
4. **Iterate based on findings** - Adjust plan as we learn

---

## Questions to Consider

1. Should we add fuzzing (random input generation)?
2. Should we validate against W3C test suites?
3. Should we benchmark against other parsers (css-tree, postcss)?
4. Should we create a browser extension for live CSS mining?
5. Should we build a visual diff tool for round-trip failures?

---

## Resources Needed

- **Time**: ~5 hours total for all phases
- **Tools**: Puppeteer/Playwright for CSS mining
- **Data**: Production websites for real-world validation
- **Infrastructure**: CI/CD integration for automated validation

---

## Tracking Progress

Use this checklist to track implementation:

### Phase 1: Internal Validation
- [ ] Extract test fixtures script
- [ ] Validate fixtures script
- [ ] Run validation and fix issues
- [ ] Document results

### Phase 2: Real-World CSS Mining
- [ ] CSS miner script (Puppeteer)
- [ ] Real-world validator script
- [ ] Collect samples from 5+ sites
- [ ] Run validation and analyze failures
- [ ] Document findings

### Phase 3: Interactive REPL
- [ ] REPL script with commands
- [ ] Add to package.json
- [ ] Test all commands manually
- [ ] Document usage

### Phase 4: Stress Testing
- [ ] Stress test generator
- [ ] Stress test validator
- [ ] Run 10K+ iterations
- [ ] Document performance metrics

### Phase 5: Documentation Validation
- [ ] Extract README examples
- [ ] Extract JSDoc examples
- [ ] Example validator script
- [ ] Fix any broken examples
- [ ] Document results

### Integration
- [ ] Add scripts to justfile
- [ ] Add to CI/CD pipeline
- [ ] Document in README
- [ ] Create badge for verification status

---

**End of Verification Plan**
