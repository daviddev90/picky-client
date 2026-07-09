# Log format — docs/picky-client.md

`docs/picky-client.md` at the project root is the durable record of the whole tournament.
It lets a later session resume mid-process and explains the design lineage ("why is the
app this color?" → read the log). Update it whenever you create a round, add its
candidates, or record a winner.

Keep it append-friendly and skimmable. One section per round, newest practice is to keep
rounds in ascending order so the lineage reads top-to-bottom.

## Template

```markdown
# picky-client — design decision log

> Project: <project name>
> Harness: src/picky-client/ · Browse: /picky-drafts
> Status: Round <N> in progress

## Brief

<1–3 lines: what UI/page this tournament is improving, and any fixed constraints
the user gave — stack, brand rules, must-keep elements, audience/language.>

---

## Round 1 — Design tone & manner
Status: decided · Winner: #3
Decides: tone & manner (1 key color + ≤1 sub color)

| # | Title | Key / Sub color | Rationale |
|---|-------|-----------------|-----------|
| 1 | Calm neutral + single blue | #2563EB / — | trustworthy-corporate, restrained |
| 2 | Warm gray + coral | #F2683C / #6B7280 | warm-friendly, approachable |
| … | … | … | … |
| 10 | Dark-native + lime | #A3E635 / — | experimental, dark-mode-native |

Notes: <anything worth remembering — why the winner won, what to carry forward.>

---

## Round 2 — <decision, derived from Round 1 winner>
Status: in progress
Decides: <one line>
Base (carryover): Round 1 #3

| # | Kind | Title | Rationale |
|---|------|-------|-----------|
| 1 | carryover | <winner carried over> | previous winner, baseline |
| 2 | trend | … | … |
| 3 | trend | … | … |
| 4 | trend | … | … |
| 5 | trend | … | … |
| 6 | trend | … | … |
| 7 | experimental | … | … |
| 8 | experimental | … | … |
| 9 | experimental | … | … |
| 10 | experimental | … | … |

Notes: <pending user pick>
```

## What each part is for

- **Brief** — captured once, so any session knows the goal and constraints without
  re-interviewing the user.
- **Per-round header** — `Status`, `Winner` (when decided), and `Decides` give a
  one-glance state of the tournament. `Base (carryover)` records the lineage for rounds
  after #1.
- **Candidate table** — title + rationale for all ten, mirroring each candidate's `meta`.
  This is what makes the log a real record rather than a changelog. For rounds after #1,
  include the `Kind` column (carryover / trend / experimental) so the spread is visible.
  The Round 1 rows in the template are illustrative English showing the *shape*, not text to
  copy: each row is exactly one key color + at most one sub color, with a one-line rationale
  naming the mood/trend (the template shows three of the ten Round-1 moods). Write the real ones
  in the language the user is briefing in and the candidates render in — a Chinese brief yields
  Chinese rows. Only the hex values and the `—` ("no sub color") convention are literal.
- **Notes** — the human reasoning: why a winner won, what carries forward, open
  questions. This is the part future-you will thank present-you for.
- **Function/convergent rounds** don't use the fixed ten-row trend/experimental table
  above (that shape is the **taste** path only). Log the 3–5 candidates you actually built
  with a `Kind` of `convention` (winner carried as `carryover`), a usability trade-off per
  row, and a **Grounding** line naming the product files you read and the search/docs
  queries you ran. Don't pad to ten or invent experimental rows to match the taste shape.
  Example:

  *(Illustrative — an English example, not text to copy. A non-English user writes the **same
  shape** in their own language and for their own product: the file paths, candidate titles,
  trade-offs, and the Grounding finding all localize; only the search query follows wherever
  authoritative convention sources live — keeping third-party tool proper nouns like Photoshop /
  Figma / Procreate as-is.)*

  ```markdown
  ## Round 3 — Editor layout (function / convergent)
  Status: in progress
  Decides: canvas / tool / panel placement
  Base (carryover): Round 2 #4
  Grounding: read src/photo_editor/{Editor,Toolbar}.tsx (confirmed left nav · fixed canvas);
  searched "Photoshop Figma Procreate canvas tool-rail layout 2025" → common: maximize canvas +
  edge tool-rail + minimal chrome + floating panels

  | # | Kind | Title | Usability trade-off |
  |---|------|-------|---------------------|
  | 1 | carryover | previous winner | baseline |
  | 2 | convention | left tool-rail + top options bar | desktop convention · tools reachable instantly / canvas narrows on small screens |
  | 3 | convention | floating toolbar (Procreate-style) | maximizes canvas / longer pointer travel · popover occlusion |
  | 4 | convention | right docked panel | property editing kept adjacent / left-right asymmetry |

  Cut: hero title across the top — chrome encroaches on the canvas (quality-bar violation)
  ```

Keep the table in sync with the actual files under `src/picky-client/rounds/round{N}/` —
the log and the harness should never disagree about what the candidates are.
