# picky-client — visual-craft pick-gates (hierarchy, content-stress, spacing, type, a11y, motion, i18n)

Design spec. Status: **implemented + validated (RED/GREEN)**. Date: 2026-07-10.

> Implemented across `SKILL.md`, `generation-gate.md`, `rounds.md`, `harness.md`, `applying.md`,
> `log-format.md`. Plugin mirror committed local (a1edad0); **not pushed**. **Validation** (adversarial
> subagents, 7/7 both directions): RED — the old 6-class error gate flags **none** of a11y / spacing /
> hierarchy / content-fragility. GREEN — a11y leg **fails** a `<div onClick>`+28px+`outline-none`+no-alt
> candidate (9 defects; page-level checks → UNVERIFIED, not silent PASS); spacing leg **fails** an
> {12,16,20,28,32,36,44} set and **passes** a 4px-scale one; hierarchy leg **fails** a flat 3-primary
> candidate and **passes** a single-focal stepped one; content-stress leg **fails** a `nowrap`/fixed-w
> candidate. Legs work as **static** checks without a render; render-only sub-checks are UNVERIFIED.

> Applies to `~/.claude/skills/picky-client/` (outside this repo). Adds adversarial pick-gates for the
> visual-craft axes the skill currently leaves un-adversaried. Design basis: the completeness audit
> (workflow wf_583b7719-e5e, 6 lens-auditors + synthesis) — see `scratchpad/completeness-audit.md`.
> Plugin mirror `C:/dev/picky-client/` re-synced after (local commit, **no push**).

## Problem

The skill's defining move — **gate the PICK with a refuting skeptic** (verbatim, assume-broken-until-
proven, return file:line) — runs on essentially ONE visual-craft axis (color: recency / distinctness /
hue) plus portability. Everywhere else the pick path has **no adversary**: the Stage-5 error gate lists
only scroll / overflow / 375px / placeholder / sibling-surface / tsc, and the Non-negotiable bar is a
passive checklist. Seven important design dimensions are therefore ungated, **every one with the
purple-bias character** (model emits the training average; self-scoring can't catch it; for the
invisible layers the human picker can't self-correct on a localhost render either). The skill even
**ships several of these defects in its own harness** (28px pager, sub-14px labels, hardcoded LTR
chrome) — direct proof only an adversary catches them.

## Design — seven guards, all in the existing pipeline

Pattern for each: a **Stage-2 slate claim** (so Stage-3 has something to refute) and/or a **Stage-5
error-gate leg** (a refuting skeptic on the rendered candidate), plus a **Non-negotiable bar** line
where it should fire every round. Process-not-content; Claude runs the rendered checks itself
(claude-in-chrome). Ranked by the audit:

### 1. Flat visual hierarchy (critical)
Generalize the tool-screen "work surface dominates / chrome never a hero" rule into a **screen-agnostic
focal-hierarchy gate**. Stage-2 slate: each direction declares its **one focal element + type-scale
ratio + emphasis budget**. Stage-5 squint/blur skeptic on the **rendered** candidate: *"Name the element
the eye lands on FIRST; is it the one that carries this screen's job? Assume FLAT until a dominant
element is proven. FAIL if 2+ compete for first fixation, OR adjacent type levels don't visibly step in
size+weight, OR more than one element reads as primary (count filled buttons, bold headings, accent
blocks, elevated cards)."* Bar: "one clear focal point / real hierarchy step."

### 2. Demo-perfect data → content-stress (critical)
Add a **content-stress leg** (name DIMENSIONS, never specific strings). For every field from the real
data model, render a **MIN** (0/1 char, empty, 1 item) and **MAX** (longest plausible unbroken token,
N× items, max-digit locale-formatted number). Skeptic: *"Assume the demo data is a lie. Find every field
that clips, overflows, wraps ugly, or misaligns under longest string / most items / largest number, and
each count-bearing string at 0/1/2/many. file:line."* **Repair the counterproductive bar line**: "real
content … rendered at its stress extremes, not a flattering middle."

### 3. Eyeballed spacing (major)
Stage-2 slate gains **base unit + step scale + density stance + grid intent** (columns / gutter /
container max-width). Stage-5 **spacing-coherence** skeptic: *"Extract every distinct padding/margin/gap
as file:line. Do they reduce to ONE step scale (multiples of one base)? Shared vertical rhythm? At
375/768/1280 do section edges and card columns snap to the declared grid or wander? Assume ad-hoc until a
scale is proven."*

### 4. Typography craft (major)
Mirror the color apparatus. Stage-2 slate **type block**: base size + scale ratio + role→step map + **≤1
display / 1 text family** + per-role leading. Stage-3 scale/pairing skeptic (flag a role size not
derivable from the ratio, two roles <1 step apart, >2 families, a fake fork swapping a near-identical
face). Stage-5 legs on the **rendered** candidate at **1:1 (override the 0.5 thumbnail for type rounds)**:
bounded measure (~45-75ch), body ≥~16px / secondary ≥~14px. Record the winning scale in meta so later
rounds carry a real hierarchy forward.

### 5. Accessibility structure (major)
Add an **a11y leg** to Stage 5 (gate-the-pick, like portability). Skeptic: *"Is every interactive element
a real control (button/a/input) or a `<div>`/`<span>` onClick? Every icon-only control an accessible
name? Every meaningful image alt (decorative aria-hidden)? Exactly one main landmark + sane heading
order? Any tap target under ~44px at 375px? Assume inaccessible until proven; file:line."* Bar:
"accessible & semantic; tap targets ≥44px" (fires every round incl. greenfield, where aria-* preservation
gives no baseline). **Fix the harness's own 28px pager / 14px chevron.**

### 6. Interaction feedback & motion safety (major)
Add an **affordance+motion leg** to Stage 5: *"Does every control show a visible, distinct response for
hover AND keyboard-focus (a real focus ring — never bare `outline:none`) AND pressed AND disabled? Does
every animation respect prefers-reduced-motion? Is any state (selected/error/required/status)
distinguishable ONLY by color, with no icon/text/shape backup? Assume missing until shown; file:line."*
Harness authoring rule: no focus-suppression without a visible replacement. When the microinteractions
round gets a real method, these become its hard gates.

### 7. Internationalization robustness (major, conditional)
Bind to a **Brief field** ("ships in >1 language? / target locales incl. any RTL?") exactly as the Target
Capability Profile drives portability. When set, two conditional Stage-5 legs: **(a) pseudo-localization**
— re-render key labels/nav/buttons at +40% length (or the longest target-locale string); FAIL on
truncation / overlap / horizontal scroll. **(b) RTL** — re-render each surface under `dir=rtl`; return
every un-mirrored element and physical-side style (left/right, ml-/mr-, literal ←/‹/›) as file:line with
the logical-property fix (start/end, ms-/me-, mirrored glyph). **Fix the harness's own LTR chrome.**

## Files

- `references/generation-gate.md` — the Stage-2 slate claims + Stage-3 additions + the Stage-5 legs
  (hierarchy, content-stress, spacing, typography, accessibility, motion, i18n-conditional) with verbatim
  skeptic prompts.
- `SKILL.md` — Non-negotiable bar additions (focal point/hierarchy step; accessible & semantic + ≥44px;
  content at stress extremes — repairing the "no lorem" line); Brief i18n field.
- `references/rounds.md` — seeding taxonomy gains the type block / focal+emphasis / spacing scale; the
  typography round gets a real method; content-stress note.
- `references/harness.md` — **fix the self-demonstrated defects**: pager/chevron ≥44px, sub-14px labels,
  LTR chrome → logical properties / RTL-aware; authoring rules (no focus-suppression, ≥44px targets,
  bounded measure, stress content).
- `references/applying.md` — the durable design spec carries the type scale / spacing scale / focal
  hierarchy so the port and later rounds preserve them.
- `references/log-format.md` — record type scale + spacing scale in meta; i18n Brief field; new-leg
  outcomes.

## Scope / non-goals

- All checks slot into the existing pipeline; no new subsystem. Process-not-content (name dimensions, not
  specific values), so nothing dates.
- i18n legs are **conditional** on the Brief field (no cost for single-language targets).
- Not building an axe/pa11y integration; the a11y leg is an adversarial DOM inspection Claude runs, with
  the browser render it already mandates. Where a check can't be executed → **UNVERIFIED**, never a
  silent PASS.

## Risks / notes

- **Volume.** Seven legs add gate cost. Mitigation: Stage-5 legs are batched per candidate in one
  rendered pass; type-round-only 1:1 override; i18n conditional. Keep proportional (a simple greenfield
  screen doesn't need all seven firing hard).
- **Self-demonstrated defects.** Fixing the harness's pager/chevron/type/LTR is part of the work — the
  skill must not model the failures its own gates forbid.

## Implementation discipline (RED/GREEN)

RED/GREEN via adversarial subagents, both directions where a false-positive is possible (as the hue guard
did). Validate at least the two criticals (hierarchy, content-stress) + accessibility + spacing on
planted cases: RED shows the current gate passes a flat / demo-only / div-soup / ad-hoc-spacing candidate;
GREEN shows the new leg fails it and spares a legitimately-simple/justified one. Lighter GREEN for
typography / motion / i18n (the leg fires on a planted defect). No edit ships without the failing case.

### Task breakdown

1. RED baseline — planted flat-hierarchy + demo-only-data + div-soup(a11y) + ad-hoc-spacing candidates vs
   the current skill (expect: pass, ungated).
2. generation-gate.md — the seven legs + slate claims + Stage-3 additions (verbatim prompts).
3. SKILL.md — bar additions + repair "no lorem" line + Brief i18n field.
4. rounds.md — slate taxonomy (type block / focal / spacing) + typography-round method + content-stress.
5. harness.md — fix pager/chevron/type/LTR self-defects + authoring rules.
6. applying.md + log-format.md — carry scales in the durable spec / meta; i18n field; leg outcomes.
7. Consistency sweep.
8. GREEN — criticals + a11y + spacing both directions; lighter for type/motion/i18n.
9. Sync mirror + local commit (no push).
