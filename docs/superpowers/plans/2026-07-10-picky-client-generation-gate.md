# picky-client Generation Gate — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) to
> implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insert a forced-research + adversarial-gate pipeline around candidate generation so the
skill stops producing stale, look-alike 시안 — without ever hardcoding a trend.

**Architecture:** A new self-contained reference file `references/generation-gate.md` holds the
five-stage taste pipeline (research → slate → direction gate → build → error gate) and the two
gate lens tables with verbatim refute prompts. `SKILL.md`, `references/rounds.md`, and
`references/log-format.md` are edited to route through it. Validation is RED/GREEN dogfooding via
adversarial subagents, not unit tests.

**Tech Stack:** Markdown skill files under `~/.claude/skills/picky-client/` (outside this repo);
subagents / Workflow for validation; the plugin mirror at `C:/dev/picky-client/`.

## Global Constraints

- **No trend names in the skill.** Regulate the *process* (derive keywords → search diverse live
  sources at run time), never a specific aesthetic. Stays valid in future years.
- **Skill body is English** (the skill was localized); candidate/copy *output* is in the invoking
  user's language. New prose matches the existing English voice of the files it lives in.
- **Subagents never haiku** — minimum sonnet; opus for judgment/synthesis.
- **Adversarial gates told to *refute*** (mirror the copy gate in `references/ux-writing.md`).
- **Source of truth = the live skill** `~/.claude/skills/picky-client/`; the plugin copy
  `C:/dev/picky-client/skills/picky-client/` is re-synced after and committed **local-only (no push)**.
- Verify TypeScript with `npx tsc -b`; **never `npm run build`** (it deploys). (Only relevant if a
  dogfood builds a harness — the core validation is text-slate only.)
- Commit to **main** directly; no branches.

---

### Task 1: RED baseline — capture the current failure

**Files:**
- Create: `<scratchpad>/red-baseline.md` (evidence only — scratchpad, not the repo)

**Interfaces:**
- Produces: a recorded baseline the GREEN task (Task 7) compares against.

- [ ] **Step 1: Define a fixed dogfood brief.** Use this exact brief for both RED and GREEN so
  they are comparable:

  > "A mobile-first web app for freelance designers to send invoices and track payments.
  > Round 1 — tone & manner. Produce the 10-candidate direction slate."

- [ ] **Step 2: Run the CURRENT skill on the brief via one subagent (sonnet or opus).** Prompt the
  agent to follow the *current* `~/.claude/skills/picky-client/` exactly and output its Round-1
  direction slate + whatever research it did.

- [ ] **Step 3: Record the failure signals** in `<scratchpad>/red-baseline.md`:
  - Did it run any live web search? (expect: no / recall-only)
  - Are there logged research artifacts (queries + sources)? (expect: none)
  - Collapse the 10 directions to real-idea count — is it <10? (convergence)
  - Would a designer today read them as current or 2–3 years stale? (staleness)

- [ ] **Step 4: Commit nothing** (scratchpad only). RED evidence is a working artifact.

Expected: the current skill produces a slate that is recall-based, artifact-free, and stale and/or
convergent — the baseline the fix must flip.

---

### Task 2: Write `references/generation-gate.md` (the core new file)

**Files:**
- Create: `~/.claude/skills/picky-client/references/generation-gate.md`

**Interfaces:**
- Produces: the five-stage pipeline + Stage-1 research method + both gate lens tables with the
  verbatim refute prompts below. `SKILL.md` and `rounds.md` (Tasks 3–4) point here.

- [ ] **Step 1: Write the header + the five-stage overview** — the pipeline diagram from the spec
  (`Stage 1 research → 2 slate → 3 direction gate → 4 build → 5 error gate`), one line each, and the
  scope note: taste rounds run the full pipeline; function rounds get only the §6 upgrades.

- [ ] **Step 2: Write "Stage 1 — forced live research".** Content:
  - Mandatory web search, every taste round (Round 1 full sweep; later rounds refresh the axis).
  - **Pass A — keyword discovery:** run several broad exploratory queries to learn the current
    vocabulary and *derive* the optimal keywords; never search once with a guessed phrase.
  - **Pass B — deep, diverse-source search:** search derived keywords across multiple source types,
    not just SEO listicles — community discussion where designers debate what feels current
    (Reddit-style threads are *one example*, do not fixate on any single source), showcase
    galleries (Dribbble / Behance / Awwwards-class), design press. Scope to the product's segment.
  - Extract named directions (palette / type / motion / aesthetic), each tied to a source.
  - **Log artifacts:** the actual queries, the sources, one-line gist each (→ `log-format.md`).
  - **No trend names in this file** — procedure only.

- [ ] **Step 3: Write "Stage 2 — direction slate".** A text slate of 10 entries, each =
  named direction + the specific researched trend/reference it stakes + key/sub color intent +
  one-line rationale (in the user's language). **Proposer fan-out default on:** independent
  proposer subagents surface distinct research-grounded directions → dedup/merge into a
  range-spanning 10. Cheap (text) — enforce divergence here, before any build.

- [ ] **Step 4: Write "Stage 3 — direction gate (pre-build)" with the lens table and verbatim
  refute prompts.** Table:

  | Lens | Status | Fails when |
  |---|---|---|
  | **Recency** | GATE | today's designer reads it as 2–3 years stale; a direction ties to no logged source; the slate researched a current aesthetic then fell back to safe defaults that ignore it |
  | **Distinctness** | GATE | the 10 collapse to <10 real ideas |

  Verbatim recency refute prompt (one skeptic, opus; never haiku):

  > "You are a design director reviewing this slate of 10 candidate directions for {product/screen}.
  > REFUTE its currency — assume it is stale until proven current. For each direction: would a
  > designer working *today* recognize this as current practice, or as something from 2–3 years ago
  > or a generic default? Cross-check each against the research artifacts logged this round; if a
  > direction ties to no source pulled today, mark it unsupported. Flag any sign the slate
  > researched a current aesthetic and then fell back to safe, familiar directions that ignore it.
  > Do NOT reward flashiness for its own sake and do NOT fail a restrained choice that is simply
  > timeless — the target is staleness / training-default, not the absence of novelty. Return the
  > stale or unsupported directions with reasons, and whether the slate as a whole reflects what the
  > research found."

  Verbatim distinctness refute prompt (one skeptic):

  > "Reviewing this slate of 10 candidate directions: REFUTE its distinctness. Collapse the 10 into
  > the fewest genuinely-different ideas — if two would be described by the same one sentence
  > (differing only in a number, a shade, or a label), merge them. Count the real ideas. If fewer
  > than 10, the slate fails. Return the collapsed groups and the real-idea count."

  Judgment: an opus synthesizer reads both skeptics; **any GATE failure → revise the slate
  (fresher/more directions; push convergent ones apart) and re-verify from the start.** Only a
  surviving slate proceeds. Carry existing constraints (one key + ≤one sub color, contrast, market
  fit). Round 1 full fan-out; later rounds lighter.

- [ ] **Step 5: Write "Stage 4 — build" (brief).** Build the 10 from the approved slate; copy comes
  from `vetted-copy.ts` (existing rule); respect the Non-negotiable quality bar. The locked diverse
  slate means builds inherit divergence instead of converging during coding.

- [ ] **Step 6: Write "Stage 5 — error gate (post-build)" with its refute prompt + the recorded
  browser opt-in.**
  - **Always (cheap):** adversarial code review per candidate + `tsc -b` + eslint clean. Verbatim
    hunter prompt:

    > "You are a front-end reviewer trying to find the broken candidate. For candidate {N}, hunt
    > for: double / nested scroll; overflow or broken layout at 375px; half-styled or empty states,
    > lorem/placeholder rubble; any control or status that belongs to a *sibling* surface (a pager,
    > a 'now viewing' marker, a redrawn harness remote); work-surface not dominating (tool screens);
    > tsc or eslint errors. Assume it is broken until each is checked. Return each defect as
    > file:line."

  - **Browser render smoke-check = recorded opt-in:** after the first round's first handoff, ask
    the user once; record in `docs/picky-client.md`; honor thereafter without re-asking. First round
    skips automated browser (user sees it live). Rationale: the handoff *is* the human render check.

- [ ] **Step 7: Write "Cost / scope controls" + "Function-round upgrade" sections.** Round 1 full;
  later taste rounds lighter; function rounds = existing convergent path + recency lens + promote
  self-attested grounding & passive pre-show gate to an adversarial check (a skeptic verifies the
  grounding happened and candidates pass the editor-class bar). No second pipeline for function.

- [ ] **Step 8: Self-check.** Re-read the file: no trend names; every stage present; both refute
  prompts verbatim; cross-refs to `log-format.md` / `harness.md` / `ux-writing.md` name real files.

---

### Task 3: Edit `SKILL.md` to route through the gate

**Files:**
- Modify: `~/.claude/skills/picky-client/SKILL.md` (core loop step 2; reference list)

**Interfaces:**
- Consumes: `references/generation-gate.md` (Task 2).

- [ ] **Step 1: Rewrite core-loop step 2 ("Triage, then generate").** After triage, taste rounds
  run the **generation pipeline** in `references/generation-gate.md` (research → slate → direction
  gate → build → error gate); function rounds take the convergent path in `rounds.md` **with the
  §6 recency + adversarial upgrades**. Keep the existing copy-gate parallelism note.

- [ ] **Step 2: Add a short "Generation is gated" subsection** near "How candidates are seeded":
  one paragraph — generation is no longer draw-10-and-mount; it is research-grounded and
  adversarially gated before *and* after building; the method is in `generation-gate.md`.

- [ ] **Step 3: Add `references/generation-gate.md` to the Reference-files list** with a one-line
  "read before generating candidates" pointer; adjust the `rounds.md` line so the two don't overlap
  (rounds.md = taxonomy/variation; generation-gate.md = the pipeline + gates).

- [ ] **Step 4: Self-check.** No dangling references; step 2 reads coherently with the new file;
  English voice consistent.

---

### Task 4: Edit `references/rounds.md` (defer to gate; upgrade function path)

**Files:**
- Modify: `~/.claude/skills/picky-client/references/rounds.md`

**Interfaces:**
- Consumes: `references/generation-gate.md`.

- [ ] **Step 1: Tighten "Researching current trends".** Keep the taxonomy value but replace the
  self-attested "research, don't recall" guidance with a pointer: the *forced* research method now
  lives in `generation-gate.md` (Stage 1); this section keeps only the direction/variation
  taxonomy. Remove any wording implying research is optional.

- [ ] **Step 2: Tighten "Making candidates genuinely distinct".** Keep the one-sentence test but
  note it is now *enforced adversarially* by the Distinctness lens (`generation-gate.md` Stage 3),
  not self-attested.

- [ ] **Step 3: Upgrade the function/convention convergent path.** Add: (a) a **recency check** to
  the two-source grounding ("is this the *current* convention or a stale one?"); (b) promote the
  grounding + pre-show editor-class gate to an **adversarial** verification (a refuting skeptic
  confirms grounding happened and each candidate clears the editor-class bar). Reference
  `generation-gate.md` §6 rather than duplicating the prompts.

- [ ] **Step 4: Self-check.** No contradiction with `generation-gate.md`; no duplicated method;
  cross-refs resolve.

---

### Task 5: Edit `references/log-format.md` (Settings + artifacts)

**Files:**
- Modify: `~/.claude/skills/picky-client/references/log-format.md`

- [ ] **Step 1: Add a top-level Settings block** to the `docs/picky-client.md` template:
  `browserRenderCheck: on | off` (asked once, recorded), with a one-line note on how it is set.

- [ ] **Step 2: Add a per-round "Grounding / research artifacts" line** to the round template: the
  queries run, sources hit (one-line gist each), and the gate outcomes (direction gate: pass /
  revised-N-times; error gate: N cut/fixed).

- [ ] **Step 3: Self-check.** Template still parses as the source of truth; fields match what
  `generation-gate.md` says to log.

---

### Task 6: Consistency sweep across all four files

**Files:**
- Modify (as needed): the four skill files above.

- [ ] **Step 1: Grep for hardcoded trend names** (e.g. glassmorphism, neumorphism, brutalism, any
  named aesthetic) across the skill; if any slipped in as a *prescription* (not an illustrative
  "e.g."), remove it. Process-only.

- [ ] **Step 2: Grep for dangling pointers** — every `references/*.md` and section name referenced
  actually exists.

- [ ] **Step 3: Terminology check** — "recency" and "distinctness" used consistently as the two
  lens names everywhere; "direction gate" / "error gate" named consistently.

- [ ] **Step 4: Language check** — no stray Korean in the English skill body (ripgrep for Hangul),
  except intentional cross-language anchors already present.

- [ ] **Step 5: No commit here** — the live skill lives outside git. The plugin mirror is the only
  git-tracked copy and is committed in Task 8, after GREEN passes.

---

### Task 7: GREEN validation — RED/GREEN dogfood via a Workflow

**Files:**
- Create: `<scratchpad>/green-validation.md` (evidence)

**Interfaces:**
- Consumes: Task 1 RED baseline; the edited skill.

- [ ] **Step 1: Run the NEW skill on the same brief (Task 1 Step 1) via a Workflow.** Stages:
  (a) a proposer fan-out produces a slate; (b) the direction gate (recency + distinctness skeptics,
  opus) judges it. Confirm research artifacts are produced and logged.

- [ ] **Step 2: Planted-defect checks (the gate must catch these).** Feed the direction gate:
  - a **planted stale slate** (all directions 2–3 years old) → recency lens must **reject**.
  - a **planted samey slate** (10 = 3 ideas recolored) → distinctness lens must **reject**.
  - a **false-positive trap** (a restrained-but-timeless-correct slate) → recency lens must **NOT**
    reject it for lacking novelty.

- [ ] **Step 3: Record GREEN evidence** in `<scratchpad>/green-validation.md` and compare to RED:
  research now runs + is logged; stale/samey slates are rejected; the false-positive is spared.

- [ ] **Step 4: If any check fails, return to the relevant file task** (2–5), fix, re-run. Do not
  proceed to sync until GREEN passes.

---

### Task 8: Sync plugin mirror + commit

**Files:**
- Modify: `C:/dev/picky-client/skills/picky-client/**` (re-copy from the live skill)
- Modify: this repo's spec/plan docs (already committed; nothing new unless edits were made)

- [ ] **Step 1: Re-copy** the edited `~/.claude/skills/picky-client/` into
  `C:/dev/picky-client/skills/picky-client/` (new file + edited files).

- [ ] **Step 2: `claude plugin validate C:/dev/picky-client`** — must pass (both manifests).

- [ ] **Step 3: Commit the plugin repo** (local, main, **no push**):
  `git -C C:/dev/picky-client add -A && git commit` with a message describing the generation gate.

- [ ] **Step 4: Report** — summarize RED→GREEN, list changed files, and state the plugin commit is
  local-only (push still gated on explicit approval).
