# PROTOCOL FIRST - EXECUTE BEFORE ANYTHING ELSE

⚠️ **MANDATORY - NO EXCEPTIONS - STOP READING AND DO THIS NOW** ⚠️

Every session starts the EXACT same way. No shortcuts. No "I'll do it later". NOW.

## Execute These 3 Commands First

```bash
# 1. Create your session archive directory FIRST (replace [topic] with short description)
mkdir -p .memory/archive/$(date +%Y-%m-%d)-[topic]/

# 2. Archive INDEX.md to your new session directory
cp .memory/archive/INDEX.md .memory/archive/$(date +%Y-%m-%d)-[topic]/INDEX_ARCHIVED.md

# 3. Verify baseline (must pass before you do ANY work)
just check && just test
```

## Rules - Read This

1. **ALL session artifacts go in the dated directory you just created**
   - Proposals, plans, notes, scripts, data files
   - Everything. No exceptions.

2. **Even if the user just wants "a quick explanation"**
   - Create the directory first
   - This is protocol

3. **If you're told to revert/reset**
   - Re-create the session directory
   - Continue from there

4. **At session end**
   - Create HANDOVER.md in your session directory
   - Update INDEX.md to point to your session
   - Add Archive Trail entry
   - Final commit

## After Running These Commands

Now read `.memory/START_HERE.md` for project details.

## Why This Matters

Without this protocol:
- Sessions get lost
- Work gets scattered
- No continuity between agents
- Context is destroyed

**Your compliance with this protocol is the difference between useful and useless.**

Execute the 3 commands above. Then continue.
