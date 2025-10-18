# Instructions for LLMs

## 📚 Library Development Context

This is a **TypeScript library** project, not an application. Focus on:
- **API Design** - Clean, intuitive public interfaces
- **Tree Shaking** - Ensure exports are easily optimizable
- **Documentation** - Comprehensive JSDoc for all public APIs
- **Cross-Platform** - Works in Node.js and browsers
- **Performance** - Minimal overhead, efficient implementations

## 🔍 Essential Reading

- Use `llm_map.txt` for project structure overview
- Check existing utility files in `src/utils/` and `src/types/`
- Review `tsup.config.ts` for build configuration
- Examine `package.json` for library metadata and scripts

## 📝 Code Guidelines

### Library-Specific Requirements

- **Entry Points** - All public APIs must go through `src/index.ts`
- **JSDoc Required** - Every public function/interface needs comprehensive documentation
- **Error Handling** - Provide meaningful error messages for invalid inputs
- **Type Safety** - Use strict TypeScript with proper type annotations
- **No Side Effects** - Pure functions unless explicitly documented

### Zod-First Class (Schema-Driven Development)

When adding new utilities that require input validation or complex data structures:

- **Schema as Source of Truth** - Define Zod schemas first for any structured data
- **Derived Types** - Use `z.infer<typeof Schema>` for TypeScript types instead of hand-writing interfaces
- **Runtime Validation** - Export both the schema and parsed types for consumers
- **Enum Derivation** - For closed sets of values, derive TS enums from `z.enum` or `z.union`

**Example Pattern:**

```typescript
// 1. Define schema first
export const UserSchema = z.object({
  id: z.number(),
  status: z.enum(['active', 'inactive', 'pending'])
});

// 2. Derive types (never hand-write these)
export type User = z.infer<typeof UserSchema>;
export type UserStatus = z.infer<typeof UserSchema>['status'];

// 3. Export for consumers
export { UserSchema as userSchema };
```

### TypeScript Best Practices

- Use modern TS syntax: `string[]`, not `Array<string>`
- Prefer `readonly` for arrays/objects that shouldn't be mutated
- Use `const` assertions for immutable values
- Leverage `unknown` and type guards over `any`
- Keep interfaces simple and composable

### Code Organization

- **Barrel Exports** - Use index files to organize API surface
- **Single Responsibility** - One utility per file when possible
- **Consistent Naming** - Follow existing naming conventions
- **Import Organization** - Group imports logically (external, internal, relative)

### Import/Export Rules

- **Always use index.ts** - All public APIs must go through `src/index.ts` as the main entry point
- **Barrel Export Pattern** - Use `export * from "./filename"` in index files to re-export from modules
- **Namespace Import Pattern** - Use `import * as Name from "./module"` for importing from other modules
- **No Direct Exports** - Avoid exporting directly from module files, always go through index.ts

**Example Pattern:**

```typescript
// src/utils/schema.ts
export const UserSchema = z.object({ /* ... */ });

// src/utils/index.ts
export * from "./schema";

// src/index.ts
export * from "./utils";
```

**Import Example:**

```typescript
// In consuming code - Use namespace imports for better organization
import * as Utils from "./utils";
import * as Types from "./types";
```

## 🚫 Restrictions

- **No Framework Dependencies** - Keep the library pure TypeScript
- **No Node.js Specific APIs** - Ensure browser compatibility
- **No Global State** - Functions should be stateless and pure
- **No Breaking Changes** - Maintain backward compatibility

## ✅ Quality Standards

- **Test Coverage** - All utilities should have usage examples
- **Performance** - Efficient implementations with minimal overhead
- **Documentation** - README examples for every major feature
- **Build Verification** - Ensure `just build` completes successfully

## 🎯 Development Workflow

1. **Understand Context** - Read existing code before making changes
2. **Follow Patterns** - Match existing code style and structure
3. **Add Documentation** - JSDoc for new public APIs
4. **Update Exports** - Add new utilities to `src/index.ts`
5. **Test Build** - Verify `just build` works after changes
6. **Update README** - Add examples for new features
7. **Quality Check** - Run `just check` to verify type safety and linting
8. **Final Test** - Run `just build` to ensure everything compiles correctly

## 🚀 Publishing Considerations

- **Semantic Versioning** - Follow semver for API changes
- **Changelog** - Document breaking changes and new features
- **Bundle Size** - Keep exports minimal to reduce consumer bundle size
- **Type Definitions** - Ensure `.d.ts` files are accurate and complete

---
