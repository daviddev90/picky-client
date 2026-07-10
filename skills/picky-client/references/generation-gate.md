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

**Proposer fan-out (Rigorous tier; Quick uses one strong proposer).** In the **Rigorous** tier, fan out
independent proposer subagents (sonnet or better; never haiku), each grounded in Stage 1's findings, each
proposing a few distinct directions; then dedup and merge into a slate that spans range. In the **Quick**
default, one strong proposer drafts the slate and the distinctness skeptic (Stage 3) catches convergence
before any build — cheaper, and enough for a taste pick. Either way: one model writing ten in a row drifts
toward a single idea restyled; the fan-out or the distinctness gate breaks that.

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
not patch one entry and ship. Only a slate no skeptic can break proceeds to build. The **Rigorous** tier runs separate skeptics (Round 1
fullest, later rounds lighter as the carried-over winner constrains divergence); the **Quick** default
merges them into a single direction-skeptic pass (see *Cost / scope controls*). Never zero.

The recency lens is **not a novelty ratchet**: a restrained, timeless choice a today-designer would still
make passes — it fails only *staleness* (the training-default look, an off-the-shelf default-token skin,
the "researched then ignored it" move), never restraint. Timeless restraint is a *deliberate, authored,
sourced* choice, not the default design-system skin relabeled "quiet premium." (The verbatim skeptic above
carries the rule and its example — don't re-derive it here.)

### The AI-default-hue check (the purple / indigo bias)

LLMs emit the statistical average of their training data, and for "design" that average is a **cool
blue → indigo → purple family** (Tailwind's `indigo-500` default + the 2015–2020 SaaS / gradient era).
Recall drifts straight into it, so a taste round's colors need an explicit guard — run it as part of
the direction gate, give it verbatim:

> "Look at this slate's colors for a {product} aimed at {audience}. (1) Is the slate's hue range
> **collapsed into the cool blue / indigo / purple family** — do the directions differ on type, mood,
> or layout but not on **hue**? A taste round should span warm / cool / neutral-led options, so a
> unjustified single-hue-family slate FAILS hue-spread. Do NOT force variety onto a slate whose
> single-hue commitment the brand's meaning + this round's research actually call for (a beauty brand's
> purple) — the target is the *default collapse*, not the hue. (Whether an individual key color is a
> reflex default token is the **recency** lens's job; this lens judges the slate's hue *span*.) Return
> the slate's hue span and whether any single-hue commitment is justified."

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

**Craft legs — a small pick-time core; the rest gated to the round or moved to apply.** The pick is a
*taste* judgment ("no wrong answer"), so verification here stays light — do **not** run a full
ship-readiness QA before the user has chosen. Three tiers:

- **Always-on at the pick (static, cheap).** The code review above already covers the "not broken" basics
  (scroll / 375px overflow / half-styled / tsc); add only **real semantic controls** (interactive elements
  are `button`/`a`/`input`, not `<div onClick>`), a **visible focus ring** (no bare `outline:none`), and a
  **visual-hierarchy squint of the 0.5 thumbnail the user already sees** — one clear focal element, type
  levels that step, only one thing reading as "primary." These need no extra render and protect "can this
  even be judged."
- **Axis-gated at the pick.** Run the **typography** leg only on a type round, the **spacing** leg only on
  a layout round — a tone round doesn't pay them. Verbatim:
  - *Typography (type rounds):* "Do role sizes derive from the declared ratio (no ad-hoc near-duplicates)?
    >2 families or a fake fork? Body ≥~16px / secondary ≥~14px? Running text's measure bounded (~45–75ch)?"
    View type rounds at **1:1, not the 0.5 thumbnail**.
  - *Spacing (layout rounds):* "Extract every distinct padding / margin / gap. Do they reduce to ONE step
    scale? Steady vertical rhythm? Columns / gutters on the declared grid? Assume ad-hoc until proven."
- **Moved to APPLY — ship-readiness QA (load-bearing when it ships, not when it's picked).** Full
  **accessibility completeness** (semantic names, `alt`, one `main` landmark + heading order, **tap targets
  ≥44px — or ≥24px with adequate spacing, WCAG 2.5.8**), **interaction/motion safety** (hover/focus/pressed/
  disabled feedback, `prefers-reduced-motion`, no state-by-color-alone), **content-stress** (MIN/MAX torture
  data), and **i18n robustness** (pseudo-localize +40%, `dir=rtl` mirror) run in `applying.md`'s executed
  apply gate on the **real screen with real data** — where a render always happens — not on ten taste mocks.
  The pick-time squint still flags a flat winner early.

**Experimental slots (#7–#10) are exempt from the aesthetic legs** — a deliberately flat / brutalist /
motion-forward swing is the *point* of those slots (`rounds.md`); run only the "genuinely broken" checks on
them, so a bold option survives to the user's eye instead of being cut for breaking a craft norm.

**Rendering is governed by the recorded `browserRenderCheck` opt-in (below).** When it is off (the default,
and always Round 1), the pick-time legs use their **static proxy** — the 0.5 thumbnail the user is already
looking at + a code read — and are **not** blocking-UNVERIFIED. A render only becomes *required* in
`applying.md` at settle, where it always happens. Record the winning **type scale + spacing scale** in the
round `meta` so later rounds carry a real hierarchy forward (see `log-format.md`).

**Browser render — recorded opt-in.** The candidate handoff *is* the human's render check (the user
flips through candidates on localhost), so automated browser rendering is **off by default** and the
pick-time legs use their static proxy. After the first handoff, ask once whether to turn it on, record
`browserRenderCheck: on | off` in `docs/picky-client.md` (see `log-format.md`), and honor it. (The
ship-readiness QA in `applying.md` renders regardless, at settle.) A candidate that fails is fixed and
re-verified before it is shown; note what you cut or fixed in the log.

## Cost / scope controls — pick a tier

The pick is fast and low-friction *by design*; scale the machinery to the ask, and **name the tier you
ran** in the log. Neither tier skips the load-bearing spine (research, distinctness, the always-on "is it
broken" review).

- **Quick (default — including a plain Round 1).** One strong proposer + the direction check (distinctness
  + recency + hue) as a single merged skeptic pass + the always-on code review + the pick-time craft core
  (semantic controls, focus ring, hierarchy squint) + the axis-gated leg for what the round decides. Static
  only, no browser renders. This is the "show me some looks and I'll pick" path.
- **Rigorous (when the user asks for rigor, or a high-stakes screen).** Full proposer fan-out + separate
  direction skeptics + browser renders on.

Ship-readiness QA (a11y completeness, content-stress, i18n) always runs at **apply**, regardless of tier —
it is load-bearing for shipping, not for a taste pick.

## Function rounds — two upgrades, no second pipeline

Function/convention rounds already ground live (two required sources, recorded as artifacts),
already fight convergence ("name ≥2 genuinely-open sub-choices or it isn't a round"), and already
gate on the editor-class checklist before showing (see `rounds.md`). They do **not** run this
pipeline. Add only:

- a **recency check** to their grounding — is this the *current* tool convention, or a stale one?
- promote their grounding + pre-show gate from self-attested to **adversarial**: a refuting skeptic
  confirms the grounding actually happened (queries / sources cited) and that each candidate clears
  the editor-class bar. A candidate that fails is cut, with the reason logged.
