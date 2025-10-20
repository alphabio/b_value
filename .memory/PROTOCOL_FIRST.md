# PROTOCOL FIRST - EXECUTE BEFORE ANYTHING ELSE

⚠️ **MANDATORY - NO EXCEPTIONS - STOP READING AND DO THIS NOW** ⚠️

Every session starts the EXACT same way. No shortcuts. No "I'll do it later". NOW.

## Execute These 3 Commands First

```bash
# 1. Create your session archive directory FIRST (replace [topic] with short description)
mkdir -p .memory/archive/$(date +%Y-%m-%d)-[topic]/

# 2. Archive INDEX.md to your new session directory (OPTIONAL - INDEX now maintained separately)
# cp .memory/archive/INDEX.md .memory/archive/$(date +%Y-%m-%d)-[topic]/INDEX_ARCHIVED.md

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
   - Update `.memory/archive/INDEX.md` with your session info
   - Optional: Update CONTINUE.md if next task changed
   - Final commit

## Git Activity Policy

**Recent Activity Tracking**:
- Always check `git log --oneline --since="24 hours ago"` before trusting CONTINUE.md
- If recent commits exist, look for session archives modified <24h
- Cross-check git activity with CONTINUE.md claims
- If mismatch detected, warn user and read recent archives first

**Why**: CONTINUE.md can become stale. Git is source of truth for what actually happened.

## After Running These Commands

Now read `.memory/CONTINUE.md` for current status and next tasks.

## Why This Matters

Without this protocol:
- Sessions get lost
- Work gets scattered
- No continuity between agents
- Context is destroyed
- Stale CONTINUE.md leads agents astray

**Your compliance with this protocol is the difference between useful and useless.**

Execute the 3 commands above. Then continue.
