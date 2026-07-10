# Applying the settled design — without breaking the original

Everything from "the design is **settled**" to "the restyled **real** screen, verified." The
tournament decides a *design*; this file ports that design onto the real product — which may be
React+Tailwind, another web stack, or native (Android Compose / iOS SwiftUI / Flutter) — and proves
it didn't break what was there.

Two rules govern everything here:

- **The candidate is a design source, not a code drop-in.** You **restyle the real component**; you
  never replace it with the static tournament mock (the mock has fake data, no handlers, no real
  states). "What you pick is what you ship" is only literally true for a greenfield React+Tailwind
  screen; everywhere else the pick is the *design* you ship, ported here.
- **Every guarantee must execute.** A gate that can't be run is not a PASS — it is **UNVERIFIED**.
  Claude performs every step itself (never handed to the user).

**When this runs.** Once, at **settle** — the user's explicit "the design is settled / finalize"
step (see SKILL.md core loop). It applies the *accumulated* winner (the final round's carryover
encodes all prior axes). A mid-tournament "apply it now" is an explicit **partial/preview**
application, clearly logged as such, never the durable spec.

## The durable design spec — `docs/picky-client-design.md`

At settle, capture the winning design as a **stack-neutral** spec the application step translates
into the target idiom. Template:

```markdown
# <project> — settled design spec
> Target: <React+Tailwind | other web | Android Compose | iOS SwiftUI | Flutter | inline-CSS>
> Reference rendering: src/picky-client/rounds/round<N>/candidate-<k>.tsx (the winning candidate)

## Tokens (intent + reference web value + per-platform mapping)
- color roles:  bg / surface / fg / muted / accent / border / danger …  (hex per role)
  palette mode: <fixed brand palette | adopt platform dynamic color (Material You)>
- type:      base size + scale ratio (role sizes derive from it) · role → { web: px/rem + family; iOS: semantic text style; Android: sp + type role } · per-role leading
- spacing:   base unit + step scale + grid (columns / gutter / container max-width) → target spacing unit
- radii:     role → value
- elevation: "<intent, e.g. card one level above surface>" → { web: box-shadow; iOS: material/hairline level; Android: dp + tonal surface }
- motion:    "<intent, e.g. quick decisive ~200ms ease-out>" → { web: duration+bezier; iOS: spring response/damping; Android: motion token }

## Screen anatomy
- regions / hierarchy: <...>
- focal element + emphasis budget: <the ONE element the eye lands on first; how many elements read as primary>
- key components: <...>
- states: <default | loading | empty | error | disabled | dark> — each tagged **DECIDED** (shown in
  the tournament) or **UNDECIDED** (never shown; decided at apply)
- responsive: <breakpoints / adaptive behavior>
- system chrome & safe areas: <where the screen sits vs status bar, notch/Dynamic Island, home
  indicator, gesture-nav bar, keyboard/IME>
- navigation / gesture model: <nav bar + back gesture | bottom bar | ...>

## Interaction / motion
- <transitions, gestures, the "feel" the winner was picked for>
```

Record tokens as **intent**, not just the web literal — a CSS box-shadow is meaningless on Android
(tonal elevation) and iOS (material layering), and a `duration+bezier` cannot express the spring the
user actually picked. The translator maps *intent*, not literal CSS.

## Before you touch the app — three reconciliations

### A. Structural reconciliation (do this first, always)

"Restyle in place, never rewire" is **unsatisfiable** for the layout / navigation / experimental
winners the tournament is built to produce — their anatomy differs from the real component, so
there is no 1:1 region map.

1. **Inventory the real component from code** (not from the mock, and not from the task's
   description): every region, event handler, conditional branch, feature, route, and `aria-*`.
   Confirm you are inventorying the component that **actually owns the logic** — a same-named
   presentational stub (`components/X` beside the real `pages/X`) is a trap that leads to enumerating
   phantom features on the wrong file; if the target file is ambiguous, **confirm with the user**
   before touching anything.
2. **Diff** that inventory against the winner's anatomy.
3. **If the winner adds / removes / reorders regions, or has no home for an existing feature → STOP**
   and produce a **user-approved migration plan**: each real feature → *maps where* / *needs new
   state or routing* / *the winner silently omits it* → an explicit **keep-or-drop** decision. Only a
   winner the component can host 1:1 proceeds straight to restyle. A structural winner is an explicit
   re-layout task whose **acceptance list is the preserved-feature inventory**.

**Native:** drop the "structure untouched" framing entirely — reaching the look forces structural
rewrites (Compose `Column` → `Scaffold` + `LazyColumn`, wrapping in `Surface` for tonal elevation).
The safe unit is: *"the screen re-authored from the spec into idiomatic native structure, with
behavior / handlers / state / routing / a11y / tests preserved."*

### B. Token / design-system scope

Name, before applying, how the winner's tokens relate to the app's existing ones — **replace / map /
coexist** — and the central token source (Tailwind `@theme`, MUI/Chakra theme, Compose
`MaterialTheme`, CSS variables):

- **One-screen skin** → map spec roles to **scoped / local** overrides; **never edit the global
  token**; warn the user this screen will now diverge from its siblings.
- **App-wide adoption** → editing the global token IS the intended change — but then the application
  gate's **scope expands to sibling-screen no-regression** (build + screenshot the other top screens,
  because a `MaterialTheme` / `@theme` edit flips every screen at once).
- **No central system** (palette inlined per element) → decide with the user: introduce a token layer
  vs. scoped inlined classes on this screen only.

### C. Rollback discipline

1. Verify a **clean working tree** first — otherwise the rollback point is meaningless.
2. Make the pre-apply commit **dedicated** (no unrelated changes).
3. Apply the restyle as **scoped commit(s)** touching only the target's files; commit any
   **shared-token edits separately** so reverting the restyle can't clobber unrelated token work.
4. Capture a **pre-restyle baseline** — each state rendered + a short handler/route trace — as the
   diff target for "behavior intact."

## Apply

Restyle **region-by-region against the spec**; touch nothing unrelated. Pull tokens from the spec's
per-platform mapping, not the mock's literal CSS.

**States.** The tournament decided only **DECIDED** states (the happy path); the mock never showed
loading / empty / error / disabled / dark. For each non-default state: **render the restyled state**
(extend the harness, or a scratch state gallery) and get a **quick user OK** — these states were
never picked, so they get their own quick decision. Every **UNDECIDED** state **escalates to the
user**; it is never Claude-invented and self-approved.

## The application gate — and it must actually execute

Two legs. Any FAIL → scoped revert or fix, then **re-verify from the start**.

### No regression

Branch on **"do covering tests exist?"**

- **Yes** → run them (plus `npx tsc -b` + lint).
- **No** (the common case — many targets, incl. this repo, have no test runner) →
  1. **Static structural-preservation diff:** every prop, handler, state branch, route, and `aria-*`
     present on the real component **before** must still be present **after**. This catches a dropped
     `onClick={handleSubmit}` (a button needs no handler to typecheck), a lost `disabled={isSaving}`
     guard (double-submit), a simplified `canToggle && isPublic !== null` guard (toggle leaks to
     non-owners), a dropped optimistic-update rollback.
  2. **Drive it live:** from the pre-restyle baseline, **exercise each interactive element and visit
     each state** in a real browser (the environment's browser driver — see *Browser render tooling*
     in SKILL.md), diffing after-vs-baseline.

Never read an empty test suite's "tests pass" as green. **No covering tests = behavior UNVERIFIED**,
which forces the executed drive above.

### Visual parity — verified against the spec, not the mock's pixels

- **Mandate an executed render** of the restyled **real** screen with **real data** — the environment's
  browser driver for web (see *Browser render tooling* in SKILL.md); a simulator/emulator screenshot or
  snapshot test for native. **No PASS on a static code read.** If no render can be captured (e.g. no
  simulator available), the verdict is **UNVERIFIED**, never PASS.
- **Compare to the spec (token / intent conformance), not the mock's pixels** — translation to another
  idiom necessarily changes pixels.
- **Rubric.** PASS-permitted deltas: sub-pixel / reset / font-hinting, host global styles. FAIL
  deltas: wrong type-scale step, wrong spacing role, wrong color role, wrong hierarchy / order, a
  missing element. Cite the rubric line for any FAIL.
- **Cross-idiom.** These expected platform divergences must **NOT** count as regressions:
  safe-area insets, native control chrome, gesture / back nav, Dynamic Type scaling, material-vs-
  shadow, dynamic color. These true intent violations **must**: wrong hierarchy, wrong color role,
  wrong spacing / type scale, lost motion character. A faithful native adaptation that differs from
  the web mock **passes**; forcing pixel-parity with the mock (a web-shaped custom toggle, a
  status-bar-ignoring layout) is itself a failure.

Log the render artifact + a per-state verdict (PASS / FAIL / UNVERIFIED) in `docs/picky-client.md`
(see `log-format.md`).

### Ship-readiness QA (a11y, content, i18n, motion) — runs here, on the real screen

These verify the design is *shippable*, not just picked. They are deliberately kept OFF the taste pick (a
taste round has "no wrong answer", and ten mocks don't merit a full QA); they run **here**, once, on the
real rendered screen with real data — where a render always happens. Batch them into the executed pass
above:

- **Accessibility completeness.** "Is every icon-only control accessibly named? Every meaningful image
  `alt` (decorative `aria-hidden`)? Exactly one `main` landmark + a sane heading order? Any tap target
  under ~44px (or ~24px with adequate spacing, WCAG 2.5.8)? Any `outline:none` with no visible replacement
  ring? file:line." (The pick-time core already ensured real controls + a focus ring; this completes it.)
- **Interaction / motion safety.** "Does every control show distinct hover / focus / pressed / disabled
  feedback? Does every animation respect `prefers-reduced-motion`? Is any state (selected / error /
  status) signalled ONLY by color, with no icon / text / shape backup?"
- **Content stress (name DIMENSIONS, never specific strings).** For every field from the real data model,
  render a MIN (0/1 char, empty, 1 item) and a MAX (longest plausible unbroken token, N× items, max-digit
  locale-formatted number, each count-string at 0/1/2/many). "Assume the demo data is a lie — find every
  field that clips, overflows, wraps ugly, or misaligns; file:line."
- **i18n robustness (only if the Brief marks >1 language / an RTL locale).** (a) Pseudo-localize key
  labels / nav / buttons at +40% length → FAIL on truncation / overlap / horizontal scroll. (b) Re-render
  `dir=rtl` → return every un-mirrored element and physical-side style (`ml-`/`mr-`, literal `←`/`‹`/`›`)
  with its logical fix (`ms-`/`me-`, `start`/`end`, mirrored glyph).

Any FAIL → fix and re-verify. No render available (e.g. native without a simulator) → the affected check
is **UNVERIFIED**, never a silent PASS.

## Greenfield & native (no existing component)

When there is nothing to restyle (a new screen, or a greenfield native target), apply = **generate
fresh code FROM the spec** in the target idiom. There is no existing behavior to preserve, so the
no-regression leg is replaced by **verification against the spec + the target's build/tests**; the
visual-parity leg is unchanged (executed render, spec conformance, UNVERIFIED if no render).
