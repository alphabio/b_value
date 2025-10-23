# ADR: System Color Keywords - Deprecated vs Supported

**Status**: Proposed  
**Date**: 2025-10-23  
**Context**: CSS Color Module Level 4 deprecated many system colors

## Problem

CSS system colors have two categories:
1. **Supported** (19 keywords) - Active in CSS Color Level 4
2. **Deprecated** (~30 keywords) - From CSS2, now obsolete

Currently, our schema treats all system colors equally, which is incorrect per spec.

## Decision

**NOT fixing now** - Coverage goal (89%) is priority. This is technical debt.

## Future Implementation

When we fix this (post-89% coverage):

```typescript
export const deprecatedSystemColorKeywordsSchema = z.union([
  z.literal("ActiveBorder"),
  z.literal("ActiveCaption"),
  z.literal("AppWorkspace"),
  // ... 30 deprecated keywords
]);

export const supportedSystemColorKeywordsSchema = z.union([
  z.literal("AccentColor"),
  z.literal("Canvas"),
  // ... 19 supported keywords
]);

export const systemColorKeywordsSchema = z.union([
  supportedSystemColorKeywordsSchema,
  deprecatedSystemColorKeywordsSchema,
]).describe("All system colors (includes deprecated)");
```

## References

- [MDN: system-color](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color)
- [CSS Color Level 4 Spec](https://www.w3.org/TR/css-color-4/#css-system-colors)

## Source of Truth

- `/Users/alphab/Dev/LLM/DEV/mdm-data/css` - Always check specs here
