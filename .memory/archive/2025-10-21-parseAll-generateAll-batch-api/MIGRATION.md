# Migration Guide: Strong Typing for Issue System

**Status**: BREAKING CHANGE - Requires code updates  
**Affected**: All `parseErr()` and `generateErr()` calls

---

## ⚠️ Breaking Changes

### 1. parseErr() signature changed

**Old**:
```typescript
parseErr(message: string, options?: {...})
```

**New**:
```typescript
parseErr(code: IssueCode, message: string, options?: {...})
```

### 2. generateErr() signature changed

**Old**:
```typescript
generateErr(message: string, options?: {...})
```

**New**:
```typescript
generateErr(code: IssueCode, message: string, options?: {...})
```

### 3. Issue type updated

**Old**:
```typescript
type Issue = {
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
  ...
}
```

**New**:
```typescript
type Issue = {
  code: IssueCode;  // ← NEW REQUIRED FIELD
  property?: CSSPropertyName;  // ← Now strongly typed
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
  ...
}
```

---

## 🔧 Migration Steps

### Step 1: Update All parseErr() Calls

Find all: `parseErr("`
Replace pattern:
```typescript
// Before
parseErr("Invalid value")

// After
parseErr("invalid-value", "Invalid value")

// Before with options
parseErr("Empty value", { suggestion: "Provide a value" })

// After with options
parseErr("invalid-syntax", "Empty value", { suggestion: "Provide a value" })
```

**Code examples to update**:

```typescript
// src/parse/clip-path/clip-path.ts
- if (!ast.children) return parseErr("Empty value");
+ if (!ast.children) return parseErr("invalid-syntax", "Empty value");

- if (!first) return parseErr("Empty value");
+ if (!first) return parseErr("invalid-syntax", "Empty value");

// src/parse/transform/transform.ts
- return parseErr(errors.join("; "));
+ return parseErr("invalid-value", errors.join("; "));

- return parseErr("No valid transform functions found in CSS string", {
+ return parseErr("invalid-syntax", "No valid transform functions found in CSS string", {

- return parseErr(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
+ return parseErr("invalid-syntax", `Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
```

###Step 2: Update All generateErr() Calls

Find all: `generateErr("`
Replace pattern:
```typescript
// Before
generateErr("Invalid IR: missing 'kind' field")

// After
generateErr("missing-required-field", "Invalid IR: missing 'kind' field")

// Before  
generateErr(`Unknown kind: ${kind}`)

// After
generateErr("unsupported-kind", `Unknown kind: ${kind}`)
```

**Code examples to update**:

```typescript
// All generate modules (animation, border, clip-path, color, etc.)
- return generateErr("Invalid X IR: missing 'kind' field");
+ return generateErr("missing-required-field", "Invalid X IR: missing 'kind' field");

- return generateErr(`Unknown X kind: ${kind}`);
+ return generateErr("unsupported-kind", `Unknown X kind: ${kind}`);

// src/generate/transform/transform-generate.ts
- return generateErr("Invalid transform IR: must be an array");
+ return generateErr("invalid-ir", "Invalid transform IR: must be an array");

- return generateErr("Transform array cannot be empty");
+ return generateErr("invalid-ir", "Transform array cannot be empty");

- return generateErr(`Failed to generate transform: ${e}`);
+ return generateErr("invalid-ir", `Failed to generate transform: ${e}`);
```

### Step 3: Update Module API Dispatchers

```typescript
// src/parse/animation/animation.ts
- return parseErr("Invalid animation property value");
+ return parseErr("invalid-value", "Invalid animation property value");

// src/parse/background/background.ts
- return parseErr("Invalid background property value");
+ return parseErr("invalid-value", "Invalid background property value");

// src/parse/border/border.ts
- return parseErr("Invalid border property value");
+ return parseErr("invalid-value", "Invalid border property value");
```

### Step 4: Use Issue Helpers (Recommended)

Instead of calling `parseErr` directly, use the new `Issues` helpers:

```typescript
import { Issues } from "./core/result";

// Before
parseErr("invalid-value", `Invalid value '${val}' for property '${prop}'`, {
  property: prop,
  suggestion: "..."
});

// After (cleaner!)
Issues.invalidValue(prop, val);

// Available helpers:
Issues.duplicateProperty(property, count);
Issues.invalidValue(property, value);
Issues.shorthandNotSupported(property, longhands);
Issues.unknownProperty(property);
Issues.invalidSyntax(message, location);
Issues.deprecatedSyntax(property, message, suggestion);
Issues.legacySyntax(property, message, suggestion);
```

---

## 📋 IssueCode Reference

Use these codes when calling `parseErr()` or `generateErr()`:

### Parse Errors
- `"invalid-value"` - Property value doesn't match expected format
- `"unknown-property"` - CSS property not recognized
- `"shorthand-not-supported"` - Shorthand property detected (use b_short)
- `"invalid-syntax"` - Malformed CSS syntax
- `"missing-value"` - Required value missing

### Parse Warnings
- `"duplicate-property"` - Property declared multiple times
- `"deprecated-syntax"` - Using deprecated CSS syntax
- `"legacy-syntax"` - Using legacy syntax (still works)

### Generate Errors
- `"invalid-ir"` - IR object structure is invalid
- `"missing-required-field"` - Required field missing from IR
- `"unsupported-kind"` - IR kind field has unsupported value

---

## 🔍 Find & Replace Script

```bash
# Find all parseErr calls without code
rg 'parseErr\("(?!invalid|unknown|shorthand|missing|duplicate|deprecated|legacy)' src/

# Find all generateErr calls without code
rg 'generateErr\("(?!invalid|missing|unsupported)' src/

# Count total updates needed
rg 'parseErr\("|generateErr\("' src/ | wc -l
```

---

## ✅ Verification

After migration:

```bash
# Should pass with no type errors
pnpm run typecheck

# Should pass all tests
pnpm test

# Should pass lint
just check
```

---

## 🎯 Benefits After Migration

✅ **Type Safety**: TypeScript catches missing/invalid codes  
✅ **Consistency**: All issues follow same structure  
✅ **Filtering**: Easy to filter by `code` in user code  
✅ **Documentation**: Self-documenting error categories  
✅ **Tooling**: IDE autocomplete for codes  

---

**See SCHEMA.md for complete type definitions.**
