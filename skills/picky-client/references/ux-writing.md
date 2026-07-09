# Copy rounds — write the words well, then gate them

Read this when a round's target has **user-facing copy** — an entry/landing screen, or any
candidate whose headings, labels, buttons, empty/error states are read by a real person. Visual
rounds pick a *look*; copy is judged differently: not by "is it pretty" but by whether the
right **words** are on screen for *this* audience. This file is picky-client's own copy
method and gate — it is self-contained and needs no other skill installed.

Copy is a **fixed shared axis**, settled once. When a target has real copy, run the gate
below to produce the vetted strings (a shared `vetted-copy` module the candidates import), then
look rounds vary the *look* over that fixed copy — one axis at a time. Only an explicit
**copy round** re-opens the words as the variation axis. See the two-stream flow in
`SKILL.md` (copy gate and candidate generation run in parallel; the swap is free).

## The two traps

1. **Over-explaining.** Trying to describe the product *precisely* bloats the copy —
   translation-ese ("a solution for…"), undefined jargon, stacked metaphors — and the reader
   *still* guesses. Accurate-but-clumsy is a failure, not a win.
2. **Over-purification (the sharp one).** Replacing a standard term the audience already
   uses — a loanword like `prompt`, a settled term like `report` — with a home-made "plainer"
   coinage (`ask-text`, `weekly look-back sheet`). It *looks* friendlier and buries the one word
   the user actually needs. This one hides from ordinary review — see below.

## Why over-purification survives review — and the fix

If you judge copy by **comprehension** — "would a stranger who knows nothing understand
this?" — a made-up transparent word (`ask-text` for *prompt*) is *easier* to guess than the
real term. So the comprehension test **rewards the mistake**; a cold reader's confidence
*prefers* the coinage. That is why the cold-read loop below must never be the only check.

Stop asking the comprehension question and ask the **production question**: not "would a
stranger understand this word?" but **"what word would *this* actual audience use for this
thing — and is it the word on screen?"** Say it aloud as the audience would. If they'd reach
for the standard term (`prompt`, `report`), the coinage fails no matter how transparent,
native, or short.

The same question guards the **opposite** ditch, so this never becomes a one-way purge of
loanwords: a fancy/foreign word where the audience says a plain one (`utilize` for `use`), or
purifying a standard term they already use, **also** fails — nobody *says* those either. The
target is never "more native" or "more plain"; it is the word this audience actually uses —
sometimes the loanword, sometimes the plain word. A standard term they don't *yet* know
(`RPA`, `OCR`) is **taught in place, not coined around**: gloss it, don't replace it.

## Bind to the voice profile first

**This skill names no product and pins no language.** Every product-specific slot is a
placeholder written to expose the *mechanism*, never a value to copy: write `<the product>`
for the app and `<the audience's language>` for the language the user is instructing in —
never a literal name, never a default to English. The ✗/✓ word pairs, allowlist entries, and
sample terms throughout this file are **illustrations** of each check, to be re-derived in the
audience's own vocabulary, never shipped verbatim. Before running the gate, bind `<the
product>` and `<the audience's language>` from the audience section of
`docs/ux-writing-profile.md`, then re-instantiate every example in *that* product and *that*
language before you judge. The gate is correct only when the same check, run on a Chinese
product in Chinese, yields the audience's own words — not the samples printed here. Never let
a literal `<the product>` leak into a live skeptic prompt.

To judge "what would this audience call it?" you need the answer written down. Before a copy
gate, check for `docs/ux-writing-profile.md`; **if absent, create it from this template**,
then bind the gate to it. "Friendly and clear" decides nothing — fill it concretely.

**Audit the allowlist against the product's real workflow before it silences skeptics.** The
allowlist tells Lens-1 skeptics "never flag these as coinages" — so a wrong-frame term parked on it
(a standard word for the wrong object) mutes the exact lens meant to catch it. Validate every
allowlisted noun against what the product actually does; an unvalidated allowlist entry is a
colluding rule (step 4).

```md
# Voice profile — <your product>
<!-- Fill every <…> in your own language. The English labels are only the frame; the
     values you fill in (terms, samples, register, product truths) must be written in the
     language your product actually ships in. -->

1. Audience
   - Primary reader: <role · domain fluency · tools they've already used>
   - Terms already on their tongue (write each exactly as this audience says it): <term, term, term …>
   - Terms they don't have yet (must be taught): <term, term>
   - The audience's language: <the language the user is instructing in — bind <the audience's language> from here>

2. Voice · register — pin it with GRAMMAR, not adjectives ("friendly and clear" decides nothing)
   > Register lives in a different place in each language — the tú/usted (Spanish) or 你/您
   > (Chinese) formality split, du/Sie (German), verb-ending honorifics (Korean/Japanese), contractions & mood (English).
   > Fix whatever device YOUR language uses so any string can be checked against it.
   - Statement form: <the ending / formality level you commit to>
   - Questions: <how a question is phrased>
   - Buttons / actions: <bare verb phrase, no terminal punctuation>
   - Requests / asks: <the polite form to use — ban the over-stiff one>
   - 3 voice samples (in the target voice): <a statement / a question / an empty-state or error>

3. Standard-term policy — the heart of the gate
   - Default: keep standard terms & loanwords as-is and teach them via §5; coin nothing
   - Allowlist — never coin around these: <term, term, term …>
   - Banned coinages (log each catch): <coined word → the standard term it must revert to>

4. Product truths — feed the honesty & accuracy lenses (write YOUR product's; don't inherit these prompts)
   - Does vs. oversells: <what it really does> — not <the job it must not claim to finish for the user>
   - What the output is: <draft / suggestion / estimate …> — not a finished, final result
   - Who does what, per step: <what the tool does> vs. <what the person does>

5. Term-explanation mechanism
   - How: one of <tooltip | click-through modal | inline gloss>
   - Contract: the visible label IS the term being defined; the definition never re-uses that surface word

6. Bias traps (log the moment you catch one)
   - <e.g. leaving a loanword alone while "purifying" one word beside it>
   - <e.g. making the tool the subject that finishes the job>
```

## The six lenses

Every user-facing string clears these. **1–4 are GATE** — one failure and the copy does not
ship; rewrite from the word up. **5–6 are Quality** — fix in place.

*The ✗/✓ pairs below are **English illustrations of each failure mode — not strings to copy.**
Write the real copy in the invoking user's language and product; the tempting mistake itself
differs by language, so reproduce the **mechanism**, not the words. "The app" stands in for the
product's real name; lenses 1, 2, and 5 are the most language-bound (see the note after the list).*

1. **Familiarity / standard term (GATE).** Keep the standard/loan word the audience already uses
   and *explain* it beside; don't invent a "plainer" word. Metric = the production question, not
   "would a stranger understand." ✗ `prompt` → `request text` (a 2026 worker already says
   "prompt"). ✓ keep `prompt`, gloss it in one line. **"Not invented" is not enough — it must be
   the right term for *this frame*:** re-anchor each domain noun to the real workflow the copy
   invokes and test it against *that*. ✗ labeling the captured document a "receipt" when the audience's
   reimbursement flow actually requires an "invoice" — a standard word, but the wrong object.
2. **Term–explanation contract (GATE).** The visible label *is* the term; the explanation
   *teaches* it and never re-uses the surface word. ✗ label "Retro summary", definition "A
   retrospective is…" (label ≠ the term defined — it defines a fancier synonym, not the word on
   screen). ✓ label "Retro", explain it without repeating "retro".
3. **Honesty (GATE).** The person does the work; the tool is what they use. Don't make the tool
   the subject that finishes the job. ✗ "Paste it in and the app does the rest for you." ✓ "The
   app drafts it for you — you review and refine." Judge an **agent-ambiguous verb against its
   worst reading** — a form that reads as both a user imperative and the tool acting on its own
   (Spanish "Convierte…", an English `-ing`/imperative hero) is an automation overclaim until
   disambiguated. Also fails: **guaranteeing an outcome the product doesn't control**
   ("reimbursable", "approved") on an unverified draft. On a hero too tight for the full "tool
   drafts / person reviews" clause, a **draft-noun alone** ("a draft", "a suggestion") can carry
   the honesty — the output is named as unfinished.
4. **Precision (GATE).** The string denotes what it actually is; no repeatable-read-as-one-off,
   no ambiguous "it / that", **no ambiguous actor** (who performs the verb — the worst-reading test
   from Precision's side). ✗ "Write this week's retro" (when it names the standing weekly habit,
   not one entry). ✓ "What you want to look back on each week — what, why, what's next." **One
   string, one state:** a single slot forced to serve more than one runtime state (empty vs. error
   vs. validation) is itself a precision defect — a line that truthfully says "nothing yet" *lies*
   during a load failure. Enumerate every state a string renders in, test Precision against each,
   and split the slot rather than blur it.
5. **Voice / register (Quality).** Hold the profile's register in *every* string — errors, empty
   states, machine-generated text included, and **grammatical person** (don't slip a first-person
   "my invoice" button under second-person "you" prose). ✗ hero formal ("We deliver your results"),
   error toast chatty ("Oops, that didn't save!"). ✓ unify — one register in both.
6. **Naturalness (Quality).** Sounds like the audience talking; kill padding, reflexive passive,
   translation-ese — and two shapes the aloud-test alone forgives: **inflation** (an elevated verb
   swapped in for punch — ✗ "Speak your to-dos" for ✓ "Say…") and a **garden-path / misparse** (a
   phrase that first reads as the wrong collocation — the misparse must be licensed by the grammar,
   not just visually suggestive — ✗ a hero "Log in seconds" reads as sign-in ("log in") before "log
   [your hours] in seconds"). Read aloud. (But a standard construction that's already natural — "you
   can…" — is not a word to "purify"; leave it.) ✗ "Utilization of this feature may be performed by
   the user." ✓ "You can use this."

> **Per-language, not verbatim.** These pairs illustrate the mechanism; substitute your language's
> own equivalents. The most language-bound are **1** — the settled loanword/standard term your
> audience already says vs. a home-made coinage (Spanish `un link`, Chinese `APP` — what the audience says — wrongly "purified" into a native
> word); **2** — your language's label word vs. the *different*, fancier word its gloss actually
> defines; and **5** — your language's own register system (Spanish tú/usted, Chinese 你/您 + 请 for polite asks,
> German du/Sie, English corporate vs. chatty): hold one register across every string.

### Gate table (for judging)

| Lens | Status | Fails when |
|---|---|---|
| **Familiarity / standard term** | **GATE** | a more familiar standard term exists than the word on screen (over-purification / needless coinage); or the mirror, a standard term got "purified"; or the word is un-invented but the **wrong referent for the frame** (a standard word naming the wrong object); an unfamiliar-but-standard term (`RPA`, `OCR`) is glossed, not coined around |
| **Term–explanation contract** | **GATE** | visible word ≠ term defined, or the definition is circular / re-uses the surface word |
| **Honesty** | **GATE** | the tool is the subject that finishes the work, the who-does-what chain is hidden, a draft is sold as finished, an **agent-ambiguous verb** reads (at worst) as automation, or the copy **guarantees an outcome the product doesn't control** |
| **Precision** | **GATE** | denotes something other than what it is; misleading, ambiguous "it", **ambiguous actor**, or **one slot serving several runtime states** (empty vs. error) |
| **Voice / register** | Quality | drifts off the profile's voice, including grammatical person |
| **Naturalness** | Quality (→ GATE in a hero — see Hero exception) | no real audience member would say it aloud; padded, passive, jargon-on-jargon, inflated, or a garden-path misparse |

**Hero exception:** a *demonstrated* calque / translation-ese in a hero or first-impression line is
a trust defect, not mere polish — treat it as GATE-blocking, especially when the copy's own native
phrasing already sits elsewhere on the surface.

## Refine word by word

Don't read a sentence whole — your own copy always reads "fine." Interrogate by part of
speech; the error almost always hides in **one word**. Order: Noun → Verb → Endings/particles → Read aloud.

- **Noun (most important — fails here).** Production test: not "could a stranger guess it"
  but "**would a real user of this product actually say this word out loud?**" A
  guessable-but-unsaid coinage fails (users say "prompt", not a forced "ask-text") — and so does
  an un-invented word that is the **wrong referent for the frame** (a "receipt" where the flow
  needs an "invoice"). **Sibling-loanword check:** if `prompt`/`report` are left alone on the same
  screen while one word got "purified", that's cherry-picking — restore the standard term.
  **Consistency check:** if the *same referent* is named two ways across the surface, force the
  comparison and pick one — the better form is often already a line away.
- **Verb.** Is the subject the **tool** or the **person**? A phrase like "analyzes and sums it
  up for you" makes the tool finish the user's work — put the **person** as subject, tool as
  means; don't hide the chain (the tool drafts, the person reads and judges).
- **Endings/particles.** Do endings/particles hold the register? Body in the fixed style,
  buttons as bare verb phrases with no ending. Check tone doesn't jump between candidates.
- **Read aloud.** Read the finished line aloud. If the user wouldn't *say* it that way, rewrite.
  The eye forgives; the ear doesn't.

## The adversarial gate — the deliverable

Comprehension does not pass copy; this does.

1. **Inventory every string.** Titles, body, buttons, labels, empty/error/validation,
   placeholders — **including strings generated at runtime** (the system prompts behind any
   machine-generated text of the product produce text real users read; if the standard terms
   and tone aren't set there, the machine re-inserts coinages). For each string, **enumerate every
   runtime state it renders in** (empty vs. error vs. validation vs. loaded) and split any slot that
   must serve more than one — a string is judged against *each* reading, not one.
2. **Self red-team every string** (always, even without subagents) — but a detailed self-PASS is
   **admiration dressed as rigor, not evidence.** For each GATE lens, first write the single
   strongest *attack* that would break the line ("what if this slot also fires on an error?",
   "under the worst reading, is the tool the subject?", "is this the right term for the *frame*,
   not just an un-invented word?"), then answer it — never record a PASS you didn't first try to
   break. Banned self-passes: "it's not a coinage → Familiarity PASS" and "it reads fine aloud →
   Naturalness PASS." Then run the word-by-word checklist and, for any explained term, render the
   term + definition together for circularity. If a GATE lens fails, fix the word before fanning
   out. **The fan-out (step 3) is mandatory and load-bearing, never redundant** — the author's ear
   habituates to their own phrasing, so Precision and Naturalness are not final until an
   *independent* skeptic has tried to break them.
3. **Fan out refuting skeptics.** With subagents, spawn **one skeptic per lens (six)** and
   tell each to *break* the string on that lens — not evaluate, **refute**; a writer admiring
   their line can't see it. Skeptics **sonnet or better**, synthesis **opus**, **never
   haiku**. Refute prompt for lens 1 — fill `<the product>` and `<the audience's language>`
   from the voice profile's audience section before spawning the skeptic, never leave a
   placeholder literal, never default to English: *"You are a real user of `<the product>`, and
   you speak `<the audience's language>` — answer as that person, in that language. For each
   technical noun on screen — (a) what word do you actually use for this talking to a coworker
   or friend? (b) is it different from the word on screen? (c) does the screen word sound like
   someone coined it to 'simplify'? If a more familiar standard term exists, it fails — name
   that term. Don't credit it for being guessable; I asked what you *say*."* The English is an
   illustrative default; the placeholders plus "answer in that language" are the working parts,
   so a Chinese engagement fills them and the skeptic role-plays a Chinese-speaking user
   naming the Chinese standard term. (The allowlist blesses standard terms for the *author*, not
   the skeptic — a skeptic still flags a wrong-frame or wrongly-coined term regardless of what's
   allowlisted.)
4. **Judge by the gate table.** Any skeptic that breaks a **GATE** lens = the string does not
   ship. **Rewrite from the word up and re-verify from the start** — wrapping a bad coinage in
   a tooltip only deepens the twist. Quality lenses get fixed in place. If a spec / style
   guide / `CLAUDE.md` line — or the voice profile's own **allowlist** — *instructed* the coinage
   or blessed a wrong-frame term (a **colluding rule**), the gate still wins and that line is the
   bug — fix the string *and* the line.

A string is done only when every skeptic fails to break it. The output is `vetted-copy.ts`
(or the copy-round winners), gate-passed.

## Cold-read loop — a drafting aid (not the gate)

Useful while *drafting* entry copy, especially "does a newcomer get what this is": write →
give a **zero-knowledge** subagent *only the visible text* and ask it to guess the service +
confidence ("I'm not sure" is signal) → a second agent that knows the product checks whether
the guess matched and whether the copy is clumsy/natural → revise, loop a few times.

**But cold-read confidence rewards over-purification** (a made-up transparent word reads
"clearer" than the real term), so never ship on cold-read alone — always follow with the
production question and the gate above. When prose still can't be concise + natural +
instantly clear after a few loops, **drop to concise core keywords + a fast path into Step 1**
— that switch is a success, not a giving-up. A copy round is strongest when its candidates span
"natural prose that nails it" → "almost pure keywords + a big start button".

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
