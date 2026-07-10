# Round playbook

How to fill a round with 10 candidates that are actually worth choosing between. The
failure mode to avoid everywhere: ten variations that are secretly the same idea. Each
candidate should be a real fork the user could live with.

## Contents

- [Round 1: design tone & manner](#round-1-design-tone--manner)
- [Researching current trends](#researching-current-trends)
- [Rounds after #1: winner + 9 variations](#rounds-after-1-winner--9-variations)
- [Making candidates genuinely distinct](#making-candidates-genuinely-distinct)
- [Proposing the next round](#proposing-the-next-round)
- [Multiple winners](#multiple-winners)

## Round 1: design tone & manner

Round 1 commits to a **feeling and a palette spine** — not layout, not type details,
not decoration. Everything later builds on it, so the ten options should span a real
range of moods (e.g. trustworthy-corporate, warm-friendly, editorial, playful, minimal,
high-contrast-bold, soft-pastel, dark-mode-native, retro-revival, premium-restrained).

Hard rule for Round 1: **each candidate uses exactly one key color and at most one sub
color.** No third accent, no rainbow. The discipline forces a genuine commitment to a
mood and keeps the ten distinguishable. Neutrals (white/black/grays) are the canvas and
don't count against the one-key/one-sub limit.

Choose each key color from the product's **meaning + this round's segment research**, and make the
slate **span hue** (warm / cool / neutral-led) — don't let it collapse into the model's reflex, the
**AI-default cool-blue / indigo / purple**. The *hue-bias check* in `generation-gate.md` (Stage 3)
enforces this: a justified purple/blue passes, a reflex one (or a one-hue-family slate) fails.

To show a tone on a real screen, render each candidate as the **same representative
composition** — pick a screen that matters in the project (e.g. the page being improved)
and render all ten with identical content but different tone/color so the comparison is
apples-to-apples.

Before generating, research where design is right now (next section). Round 1 should feel
current, not like framework defaults.

## Researching current trends

The **forced** research method — the two-pass web search (derive keywords → pull diverse
sources), scoped to the product's segment, with the queries and sources **logged as
artifacts** — lives in `generation-gate.md` (Stage 1). It is mandatory, not "use it if the
tools are available." This section only adds the taste-round specifics that sit on top of it:

- Translate findings into **distinct named directions**, each with a one-line rationale you
  drop into the candidate's `meta.rationale`, so the research is visible in the output rather
  than lost — a one-line credit, not a box to tick; the user's pick is the real judge of
  whether the trend landed.
- Keep accessibility real: key/sub colors should hit usable contrast against the canvas for
  text and controls. A beautiful palette that fails contrast is a bad candidate.

Ground **every** round, not just Round 1: Round 1 gets a full sweep; later taste rounds
refresh the axis in play (re-check *current* practice for that axis — "the tone was fixed in
Round 1" is not a reason to skip grounding type this round). Function rounds ground via the
convergent path below (product code + tool conventions, live, recorded as artifacts). The
whole point of Stage 1 is that grounding is never optional: candidates built from recall are
exactly the stale-slate failure the direction gate exists to reject.

## Function/convention decisions — the convergent path

Some rounds decide **function, not feel**: a tool/editor layout, control placement, canvas
sizing, density, or navigation structure (see *Decision triage* in SKILL.md). Usability and
reference-tool convention narrow these toward a right-*ish* answer, so running them as a
10-way divergent taste vote is the wrong form — a forced "bold experimental" slot only
manufactures convention-violating outliers (a hero-sized title eating the canvas, chrome
crowding the work surface) and asks the user to vote on what should be reasoned out. Do
this instead:

1. **Ground before drawing — two sources, both required, both as artifacts.**
   - Read the actual **product code** for this screen: existing components, structure,
     constraints (a left nav already there, a fixed canvas size, current routing). Design
     to what's really there, not an imagined screen.
   - Pull the **conventions of this tool class** from real references, **live** — use
     Context7 / web search to check current tool layouts; do not recall from memory. Name
     the tools (Photoshop / Figma / Procreate / Lightroom for an image editor) and what
     they've converged on: work-surface dominance, tool-rail placement, chrome
     minimization, panel/overlay behavior.
   - Record both in the log's **Grounding** line: the product files you read and the
     search/docs queries you actually ran, with their gist. Naming a tool from memory is
     **not** grounding — if you can't cite something you pulled *this round*, you haven't
     grounded.
   - **Thin or missing product code is not a license to invent a generic layout.** If the
     screen barely exists yet, ground harder on (a) the tool-class conventions and (b) the
     content/data inventory this screen must actually hold.
2. **Name the genuinely-open sub-choices, then build one candidate each (3–5).** List the
   sub-choices where good reference tools actually differ (left rail vs bottom bar vs
   floating toolbar; docked vs pop-over panels; where app-level nav lives). If you can't
   name **at least two**, it isn't a round — present a single reasoned recommendation with
   its grounding instead of padding to a fake tournament. Drop the experimental quota
   entirely: every candidate respects the shared conventions; none exists just to be bold.
3. **Gate each candidate adversarially before showing it.** Run the editor-class checklist
   (SKILL.md *Non-negotiable quality bar*: work surface dominates, tools reachable, chrome
   never a hero element, nav never permanently eats the canvas) as a **refuting skeptic**, not
   a self-check — and have that skeptic also confirm the grounding actually happened (the
   queries / sources are cited) and that the chosen conventions are **current, not stale**
   (recency). This is the function-round form of the two upgrades in `generation-gate.md`
   (*Function rounds — two upgrades*). A failing candidate is cut — and **note in the log what
   you cut and why**, so the user sees the pick space wasn't silently narrowed.
4. **Hand off as a critique, not a beauty contest.** For each candidate state its
   usability trade-off (what it optimizes, what it costs) so the user decides on function.
   Converge toward the reference consensus.

Carry the winner over as usual (`kind: "winner-carryover"`); tag the rest
`kind: "convention"`. The trend/experimental split and the fixed count of ten are the
**taste** path only. If a decision turns out pure taste after all (both layouts equally
usable, only the feel differs), run it as a normal tournament.

## Rounds after #1: winner + 9 variations

This is the **taste** path (for function/convention rounds see *Function/convention
decisions — the convergent path* above: carry the winner, then 3–5 grounded candidates, no
experimental quota). For a taste round, once there's a winner, every later round is **the
winner plus nine variations of it**, always totaling ten:

- **#1 — winner, carried over unchanged.** The baseline and the safe pick. Mark
  `kind: "winner-carryover"`. Carry the winner's *decisions*, not its *mistakes*: if it
  contains an element that doesn't render on the target surface (a dead component that
  slipped through), fix it in the carryover rather than laundering it into a fixed baseline
  every later candidate inherits.
- **#2–#6 — five trend-aligned variations.** Each applies a *different* current-trend
  direction to the winner — five different ideas, not five tweaks of one. Mark
  `kind: "trend"`. Source the five from *this* round's trend grounding (see *Researching
  current trends*), not a fixed list; the directions here only illustrate the kind of spread
  to aim for — a bolder/heavier take, a softer/rounder take, a denser editorial take, a more
  spacious airy take, a higher-contrast take — not a menu to copy. Choose directions that
  genuinely diverge.
- **#7–#10 — four experimental, bold variations.** Take real risks — the options that
  might be "too much" but surface ideas the cautious set never would; again illustrative, not
  a checklist (unexpected layouts, dramatic type, motion-forward concepts, an unconventional
  color move within the established palette, asymmetry). Mark `kind: "experimental"`. Some
  *should* feel risky; that's the point.

Derive each candidate's real direction from this round's grounding for the product's own
market and write its named direction + one-line rationale into `meta.rationale` **in the
invoking user's language** (a Chinese/Spanish/Arabic run names and explains its directions
in that language).

Whatever the round decides, the variations vary **that axis** while keeping the winner's
established decisions intact. In a typography round, all ten share the winner's tone &
color and vary type. Don't relitigate settled rounds.

## Making candidates genuinely distinct

Apply this test on the **text slate**, before building: *if you described candidates A and B
to the user in one sentence each, would the sentences be obviously different?* If not, push
them apart. This test is no longer self-attested — the **Distinctness lens** in
`generation-gate.md` (Stage 3) enforces it adversarially: a skeptic collapses the ten into
the fewest real ideas and the slate fails if that count is under ten. Design the slate to
survive that, up front.

- Vary the **idea**, not just numbers. "16px vs 17px body text" is not two candidates.
- Pull from different references/aesthetics so the set covers range.
- Make the experimental ones actually brave. A timid experimental candidate wastes one of
  the ten slots.
- Still respect the project's constraints and the non-negotiable quality bar (no double
  scroll, mobile-first, finished feel). Bold ≠ broken.
- **Stay shippable to the target.** On a non-web target, trend/experimental directions stay inside the
  Target Capability Profile — the portability leg in `generation-gate.md` cuts a candidate whose sole
  differentiator can't be reproduced natively. On an **existing-with-logic** target, every candidate
  must host the real component's feature/state inventory (`generation-gate.md`): a winner that omits a
  load-bearing control is not shippable.

## Surfaces that share chrome or state (incl. redesigning the harness itself)

Most rounds are safe here and can skip this section: the candidate *is* the product
screen, so everything it draws is something the user sees on that screen. It applies
**only when the surface you're designing shares chrome or navigation state with sibling
surfaces** — you're redesigning the harness's own review pages, a step inside a wizard, a
tab under a shared nav. There, some states you'd naturally draw actually live on a
*sibling* surface, and drawing them here produces a **dead component**: the user never
reaches that state on this screen, so it can't be judged.

The harness's own review flow is the canonical trap. It is **two** sibling surfaces:

- `/picky-drafts` — the **accordion main**: rounds as accordion rows, and the open round's
  candidates shown as clickable thumbnails. You reach a candidate **directly** from here —
  there is **no pager and no "Now viewing" state** (tapping a thumbnail leaves for the
  candidate page).
- `/picky-drafts/{roundId}/{index}` — one candidate **full-screen** under the sticky
  `HarnessChrome` bar; this is the *only* place the pager `‹01/10›`, the `R{n}` round
  dropdown, and the "Now viewing" (current-candidate) state exist.

So a mockup of the accordion main must **not** contain a candidate pager, a "Now viewing"
badge, or a browse-progress bar — those are candidate-page states. And a candidate must
**never redraw the harness's own remote**: the real `HarnessChrome` already sits above it,
so a mock `← List`/round-dropdown/pager inside the candidate shows two remotes at once. (This
is exactly the trap that once filled harness mockups with dead components.)

**The check (only when the shared-chrome condition holds):** before generating, open the
real surface components (`PickyDraftsPage.tsx`, `RoundAccordion.tsx`, `DraftPage.tsx`,
`HarnessChrome.tsx`) and list what *this* surface renders versus what a *sibling* renders;
keep each candidate to this surface's own elements. **Why:** a control the user only meets
on another screen adds nothing to judge here and quietly breaks the "what you pick is what
ships" promise.

## Proposing the next round

Don't run rounds on autopilot. After a winner is chosen, **propose the next decision**
in one line, tied to what's now settled and what's still open, and proceed only on the
user's go-ahead. A natural progression (adapt — these are examples):

1. Tone & manner (Round 1, fixed)
2. Typography / card design / layout
3. Microinteractions / screen navigation (transitions, click-through)
4. Core-area UI: CTAs, hero/reference sections, key conversion surfaces

Let the project pull the order. If the winning tone clearly hinges on type, do type next;
if navigation is the real question, jump there. Name the decision, get the nod, build the
round.

## Multiple winners

The canonical flow is one winner → one carryover + nine variations. If the user picks
**k > 1** winners, treat each as a base for the next round:

- Carry all k selected candidates over as #1..#k (`kind: "winner-carryover"`).
- Fill the remaining `10 − k` slots with variations across the bases, keeping a
  trend-leaning majority and at least one or two experimental swings.
- Always land on exactly ten.

This lets the user keep two strong-but-different directions alive for one more round
instead of forcing a premature pick — but converge back toward a single winner soon, or
the tournament stops compounding.
