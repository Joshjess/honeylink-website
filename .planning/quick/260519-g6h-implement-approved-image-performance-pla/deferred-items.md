# Deferred Items: 260519-g6h

Out-of-scope discoveries logged during execution. Not fixed by this plan.

## 1. Orphaned static homepage image duplicates

**Files:**
- `static/images/homepage/ai-agent.png` (duplicate of `src/lib/assets/homepage/ai-agent.png`)
- `static/images/homepage/cta-bg.jpg` (duplicate of `src/lib/assets/homepage/cta-bg.jpg`)
- `static/images/homepage/hero-illustration.png` (duplicate of `src/lib/assets/homepage/hero-illustration.png`)

**Discovered:** Build inspection in Task 4 confirmed both copies present (different
inodes, identical sizes).

**Cause:** Phase 01-03 added them to `static/images/homepage/`; Phase 03-03 added
matching copies to `src/lib/assets/homepage/` for enhanced-img migration but
did not delete the static originals.

**Impact:** ~620 KB of unused bytes ship with the build under
`build/client/images/homepage/`. Not referenced by any component (all 3
components use the `$lib/assets/homepage/...` paths).

**Recommendation:** A follow-up task should `git rm static/images/homepage/`
(the directory). Out of scope here per "DIRECTLY caused by the current task's
changes" — these duplicates predate this plan.
