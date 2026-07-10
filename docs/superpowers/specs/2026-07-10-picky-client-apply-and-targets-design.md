# picky-client — target-aware generation + non-destructive application

Design spec. Status: **implemented + validated (RED/GREEN)**. Date: 2026-07-10.

> Applies to `~/.claude/skills/picky-client/` (outside this repo). New `references/applying.md` +
> edits to `generation-gate.md`, `SKILL.md`, `harness.md`, `rounds.md`, `log-format.md`. Plugin mirror
> `C:/dev/picky-client/` re-synced + committed local (5cb908d); **not pushed**.
>
> **Validation** (adversarial subagents). **RED** (current skill): no portability step (a glassmorphism/
> hover pick wins unflagged — the harness's own idiom even uses backdrop-blur); no structural
> reconciliation (grafting a masthead drops the visibility toggle + magic-link CTA + owner guards while
> tsc/lint stay green on this test-less repo). **GREEN** (new skill): portability leg **fails** an
> un-reproducible sole differentiator and **spares** a native-reproducible one (both directions);
> structural reconciliation **STOPs** with a keep-or-drop migration plan (and its "inventory from code"
> rule caught a same-named-stub wrong-file trap); the no-regression static-preservation diff **catches**
> a dropped `onClick` on a test-less app and refuses to read "tsc passes" as green; visual parity with
> no render returns **UNVERIFIED**, never a static PASS. Two improvements surfaced by RED/GREEN were
> applied: SKILL.md step-7 carries an inline hard-gate (not full delegation to `applying.md`), and
> `applying.md` §A.1 warns of the same-named-stub trap.

## Problem

Two constraints are absent today (confirmed by reading the skill):

1. **App-friendliness at generation.** `harness.md` hard-assumes React+TS+Vite+Tailwind+Motion;
   the only cross-stack line is "adapt." There is no concept of a non-web/native target — you cannot
   mount a React harness inside an Android app — and nothing makes candidates portable to the target.
2. **Applying the winner.** `SKILL.md:43` claims "what you pick is what you ship," but there is **no
   step** that ports the winning design into the real product screen, and no method for doing it
   without breaking existing data/state/logic. The core loop ends at "hand off" → "seed next round."

An adversarial review of the first-pass fix (4 skeptics + synthesis, all `breaksSufficiency=true`)
found it **not sufficient**: the intent is right (restyle-not-replace, adversarial gate, rollback,
stack-neutral spec) but every guarantee was an **unenforced aspiration**. Root pattern: *the
tournament is a multi-round, happy-path-only, web-rendered process with no defined end and a quality
bar that forbids mocking un-reached states — yet the apply/spec design treated it as if it emitted a
single complete all-states stack-neutral artifact at a well-defined moment.* The review also verified
repo facts: **no-sashimi has no test runner and no central token layer.** This spec folds in all 11
findings (5 blockers, 4 major, 1 minor).

## Chosen scope

Harness stays a **web preview**; the durable output is a **stack-neutral design spec** the
application step translates to the target idiom (user-confirmed Option 1). No per-platform native
harness. Native candidates are **decision previews**, not shippable native code.

## Design

### 0. Lifecycle: define an end, bind apply to it (fixes gap 8)

The tournament is multi-round and compounding and today has **no defined end**. Add a terminal
**"design settled / finalize"** signal to the core loop — an explicit user "the design is settled"
step. **Apply runs once, at settle**, against the accumulated design (the final round's carried-over
winner encodes all prior axes). A mid-tournament apply is explicitly a **partial/preview**
application, never the durable spec. Honor the multi-winner case the loop already permits.

### 1. Capture the target as a real constraint — Brief (fixes gaps 1, 4, 7, 10 capture side)

The Brief (and `docs/picky-client.md`) captures, and downstream steps **enforce**:

- **Target render stack** — React+Tailwind / other web / Android Compose / iOS SwiftUI / Flutter /
  inline-CSS.
- **Greenfield vs existing-with-logic.**
- **Target Capability Profile** (per platform): techniques that are native (iOS system materials +
  springs; Android Material You dynamic color + tonal elevation + ripple) vs unavailable/discouraged
  (arbitrary blur radii, hover-on-touch, web box-shadow stacks).
- **Design-system / token scope:** does a central theme/token source exist (Tailwind `@theme`,
  MUI/Chakra theme, Compose `MaterialTheme`, CSS vars)? Name it. Reconciliation intent: **one-screen
  skin vs app-wide adoption**; **fixed brand palette vs adopt platform dynamic color** (Material You).
- **Device frame:** safe-area / navigation-gesture model for the target.

### 2. Portability gate on the PICK — generation side (fixes gap 1)

Extend `generation-gate.md` with a **portability leg** for non-web/native targets, gating the
*pick*, not just the apply:

- Each candidate is annotated with the platform-specific techniques it relies on and carries a
  `reproducible-on-target: yes | notes` line the error gate checks.
- Any effect not reproducible on the declared target is **removed, or must not be the sole
  differentiator.** An un-shippable candidate cannot win and seed later rounds.

This directly counters the forced trend research + bold experimental slots, which otherwise push
toward web-only effects (glassmorphism, backdrop-blur, hover-glow) on a native target.

### 3. Feed the real component into generation — generation side (fixes gaps 3, 5 upstream)

For **existing-with-logic** targets, before generating candidates, extract the real component's
inventory **from code**:

- regions, handlers, conditional branches, features, routes, `aria-*`;
- every **non-default state** (loading / empty / error / disabled / dark) and the load-bearing
  content/logic inside each (e.g. an error state's owner-conditional guidance + a magic-link CTA).

Feed it into candidate generation so winners **have a home for every existing feature** and do not
omit load-bearing controls. Mark each state **DECIDED** (shown in the tournament) vs **UNDECIDED**.
The "only what the surface renders" quality bar still holds (the mock doesn't fake un-reached
states) — the inventory ensures candidates account for them structurally, and UNDECIDED states are
carried to apply for an explicit decision.

### 4. The portable design spec — durable output (fixes gaps 7, 10)

At settle, capture the winning design as `docs/picky-client-design.md` + a tokens block:

- **Tokens, platform-mapped:** each role = **intent + reference-web-value + per-platform mapping**,
  not one web literal. Examples:
  - elevation → "card one level above surface" `{web: box-shadow; iOS: material/hairline level; Android: dp + tonal surface}`
  - motion → "quick decisive ~200ms ease-out" `{web: duration+bezier; iOS: spring response/damping; Android: motion token}`
  - type → `{web: px/rem + family; iOS: semantic text style; Android: sp + type role}`
  - palette by role + the **fixed-vs-dynamic-color** decision.
- **Screen anatomy:** regions/hierarchy, key components, **all states (DECIDED/UNDECIDED marked)**,
  responsive, **plus required rows for "system chrome & safe areas" and "navigation / gesture
  model"** (fixes gap 10).
- **Interaction / motion.**
- The winning candidate is the **reference rendering** the spec points to.

### 5. Non-destructive application — `references/applying.md` (fixes gaps 3, 4, 5, 6, 11)

Claude performs it (per *do every step yourself*). Runs at settle (or explicit partial).

**Pre-step A — structural reconciliation (gap 3).** "Restyle in place, never rewire" is unsatisfiable
for layout/nav/experimental winners (the tournament is built to produce these). Before any restyle:
enumerate the real component's regions/handlers/branches/features/routes/aria **from code**; diff
against the winner's anatomy. If the winner adds/removes/reorders regions or has no home for an
existing feature → **STOP and produce a user-approved migration plan** (which real features map
where, which need new state/routing, which the winner silently omits → explicit **keep-or-drop**).
Only a winner the component can host 1:1 proceeds straight to restyle; a structural winner is an
explicit re-layout task whose acceptance list **is** the preserved-feature inventory. **Native:** drop
"structure untouched"; the safe unit is "screen re-authored from the spec into idiomatic native
structure, with behavior/handlers/state/routing/a11y/tests preserved."

**Pre-step B — token / scope reconciliation (gap 4).** Name **replace / map / coexist** and the
central token source: (a) one-screen skin → map spec roles to scoped/local overrides, never edit the
global token, warn the user this screen will diverge from siblings; (b) app-wide adoption → editing
the global token IS the intended change, but the application gate's scope **expands to sibling-screen
no-regression** (build + screenshot the other top screens); (c) no central system → decide with the
user (introduce a token layer vs scoped inlining).

**Pre-step C — rollback discipline (gap 11).** Verify a **clean working tree** first; make the
pre-apply commit **dedicated** (no unrelated changes); apply the restyle as scoped commit(s) touching
only the target's files; commit shared-token edits **separately**; capture a **pre-restyle baseline**
(each state rendered + a handler/route trace) as the diff target for "intact."

**Apply.** Restyle region-by-region against the spec; touch nothing unrelated.

**States (gap 5).** For each non-default state: render the restyled state (extend the harness or a
scratch state gallery) and get a **quick user OK** — these were never in the tournament. The gate's
parity arm compares each real state against the **OLD screen** for content/behavior preservation (the
pick lacks these states, so it can't be the reference). Every **UNDECIDED** state escalates to the
user rather than being Claude-invented + self-approved. No non-default state ships un-reviewed.

**Application gate — adversarial, and it must actually execute:**

- **No-regression (gap 6).** Branch on **"do covering tests exist?"**. If yes → run them. If not →
  (a) a **static structural-preservation diff** — every prop, handler, state branch, route, and
  `aria-*` present pre-change must still be present post-change (catches a dropped `onClick`, a
  weakened `disabled` guard, a simplified owner guard); and (b) capture a pre-restyle
  behavioral+visual **baseline** and, after applying, **drive each interactive element and visit each
  state in the browser** (claude-in-chrome), diffing after-vs-baseline. Absence of tests = **behavior
  UNVERIFIED** (forces the executed pass) — never read an empty suite's "tests pass" as green.
- **Visual parity — redefined + executed (gap 2).** **Mandate an executed render** of the restyled
  **real** screen with **real data** (claude-in-chrome for web; platform simulator/emulator screenshot
  or snapshot test for native). **No PASS on a static code read**; if no native render can be
  captured, the verdict is **UNVERIFIED**, never PASS. Verify against the **spec** (token/intent
  conformance), not the mock's pixels. **Rubric:** PASS-permitted deltas (sub-pixel/reset/font-hinting,
  host globals) vs FAIL deltas (type-scale step, spacing role, color role, hierarchy/order, missing
  element) — cite the rubric line for any FAIL. **Cross-idiom:** an **allow-list** of expected platform
  divergences that must NOT count as regressions (safe-area insets, native control chrome, gesture/back
  nav, Dynamic Type, material-vs-shadow, dynamic color) and a **deny-list** of true intent violations
  that must (wrong hierarchy/color-role/spacing/type-scale, lost motion character).
- Any regression / FAIL → scoped revert or fix, **re-verify from the start**.

### 6. Harness for non-web + greenfield (fixes gap 9)

`harness.md`:

- **Web target** → mount `src/picky-client/` in-project (today).
- **Non-web/native target** → a **standalone web-preview project**: exact scaffold command (throwaway
  Vite+React+TS+Tailwind+Motion in a named location — sibling `picky-preview/` or the scratchpad), a
  **Node-present precondition** + fallback, the correct log read/write path, and **whole-directory
  teardown** instead of the capsule dance.
- **Non-web mock authoring:** draw a status-bar/safe-area frame, keep primary actions out of the
  home-indicator/gesture-bar zone, depict the native nav pattern.
- **Greenfield branch in apply:** no existing component → apply = **generate fresh native code FROM
  the spec**; the checks that replace "preserve existing behavior" = verify against the spec + build/
  tests (there is nothing to preserve).

## Files

- **New** `references/applying.md` — portable-spec format, the three apply pre-steps
  (structural / token-scope / rollback), state handling, and the executed application gate (no-
  regression branch + redefined visual parity with rubric + allow/deny lists).
- **New** template for `docs/picky-client-design.md` (the durable per-project spec) — documented in
  `applying.md`.
- `references/generation-gate.md` — add the **portability leg** (gap 1) and the **real-component
  inventory feed** for existing-with-logic targets (gaps 3, 5).
- `SKILL.md` — Brief captures target stack + capability profile + greenfield/existing + token scope;
  core loop gains the **settled** signal + **step 7: apply**; soften "what you pick is what you ship."
- `references/harness.md` — web-in-project vs standalone-preview recipe; non-web mock authoring.
- `references/rounds.md` — portability + the existing-component inventory noted in seeding/quality bar.
- `references/log-format.md` — Brief target/capability/scope; state DECIDED/UNDECIDED; the apply
  record + render artifacts.

## Scope / non-goals

- Harness remains a web preview; **no per-platform native harness**. Native candidates decide;
  the spec + translation ship.
- Not building a snapshot-test framework; native render-verify uses whatever the target provides
  (simulator screenshot / snapshot test). If unavailable → **UNVERIFIED** (honest), never a silent PASS.
- No auto-push of the plugin mirror.

## Risks / notes

- **Effort.** The apply path adds real steps (reconciliation, state review, executed gate). That is
  the cost of not breaking the original; keep it proportional (a 1:1 greenfield React+Tailwind screen
  is near-direct; a structural native restyle is the heavy case).
- **Executed-render dependency.** Web parity leans on claude-in-chrome; native leans on a simulator
  the environment may lack → UNVERIFIED is a first-class outcome, surfaced to the user, not hidden.
- **Quality-bar tension.** Feeding the state inventory into generation must not make candidates draw
  un-reached states in the *tournament* mock (that violates "only what the surface renders"); the
  inventory shapes structure and is decided at apply, not faked in the pick.

## Implementation discipline (RED/GREEN)

Editing a skill → RED/GREEN via adversarial subagents, as the generation-gate work did:

1. **RED** — on a planted native/existing-with-logic case: current skill (+ first-pass design) lets a
   web-only-differentiator candidate win, has no structural reconciliation (a structural winner drops
   a feature), and its parity/no-regression gate passes a dropped `onClick`.
2. Apply the edits.
3. **GREEN** — the portability leg rejects the un-native sole-differentiator; structural reconciliation
   STOPs and demands a migration plan; the state inventory flags UNDECIDED states; the no-regression
   arm's static structural-preservation diff catches the dropped `onClick` on a test-less app; visual
   parity refuses a static-only PASS. No skill edit ships without the failing case first.
