# picky-client Apply + Target-Awareness — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to implement
> this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Make candidates shippable to the real target (web / Android / iOS / Flutter / inline-CSS)
and apply the winning design to the real app without breaking it — folding in all 11 adversarial-
review findings.

**Architecture:** A new `references/applying.md` holds the portable-spec format, the three apply
pre-steps (structural / token-scope / rollback), state handling, and the executed application gate.
`generation-gate.md` gains a pick-side portability leg + a real-component inventory feed. `SKILL.md`
gains target capture, a "settled" lifecycle signal, and step-7 apply. `harness.md` gains a standalone
web-preview recipe. Validation is RED/GREEN dogfood on planted cases via adversarial subagents.

**Tech Stack:** Markdown skill files under `~/.claude/skills/picky-client/`; subagents/Workflow for
validation; plugin mirror `C:/dev/picky-client/`.

## Global Constraints

- **Process, not content**; **skill body is English**; **subagents never haiku (opus for judgment)**;
  **adversarial gates told to refute**; **source of truth = the live skill**, mirror re-synced +
  committed **local (no push)**; typecheck via `npx tsc -b`, **never `npm run build`**; commit to
  **main** only.
- **UNVERIFIED is a first-class verdict** — never let an unexecutable check silently PASS.
- Every fix must **enforce**, not merely advise (the review's core complaint was inert aspiration).

---

### Task 1: RED baseline — planted apply/target failures (current skill)

**Files:** Create `<scratchpad>/red-apply.md` (evidence).

- [ ] **Step 1: Fixed planted cases.**
  - **Case N (native):** target = iOS SwiftUI; a Round-1 slate where the front-runner's sole
    differentiator is a frosted glassmorphism nav bar + hover-glow.
  - **Case S (structural, existing-with-logic):** target = this repo's
    `src/components/retrospective/RetrospectiveList.tsx` (has an auth-branch header: login vs
    public/private toggle w/ async handler + optimistic update + disabled guard, and 4 real states
    incl. an error state with owner-conditional guidance + magic-link CTA); winner anatomy = a "coral
    magazine" masthead with no slot for the visibility toggle.
- [ ] **Step 2: Run the CURRENT skill on each via a subagent (opus).** Ask it to follow the current
  `~/.claude/skills/picky-client/` and (Case N) judge whether the pick is shippable to iOS; (Case S)
  apply the winner to the real component.
- [ ] **Step 3: Record the failures** in `<scratchpad>/red-apply.md`: does the current skill (a) have
  any portability check (expect none) — the glassmorphism pick sails through; (b) reconcile structure
  before applying (expect none) — the toggle/magic-link logic is dropped or grafted; (c) verify apply
  without leaning on absent tests (expect it reads "tsc/lint pass" as green despite a dropped handler).
- [ ] **Step 4: No commit** (scratchpad only).

Expected: current skill has no portability gate, no structural reconciliation, no executable apply
gate — the baseline the additions must flip.

---

### Task 2: Write `references/applying.md` (core new file) + the design-spec template

**Files:** Create `~/.claude/skills/picky-client/references/applying.md`.

**Interfaces:** Produces the apply method + the `docs/picky-client-design.md` template that
`SKILL.md`, `generation-gate.md`, `log-format.md` point to.

- [ ] **Step 1: Header + when it runs.** applying.md = everything from "the design is settled" to "the
  restyled real screen verified." Runs **once at settle** (§lifecycle in SKILL.md); a mid-tournament
  apply is an explicit **partial/preview**. Claude performs every step itself.

- [ ] **Step 2: The durable design spec (`docs/picky-client-design.md`) template.** Write the template:
  - **Tokens — platform-mapped** (each role = intent + reference-web-value + per-platform mapping):
    `elevation → "card one level above surface" {web: box-shadow; iOS: material/hairline; Android: dp + tonal surface}`;
    `motion → "quick decisive ~200ms ease-out" {web: duration+bezier; iOS: spring response/damping; Android: motion token}`;
    `type → {web: px/rem+family; iOS: semantic text style; Android: sp + type role}`; palette by role +
    the **fixed-palette vs dynamic-color (Material You)** decision.
  - **Screen anatomy:** regions/hierarchy, key components, **all states (each tagged DECIDED / UNDECIDED)**,
    responsive, and **required rows `System chrome & safe areas` and `Navigation / gesture model`**.
  - **Interaction / motion**, and a pointer to the winning candidate as the **reference rendering**.

- [ ] **Step 3: Pre-step A — structural reconciliation.** Write: before any restyle, enumerate the
  real component's regions / handlers / conditional branches / features / routes / `aria-*` **from
  code**; diff against the winner's anatomy. If the winner adds/removes/reorders regions or has no home
  for an existing feature → **STOP and produce a user-approved migration plan** (each real feature →
  maps where / needs new state / winner omits it → explicit **keep-or-drop**). Only a 1:1-hostable
  winner restyles directly; a structural winner is an explicit re-layout whose **acceptance list = the
  preserved-feature inventory**. **Native:** replace "structure untouched" with "re-authored from spec
  into idiomatic native structure, behavior/handlers/state/routing/a11y/tests preserved."

- [ ] **Step 4: Pre-step B — token / scope reconciliation.** Write: name **replace / map / coexist** and
  the central token source (Tailwind `@theme` / MUI-Chakra theme / Compose `MaterialTheme` / CSS vars).
  (a) one-screen skin → scoped/local overrides, never edit the global token, warn about sibling
  divergence; (b) app-wide → global-token edit is intended, **gate scope expands to sibling-screen
  no-regression** (build + screenshot other top screens); (c) no central system → decide with the user.

- [ ] **Step 5: Pre-step C — rollback discipline.** Write: verify a **clean working tree**; dedicated
  pre-apply commit (no unrelated changes); restyle in scoped commit(s) touching only the target's files;
  shared-token edits committed **separately**; capture a **pre-restyle baseline** (each state rendered +
  a handler/route trace) as the "intact" diff target.

- [ ] **Step 6: Apply + states.** Restyle region-by-region against the spec, touch nothing unrelated.
  For each non-default state: render the restyled state (extend the harness or a scratch state gallery),
  get a **quick user OK**; the gate compares each real state to the **OLD screen** for content/behavior;
  every **UNDECIDED** state escalates to the user — never Claude-invented + self-approved.

- [ ] **Step 7: The application gate (verbatim).** Write both legs so they EXECUTE:
  - **No-regression** — branch on "do covering tests exist?": *yes* → run them; *no* → (a) **static
    structural-preservation diff**: every prop, handler, state branch, route, and `aria-*` present
    pre-change must persist post-change (catches a dropped `onClick`, a weakened `disabled` guard, a
    simplified owner guard); and (b) capture a baseline, then **drive each interactive element and visit
    each state in the browser** (claude-in-chrome), diffing after-vs-baseline. **Absence of tests =
    behavior UNVERIFIED** — never read an empty suite's "tests pass" as green.
  - **Visual parity** — **MANDATE an executed render** of the restyled real screen with real data
    (claude-in-chrome web; simulator/snapshot native). **No PASS on a static read**; no render possible
    → **UNVERIFIED**, never PASS. Verify against the **spec** (token/intent conformance), not mock
    pixels. **Rubric** — PASS-permitted deltas (sub-pixel / reset / font-hinting, host globals) vs FAIL
    deltas (type-scale step, spacing role, color role, hierarchy/order, missing element); cite the rubric
    line for any FAIL. **Cross-idiom allow-list** (NOT regressions): safe-area insets, native control
    chrome, gesture/back nav, Dynamic Type, material-vs-shadow, dynamic color. **Deny-list** (true
    violations): wrong hierarchy / color-role / spacing / type-scale, lost motion character.
  - Any regression / FAIL → scoped revert or fix, **re-verify from the start**.

- [ ] **Step 8: Greenfield + native note.** No existing component → apply = **generate fresh native
  code FROM the spec**; the checks that replace "preserve existing behavior" = verify against spec +
  build/tests. Native render-verify uses the target's simulator/snapshot; unavailable → UNVERIFIED.

- [ ] **Step 9: Self-check.** Every gap 2/3/4/5/6/11 clause present; cross-refs (`generation-gate.md`,
  `harness.md`, `log-format.md`, SKILL.md) name real files; no static-only PASS anywhere.

---

### Task 3: Extend `references/generation-gate.md` — portability leg + inventory feed

**Files:** Modify `~/.claude/skills/picky-client/references/generation-gate.md`.

- [ ] **Step 1: Add "Target portability" to Stage 1 / the Brief link.** For non-web/native targets,
  candidates must be authored within the **Target Capability Profile** (native techniques vs
  unavailable/discouraged: arbitrary blur, hover-on-touch, web box-shadow stacks). State it feeds the
  error-gate leg below.

- [ ] **Step 2: Add a PORTABILITY leg to the error gate (Stage 5) / direction gate.** Each non-web
  candidate carries a `reproducible-on-target: yes | notes` line; the gate **rejects** (or demands
  revision of) any candidate whose winning differentiator is an effect not reproducible on the declared
  target. This gates the **pick**, not just the apply. Add a one-line refute prompt: *"For target
  {platform}: name each visual/motion technique this candidate relies on; mark any that has no faithful
  native analog; if an un-reproducible technique is the candidate's sole differentiator, it fails."*

- [ ] **Step 3: Add the real-component inventory feed (existing-with-logic targets).** Before
  generating, extract from the real component: regions, handlers, branches, features, routes, `aria-*`,
  and every non-default state + its load-bearing logic. Feed it in so winners have a home for every
  feature; mark states DECIDED (in the tournament) vs UNDECIDED (decided at apply). Keep the "only what
  the surface renders" bar — the inventory shapes **structure**, it does not make the mock fake states.

- [ ] **Step 4: Self-check.** Portability leg + inventory feed consistent with `applying.md`; no
  duplication of the apply procedure.

---

### Task 4: Edit `SKILL.md` — Brief capture, settled signal, step 7 apply

**Files:** Modify `~/.claude/skills/picky-client/SKILL.md`.

- [ ] **Step 1: Brief capture.** State the Brief records: target render stack; greenfield vs
  existing-with-logic; Target Capability Profile; design-system / token scope (central source? one-screen
  vs app-wide? fixed palette vs dynamic color?); device safe-area / nav model. Point to `log-format.md`.

- [ ] **Step 2: Lifecycle "settled" signal.** Add to the core loop: the tournament ends on an explicit
  **"design settled / finalize"** step; **apply runs once at settle** against the accumulated winner;
  mid-tournament apply = explicit partial/preview.

- [ ] **Step 3: Core-loop step 7 — apply.** Add "**7. Apply the settled design to the real app**" →
  pointer to `references/applying.md` (non-destructive, gated). Renumber "repeat until settled" around it.

- [ ] **Step 4: Soften the tagline.** Change "what you pick is what you ship" to be honest: for
  greenfield React+Tailwind the candidate is near-shippable; for native/existing screens **the pick is
  the *design* you ship**, ported via `applying.md`.

- [ ] **Step 5: Reference list.** Add `references/applying.md` (read at settle / before applying).

- [ ] **Step 6: Self-check.** No dangling refs; step 7 + settled signal read coherently.

---

### Task 5: Edit `references/harness.md` — standalone preview + non-web mock authoring

**Files:** Modify `~/.claude/skills/picky-client/references/harness.md`.

- [ ] **Step 1: Two harness modes.** **Web target** → mount `src/picky-client/` in-project (today).
  **Non-web/native** → a **standalone web-preview project**: exact scaffold command (throwaway
  Vite+React+TS+Tailwind+Motion in a named location — sibling `picky-preview/` or the scratchpad), a
  **Node-present precondition** + fallback, the correct `docs/picky-client.md` read/write path, and
  **whole-directory teardown** (not the capsule dance).

- [ ] **Step 2: Non-web mock authoring.** Draw a status-bar / safe-area frame; keep primary actions out
  of the home-indicator / gesture-bar zone; depict the native nav pattern (nav bar + back gesture,
  bottom bar). Candidates are **decision previews**, not shippable native code.

- [ ] **Step 3: Self-check.** Doesn't contradict `removing.md` (capsule teardown is for the in-project
  mode; standalone preview is whole-dir delete).

---

### Task 6: Edit `references/rounds.md` — portability + inventory in seeding/quality

**Files:** Modify `~/.claude/skills/picky-client/references/rounds.md`.

- [ ] **Step 1:** In the taste-seeding / quality bar, note: on a non-web target, the
  trend/experimental directions must stay within the Target Capability Profile (portability leg in
  `generation-gate.md`); on existing-with-logic targets, candidates must host the real component's
  feature/state inventory. Keep it a pointer, not a duplicate.
- [ ] **Step 2: Self-check.** No contradiction with generation-gate.md / applying.md.

---

### Task 7: Edit `references/log-format.md` — target/scope, states, apply record

**Files:** Modify `~/.claude/skills/picky-client/references/log-format.md`.

- [ ] **Step 1: Brief fields.** Add to the Brief block: target render stack; greenfield/existing;
  Target Capability Profile (one line); token scope (central source · one-screen/app-wide · fixed/
  dynamic color); device safe-area/nav.
- [ ] **Step 2: State ledger.** A per-target list of states with DECIDED / UNDECIDED tags.
- [ ] **Step 3: Apply record.** A "Settled + Applied" section: the migration plan (if structural),
  token-scope decision, the render artifacts + per-state gate verdict (PASS / FAIL / UNVERIFIED).
- [ ] **Step 4: Self-check.** Fields match what `applying.md` + `generation-gate.md` say to log.

---

### Task 8: Consistency sweep

**Files:** Modify (as needed) the skill files above.

- [ ] **Step 1: No hardcoded trend/platform prescriptions** (grep for named aesthetics; platform names
  are fine as examples, not mandates).
- [ ] **Step 2: No dangling pointers** — every `references/*.md` + section name referenced exists
  (`applying.md` now exists).
- [ ] **Step 3: Terminology** — "settled", "portability leg", "structural reconciliation",
  "application gate", "UNVERIFIED", "DECIDED/UNDECIDED" used consistently.
- [ ] **Step 4: Language** — no stray Korean (ripgrep Hangul); English body.
- [ ] **Step 5: No commit here** — live skill is outside git; mirror commits in Task 10 after GREEN.

---

### Task 9: GREEN validation — planted-case dogfood via a Workflow

**Files:** Create `<scratchpad>/green-apply.md` (evidence).

- [ ] **Step 1: Portability leg (Case N).** Feed the iOS target + the glassmorphism-sole-differentiator
  slate to the new portability leg → must **reject / demand revision** (RED accepted it).
- [ ] **Step 2: Structural reconciliation (Case S).** Give the real `RetrospectiveList` inventory + the
  "coral magazine" masthead winner → the reconciliation pre-step must **STOP and produce a migration
  plan** with the visibility toggle + magic-link CTA as explicit keep-or-drop (RED dropped them).
- [ ] **Step 3: No-regression on a test-less app.** Give a before/after component pair where an
  `onClick`/`disabled` guard was dropped → the **static structural-preservation diff** must **catch it**
  (RED's "tsc/lint pass" read green).
- [ ] **Step 4: Visual-parity refuses static-only PASS.** An agent following `applying.md` asked to
  verify parity with **no render available** must return **UNVERIFIED**, not PASS.
- [ ] **Step 5: Record GREEN** in `<scratchpad>/green-apply.md`, comparing to RED. If any check fails,
  return to the relevant task (2–7), fix, re-run.

---

### Task 10: Sync plugin mirror + commit

**Files:** Modify `C:/dev/picky-client/skills/picky-client/**`.

- [ ] **Step 1: Re-copy** the edited/new skill files into the mirror (`applying.md` new;
  `generation-gate.md`, `SKILL.md`, `harness.md`, `rounds.md`, `log-format.md` edited); hash-verify.
- [ ] **Step 2: `claude plugin validate C:/dev/picky-client`** — must pass.
- [ ] **Step 3: Commit the mirror** (local, main, **no push**) describing the apply + target-awareness
  extension.
- [ ] **Step 4: Report** — RED→GREEN summary, changed files, mirror commit is local-only (push gated).
