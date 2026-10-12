# Copy rounds — write the words well, then gate them

## Contents

- [The gate lives in the `ux-writing` skill: use it, don't re-derive it](#the-gate-lives-in-the-ux-writing-skill--use-it-dont-re-derive-it)
  - [If `ux-writing` is not installed on this machine](#if-ux-writing-is-not-installed-on-this-machine)
- [Cold-read loop: a drafting aid (not the gate)](#cold-read-loop--a-drafting-aid-not-the-gate)
- [Find the real first-impression surface](#find-the-real-first-impression-surface)
- [Report with numbers](#report-with-numbers)

Read this when a round's target has **user-facing copy** — an entry/landing screen, or any
candidate whose headings, labels, buttons, empty/error states are read by a real person. Visual
rounds pick a *look*; copy is judged differently: not by "is it pretty" but by whether the
right **words** are on screen for *this* audience.

Copy is a **fixed shared axis**, settled once. When a target has real copy, run the gate to
produce the vetted strings (a shared `vetted-copy` module the candidates import), then look
rounds vary the *look* over that fixed copy — one axis at a time. Only an explicit **copy
round** re-opens the words as the variation axis. See the two-stream flow in `SKILL.md` (copy
gate and candidate generation run in parallel; the swap is free).

## The gate lives in the `ux-writing` skill — use it, don't re-derive it

**The copy method and its gate are one artifact, and it is the `ux-writing` skill.** Invoke it
(read its `SKILL.md` from the current Codex skill catalog, if installed) and run the gate from there:

- `SKILL.md` — the seven lenses, the gate table, the production question, the two structural
  failures the gate is shaped around.
- `references/principles.md` — each lens in full, with its sharper forms.
- `references/adversarial-review.md` — the runnable loop: the oracle persona, the production
  question **and** the job question, the self red-team, **the verbatim refuting-skeptic prompt
  per lens**, the judgment rule, inventory scope, two worked walkthroughs.
- `references/project-profile.md` — the profile template. `docs/ux-writing-profile.md` in the
  target project is where audience, register, standard-term policy, product truths and **slot
  jobs** get written down; without it the gate is a matter of taste.
- `references/word-by-word.md`, `references/eval-cases.md` — the drafting checklist and the
  planted-defect regression set.

**Why a pointer and not a copy.** This file used to carry its own condensed lens set. Both
copies then got hardened separately, and they drifted in *both* directions — the standalone
skill gained a lens this file lacked, while this file had sharpened four lenses the standalone
never received. A copy gate that is one lens behind ships copy the maintained gate would have
stopped, and nobody notices, because both files look complete. One source, or drift.

### If `ux-writing` is not installed on this machine

picky-client is deliberately self-contained, so the gate must not vanish when the skill is
absent. If `ux-writing` is not available in the current Codex skill catalog, **run this reduced gate rather than
skipping the gate** — and say in the round log that you ran the fallback, because it is weaker.

**Bind first.** Read `docs/ux-writing-profile.md` (create it if absent): who the audience is
and the terms they already say out loud; the register, pinned to grammar (sentence endings,
button form) rather than adjectives; which standard terms must never be "simplified"; what the
product actually does and what it must not promise; and **what each slot on the screen has to
accomplish** — one line per slot, written *before* you read the current copy. Never name a
product or default to English inside a skeptic prompt; bind the audience's own language.

**The seven lenses.** GATE lenses 1–5 block: one failure and the copy does not ship. Quality
lenses 6–7 get fixed in place.

| # | Lens | Fails when |
|---|---|---|
| 1 | **Familiarity / standard term** (GATE) | a more familiar standard term exists than the word on screen (coinage / over-purification), **or** the mirror — a standard term got "purified", **or** the word is un-invented but names the **wrong object for the frame**. Metric is the production question: *what word would this audience actually say?* — never "could a stranger guess it," which **rewards** a coinage. A standard term they don't yet know (`RPA`, `OCR`) is glossed, never coined around |
| 2 | **Term–explanation contract** (GATE) | the visible word ≠ the term defined, or the definition is circular / re-uses the surface word. Read label + definition **assembled**, as the user meets them |
| 3 | **Honesty** (GATE) | the tool is the subject that finishes the work, the who-does-what chain is hidden, a draft is sold as finished, an **agent-ambiguous verb** reads at worst as automation, or it **guarantees an outcome the product doesn't control** |
| 4 | **Precision** (GATE) | denotes something other than what it is — repeatable read as one-off, ambiguous "it", **ambiguous actor**, or **one slot serving several runtime states** (an empty-state line *lies* during a load failure) |
| 5 | **Purpose — does the job of its slot** (GATE) | it is true, clear and well-formed and still does not do the job that slot exists for: leads with the disclaimer or the consolation, does a *different* job than the slot's, or is inert. Test for inert: **name the one thing a reader has after this line that they didn't have before it** — if you can't, or the screen already gave it, the slot is empty. **Do not repair it by inflating the claim** (lens 3 blocks that); if no true line does the job, report that the slot wants a claim the product can't back |
| 6 | **Voice / register** (Quality) | drifts off the profile's register, grammatical person included |
| 7 | **Naturalness** (Quality → **GATE in a hero**) | no audience member would say it aloud: padded, passive, jargon-on-jargon, **inflated** (an elevated verb for punch), or a **garden-path misparse** the grammar licenses. A demonstrated calque in a first-impression line is a trust defect, so it blocks there |

**Why lens 5 exists, since it is the one a hand-made gate always omits.** Lenses 1–4 all fail a
string for being *wrong*. A gate made only of those is not a filter, it is a gradient pointing
at *claim less* — and the honesty lens pays for shrinking a promise. Its optimum is a sentence
nobody can fault because it does nothing. Test any gate you build: what does it reject that is
perfectly true, clear and well-formed? If nothing, it has one direction.

**Run it.** ① Inventory every string — titles, body, buttons, labels, empty/error/validation,
placeholders, **and strings generated at runtime** (the system prompts behind machine-written
text are participant-facing copy; if standard terms and register aren't encoded there, the
machine re-inserts the coinage you just removed). Two columns: the string, and its slot's job.
② Self red-team each string: for every GATE lens write the strongest *attack* first, then answer
it — never record a PASS you didn't try to break, and never these two ("it's not a coinage →
PASS", "it reads fine aloud → PASS"). ③ Fan out **one refuting skeptic per lens (seven)**, told
to *break* the string, not rate it — using the inherited Codex parent model for review and synthesis,
batched within available concurrency slots (see SKILL.md → Codex execution). The fan-out is load-bearing: the author's ear habituates within minutes.
④ Judge by the table. Any GATE break and it does not ship — rewrite **from the word up**, except
a Purpose failure, which is rewritten **from the slot's job down** because its words were never
the defect. Re-verify from the start; the rewrite is a new string. If a spec, a style guide,
`AGENTS.md`, or the profile's own **allowlist** instructed the mistake, record the conflicting
requirement and concrete product failure. User and project instructions still take precedence;
propose a correction to those instructions instead of silently overriding or rewriting them.

## Cold-read loop — a drafting aid (not the gate)

Useful while *drafting* entry copy, especially "does a newcomer get what this is": write →
give a **zero-knowledge** subagent *only the visible text* and ask it to guess the service +
confidence ("I'm not sure" is signal) → a second agent that knows the product checks whether
the guess matched and whether the copy is clumsy/natural → revise, loop a few times.

**But cold-read confidence rewards over-purification** (a made-up transparent word reads
"clearer" than the real term), so never ship on cold-read alone — always follow with the
production question and the gate. It is blind to the purpose lens too: a stranger can describe
a service perfectly from a line that would never make anyone buy. When prose still can't be
concise + natural + instantly clear after a few loops, **drop to concise core keywords + a fast
path into Step 1** — that switch is a success, not a giving-up. A copy round is strongest when
its candidates span "natural prose that nails it" → "almost pure keywords + a big start button".

## Find the real first-impression surface

Before writing entry copy, trace the path the real audience takes in. The `/` you think of as
"the landing" may be one few users hit — if people arrive by shared link, invite URL, or a
gated form, *that* screen is their only first impression and is where the "what is this" copy
belongs. Don't polish a marketing landing few reach while the true entry (a bare form, an
English loading screen) goes unwritten.

## Report with numbers

When logging the round in `docs/picky-client.md`, record per candidate the gate verdict per
GATE lens (pass / which lens broke), plus for entry copy the cold-read **confidence** and
**guess-match**. Keep the previous copy as an untouched baseline so the improvement is
legible. Numbers guide; the user's eye decides.
