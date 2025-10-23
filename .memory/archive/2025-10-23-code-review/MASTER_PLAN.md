# MASTER PLAN – Short-Term Execution (2025-10-23)

Owner: TBD
Window: 7-10 days
Goal: Align docs/metrics, reduce lint friction, and ratchet coverage to ~85-90%.

---

## 0) Guardrails (Trust + Metrics)
- Add "Trust Protocol" to CONTRIBUTING (show failures before changing expectations; no deception; document rationale for expectation changes).
- CI job: compute metrics via .memory/scripts/count-properties.sh and vitest coverage; fail if README "Statistics" is stale.

Deliverables:
- CONTRIBUTING updated
- scripts/update-readme-metrics.ts (or equivalent)
- CI workflow step calling it (non-destructive)

---

## 1) Lint/DX Hygiene
- Biome override: disable noExplicitAny in tests/scripts to allow negative cases without churn.
- Standardize commands: make just check call pnpm check (which runs typecheck + lint); prevent write-mode in CI.

Deliverables:
- biome.json override addition
- justfile/packge.json scripts aligned

---

## 2) Coverage Ratchet
- Set thresholds in vitest.config.ts to current baselines for included files; commit with comment "ratchet plan: +2% per week".
- Wave execution (map to STATUS):
  - Wave 4: Transform functions – edge cases, invalid forms, and 3d variants.
  - Wave 5: Filter functions – value bounds, percentages, and none/url semantics.
  - Wave 6: Gradients – interpolation hints, positions, repeating variants.
- Add light property-based tests for number/length/percentage and angle parsing.

Deliverables:
- New tests per wave
- Updated coverage report trending ≥85%

---

## 3) Docs Alignment
- README Statistics section generated from .memory/STATUS.md + coverage JSON.
- Link to latest archive handover from README and .memory/STATUS.md.
- New ADR: Batch API behavior and unknown value passthrough.

Deliverables:
- README updated via script
- ADR in .memory/decisions

---

## Acceptance Criteria
- CI green with non-write format/lint.
- README metrics match CI metrics; property count validated by script.
- Coverage ≥85% on included files; plan to reach 90% documented.
- Lint noise removed from tests; contributor guide updated with Trust Protocol.
