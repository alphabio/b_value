# Recent Activity Policy

## Rule: 3 Most Recent Entries Only

**START_HERE.md** should only display the **3 most recent** activity entries to keep it concise and focused.

## Process

When adding a new entry:

1. **Add the new entry** at the top of Recent Activity
2. **Remove the oldest entry** (4th entry)
3. **Archive removed entry** to CHANGELOG.md with full details
4. **Keep the 3-entry limit** strict

## Format

```markdown
## Recent Activity

> **Policy**: Keep only the 3 most recent entries. Archive older entries to `CHANGELOG.md`.

- YYYY-MM-DD: **[Title]** ✅
  - Detail 1
  - Detail 2
  - See: `archive/YYYY-MM-DD-topic/`

- YYYY-MM-DD: **[Previous Entry]** ✅
  ...

- YYYY-MM-DD: **[Older Entry]** ✅
  ...
```

## Rationale

- **Focus**: Agents see only recent, relevant work
- **Clarity**: Avoid overwhelming with historical details
- **History**: Full chronology preserved in CHANGELOG.md
- **Efficiency**: Faster to scan and understand current state

## Archived Entries

Full historical activity is maintained in:
- `CHANGELOG.md` - All historical entries with full details
- Individual session archives - Complete documentation per session

## Example

When adding entry #4:
1. Prepend new entry to Recent Activity
2. Remove entry #4 (oldest)
3. Add removed entry to CHANGELOG.md under appropriate version/date
4. Commit with message noting the archive

This ensures START_HERE.md remains a quick-start guide focused on current state, not historical record.
