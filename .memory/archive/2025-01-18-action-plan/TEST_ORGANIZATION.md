# Test Organization Strategy

## Philosophy

**Keep tests focused and organized by concern.** Separate parsing tests from generation tests, with dedicated round-trip integration tests.

## Structure

### 1. Parse Tests (`*.parse.test.ts`)

Located next to the parser implementation, these tests focus on **CSS → IR** transformation:

```
src/parse/gradient/
├── radial.ts              # Parser implementation
├── radial.parse.test.ts   # Parser tests ← Focus on parsing
└── color-stop.ts          # Helper parser
```

**Purpose**: Validate that CSS strings are correctly parsed into structured IR objects.

**Example**:
```typescript
// radial.parse.test.ts
it("should parse simple radial gradient", () => {
  const css = "radial-gradient(red, blue)";
  const result = RadialParser.parse(css);
  
  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.value.kind).toBe("radial");
    expect(result.value.colorStops).toHaveLength(2);
  }
});
```

### 2. Generate Tests (`*.generate.test.ts`)

Located next to the generator implementation, these tests focus on **IR → CSS** transformation:

```
src/generate/gradient/
├── radial.ts                  # Generator implementation
├── radial.generate.test.ts    # Generator tests ← Focus on generation
└── color-stop.ts              # Helper generator
```

**Purpose**: Validate that IR objects are correctly stringified into CSS.

**Example**:
```typescript
// radial.generate.test.ts
it("should generate simple radial gradient", () => {
  const ir = {
    kind: "radial" as const,
    colorStops: [{ color: "red" }, { color: "blue" }],
    repeating: false,
  };
  
  const css = RadialGenerator.toCss(ir);
  expect(css).toBe("radial-gradient(red, blue)");
});
```

### 3. Round-Trip Tests (`*.roundtrip.test.ts`)

Located with parse tests (since they start with parsing), these are **integration tests** that validate **CSS → IR → CSS**:

```
src/parse/gradient/
├── radial.ts                    # Parser implementation
├── radial.parse.test.ts         # Parser tests
├── radial.roundtrip.test.ts     # Integration tests ← Full cycle
└── color-stop.ts                # Helper parser
```

**Purpose**: Ensure bidirectional transformation preserves semantics and produces valid CSS.

**Example**:
```typescript
// radial.roundtrip.test.ts
it("should round-trip simple gradient", () => {
  const original = "radial-gradient(red, blue)";
  const parsed = RadialParser.parse(original);
  
  expect(parsed.ok).toBe(true);
  if (parsed.ok) {
    const generated = RadialGenerator.toCss(parsed.value);
    expect(generated).toBe(original);
  }
});
```

## Benefits of This Structure

1. **Focused Tests**: Each file tests one concern (parse, generate, or round-trip)
2. **Clear Intent**: File name indicates what's being tested
3. **Easy Navigation**: Find parser tests next to parser, generator tests next to generator
4. **Maintainability**: Changes to parser only require updating parse tests
5. **Parallel Development**: Different developers can work on parse/generate independently

## Test Count Distribution

For radial gradients (example):
- **Parse tests**: 10 tests (various CSS input scenarios)
- **Generate tests**: 12 tests (various IR configurations)
- **Round-trip tests**: 10 tests (bidirectional validation)
- **Total**: 32 tests

## Naming Convention

| Test Type | File Pattern | Location | Example |
|-----------|-------------|----------|---------|
| Parse | `<feature>.parse.test.ts` | `src/parse/<category>/` | `radial.parse.test.ts` |
| Generate | `<feature>.generate.test.ts` | `src/generate/<category>/` | `radial.generate.test.ts` |
| Round-trip | `<feature>.roundtrip.test.ts` | `src/parse/<category>/` | `radial.roundtrip.test.ts` |

## Guidelines

### Parse Tests Should Cover:
- ✅ Valid CSS syntax variations
- ✅ Optional parameters (with and without)
- ✅ Keyword variations
- ✅ Different value types (lengths, percentages, etc.)
- ✅ Error cases (invalid syntax, missing required values)
- ✅ Edge cases (single values that default to pairs, etc.)

### Generate Tests Should Cover:
- ✅ Minimal IR (required fields only)
- ✅ Full IR (all optional fields)
- ✅ Different value representations
- ✅ Edge cases (empty arrays, zero values, etc.)
- ✅ All shape/size/position combinations

### Round-Trip Tests Should Cover:
- ✅ Simple cases (baseline functionality)
- ✅ Complex cases (all features combined)
- ✅ Edge cases that might lose information
- ✅ Normalization behavior (e.g., "center" → "center center")

## Anti-Patterns to Avoid

❌ **Don't mix concerns**:
```typescript
// BAD: Parse test that also tests generation
it("should parse and generate", () => {
  const parsed = parse(css);
  const generated = generate(parsed.value);
  // Testing two things!
});
```

✅ **Do separate concerns**:
```typescript
// GOOD: Dedicated round-trip test
it("should round-trip complex gradient", () => {
  const original = "radial-gradient(...)";
  const parsed = parse(original);
  const generated = generate(parsed.value);
  expect(generated).toBe(original);
});
```

❌ **Don't duplicate tests**:
- Parse tests shouldn't test generation
- Generate tests shouldn't test parsing
- Round-trip tests are the only place both are tested together

✅ **Do focus each test**:
- Parse tests: CSS input → IR validation
- Generate tests: IR input → CSS validation
- Round-trip tests: CSS → IR → CSS validation

## Running Tests

```bash
# Run all tests
pnpm test

# Run only parse tests
pnpm test parse.test

# Run only generate tests
pnpm test generate.test

# Run only round-trip tests
pnpm test roundtrip.test

# Run tests for specific feature
pnpm test radial

# Watch mode
pnpm test:watch
```

## Future Additions

When adding new features (e.g., linear gradients):

1. Create parser: `src/parse/gradient/linear.ts`
2. Add parse tests: `src/parse/gradient/linear.parse.test.ts` (10+ tests)
3. Create generator: `src/generate/gradient/linear.ts`
4. Add generate tests: `src/generate/gradient/linear.generate.test.ts` (10+ tests)
5. Add round-trip tests: `src/parse/gradient/linear.roundtrip.test.ts` (8+ tests)

Follow the same pattern for consistency across the codebase.
