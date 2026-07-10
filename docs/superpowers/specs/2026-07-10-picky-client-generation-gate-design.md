# picky-client — forced-research generation gate (anti-staleness / anti-convergence)

Design spec. Status: **implemented + validated (RED/GREEN)**. Date: 2026-07-10.

> Applies to `~/.claude/skills/picky-client/` (outside this repo). New `references/generation-gate.md`
> + edits to `SKILL.md`, `references/rounds.md`, `references/log-format.md`. Plugin mirror
> `C:/dev/picky-client/` re-synced + committed local (06680a1); **not pushed** (outward-facing —
> needs explicit approval).
>
> **Validation** (adversarial subagents). **RED** (current skill): research triggered but
> `skillRequiredArtifactLog = false` for taste rounds, and the slate — despite current 2026
> citations — collapsed **10 → 4** real ideas, **uncaught** (self-attested "distinct" test passed a
> slate an adversary rejects). **GREEN** (new skill): forces research + produces the Grounding
> artifact (closes the RED gap) and surfaces current trends incl. glassmorphism-with-restraint;
> direction gate discriminates — stale slate → recency **fails**, samey slate → distinctness
> **fails (10→3)**, live slate residual convergence caught **(10→7, would force revision)**.
> False-positive re-test: authored+sourced timeless slate → recency **passes**, default-token
> masquerade → recency **fails** — the recency lens is **not a novelty ratchet**. One lens sharpening
> (authored-vs-default-token + must-cite-source) was surfaced by GREEN and applied.

## Problem

The core output of the skill — the candidate 시안 — regresses to **stale, look-alike** designs.
Run it repeatedly and the current year's design language (e.g. whatever aesthetic is trending
now) never surfaces. Two structural causes, confirmed by reading the current skill:

1. **Research is unenforced, self-attested prose — not a gated step.** `references/rounds.md`
   §36–60 *does* say "Research, don't recall" and suggests web search, but the core loop only
   says "Ground before you draw." Nothing verifies a live search ran. Under any pressure the
   model falls back to **recall = the training-data average** (designs from ~2–3 years ago),
   which is exactly the observed symptom.
2. **No adversarial gate on the visual axis.** The *copy* axis got a full six-lens adversarial
   gate (`references/ux-writing.md`). The *visual* axis — the primary deliverable — has only a
   **passive checklist** (`Non-negotiable quality bar`) the same model self-scores. Words are
   adversarially gated; pictures are self-graded.

These produce **two distinct failures** the fix must separate:

- **Staleness** — ten genuinely different but 2-years-old looks.
- **Convergence** — "비슷비슷한 시안": ten options that are secretly N<10 ideas with the colors
  swapped.

A slate can fail either independently (diverse-but-stale, or current-but-samey), so the gate
must test both.

## Goals

- Make live trend research a **forced, auditable step**, done *well* (derived keywords, diverse
  source types, recorded artifacts) — not a self-attested clause.
- Add an **adversarial gate on the visual axis**, mirroring the copy gate that already works:
  fan-out skeptics told to *refute*, never haiku, opus for synthesis.
- **Process, not content.** Never name a specific trend anywhere in the skill — the mechanism
  must stay valid in future years. The skill regulates *how* to find what's current at run time.
- **Cheap-first sequencing.** Diverge and gate on a *text* slate before spending effort on 10
  React builds; convergence is cheapest to break before any code exists.
- **Token discipline.** The human eyeballs the 시안 anyway, so automated browser render checks
  are opt-in, asked once, and recorded — not run every round by default.

## Design

### 1. The five-stage generation pipeline (taste rounds)

Replaces the current `triage → build 10 → mount` for **taste** rounds. New sequence:

```
Stage 1  Live trend research     (forced web search, iterative, artifacts logged)
Stage 2  Direction slate         (text-first; parallel proposer fan-out → dedup → 10 directions)
Stage 3  Direction gate          ★ adversarial, PRE-build — recency + distinctness lenses
Stage 4  Build candidates        (from the approved slate; copy from vetted-copy.ts)
Stage 5  Error gate              adversarial, POST-build — code always; browser render opt-in
```

### 2. Stage 1 — forced live research (`references/generation-gate.md`)

Mandatory for Round 1 (full sweep) and every later taste round (refresh the axis in play).
Web search is **required**, done as two passes:

- **Pass A — keyword discovery.** Run several broad exploratory queries to learn the *current*
  vocabulary (named aesthetics, palette directions, type/motion trends) and **derive the optimal
  search keywords**. Don't search once with a guessed phrase.
- **Pass B — deep, diverse-source search.** Search the derived keywords across **multiple source
  types**, not just SEO listicle blogs: community discussion where designers debate what feels
  current right now (Reddit-style threads are *one example* — do not fixate on any single
  source), showcase galleries (Dribbble / Behance / Awwwards-class), and design press.
- **Scope to the product's market/segment**, not generic "web design".
- **Record artifacts** in the round log: the actual queries run, the sources hit, one-line gist
  each. Research becomes auditable, not self-attested.
- **No trend names in the skill.** The file names the *procedure* (derive keywords → search
  diverse live sources → extract named directions), never a specific aesthetic.

### 3. Stage 2 — direction slate (text-first, proposer fan-out)

Before any React: a **written slate** of 10 candidate directions. Each entry = named direction +
the *specific* current trend/reference (from Stage 1) it stakes + key/sub color intent + one-line
rationale (in the invoking user's language).

- **Parallel proposer fan-out (default on).** Independent proposer subagents each surface distinct
  research-grounded directions; dedup/merge into a slate that genuinely spans range. One model
  serializing ten tends to converge; independent proposers break that.
- Cheap (text only) — this is where divergence is enforced most efficiently.

### 4. Stage 3 — direction gate (adversarial, pre-build) — **the key new gate**

Fan out refuting skeptics over the *slate* before building. Two GATE lenses (mirror the
copy gate's structure; a skeptic per lens, opus, never haiku; strongest model for synthesis):

| Lens | Fails when |
|---|---|
| **Recency (anti-staleness)** | a designer working today would read the slate as 2–3 years stale; a direction can't be tied to anything in Stage 1's live research; **the slate researched X but then fell back to safe defaults and ignored it** |
| **Distinctness (anti-convergence)** | the 10 collapse to N<10 real ideas (the "describe A and B in one sentence — are they obviously different?" test, adversarialized) |

Plus carry existing constraints (one key + at most one sub color, contrast/accessibility, market
fit). **Judgment:** any GATE failure → revise the slate (pull fresher/more directions, push
convergent ones apart) and **re-verify from the start**. Only a surviving slate proceeds to build.

### 5. Stage 5 — error gate (adversarial, post-build)

Upgrades the passive quality bar to an adversarial pass. A skeptic *hunts* the broken candidate.

- **Always (cheap; zero browser tokens):** adversarial **code review** per candidate against the
  `Non-negotiable quality bar` + dead-component / shared-chrome checks (double scroll, phone-width
  overflow, half-styled states, lorem rubble, states from sibling surfaces, redrawn remote,
  work-surface not dominating) + `tsc -b` clean + eslint clean.
- **Browser render smoke-check — recorded opt-in.** The 시안 handoff *is* the human's render
  check, so automated browser verification is off by default. After the **first** round's
  candidate work (its first handoff), ask the user **once** whether to run automated browser
  render verification going forward; **record the answer in `docs/picky-client.md`** and honor it
  every later round without re-asking. The first round itself skips automated browser (the user
  sees it live).
- A candidate that fails is fixed and re-verified before it is shown. Cuts/fixes noted in the log.

### 6. Function-round upgrade (no new pipeline)

Function/convention rounds already have live grounding (two required sources as artifacts),
anti-convergence ("name ≥2 genuinely-open sub-choices or it isn't a round"), and a pre-show
editor-class gate. They do **not** get a second pipeline. They get two upgrades only:

- add the **recency lens** to their grounding (is this the *current* convention or a stale one?);
- promote their self-attested grounding + passive pre-show gate to an **adversarial** check
  (a skeptic verifies the grounding actually happened and the candidates pass the editor-class bar).

### 7. Recorded preferences (`docs/picky-client.md`)

The round log gains a small **Settings** block (asked once, then honored): at minimum
`browserRenderCheck: on | off`. `references/log-format.md` documents it.

### 8. File changes

- **New** `references/generation-gate.md` — the five-stage pipeline, both gate lens tables with
  **verbatim refute prompts**, the Stage 1 research method, and the cost/scope controls.
  Self-contained, the way `ux-writing.md` is.
- `SKILL.md` — rewrite core-loop step 2 ("Triage, then generate") to route taste rounds through
  the pipeline; add a short "Generation is gated" pointer; add `generation-gate.md` to the
  reference list.
- `references/rounds.md` — tighten "Researching current trends" + "Making candidates genuinely
  distinct" to defer to the gate file; apply the function-round recency + adversarial upgrade to
  the convergent path.
- `references/log-format.md` — add the Settings block + a Research-artifacts/Grounding line + gate
  outcomes to the round template.
- **Downstream sync** — re-copy the skill into `C:/dev/picky-client/skills/picky-client/`. No push.

## Cost / scope controls

- **Round 1** — full pipeline (full research sweep, proposer fan-out, both gates at full strength).
- **Later taste rounds** — research *refreshes* the axis in play; gates run lighter (fewer
  skeptics) because the carried-over winner constrains divergence.
- **Function rounds** — existing convergent path + the two upgrades in §6.
- **Browser render** — opt-in, recorded once (§5).

## Scope / non-goals

- **This work** = the pipeline + gates + file edits above, under `~/.claude/skills/picky-client/`.
- **Non-goals:** no change to the harness UI / accordion; no change to the function round's core
  convergent philosophy; **no trend names hardcoded**; no auto-push of the plugin repo.

## Risks / notes

- **Latency.** Two adversarial fan-out gates + proposer fan-out add subagent rounds. Mitigation:
  gates are parallel (wall-clock ≈ slowest skeptic), text slate gate is cheap, later rounds run
  lighter. ultracode is on and quality is the priority, so this is acceptable.
- **Research theatre.** The model could run token web searches and still recall. Mitigation: the
  recency lens explicitly checks the slate is *tied to the logged artifacts*, and "researched then
  ignored it" is a named failure.
- **Over-purge of the familiar.** The recency lens must not reject a timeless-correct choice just
  for not being flashy — it targets *staleness/training-default*, not restraint. State this in the
  lens prompt so it doesn't become a novelty ratchet.

## Implementation discipline (RED/GREEN)

Editing a skill → follow the writing-skills RED/GREEN discipline, as the ux-writing-gate work did:

1. **RED** — give an agent the *current* skill and a Round-1 taste task; confirm it produces a
   stale and/or convergent slate with no research artifacts (the baseline failure).
2. Apply the edits.
3. **GREEN** — same task on the new skill: the direction gate must **reject** a planted stale slate
   and a planted samey slate, research artifacts must appear in the log, and the recorded
   browser-preference must be honored. No skill edit ships without the failing case first.
