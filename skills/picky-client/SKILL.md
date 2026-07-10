---
name: picky-client
description: >-
  Drive UI/UX design decisions as a tournament of 10 candidate drafts that
  the user picks from, round by round. Use this whenever the user wants to explore,
  compare, or decide a component or page's visual design by choosing between options —
  tone & manner, color, typography, card/layout, microinteractions, navigation, CTA,
  or any "show me a few versions and let me pick" request. Trigger on phrases like
  "picky-client", "make some drafts", "show me candidates", "let's decide the tone &
  manner", "make a few versions and I'll pick", "draft round", "/picky-drafts", or any
  request to improve a screen's look by comparing variations — in any language.
  Prefer this over ad-hoc single-design edits whenever the user signals
  they want to choose between alternatives.
---

# picky-client

Pick-driven UI design. Instead of guessing one design and editing it forever, you
present **candidate drafts** for a decision and let the user pick. Most decisions
are **taste** (tone, color, type, mood) and run as a **tournament of 10**; a smaller
class are **function/convention** decisions (tool/editor layout, control placement,
canvas sizing, density, navigation structure) that instead run as a **small convergent
set** grounded in real code and reference-tool convention (see *Decision triage*). Either
way the user picks the one(s) they like, and the winner seeds the **next round** with
fresh variations. Decisions compound round by round until the design is settled.

The output of a round is never a finished website — it is a small, browsable **review
harness** mounted in the user's project where they flip through 10 real, rendered
candidates on `localhost` and choose. You build that harness, generate the candidates,
run the dev server, and tell the user exactly where to look.

## Why it works this way

- **Choosing beats specifying.** Most people can't describe the design they want, but
  they know it instantly when they see it. For **taste** decisions, ten concrete options
  turn a blank-page decision into a quick pick; **function/convention** decisions instead
  converge on a few grounded, reasoned options and a trade-off critique (see *Decision
  triage*) — because there the job is to get it *right*, not to poll a feeling.
- **One axis at a time.** Each round decides one thing (tone, then type, then layout…).
  Compounding small, confident picks produces a coherent design without one giant
  ambiguous "make it look good" step.
- **Real renders, not mockups.** Candidates are actual React components rendered on `localhost`, so
  the user judges the real thing. For a greenfield React+Tailwind screen the winner is near-shippable
  as-is; for a native or existing-with-logic screen the pick is the *design* you ship — ported onto the
  real component non-destructively at settle (see `references/applying.md`).
- **A durable record.** Every round, candidate, rationale, and winner is logged in
  `docs/picky-client.md`, so the process survives across sessions and someone can see
  *why* the design is what it is.

## The core loop

1. **Name the decision, the surface — and, on first setup, the target.** State what this round
   decides in one line (e.g. "Round 1 — design tone & manner") and name the real screen(s) the
   candidates depict. **On first setup capture the target in the Brief** (see `log-format.md`): the
   render stack (React+Tailwind / other web / Android Compose / iOS SwiftUI / Flutter / inline-CSS),
   **greenfield vs existing-with-logic**, the **Target Capability Profile** (non-web), the
   **token / design-system scope**, and whether it **ships in >1 language / any RTL locale** (drives the
   i18n legs in `generation-gate.md`). These are enforced downstream (the portability, i18n, and craft
   legs in `generation-gate.md`, and `applying.md`) — not notes. If it's not Round 1, derive the decision
   from the previous winner.
2. **Triage, then generate through the gate.** Classify what the round decides (*Decision triage*
   below), then run the **generation pipeline** in `references/generation-gate.md` — generation is
   research-grounded and adversarially gated, not draw-ten-and-mount:
   - **taste** → the full five-stage pipeline (research → text slate → direction gate → build →
     error gate); the seeding taxonomy lives in `references/rounds.md`.
   - **function/convention** → the convergent path in `references/rounds.md` (ground in real code +
     tool conventions, 3–5 candidates, no experimental quota, critique not vote) **plus the recency +
     adversarial upgrades** in `generation-gate.md` (*Function rounds — two upgrades*).

   Ground before you draw either way. **If the target has user-facing copy** and no vetted
   copy exists yet, also run the **copy gate** (`references/ux-writing.md`) to settle the
   words — in **parallel** with generation (*Copy is a settled axis* below), so candidates and copy
   overlap instead of queueing.
3. **Mount them in the harness.** Drop the candidates into `src/picky-client/` so the
   `/picky-drafts` accordion and `/picky-drafts/{roundId}/{index}` pages pick them up.
   See `references/harness.md`.
4. **Log the round** in `docs/picky-client.md` before handing off — what it decides, the
   10 candidates, and each candidate's rationale. See `references/log-format.md`.
5. **Run localhost and hand off.** Start the dev server and tell the user the exact URL:
   the accordion main (`/picky-drafts`) — the latest round is expanded there; they skim
   the candidates and open any one full-screen. Ask them to pick.
6. **Seed the next round from the winner.** When the user names a winner, propose the next
   decision and triage it (*Decision triage*). On their go-ahead create Round N+1 with
   candidate #1 the winner carried over unchanged. For a **taste** round, candidates
   #2–#10 are 9 variations of it. For a **function/convention** round, carry the winner
   then follow the convergent path (3–5 grounded candidates, no experimental quota) —
   don't manufacture nine variations just to reach ten.
7. **Settle, then apply.** The tournament ends on an explicit **"the design is settled / finalize"** step
   — it otherwise has no defined end. At settle, **apply the accumulated winner to the real app** (the
   final round's carryover encodes all prior axes) per `references/applying.md`. A mid-tournament "apply
   it now" is an explicit **partial/preview**, never the durable spec. Applying is **hard-gated and never
   a blind graft** — enumerate + reconcile the real component (a structural difference **STOPs** for a
   keep-or-drop plan), restyle-don't-replace on a rollback commit, verify by execution (or the verdict is
   **UNVERIFIED**), and run ship-readiness QA (a11y / content-stress / i18n) there on the real screen.
   Full procedure in `applying.md`.

Repeat rounds 2–6 until the user settles; then run step 7 once (or stops).

## Decision triage — taste or function

Before seeding a round, classify **what the round decides**, then route. Route by the
*axis this round decides* — a tool screen can still have taste rounds, and a content
screen can still have a function round. Two observable gates, checked in order:

1. **Is this screen a work-surface / tool class?** — an editor, drawing tool, dashboard,
   or workspace where a canvas / document / timeline / table must dominate the viewport
   (image/photo editor, drawing app, analytics dashboard). If yes, the **editor-class
   quality bar** (see *Non-negotiable quality bar*) applies to **every** candidate in
   **every** round on this screen — taste, function, or restyle alike. No round framing
   exempts it.

2. **What axis does the round decide?**
   - **Layout, control placement, canvas/panel sizing, information density, or navigation
     structure**, *where usability and reference-tool convention narrow it toward a
     near-consensus answer* (deviation mostly makes it worse, not just different) →
     **function/convention**. Take the **convergent path** in `references/rounds.md`. This
     is the default for work-surface/tool screens. On a plain content/marketing screen a
     layout round is often genuinely open — if usability does *not* narrow it, it's taste.
   - **Tone, color, typography personality, mood, decorative motion** → **taste**. No
     wrong answer; keep the **10-way tournament** (see *How candidates are seeded*). This
     holds even on a tool screen.

**Log which gate fired** — one line in the round log naming the trigger you matched
("work-surface screen; round decides panel layout → function"). Classification is an
observable output, not a private judgment.

**Framing and requests don't undo the routing.** Splitting a mixed round (settle the
function part on the convergent path, then run the taste axes as a tournament) is fine —
but the editor-class quality bar still gates the taste half. And "make several and I'll
pick" does **not** turn a function decision into a 10-way vote: honor it with 3–5 grounded
options plus their trade-offs, not ten manufactured ones.

**Round 1 is always taste** (tone & manner) — skip triage and run the tournament.

## Generation is gated

Generating candidates is not "draw ten and mount them." Every round is **grounded in live research
and adversarially gated** — before building (a *direction gate* rejects a stale or look-alike slate)
and after building (an *error gate* hunts broken candidates). The full method is
`references/generation-gate.md`; read it before generating. The seeding taxonomy below (how the ten
divide into winner / trend / experimental) feeds the text slate the direction gate checks — it does
not replace the gate.

## How candidates are seeded each round

This section is the **taste** path (tone, color, type, mood — see *Decision triage*). The
10-candidate rule is what keeps taste decisions honest, so here hold the count at 10 and
make them genuinely distinct. (Function/convention decisions do **not** use this section —
they take the convergent path in `references/rounds.md`: 3–5 candidates, no experimental
quota.)

**Round 1 (the start) — design tone & manner.** There is no previous winner, so all 10
are fresh directions. Before generating, research current design trends and color
practice (last year through now) so the options reflect where design actually is, not
defaults. Each Round-1 candidate uses exactly **one key color and at most one sub
color** — the point of the first round is to commit to a feeling and a palette spine,
not to decorate. Full method in `references/rounds.md`.

**Every round after Round 1 — winner + 9 variations.**
- **Candidate #1 = the winner, carried over unchanged.** It's the baseline to beat and
  the safe choice.
- **Candidates #2–#6 = 5 trend-aligned variations**, each a *different* current-trend
  direction applied to the winner (not five tweaks of one idea).
- **Candidates #7–#10 = 4 experimental, bold variations** that take real risks — the
  ones that might be too much, but that surface ideas a cautious pass never would.

If the user picks **more than one** winner, treat each as a base: keep the selected
ones as candidates #1..#k, then fill the remaining `10 − k` slots with variations,
keeping the trend-leaning / experimental balance. Always land on 10.

## What each round decides

Round 1 is always tone & manner. After that, **propose the next decision based on the
current winner** and proceed when the user agrees — don't run rounds on autopilot. A
typical progression (adapt freely; these are examples, not a fixed script):

- Typography / card design / layout
- Microinteractions / screen navigation (click-through, transitions)
- Core-area UI such as CTAs and reference/hero sections
- **UX writing / copy** — when a round decides the *words* on an entry or landing
  screen (not the look), follow `references/ux-writing.md`: the cold-read loop and the
  keyword-hint fallback. Words are judged by whether a stranger instantly gets it in
  natural everyday language, so they need their own method.

## Copy is a settled axis — run the copy gate first

When the target screen has real user-facing copy (headings, labels, buttons, empty/error
states — a screen with real product copy is the live example), the *words* are their own axis
and must be nailed with a real UX-writing gate, not written ad-hoc alongside the look. Copy
is settled **once** and then held **fixed** while look rounds vary the look — one axis at a
time.

- **The method is self-contained in `references/ux-writing.md`** — the production question,
  the six-lens gate (four GATE lenses that block, two Quality), word-by-word refinement, and
  binding to `docs/ux-writing-profile.md`. picky-client runs this itself; it does **not**
  depend on or call any other skill, because a machine may have only picky-client installed.
- **Two streams in parallel (for speed).** One orchestrator fans out both at once — no deep
  nesting (a nested workflow shares the concurrency pool and adds no speed):
  - **Stream A — copy gate:** run `references/ux-writing.md` (with subagents: one refuting
    skeptic per lens, opus; never haiku) → write the gate-passed strings to a shared module
    `src/picky-client/vetted-copy.ts`.
  - **Stream B — candidate generation:** candidates import their user-facing strings from
    `vetted-copy.ts` (they never hardcode copy — see `references/harness.md`).
  Because candidates import the shared module, when Stream A finalizes it every candidate reflects the
  vetted copy automatically — the swap costs nothing and the two streams fully overlap.
- **Fixed after that.** Later look rounds reuse the same copy; only an explicit **copy round**
  re-opens the words as the variation axis (there the gate vets the variants, look held fixed
  from the prior winner).

## The review harness (common UI)

This is the UI the user clicks through to run the tournament — **not** the website being
designed. Build it per `references/harness.md`. Two surfaces, joined by an accordion:

- **`/picky-drafts` — accordion main.** The home of the process — a centered `PICKY-CLIENT
  DRAFTS` H1 over the rounds accordion. Every round is an accordion row: collapsed shows its
  number + a **short round title** + a small label of
  **what this round decides (a description — never the candidate count)**; expanded shows that
  round's candidates as clickable thumbnails (winner marked). The **latest round is
  the current one** and opens by default (its number in the key color). You reach a
  candidate **directly** from here — there is no separate round-grid page.
- **`/picky-drafts/{roundId}/{index}` — candidate.** One candidate, full screen, under a
  **sticky full-width top header bar** (all nav on the left, `PICKY-CLIENT DRAFTS` label on
  the right): the back link `← List` (→ accordion, source round expanded) · `R{n}` round
  dropdown · pager `‹ 01/10 ›`.

## Non-negotiable quality bar

Every candidate and every harness page must clear these, because a draft that feels
broken can't be judged on its design:

- **No double scroll.** A page gets one scroll context. Never nest a scrolling region
  inside the scrolling page. If content overflows, let the page scroll.
- **Mobile-first and responsive.** Design for the small screen first, then scale up.
  Candidates must be complete and self-contained at phone width.
- **Component-module development.** Each candidate is its own module/component; share
  primitives, don't copy-paste giant blobs.
- **Current libraries, used correctly.** React + TypeScript, animation via
  Motion / Framer Motion, and whatever else the project's stack fixes — using each
  library's current, idiomatic API. If unsure of an API, check its docs rather than
  guessing.
- **Finished feel.** Real content and spacing, no lorem-ipsum rubble or half-styled states. (Stress-extreme
  data — longest string, most / fewest items, largest number — is tested at **apply** on the real screen,
  `applying.md`, not on every taste mock.)
- **One clear focal point / real hierarchy.** Every screen has a single element the eye lands on first,
  and adjacent type levels visibly step (size + weight); more than one element shouting "primary" (filled
  buttons, bold headings, elevated cards) is a fail. Generalizes the work-surface dominance rule to every
  screen.
- **Accessible & semantic (pick-time core).** Real controls (`button` / `a` / `input`, not a styled
  `<div onClick>`) and a **visible focus ring** (never bare `outline:none`). Full a11y completeness —
  accessible names, `alt`, one `main` landmark + heading order, **tap targets ≥44px (or ≥24px with adequate
  spacing, WCAG 2.5.8)** — is verified at **apply** on the real screen (`applying.md`), not on ten mocks.
- **Only what the surface renders.** Show only the elements / states that occur on *this* surface — never a
  sibling surface's control (a candidate pager, a "Now viewing" marker) and never redraw the real
  `HarnessChrome`. Full check (only bites when redesigning the harness itself): `references/rounds.md` →
  *Surfaces that share chrome or state*.
- **Work-surface screens stay tools.** If the screen is an editor, drawing tool,
  dashboard, or workspace (a canvas / document / timeline / table must dominate), **every**
  candidate — in **every** round, taste or function or restyle — must pass: the work
  surface dominates the viewport; primary tools are reachable without hunting; chrome
  (title, meta, nav) stays minimal and **never becomes a hero element** (no page-filling
  H1 eating the canvas); app-level navigation never permanently occupies work-surface
  space. A candidate that fails is cut, not shown as a "daring" option. This gate is keyed
  to the screen, not to how you framed the round — you cannot escape it by calling the
  round a restyle or a taste pass.

**Write every harness-owned string in the invoking user's language** — the same language as
the candidates and the product copy, including the round titles you author. That covers all
of the harness's own review-UI chrome: the back-to-list link, the round-switch dropdown and
the candidate pager (**including their `aria-label`s** — these are chrome, not exempt
"accessibility text"), the overlay close control, the `winnerBadge`, the not-found message,
and the current-candidate marker. The English strings in the `references/harness.md` snippets
(`copy.ts`, `HarnessChrome`, `DraftPage`) are **illustrative defaults, not values to ship** —
translate them: a user instructing in Chinese gets Chinese chrome, in Spanish Spanish. Pick
one word for the candidate/draft in that language and use it across every chrome string alike
so they never drift. The one exception is the tool-brand `PICKY-CLIENT DRAFTS` (H1 + header
label), which stays fixed in every language as the tool's own identity.

## Logging — keep `docs/picky-client.md` current

`docs/picky-client.md` (at the project root) is the source of truth for the whole
process. Update it whenever you create a round, its candidates, or record a winner. It
lets a later session resume mid-tournament and explains the design lineage. Use the
template in `references/log-format.md`.

## Reference files

Read these as you need them — don't inline their contents into your reasoning up front:

- `references/harness.md` — Build and wire the two-surface `/picky-drafts` (accordion) /
  `/picky-drafts/{roundId}/{index}` (candidate) harness: file layout, theme tokens, the
  registry that auto-discovers rounds and candidates, the accordion + candidate pages,
  the remote, no-double-scroll layout, framer-motion, mobile-first, route-collision
  handling. Read before building the harness the first time in a project.
- `references/removing.md` — **Before production: remove the harness.** It is a dev-only tool
  and the `import.meta.env.DEV` guard does NOT keep it out of the bundle — the real exclusion is
  deletion. Set it up as a removable capsule (one folder + `[picky-client]`-tagged mount lines +
  a README) and delete it before deploy. Read at first-time setup, and whenever the user mentions
  deploying / a production build.
- `references/generation-gate.md` — **The generation pipeline + the two visual gates.** Forced
  live research (derive keywords, diverse sources, log artifacts), the text direction slate, the
  pre-build *direction gate* (recency + distinctness skeptics, with verbatim refute prompts), the
  post-build *error gate*, and the function-round upgrades. Read before generating candidates in
  any round.
- `references/rounds.md` — The round playbook: the 5-trend / 4-experimental variation taxonomy,
  the winner + 9 variations structure, the function/convention convergent path, and how to propose
  subsequent rounds. (The forced research method and the distinctness/recency gates now live in
  `generation-gate.md`.) Read alongside it when generating candidates each round.
- `references/ux-writing.md` — picky-client's **self-contained copy method + gate** (no
  dependency on / call to any other skill): the production question, the six-lens gate (four
  GATE lenses that block, two Quality), word-by-word refinement, voice-profile binding, plus
  the cold-read drafting loop and keyword/action-first fallback. Read before any round whose
  target has user-facing copy (run the copy gate — see *Copy is a settled axis*).
- `references/log-format.md` — The exact structure for `docs/picky-client.md`.
- `references/applying.md` — **Applying the settled design to the real app without breaking it.** The
  stack-neutral design spec (`docs/picky-client-design.md`), the three pre-steps (structural
  reconciliation, token/scope reconciliation, rollback discipline), state handling, and the executed
  application gate (no-regression branch + spec-conformance visual parity with allow/deny lists). Read
  at **settle**, before applying — and for the target-capture fields it depends on.

## Helper script

`scripts/scaffold_round.mjs` creates a new round folder under
`src/picky-client/rounds/round{N}/` with a `round.meta.ts` and ten `candidate-XX.tsx`
stubs already shaped for the registry, so you only fill in design — not boilerplate. Run it
with the skill-relative path so it resolves wherever the skill is installed (personal,
project, or plugin):

```bash
node "${CLAUDE_SKILL_DIR}/scripts/scaffold_round.mjs" <projectRoot> <roundNumber> ["what this round decides"] ["short title"]
```

Then edit the stubs (it needs only Node built-ins — no `npm install`). Usage is also
documented at the top of the script and in `references/harness.md`.

## First-time setup in a project

If `src/picky-client/` doesn't exist yet, set up the harness once (routes + registry +
theme/copy tokens + the accordion & candidate pages) following `references/harness.md`,
then start Round 1. Default route `/picky-drafts` — **if it's already in use, propose an
alternative and confirm**. If the harness already exists, just add the new round.

**Set it up as a removable capsule** (everything under `src/picky-client/`, the host mount
lines tagged `// [picky-client]`, and a `src/picky-client/README.md` with removal steps) —
because it is **dev-only and must not ship in production**, and the `import.meta.env.DEV` guard
only hides the routes at runtime; it does **not** keep the code out of the bundle. **When the
user deploys / builds for production, remove it** (delete the folder + the tagged lines) and
verify the bundle is clean. Full procedure in `references/removing.md`.
