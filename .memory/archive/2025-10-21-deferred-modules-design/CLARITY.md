# CLARITY: What b_value Actually Is

**Date**: 2025-10-21T07:54:52Z  
**Author**: User feedback

---

## ❌ STOP OVERTHINKING

b_value has ONE job:

```typescript
// Parse ANY CSS longhand property declaration
parse("background-position: center top")
// → { ok: true, property: "background-position", value: IR, issues: [] }

// Generate CSS from IR for ANY property
generate({ property: "background-position", value: IR })
// → { ok: true, value: "center top", issues: [] }
```

**That's it. That's the whole API.**

---

## ✅ What b_value Does

**Parse CSS longhand property declarations** → Intermediate Representation (IR)

**Generate CSS from IR** → CSS string

---

## ❌ What b_value Does NOT Do

**Shorthand properties** → That's b_short's job

**Property routing** → That's for higher-level tools

**Guessing which property** → User must specify

---

## 🎯 The Ultimate API

### Universal Parse
```typescript
parse("background-position: center top")
// Returns: ParseResult<Position2D>

parse("color: red")
// Returns: ParseResult<Color>

parse("transform: rotate(45deg)")
// Returns: ParseResult<Transform>

parse("border: 1px solid red")
// Returns: ParseResult with error "border is a shorthand, use border-width/border-style/border-color"
```

### Universal Generate
```typescript
generate({
  property: "background-position",
  value: { horizontal: "center", vertical: "top" }
})
// Returns: GenerateResult { value: "center top" }

generate({
  property: "color",
  value: { kind: "hex", r: 255, g: 0, b: 0 }
})
// Returns: GenerateResult { value: "#ff0000" }
```

---

## 📦 Module Organization = Implementation Detail

The "modules" (color, gradient, filter, text, background, layout) are:
- **Internal organization** for code
- **NOT the public API**
- Just collections of related property parsers

Users don't care about modules. They care about properties:
- `background-position` → Position parser
- `text-decoration-line` → Keyword parser
- `color` → Color parser
- `width` → Length parser

---

## 🚫 Stop Making Dispatchers

**NO**:
```typescript
Parse.Text.parse("underline")  // Which property?
Parse.Background.parse("cover")  // Which property?
```

**YES**:
```typescript
parse("text-decoration-line: underline")
parse("background-size: cover")
```

The property name IS the dispatcher.

---

## 📝 For Documentation

### b_value README

```markdown
# b_value

Parse and generate CSS longhand property values.

## What it does

- ✅ Parse: `"color: red"` → IR
- ✅ Generate: IR → `"red"`
- ✅ Supports all CSS longhand properties

## What it doesn't do

- ❌ Shorthand properties (use b_short)
- ❌ Property expansion
- ❌ Value computation

## API

// Parse any longhand property
parse(declaration: string): ParseResult

// Generate CSS from IR
generate(options: { property: string, value: IR }): GenerateResult
```

---

## 🎯 Defer to b_short

**When user asks about shorthands**:

```
"border", "margin", "padding", "background", "text-decoration" 
are SHORTHAND properties.

b_value only handles LONGHANDS.

For shorthands, use b_short:
- b_short.parse("border: 1px solid red")
  → { border-width: "1px", border-style: "solid", border-color: "red" }
  
Then use b_value to parse each longhand:
- b_value.parse("border-width: 1px")
- b_value.parse("border-style: solid")
- b_value.parse("border-color: red")
```

---

## 🔧 Implementation Reality

**Current State**:
- ✅ Individual property parsers exist
- ❌ Universal parse() doesn't exist yet
- ❌ Universal generate() doesn't exist yet

**Phase 0.5 Status**:
- ✅ ParseResult/GenerateResult types
- ✅ 11 modules with module-level parse()/generate()
- ⚠️ NOT universal yet (still module-specific)

**What "deferred modules" means**:
- Text, background, layout have individual property parsers
- They DON'T NEED module-level dispatchers
- They WILL work with universal parse()/generate()

---

## 🚀 Next Phase Should Be

**Phase 0.6: Universal API**

Build the ACTUAL public API:

```typescript
// Universal parse
export function parse(declaration: string): ParseResult {
  // 1. Extract property name and value
  // 2. Route to appropriate property parser
  // 3. Return unified ParseResult
}

// Universal generate
export function generate(options: {
  property: string,
  value: unknown
}): GenerateResult {
  // 1. Route to appropriate generator
  // 2. Return unified GenerateResult
}
```

This is what users want. Not module APIs.

---

## 📖 Golden Rule

**b_value = CSS Longhand Property Parser/Generator**

If it's not a longhand property, we don't touch it.

End of story.

---

**Stop overthinking. Build the universal API.**
