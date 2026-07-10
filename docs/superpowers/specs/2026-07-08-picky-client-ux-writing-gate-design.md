# picky-client — self-contained UX-writing gate + two-stream parallel copy

Design spec. Status: **implemented + validated (RED/GREEN)**. Date: 2026-07-08.

> Applied to `~/.claude/skills/picky-client/` (outside this repo): `references/ux-writing.md`
> rewritten as the self-contained gate (distilled from the ux-writing skill's references via a
> parallel workflow); `SKILL.md` gained *Copy is a settled axis* (two-stream parallel + shared
> `vetted-copy.ts`) and a copy-gate step in the core loop; `references/harness.md` authoring
> contract now takes copy from the shared module. **Validation** (blind RED/GREEN, planted
> over-purification 되돌아봄→회고, ux-writing skill made unavailable): external-skill dependency
> **RED 5/5 vs GREEN 0/5** (the fix's purpose), over-purification caught 5/5 both, false-purify
> 0 both, real gate run 5/5 both. Follow-on (applying to 회롱이) remains pending approval.

## Problem

picky-client produces UI design 시안. When the design target has user-facing copy
(the harness review page is the live example — "우승작을 더 조용하게", buttons, captions),
the copy needs real UX-writing quality, not ad-hoc prose that mixes translation-ese and
clutter (exactly what Round 2 had to clean up).

Two concrete defects in the current skill:

1. **Dangling dependency.** `references/ux-writing.md:75` says *"See the `ux-writing` skill
   (over-purification)."* — it *delegates* to the external ux-writing skill. On a machine
   where only picky-client is installed (no ux-writing skill), that pointer is broken and
   the method it points to is unavailable. picky-client must NOT call/depend on ux-writing.
2. **Method not internalized.** picky-client has a cold-read loop but lacks the ux-writing
   skill's core: the **production question**, the **over-purification decision procedure**,
   the **6-lens adversarial gate table**, and **project voice-profile binding**.

## Goals

- picky-client writes UI copy *well* and *standalone* — the real UX-writing gate runs even
  with no ux-writing skill present. Zero dependency on / call to the ux-writing skill.
- When a target needs copy, settle the copy **first** and keep it a **fixed shared input**,
  so look rounds vary look only ("one axis at a time").
- **Maximize parallelism** so results arrive faster: the UX-writing gate and 시안 generation
  run **concurrently**, and swapping vetted copy into 시안 is free.

## Design

### 1. Self-contained UX-writing gate (`references/ux-writing.md`, rewrite)

Remove the `See the ux-writing skill` pointer. Embed the method (distilled from the
ux-writing skill, expressed as picky-client's own, Korean 회고 project flavored):

- **Production question** — not "would a stranger understand this word?" but "what word
  would *this* audience actually use for this thing — and is it on screen?" (Comprehension
  rewards coinage; production exposes it.)
- **Over-purification decision procedure** — keep the standard term the audience already
  uses and *gloss* it; never mint a home-made "plainer" replacement; the mirror also holds
  (don't fancy-up a plain word). Target = the word this audience actually says.
- **6-lens gate table** — GATE (blocks shipping): familiarity/standard-term,
  term–explanation contract, honesty (augment not overclaim), precision. Quality (fix in
  place): voice/register, naturalness/no-translation-ese.
- **Adversarial gate procedure** — inventory every user-facing string (incl. runtime-
  generated) → self red-team by the word-by-word checklist + six lenses → fan out skeptics,
  one lens each, told to *refute* (opus; never haiku) → judge by the gate table → any GATE
  failure = rewrite from the word up and re-verify from the start.
- **Project voice-profile binding** — bind to `docs/ux-writing-profile.md` (audience,
  voice/register, standard-term policy + allowlist, product truths, banned coinages);
  create it from an inline template if absent. This makes the gate objective, not taste.

Keep picky-client's existing strengths: the cold-read loop (with the coinage-bias warning),
keyword/action-first fallback, "find the real first-impression surface", numbers reporting.

### 2. Two-stream parallel + shared copy module

One orchestrator fans out **both** streams concurrently (no deep sub-orchestrator nesting —
Workflow nests one level and shares the concurrency pool, so nesting adds no speed):

- **Stream A — UX-writing gate**: run the gate above → write the settled copy to a shared
  module `src/picky-client/vetted-copy.ts`.
- **Stream B — 시안 generation**: 시안 import their user-facing strings from
  `vetted-copy.ts` (they do **not** hardcode copy).

Because 시안 import the shared module, when Stream A finalizes `vetted-copy.ts` every 시안
reflects it automatically — the "swap" costs nothing, and A and B fully overlap.

### 3. Trigger & axis (copy settled once, fixed)

- If the target screen has real user-facing copy and no vetted-copy artifact exists yet:
  run Stream A (gate) **in parallel** with the first look round's Stream B, producing
  `vetted-copy.ts` once.
- Later **look rounds** reuse that copy fixed — look varies, copy does not (one axis).
- Only an explicit **copy round** re-opens copy as the variation axis; there the gate vets
  the copy variants and look is held fixed from the prior winner.

### 4. Harness authoring contract (`references/harness.md`)

Candidate authoring contract gains: user-facing copy comes from the shared vetted-copy
module, never hardcoded per 시안 — this keeps the variation axis on "look" and makes copy
swap free.

## Scope

- **This work** = the picky-client skill improvement (sections 1–4): edits to
  `SKILL.md`, `references/ux-writing.md`, `references/harness.md` (files under
  `~/.claude/skills/picky-client/`, outside this repo).
- **Follow-on (separate approval)** = applying it to 회롱이: write
  `docs/ux-writing-profile.md`, generate `src/picky-client/vetted-copy.ts` via the gate,
  re-run copy on the review page.

## Risks / notes

- Stream B lays out with draft copy while A perfects it; if A changes string *lengths* a
  lot, layouts wobble. Mitigation: the gate keeps lengths within a sane range, and 시안 are
  authored length-robust.
- Self-containment is verifiable: an agent given **only** picky-client (no ux-writing
  skill) must still run the gate and catch a planted over-purification defect.

## Implementation discipline

Editing a skill → follow writing-skills (RED/GREEN): establish the baseline failure (an
agent with the *current* picky-client mis-handles an over-purification copy task / hits the
dead pointer), apply the edits, then verify the new self-contained gate catches it. No skill
edit without a failing test first.
