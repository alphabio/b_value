# Visual Architecture: Parsing Levels

## 📊 The Three Levels

```
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 1: String Parsing (comma-separated)                  │
│                                                             │
│  splitValue()    →  "fade, slide, bounce"                  │
│  splitLayer()    →  "2px 2px red, 3px 3px blue"            │
│                                                             │
│  Responsibilities:                                          │
│  • Parse full CSS string                                    │
│  • Split by commas                                          │
│  • Create AST for each value/layer                          │
│  • Call Level 2 parser                                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 2: Value/Layer Parsing (domain-specific)             │
│                                                             │
│  parseAnimationName()  →  AST node "fade"                  │
│  parseShadowLayer()    →  AST nodes [2px, 2px, red]        │
│  parseWidthValue()     →  AST node "100px"                 │
│                                                             │
│  Responsibilities:                                          │
│  • Extract components from AST                              │
│  • Call Level 3 for each component                          │
│  • Build structured result                                  │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 3: Node Parsing (primitives)                         │
│                                                             │
│  parseLengthPercentageNode()  →  "10px" node              │
│  parseColor()                  →  "red" node               │
│  parseIdentifier()             →  "fade" node              │
│                                                             │
│  Responsibilities:                                          │
│  • Validate single AST node                                 │
│  • Parse into typed value                                   │
│  • Return { value, unit } or similar                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Real Examples

### Example 1: Simple Property (width)

```
CSS: "100px"
     ↓
LEVEL 2: parseWidthValue()
     ↓
LEVEL 3: parseLengthPercentageNode(node)
     ↓
Result: { value: 100, unit: "px" }

NO LEVEL 1 - No commas!
```

### Example 2: Comma-Separated Values (animation-name)

```
CSS: "fade, slide, bounce"
     ↓
LEVEL 1: splitValue(css, parseAnimationName, "animation-name")
     ├─ "fade"   → parseAnimationName()
     ├─ "slide"  → parseAnimationName()  
     └─ "bounce" → parseAnimationName()
         ↓
LEVEL 2: parseAnimationName(node)
         ↓
LEVEL 3: (identifier - no primitive parsing needed)
         ↓
Result: [
  { type: "identifier", value: "fade" },
  { type: "identifier", value: "slide" },
  { type: "identifier", value: "bounce" }
]
```

### Example 3: Multi-Component Layers (box-shadow)

```
CSS: "2px 2px red, 3px 3px blue"
     ↓
LEVEL 1: splitLayer(css, parseShadowLayer, "box-shadow")
     ├─ [2px, 2px, red]      → parseShadowLayer()
     └─ [3px, 3px, blue]     → parseShadowLayer()
         ↓
LEVEL 2: parseShadowLayer(nodes)
     ├─ nodes[0] = "2px"     → parseLengthPercentageNode()
     ├─ nodes[1] = "2px"     → parseLengthPercentageNode()
     └─ nodes[2] = "red"     → parseColor()
         ↓
LEVEL 3: Parse each primitive
     ├─ { value: 2, unit: "px" }
     ├─ { value: 2, unit: "px" }
     └─ { r: 255, g: 0, b: 0 }
         ↓
Result: [
  { 
    offsetX: { value: 2, unit: "px" },
    offsetY: { value: 2, unit: "px" },
    color: { r: 255, g: 0, b: 0 }
  },
  {
    offsetX: { value: 3, unit: "px" },
    offsetY: { value: 3, unit: "px" },
    color: { r: 0, g: 0, b: 255 }
  }
]
```

---

## 🎯 Decision Tree: Which Function?

```
Start: Need to parse CSS value
  ↓
Q1: Does the CSS string contain commas?
  ├─ NO  → Go to Q3 (skip Level 1)
  └─ YES → Go to Q2
      ↓
Q2: What's between the commas?
  ├─ Single values (keywords, functions)
  │   → Use splitValue() + custom parser
  │   → Example: "fade, slide, bounce"
  │
  └─ Multi-token layers (space-separated components)
      → Use splitLayer() + custom parser
      → Example: "2px 2px red, 3px 3px blue"
      ↓
Q3: What type of value are you parsing?
  ├─ Length or percentage
  │   → Use parseLengthPercentageNode(node)
  │
  ├─ Color
  │   → Use parseColor(node)
  │
  ├─ Identifier/keyword
  │   → Use parseIdentifier(node)
  │
  └─ Custom complex value
      → Write custom parser, may use Level 3 helpers
```

---

## ✅ Key Insights

1. **Different Levels**: Level 1 works on strings, Level 3 works on AST nodes
2. **Complementary**: They work together, not as replacements
3. **Composable**: Level 1 calls Level 2, Level 2 calls Level 3
4. **Clear Separation**: Each level has single responsibility

**No confusion - this is GOOD architecture!** ✨
