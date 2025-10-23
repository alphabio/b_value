# Testing Conventions

## Type Safety in Tests

### Using `as any` for Invalid Input Tests

**Pattern**: Testing error cases requires passing invalid inputs that TypeScript would normally reject.

**Convention**: Use `as any` with biome-ignore comment:

```typescript
test("should error on null", () => {
  // biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
  const result = generate(null as any);
  expect(result.ok).toBe(false);
});
```

**Why this is OK**:
- Testing error handling **requires** passing invalid inputs
- The whole point is to verify runtime validation
- TypeScript's compile-time checks don't help here
- `as any` is the correct tool for this job

**Where to use**:
- ✅ Testing null/undefined inputs
- ✅ Testing wrong types (string instead of object)
- ✅ Testing missing required fields
- ✅ Testing invalid enum values

**Where NOT to use**:
- ❌ Production code
- ❌ Valid test cases
- ❌ Working around real type errors
