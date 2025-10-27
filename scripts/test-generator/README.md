# Test Generator

**Auto-generate comprehensive test files from test case definitions**

## 🎯 Purpose

Replace tedious "write test → run → see error → fix → repeat" cycle with:
1. Define test cases
2. Run & validate all at once
3. Auto-generate complete test file

## 📦 Usage

```bash
# Generate tests for a property
tsx scripts/generate-tests.ts duration

# Output:
# - scripts/test-generator/duration-results.json (raw results)
# - test/parse/animation/duration.test.ts (generated tests)
```

## ✅ Proven Results

**duration property** (first implementation):
- ✅ 24 tests generated automatically
- ✅ 13 valid cases + 11 invalid cases
- ✅ All passing on first run
- ⚡ ~5 minutes vs ~30+ minutes manual

## 📝 Adding New Properties

Edit `scripts/generate-tests.ts` and add to `PROPERTY_CONFIGS`:

```typescript
"your-property": {
    importPath: "../src/parse/your/property.js",
    cases: [
        // Valid cases
        { input: "value", description: "description", category: "valid-basic" },
        
        // Invalid cases
        { input: "bad", description: "description", category: "invalid-xyz" },
    ],
}
```

## 🏗️ Generated Test Structure

```typescript
describe("parse/animation/property", () => {
    describe("valid cases", () => {
        describe("valid-basic", () => { ... });
        describe("valid-keyword", () => { ... });
        // ... grouped by category
    });
    
    describe("invalid cases", () => {
        describe("invalid-negative", () => { ... });
        describe("invalid-unit", () => { ... });
        // ... grouped by category
    });
});
```

## 🎨 Category Naming Convention

**Valid cases**:
- `valid-basic` - Basic usage
- `valid-keyword` - Keyword values
- `valid-edge` - Edge cases (zero, etc)
- `valid-decimal` - Decimal values
- `valid-large` - Large values
- `valid-list` - Multiple values

**Invalid cases**:
- `invalid-negative` - Negative values
- `invalid-unit` - Wrong units
- `invalid-empty` - Empty/missing values
- `invalid-comma` - Comma issues
- `invalid-keyword` - Wrong keywords

## 📊 Results JSON

The results file contains the raw parser output for each test case:

```json
[
  {
    "input": "1s",
    "description": "single time value in seconds",
    "category": "valid-basic",
    "output": { "ok": true, "value": {...} },
    "success": true
  }
]
```

Useful for:
- Manual review before test generation
- Documentation
- Debugging parser behavior
- Sharing with team

## 🔄 Next Properties to Generate

Priority queue (based on test coverage needs):
1. ✅ `duration` - Complete
2. `timing-function` - Most complex, highest impact
3. `delay` - Similar to duration
4. `iteration-count` - Numbers + infinite
5. `direction` - Simple keywords
6. `fill-mode` - Simple keywords
7. `play-state` - Simple keywords

## 💡 Tips

1. **Start small** - Test with 5-10 cases first
2. **Review output** - Check results.json before generating tests
3. **Categories matter** - Good categories = good test organization
4. **Error messages** - Script extracts key terms automatically
5. **Iterate** - Add more cases as you discover edge cases
