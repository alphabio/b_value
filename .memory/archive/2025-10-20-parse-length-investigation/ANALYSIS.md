# Investigation: parseLengthPercentageNode vs splitValue/splitLayer

**Date**: 2025-10-20  
**Type**: Side Quest Investigation  
**Trigger**: User observation about possible confusion between functions

---

## 🔍 Question

Should we be using `splitValue`/`splitLayer` instead of `parseLengthPercentageNode`?

---

## 📊 Analysis

### Function Purposes (DIFFERENT!)

#### `parseLengthPercentageNode(node: CssNode)`
**Purpose**: Parse a SINGLE AST node into a length-percentage value  
**Input**: One CSS tree node  
**Output**: `Result<LengthPercentage, string>`

**What it does**:
- Takes a SINGLE node from CSS AST
- Parses `10px`, `50%`, `0` (unitless zero)
- Validates unit types (px, em, %, etc.)
- Returns structured `{ value: number, unit: string }`

**Used for**:
- Parsing individual position values
- Parsing size components
- Parsing offset values
- ANY single length-percentage value from AST

**Example**:
```typescript
// Input: AST node representing "10px"
const result = parseLengthPercentageNode(node);
// Output: { value: 10, unit: "px" }
```

---

#### `splitValue(css: string, parser, propertyName)`
**Purpose**: Split comma-separated CSS string into INDEPENDENT values  
**Input**: Full CSS value string (with commas)  
**Output**: `Result<T[], string>`

**What it does**:
- Takes a FULL CSS string like "fade, slide, bounce"
- Splits by commas at the VALUE level
- Parses each independent value
- Returns array of parsed values

**Used for**:
- animation-name: multiple independent animations
- transition-property: multiple independent properties
- font-family: fallback list

**Example**:
```typescript
// Input: "fade, slide, bounce"
const result = splitValue(css, parseAnimationName, "animation-name");
// Output: [{ type: "identifier", value: "fade" }, ...]
```

---

#### `splitLayer(css: string, parser, propertyName)`
**Purpose**: Split comma-separated CSS string into VISUAL layers  
**Input**: Full CSS value string (with commas)  
**Output**: `Result<T[], string>`

**What it does**:
- Takes a FULL CSS string like "2px 2px red, 3px 3px blue"
- Splits by commas at the LAYER level
- Each layer can have MULTIPLE nodes (multi-token values)
- Returns array of parsed layers

**Used for**:
- box-shadow: multiple shadow layers
- text-shadow: multiple shadow layers
- background: multiple background layers

**Example**:
```typescript
// Input: "2px 2px red, 3px 3px blue"
const result = splitLayer(css, parseShadowLayer, "box-shadow");
// Output: [{ offsetX: {...}, offsetY: {...}, color: {...} }, ...]
```

---

## ✅ Verdict: NO CONFUSION - They're Different Layers!

### Architectural Levels

```
Level 1: String Parsing (splitValue/splitLayer)
├─ Input: Full CSS string "10px, 20px" or "2px 2px red, 3px 3px blue"
├─ Splits by commas
├─ Creates AST for each value/layer
└─ Calls Level 2 parser for each item

Level 2: Value/Layer Parsing (custom parsers)
├─ Input: AST nodes for one value/layer
├─ Extracts individual components
├─ Calls Level 3 for each component
└─ Returns structured object

Level 3: Node Parsing (parseLengthPercentageNode)
├─ Input: Single AST node
├─ Validates and parses the node
├─ Returns typed value
└─ Used by Level 2 parsers
```

### Real Example: width

```typescript
// Property: width
// CSS: "100px"

// NO COMMA SPLITTING NEEDED
// Goes straight to length-percentage parsing

export function parse(css: string) {
  const ast = csstree.parse(css, { context: "value" });
  const node = ast.children.first();
  
  // Direct node parsing - Level 3
  const lengthResult = parseLengthPercentageNode(node);
  // Result: { value: 100, unit: "px" }
}
```

### Real Example: animation-name

```typescript
// Property: animation-name
// CSS: "fade, slide, bounce"

// NEEDS COMMA SPLITTING

export function parse(css: string) {
  // Level 1: Split by commas
  const result = splitValue(css, parseAnimationName, "animation-name");
  
  // parseAnimationName receives each node ("fade", "slide", "bounce")
  // Returns array of identifiers
}
```

### Real Example: box-shadow

```typescript
// Property: box-shadow
// CSS: "2px 2px red, 3px 3px blue"

// NEEDS LAYER SPLITTING

export function parse(css: string) {
  // Level 1: Split into layers
  const result = splitLayer(css, parseShadowLayer, "box-shadow");
}

function parseShadowLayer(nodes: CssNode[]) {
  // Level 2: Parse each layer's components
  // nodes[0] = "2px", nodes[1] = "2px", nodes[2] = "red"
  
  // Level 3: Parse individual nodes
  const xResult = parseLengthPercentageNode(nodes[0]);  // "2px"
  const yResult = parseLengthPercentageNode(nodes[1]);  // "2px"
  const colorResult = parseColor(nodes[2]);             // "red"
  
  return { offsetX: xResult, offsetY: yResult, color: colorResult };
}
```

---

## 📋 Current Usage Distribution

### `parseLengthPercentageNode` (31 usages)
✅ **CORRECT** - Used for parsing individual AST nodes
- clip-path shapes: circle radius, rect values, xywh values, polygon coordinates
- layout: width, height, top, right, bottom, left
- gradients: conic/radial positions
- border: radius values
- text: decoration thickness
- background: size values

### `splitValue` (2 usages)
✅ **CORRECT** - Not used yet (no comma-separated single-value properties implemented)
- Will be used for: animation-name, transition-property, font-family

### `splitLayer` (4 usages)
✅ **CORRECT** - Used for multi-node layers
- box-shadow: layers with multiple components
- text-shadow: layers with multiple components

---

## 🎯 Conclusion

**NO ACTION NEEDED**

The functions serve **completely different purposes**:

1. **splitValue/splitLayer**: Parse comma-separated CSS **strings** → arrays
2. **parseLengthPercentageNode**: Parse single AST **nodes** → length-percentage values

They work at **different architectural levels** and are **complementary**, not replacements.

### When to Use Each

**Use `splitValue`**:
- Property has comma-separated independent values
- Each value is a complete unit (keyword, function, etc.)
- Example: `animation-name: fade, slide`

**Use `splitLayer`**:
- Property has comma-separated multi-token layers
- Each layer has multiple components
- Example: `box-shadow: 2px 2px red, 3px 3px blue`

**Use `parseLengthPercentageNode`**:
- Inside any parser that needs to parse a length/percentage from AST
- Works on SINGLE nodes
- Example: Parsing "10px" node from AST

### They Work Together!

```typescript
// box-shadow uses ALL THREE concepts:

// 1. splitLayer splits string by commas
const layers = splitLayer(css, parseShadowLayer, "box-shadow");

function parseShadowLayer(nodes) {
  // 2. parseShadowLayer processes each layer's nodes
  
  // 3. parseLengthPercentageNode parses individual length nodes
  const x = parseLengthPercentageNode(nodes[0]);
  const y = parseLengthPercentageNode(nodes[1]);
  
  return { offsetX: x, offsetY: y, ... };
}
```

---

## 📚 Recommendations

### Documentation Enhancement
Add to `src/utils/parse/README.md`:
```markdown
## Parsing Architecture Levels

1. **String Level**: splitValue, splitLayer
   - Parse full CSS strings
   - Handle comma separation
   - Create AST for each item

2. **Value/Layer Level**: Custom parsers
   - Parse AST nodes for one value/layer
   - Extract components
   - Coordinate between utilities

3. **Node Level**: parseLengthPercentageNode, parseColor, etc.
   - Parse single AST nodes
   - Type validation
   - Return structured values
```

### No Code Changes Needed
- Current usage is correct
- Functions are complementary
- Architecture is clean

---

## 🎓 Learning

**Initial Confusion**: Reasonable - both deal with parsing  
**Reality**: Different architectural levels  
**Key Insight**: Level 1 (string) → Level 2 (value/layer) → Level 3 (node)  

This is **good architecture** - each level has clear responsibility!

---

**Status**: ✅ Investigation complete - No issues found  
**Action**: None required - document the architecture
