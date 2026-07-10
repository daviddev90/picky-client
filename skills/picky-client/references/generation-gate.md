# Generation gate — research, slate, and the two adversarial gates

Everything between "name the decision" and "hand off the candidates". The core failure this file
exists to stop: **candidates that are stale (this year's design language never appears) or
convergent (ten options that are secretly three).** Both hide from a maker admiring their own
work, so — exactly like the copy gate in `ux-writing.md` — the visual axis is gated by an
adversary, not self-scored.

Two facts shape everything here:

- **Research is a forced step, not a habit.** Recall is the training-data average — designs from a
  few years ago. The only defense is to *pull what's current at run time* and prove you did.
- **Process, not content.** This file never names a trend; naming one dates the skill the moment
  that trend passes. It regulates *how* to find what's current now.

Taste rounds run the whole pipeline. Function/convention rounds keep their convergent path in
`rounds.md` and take only the two upgrades in *Function rounds — two upgrades* below.

## The pipeline (taste rounds)

```
1  Research        forced live web search — derive keywords, pull diverse sources, log artifacts
2  Slate           a TEXT slate of 10 directions (proposer fan-out) — diverge here, it's cheap
3  Direction gate  ADVERSARIAL, before building — recency + distinctness skeptics
4  Build           the 10 React candidates from the approved slate
5  Error gate      ADVERSARIAL, after building — a skeptic hunts the broken candidate
```

Stage 3 is the gate that fixes staleness. Do not skip it to "save time" — it runs on cheap text,
before any component exists.

## Target-aware generation (before Stage 1)

The Brief (see SKILL.md / `log-format.md`) captures the **target render stack** and, for non-web
targets, a **Target Capability Profile** — techniques that are native (iOS system materials + springs;
Android Material You dynamic color + tonal elevation + ripple) vs unavailable/discouraged (arbitrary
blur radii, hover-on-touch, web box-shadow stacks). Two constraints follow:

- **Author within the profile.** Candidates — especially the bold experimental slots — stay inside
  what the target can reproduce. The **portability leg** of the error gate (Stage 5) enforces it, so an
  un-shippable pick cannot win and seed later rounds.
- **Existing-with-logic targets: feed the real component in.** Before generating, inventory the real
  component **from code** — regions, handlers, conditional branches, features, routes, `aria-*`, and
  every non-default state (loading / empty / error / disabled / dark) + its load-bearing logic.
  Candidates must have a **home for every existing feature** so a winner never omits a load-bearing
  control. Mark each state **DECIDED** (shown in the tournament) vs **UNDECIDED** (decided at apply —
  see `applying.md`). This shapes **structure** only; the "only what the surface renders" bar still
  forbids faking un-reached states in the mock.

## Stage 1 — forced live research

Mandatory every taste round. Round 1 gets a full sweep; later taste rounds refresh the axis in
play (a type round re-checks current type practice) rather than coasting on Round 1's grounding.
Do it in **two passes** — searching once with a guessed phrase is how you get generic results.

**Pass A — keyword discovery.** Run several broad exploratory queries to learn the *current*
vocabulary — the named aesthetics, palette directions, type and motion trends people are actually
talking about now — and from what recurs, **derive the sharp keywords** worth searching deeply.

**Pass B — deep, diverse-source search.** Search the derived keywords across **different kinds of
sources**, because each kind is blind to what the others surface:

- **community discussion** — where designers argue about what feels current *right now* (forum and
  Reddit-style threads are *one* example; do not fixate on any single site);
- **showcase galleries** — Dribbble / Behance / Awwwards-class, to see what is actually being made;
- **design press / trend write-ups** — for named directions and the year's aesthetics.

Scope the search to the product's own segment — a fintech dashboard and a kids' app are not "web
design" in general.

From the results, name **distinct directions**, each carrying the specific trend/reference it
draws on. **Log the artifacts** (see `log-format.md`): the queries you actually ran, the sources
you hit, a one-line gist of each. If you cannot cite something you pulled *this round*, you have
not grounded — you have recalled.

Never write a trend's name into this skill as a prescription. The research finds what is current;
the skill only says to go find it.

## Stage 2 — direction slate (text first)

Before any React, produce a **written slate**: 10 entries, each = a named direction + the specific
researched trend/reference it stakes + its one key + at most one sub color + a one-line rationale
(in the invoking user's language). This is the cheapest place to force real spread, so force it
here — not while you code.

**Proposer fan-out (default on).** Fan out independent proposer subagents (sonnet or better; never
haiku), each grounded in Stage 1's findings, each proposing a few distinct directions; then dedup
and merge into a slate that genuinely spans range. One model writing ten in a row drifts toward a
single idea restyled; independent proposers break that.

Keep Round 1's palette discipline: each direction commits to one key + at most one sub color.

**Each direction also declares its craft claims** (text, so Stage 3 can refute them and Stage 5 can
check the build honored them):

- **Focal element + emphasis budget** — the ONE thing the eye should hit first, and how many elements
  may read as "primary" (aim for one).
- **Type block** — base size + scale ratio + role→step map + **≤1 display / 1 text family** + per-role
  leading.
- **Spacing** — base unit + step scale + density stance + grid intent (columns / gutter / container
  max-width).

## Stage 3 — direction gate (adversarial, before building)

Verify the *slate* before spending any build effort. Fan out refuting skeptics — one lens each,
opus, never haiku; the strongest available model for synthesis. Two GATE lenses:

| Lens | Status | Fails when |
|---|---|---|
| **Recency** | **GATE** | a designer working today reads the slate as 2–3 years stale; a direction ties to no source logged this round; the slate researched a current aesthetic and then fell back to safe defaults that ignore it |
| **Distinctness** | **GATE** | the 10 collapse to fewer than 10 real ideas |

**Recency skeptic — give it verbatim:**

> "You are a design director reviewing this slate of 10 candidate directions for {product/screen}.
> REFUTE its currency — assume it is stale until proven current. For each direction: would a
> designer working *today* recognize this as current practice, or as something from 2–3 years ago
> or a generic default? Cross-check each against the research artifacts logged this round; if a
> direction ties to no source pulled today, mark it unsupported. Flag any sign the slate researched
> a current aesthetic and then fell back to safe, familiar directions that ignore it. Do NOT reward
> flashiness for its own sake and do NOT fail a restrained choice that is simply timeless — the
> target is staleness / training-default, not the absence of novelty. A restrained or timeless
> direction still passes when it is a *deliberate, authored* choice tied to a logged source; it
> still fails when it is a framework default masquerading as restraint — literal off-the-shelf
> design-system tokens (e.g. Tailwind gray-900 / blue-600 / amber-500 straight off the list) — or
> when it cites no source. Return the stale or unsupported directions with reasons, and whether the
> slate as a whole reflects what the research found."

**Distinctness skeptic — give it verbatim:**

> "Reviewing this slate of 10 candidate directions: REFUTE its distinctness. Collapse the 10 into
> the fewest genuinely-different ideas — if two would be described by the same one sentence
> (differing only in a number, a shade, or a label), merge them. Count the real ideas. If fewer
> than 10, the slate fails. Return the collapsed groups and the real-idea count."

**Judgment.** A synthesizer (opus) reads both skeptics. **Any GATE failure → revise the slate**
(pull fresher or more directions; push the merged ones apart) **and re-verify from the start** — do
not patch one entry and ship. Only a slate no skeptic can break proceeds to build. Round 1 runs the
full fan-out; later taste rounds may run lighter (the carried-over winner already constrains
divergence), but never zero.

The recency lens is **not a novelty ratchet**: a timeless, restrained choice a today-designer would
still make passes — restraint is never itself the failure. But "timeless" is not a free pass. A
restrained direction still fails if it is a **framework default masquerading as restraint** (literal
off-the-shelf design-system tokens — Tailwind `gray-900` + `blue-600` + `amber-500` straight off the
list) or if it **cites no logged source**. Timeless restraint is a *deliberate, authored* choice — a
chosen off-black, a bespoke neutral, tied to the round's research — not the default skin relabeled
"quiet premium." It fails *staleness* (the training-default look, the default-token skin, the
"researched then ignored it" move) — not restraint.

### The AI-default-hue check (the purple / indigo bias)

LLMs emit the statistical average of their training data, and for "design" that average is a **cool
blue → indigo → purple family** (Tailwind's `indigo-500` default + the 2015–2020 SaaS / gradient era).
Recall drifts straight into it, so a taste round's colors need an explicit guard — run it as part of
the direction gate, give it verbatim:

> "Look at this slate's colors for a {product} aimed at {audience}. (1) Is the slate's hue range
> **collapsed into the cool blue / indigo / purple family** — do the directions differ on type, mood,
> or layout but not on **hue**? A taste round should span warm / cool / neutral-led options, so a
> single-hue-family slate FAILS hue-spread. (2) Is the **key color the model's reflex** (indigo /
> violet / generic tech-blue) reached for with NO meaning-or-research justification? That fails as a
> training default. But do NOT penalize a purple / blue that the brand's meaning + this round's
> segment research actually call for (luxury, beauty, fintech-trust) — the target is the *default*,
> not the hue. Return which directions are default-hue, the slate's hue span, and whether the key
> colors are justified."

**Escape the default, don't ban a hue.** A *justified* purple/blue (meaning + research) passes; a
*reflex* purple (or a slate collapsed into one cool family) fails. This is the color-specific twin of
the recency lens — same failure (the training prior), narrowed to hue.

### Craft-claim coherence (refute the Stage-2 claims on the text slate)

The craft claims each direction declares (Stage 2) are refuted here too, cheaply, before any build: a
**type block** with a role size off its ratio, two roles under one step apart, >2 families, or a fake
fork swapping a near-identical face; a **spacing** set that isn't one scale; a direction with **no single
focal element** or more than one thing claimed "primary." Fix them before building — the rendered legs in
Stage 5 then verify the build actually honored the surviving claims.

## Stage 4 — build the candidates

Build the 10 React candidates from the **approved** slate. User-facing copy comes from
`vetted-copy.ts` (never hardcoded per candidate — see `harness.md`). Hold the Non-negotiable
quality bar (SKILL.md). Because the slate is locked and already diverse, the builds inherit that
divergence instead of converging while you code.

## Stage 5 — error gate (adversarial, after building)

A broken candidate cannot be judged on its design, so hunt breakage *adversarially* — do not
self-score the passive quality checklist.

**Always (cheap — zero browser tokens):** an adversarial code review per candidate, plus `tsc -b`
and eslint clean. Give the reviewer verbatim:

> "You are a front-end reviewer trying to find the broken candidate. For candidate {N}, hunt for:
> double / nested scroll; overflow or broken layout at 375px width; half-styled or empty states,
> lorem/placeholder rubble; any control or status that belongs to a *sibling* surface (a pager, a
> 'now viewing' marker, a redrawn harness remote); the work surface not dominating (tool screens);
> tsc or eslint errors. Assume it is broken until each is checked. Return each defect as file:line."

**Target portability (non-web / native targets).** Each candidate carries a
`reproducible-on-target: yes | notes` line, checked by a skeptic against the Brief's Target Capability
Profile — give it verbatim:

> "For target {platform}: name each visual/motion technique this candidate relies on (backdrop-blur,
> layered shadows, hover states, spring-vs-bezier motion, custom controls). Mark any technique with no
> faithful native analog on {platform}. If an un-reproducible technique is the candidate's SOLE
> differentiator, the candidate FAILS — it must not win and seed later rounds. Suggest the nearest
> native-faithful substitute."

A failing candidate substitutes the effect or is cut — this gates the **pick**, not just the apply.

**Craft legs — gate the pick on the axes color already gates.** The build must honor the slate's craft
claims and clear these. **Most are static** (read the JSX / className — always-on, zero browser tokens);
the few that need pixels **escalate to a render** (claude-in-chrome), and a sub-check with no render is
**UNVERIFIED**, never a silent PASS. Batch them in one pass per candidate; give each verbatim:

- **Accessibility (static, every round incl. greenfield — `aria-*` preservation gives greenfield no
  baseline).** "Is every interactive element a real control (`button`/`a`/`input`) or a `<div>`/`<span>`
  with onClick? Every icon-only control an accessible name? Every meaningful image `alt` (decorative
  `aria-hidden`)? Exactly one `main` landmark + a sane heading order? Any tap target under ~44px at 375px
  (e.g. `h-7 w-7` = 28px)? Any `outline:none` / `focus:outline-none` with no visible replacement ring?
  Assume inaccessible until each is proven; file:line."
- **Spacing coherence (static).** "Extract every distinct padding / margin / gap as file:line. Do they
  reduce to ONE step scale (multiples of the declared base)? Steady stacked-section vertical rhythm? Do
  columns / gutters match the declared grid? Assume ad-hoc until a scale is proven."
- **Typography craft (static + 1:1 render for measure).** "Do role sizes derive from the declared ratio
  (no ad-hoc near-duplicates)? >2 families or a fake fork? Body ≥~16px / secondary ≥~14px? Is running
  text's measure bounded (~45-75ch — check `max-w` / container)?" For **type rounds view at 1:1, not the
  0.5 thumbnail** (it hides small-type failure exactly where the pick happens).
- **Interaction feedback & motion safety (static).** "Does every control show a visible, distinct response
  for hover AND keyboard-focus (a real ring — never bare `outline:none`) AND pressed/active AND disabled?
  Does every animation / transition / autoplay respect `prefers-reduced-motion` (media query /
  `useReducedMotion`)? Is any state (selected / error / required / status) distinguishable ONLY by color,
  with no icon / text / shape backup?"
- **Visual hierarchy (RENDER — squint / blur, not a code read).** "Name the element the eye lands on
  FIRST; is it the one that carries this screen's job? Assume FLAT until a dominant element is proven.
  FAIL if 2+ elements compete for first fixation, OR adjacent type levels don't visibly step in
  size+weight, OR more than one element reads as primary (count filled buttons, bold headings, accent
  blocks, elevated cards). Do not reward decorative dominance." Generalizes the tool-screen dominance rule
  to **every** screen.
- **Content stress (RENDER with torture data — name DIMENSIONS, never specific strings, so it never
  dates).** For every field from the real data model, render a **MIN** (0/1 char, empty, 1 item) and a
  **MAX** (longest plausible unbroken token, N× items, max-digit locale-formatted number, each
  count-string at 0/1/2/many). "Assume the demo data is a lie. Find every field that clips, overflows,
  wraps ugly, or misaligns; file:line." Swap the torture fixtures in yourself.
- **i18n robustness (conditional on the Brief — RENDER).** Only when the Brief says the target ships in
  >1 language or an RTL locale. (a) **Pseudo-localize** key labels / nav / buttons at +40% length (or the
  longest target-locale string) → FAIL on truncation / overlap / horizontal scroll. (b) **RTL** —
  re-render each surface `dir=rtl` → return every un-mirrored element and physical-side style (`ml-`/`mr-`,
  literal `←`/`‹`/`›`) with its logical-property fix (`ms-`/`me-`, `start`/`end`, mirrored glyph).

A candidate that fails a leg is fixed or cut before it can win and seed later rounds. Record the winning
**type scale + spacing scale** in the round `meta` so later rounds carry a real hierarchy forward, not a
laundered flat one (see `log-format.md`).

**Browser render smoke-check — recorded opt-in.** The candidate handoff *is* the human's render
check — the user flips through the candidates on localhost — so automated browser verification is
off by default to save tokens. **After the first round's first handoff, ask the user once** whether
to run automated browser render verification going forward, **record the answer in
`docs/picky-client.md`** (`browserRenderCheck: on | off`, see `log-format.md`), and honor it every
later round without re-asking. The first round itself skips automated browser — the user sees it
live.

A candidate that fails is fixed and re-verified before it is shown; note what you cut or fixed in
the log.

## Cost / scope controls

- **Round 1** — full pipeline: full research sweep, proposer fan-out, both gates at full strength.
- **Later taste rounds** — research refreshes only the axis in play; gates run lighter (fewer
  skeptics) because the carried winner constrains divergence. Lighter, never skipped.
- **Browser render** — the recorded opt-in above.

## Function rounds — two upgrades, no second pipeline

Function/convention rounds already ground live (two required sources, recorded as artifacts),
already fight convergence ("name ≥2 genuinely-open sub-choices or it isn't a round"), and already
gate on the editor-class checklist before showing (see `rounds.md`). They do **not** run this
pipeline. Add only:

- a **recency check** to their grounding — is this the *current* tool convention, or a stale one?
- promote their grounding + pre-show gate from self-attested to **adversarial**: a refuting skeptic
  confirms the grounding actually happened (queries / sources cited) and that each candidate clears
  the editor-class bar. A candidate that fails is cut, with the reason logged.
