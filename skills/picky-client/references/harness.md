# Harness architecture

The harness is the small app the user clicks through to run the tournament. It is
**dev-only** and self-contained under `src/picky-client/`. It auto-discovers rounds and
candidates from the filesystem, so adding a round is just adding files — no router edits.

This targets the project's fixed stack: **React + TypeScript + Vite + React Router +
Tailwind + Motion (Framer Motion)**. If a project differs, keep the same shape and adapt
the integration points (route registration, glob import).

## Two surfaces (not three)

The harness has **two** surfaces, joined by an accordion:

- **`/picky-drafts` — the accordion main.** A **centered H1** (`PICKY-CLIENT DRAFTS`, with a
  white→pale-coral text gradient) over a rounds accordion. Collapsed, a round shows its number
  + a **short title** + a **description** of what it decides. Expanded, it shows that round's
  candidates as clickable thumbnails. The **latest round is the current one** and opens by
  default; opening a round tints its big **sans** number with the key color. You reach a
  candidate **directly** — there is no separate "round grid" page.
- **`/picky-drafts/:roundId/:index` — the candidate (individual candidate).** One candidate full-screen,
  under a **sticky** full-width top header bar (nav buttons on the left, `PICKY-CLIENT DRAFTS`
  label on the right).

> Route name: default `/picky-drafts`. **If the project already uses that path, propose an
> alternative** (`/_picky`, `/design-drafts`, …) and confirm with the user before wiring.

## Contents

- [File layout](#file-layout)
- [Theme tokens](#theme-tokens)
- [Harness copy](#harness-copy)
- [The registry (auto-discovery)](#the-registry-auto-discovery)
- [Route registration](#route-registration)
- [Page: /picky-drafts (accordion main)](#page-picky-drafts-accordion-main)
- [Page: /picky-drafts/:roundId/:index (candidate)](#page-picky-draftsroundidindex-candidate)
- [RoundAccordion](#roundaccordion)
- [HarnessBar](#harnessbar-shared-top-bar)
- [HarnessChrome (candidate-page remote)](#harnesschrome-candidate-page-remote)
- [CandidatePreview](#candidatepreview)
- [No double scroll](#no-double-scroll)
- [Mobile-first and motion](#mobile-first-and-motion)
- [Candidate authoring contract](#candidate-authoring-contract)

## File layout

```txt
src/picky-client/
  types.ts                 # RoundMeta (with hidden?), CandidateModule, RoundData
  theme.ts                 # palette tokens (dark default, light seam) — all harness color
  copy.ts                  # harness copy (harnessLabel "PICKY-CLIENT DRAFTS", winnerBadge)
  registry.ts              # import.meta.glob discovery → rounds + getRound + visibleRounds
  routes.tsx               # pickyClientRouteElements(): 2 routes to merge into app router
  pages/
    PickyDraftsPage.tsx    # /picky-drafts — centered H1 + RoundAccordion
    DraftPage.tsx          # /picky-drafts/:roundId/:index — one candidate full-screen
  components/
    HarnessBar.tsx         # shared sticky top bar: left slot + right PICKY-CLIENT DRAFTS label
    HarnessChrome.tsx      # candidate-page header (fills HarnessBar left slot): back link · R{n} · pager
    RoundAccordion.tsx     # the rounds accordion (collapsed=title+decides, expanded=thumbnails)
    CandidatePreview.tsx   # clipped, non-scrolling thumbnail used inside the accordion
  rounds/
    round1/
      round.meta.ts        # { id, title, decides, status, winnerIndex?, hidden? }
      candidate-01.tsx     # default export: a candidate component + named `meta`
      ...
    round2/ ...
```

The harness lives entirely under `src/picky-client/`; the only host-app reference is the route
mount, tagged `// [picky-client]` and gated by `import.meta.env.DEV` (below). **That guard only
hides the routes at runtime — it does NOT keep the code out of the production bundle.** The
harness is a **dev-only capsule you delete before deploy** — see `references/removing.md`.

## Theme tokens

**Coral magazine (coral + blue-black) is the default look**, but every color goes through
`theme.ts` tokens so a project can retheme by editing one file. Dark is the default;
light is a seam (structure in place, values filled later).

```ts
// src/picky-client/theme.ts
// All harness color comes from here (no hardcoded hex). Apply color via inline style —
// Tailwind v4's static scan can't read JS values inside class strings, so never put tokens in a class.
export interface ThemeTokens {
  coral: string; coralPale: string; base: string; card: string; bar: string;
  fg: string; mute: string; sub: string; hairline: string;
}
const dark: ThemeTokens = {
  coral: "#F2683C", coralPale: "#FBD3C4", base: "#0B0E16", card: "#161B27", bar: "#12161F",
  fg: "#E8ECF4", mute: "#9AA3B8", sub: "#6B7280", hairline: "#334155",
};
const light: ThemeTokens = dark; // light seam — values filled in later
export const themes = { dark, light } as const;
export type ThemeName = keyof typeof themes;
export const theme: ThemeTokens = themes.dark; // active theme (later swap point for context/toggle)
```

**Color rule (non-negotiable):** apply tokens via inline `style={{ color: theme.fg }}`,
never inside a Tailwind class string (`bg-[${theme.x}]` will not compile). Neutral utilities
(spacing, layout, `white/10` overlays) stay as Tailwind classes. This centralization is what
makes light mode a later token-swap instead of a rewrite.

## Harness copy

```ts
// src/picky-client/copy.ts — the harness's own copy (per-candidate copy lives elsewhere).
// harnessLabel is the TOOL'S BRAND, not chrome: keep the fixed string "PICKY-CLIENT DRAFTS"
// in every project and every language — the one entry here that is NOT localized. Every other
// string in this file is user-facing chrome: render it in the language the user is instructing
// you in (the English below is only an illustrative default).
export const copy = {
  harnessLabel: "PICKY-CLIENT DRAFTS", // TOOL BRAND — fixed English, never translated. Accordion-main H1 + candidate-header right label.
  winnerBadge: "Winner",               // CHROME — localize to the user's language (e.g. "冠军" / "Ganador" / "Sieger"). Badge on a decided round's winner.
} as const;
```

Every harness-owned string in the snippets below (`copy.ts`, `HarnessChrome`, `DraftPage`) is an
**illustrative English DEFAULT, not a value to ship** — render each in the language the user is
instructing you in. The one exception is `harnessLabel` = `PICKY-CLIENT DRAFTS`: it is the tool's
own brand, stays fixed English in every language, and doubles as the leak-probe grep token in
`references/removing.md`, so keep it byte-for-byte stable. **One noun, everywhere:** pick ONE word
for the candidate/draft in your language and reuse it across the pager, the not-found message, and
the marker alike, so they never drift.

| English default | Renders as / where |
|---|---|
| `List` | back link, shown `← List` → returns to the accordion main |
| `Previous candidate` | pager `‹` button aria-label |
| `Next candidate` | pager `›` button aria-label |
| `Switch round` | round-dropdown trigger aria-label |
| `Jump to round` | open dropdown panel aria-label |
| `Close` | overlay close aria-label |
| `To the accordion` | dropdown menu entry, shown `≡ To the accordion` (keep `≡`) |
| `Winner` (copy.winnerBadge) | coral badge on a decided round's winning candidate |
| `Candidate not found` | DraftPage not-found fallback |
| `Now viewing` | current-candidate marker — candidate page's remote only, never the accordion main |

## The registry (auto-discovery)

`import.meta.glob` finds rounds and candidates with no hand-kept list. `types.ts`:

```ts
import type { ComponentType } from "react";

export type RoundStatus = "open" | "decided";

export interface RoundMeta {
  id: number;                 // 1-based round number
  title: string;              // short round name — the accordion's big title (e.g. "Layout & remote")
  decides: string;            // what this round decides (a description) — the accordion's small label. Not a count.
  status: RoundStatus;
  winnerIndex?: number;       // 1-based winning candidate, when decided
  hidden?: boolean;           // hide from the harness list (an abandoned round). Files and direct URLs are preserved.
}

export interface CandidateMeta {
  index: number;              // 1-based, from the filename candidate-0X
  title: string;
  rationale: string;
  kind?: "winner-carryover" | "trend" | "experimental" | "convention";
}

export interface CandidateModule { default: ComponentType; meta: CandidateMeta; }
export interface RoundData { meta: RoundMeta; candidates: CandidateModule[]; }
```

`registry.ts` builds `rounds` (all), `getRound(id)` (all — so a direct candidate URL to a
hidden round still resolves), and **`visibleRounds`** (hidden excluded — what the accordion
renders):

```ts
import type { CandidateModule, RoundData, RoundMeta } from "./types";

const metaModules = import.meta.glob<{ meta: RoundMeta }>("./rounds/round*/round.meta.ts", { eager: true });
const candidateModules = import.meta.glob<CandidateModule>("./rounds/round*/candidate-*.tsx", { eager: true });
const roundNumber = (path: string) => Number(path.match(/round(\d+)\//)?.[1] ?? 0);

export const rounds: RoundData[] = Object.entries(metaModules)
  .map(([path, mod]) => {
    const id = roundNumber(path);
    const candidates = Object.entries(candidateModules)
      .filter(([p]) => roundNumber(p) === id)
      .map(([, m]) => m)
      .sort((a, b) => a.meta.index - b.meta.index);
    return { meta: mod.meta, candidates } satisfies RoundData;
  })
  .sort((a, b) => a.meta.id - b.meta.id);

export const visibleRounds: RoundData[] = rounds.filter((r) => !r.meta.hidden);
export function getRound(id: number): RoundData | undefined {
  return rounds.find((r) => r.meta.id === id);
}
```

## Route registration

Only **two** routes. This app uses declarative `<Routes>`/`<Route>`, so expose route
ELEMENTS to spread into the app's `<Routes>`. The static `/picky-drafts` outranks a greedy
`/:param` route; the 3-segment candidate path can't collide with 1–2 segment app routes.

```tsx
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import { PickyDraftsPage } from "./pages/PickyDraftsPage";
import { DraftPage } from "./pages/DraftPage";

export function pickyClientRouteElements(): ReactElement[] {
  return [
    <Route key="picky-drafts" path="/picky-drafts" element={<PickyDraftsPage />} />,
    <Route key="picky-draft" path="/picky-drafts/:roundId/:index" element={<DraftPage />} />,
  ];
}
```

Mount dev-only, and **tag the host lines `[picky-client]`** so removal before deploy is a grep
(see `references/removing.md`). Declarative `<Routes>`:
```tsx
import { pickyClientRouteElements } from "./picky-client/routes"; // [picky-client] dev-only — remove before prod
// ...inside <Routes>:
{import.meta.env.DEV ? pickyClientRouteElements() : null /* [picky-client] */}
```
`createBrowserRouter` variant: return `RouteObject[]` instead and spread
`...(import.meta.env.DEV ? pickyClientRoutes() : [])` (tag it the same way).

## Page: /picky-drafts (accordion main)

A **centered H1** (`copy.harnessLabel` = "PICKY-CLIENT DRAFTS", with a white→pale-coral text
gradient) above a `RoundAccordion` over `visibleRounds`. No masthead, no top bar — the H1 *is*
the header. Reads `?round=N` to open a specific round on entry (the candidate page's back link
returns here with the source round expanded).

```tsx
import { useSearchParams } from "react-router-dom";
import { visibleRounds } from "../registry";
import { RoundAccordion } from "../components/RoundAccordion";
import { theme } from "../theme";
import { copy } from "../copy";

export function PickyDraftsPage() {
  const [params] = useSearchParams();
  const raw = Number(params.get("round"));
  const defaultOpenId = Number.isFinite(raw) && raw > 0 ? raw : undefined;
  return (
    <main className="min-h-[100dvh] overflow-x-hidden antialiased" style={{ backgroundColor: theme.base, color: theme.fg }}>
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        {/* centered H1 — white→very pale coral text gradient (color from tokens, inline style) */}
        <h1 className="pt-16 pb-10 text-center text-2xl font-bold uppercase tracking-[0.22em] sm:pt-24 sm:pb-14 sm:text-3xl lg:text-4xl"
          style={{
            background: `linear-gradient(90deg, ${theme.fg} 0%, ${theme.fg} 20%, ${theme.coralPale} 100%)`,
            WebkitBackgroundClip: "text", backgroundClip: "text",
            WebkitTextFillColor: "transparent", color: "transparent",
          }}>
          {copy.harnessLabel}
        </h1>
        <section className="pb-24 sm:pb-32">
          <RoundAccordion rounds={visibleRounds} defaultOpenId={defaultOpenId} />
        </section>
      </div>
    </main>
  );
}
```

## Page: /picky-drafts/:roundId/:index (candidate)

One candidate full-screen. `roundId` + `index` from `useParams` (`getRound(Number(roundId))`,
clamp index to `[1, candidates.length]`). The header is a **sticky** top bar; the page scrolls
under it. **Wrap everything
in a persistent dark `theme.base` container and swap the candidate instantly (`key={index}`).
Do NOT fade between candidates with `AnimatePresence mode="wait"` — the empty frame in the
middle flashes the white `body` background (the harness is dark; the app's body is not).**

```tsx
import { useParams } from "react-router-dom";
import { getRound } from "../registry";
import { HarnessChrome } from "../components/HarnessChrome";
import { theme } from "../theme";

export function DraftPage() {
  const params = useParams();
  const roundId = Number(params.roundId);
  const round = getRound(roundId);
  const total = round?.candidates.length ?? 0;
  const raw = Number(params.index ?? 1);
  const index = Math.min(Math.max(Number.isFinite(raw) ? raw : 1, 1), Math.max(total, 1));
  const candidate = round?.candidates.find((c) => c.meta.index === index);
  if (!round || !candidate) return <main style={{ backgroundColor: theme.base, color: theme.sub }} className="grid min-h-[100dvh] place-items-center">Candidate not found</main>;
  const Comp = candidate.default;
  // Persistent dark base container + instant swap with no fade gap → no white flash.
  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: theme.base }}>
      <HarnessChrome roundId={roundId} index={index} total={total} />
      <Comp key={index} />
    </div>
  );
}
```

## RoundAccordion

The heart of the main page. Per round item:

- **Collapsed header** (always visible): big **sans** round number (`R{id}`) + hairline + short `meta.title`
  + a sub-line = `meta.decides` — **what this round decides (a description), NOT the candidate
  count.** (The small label under the title must say what the round is *for*; the candidate
  count is noise — don't show it.) **No status labels** — the accordion's order carries status
  (last = current).
- **Open round's number is the key color**; closed rounds are muted. A single chevron on the
  right rotates on open.
- **Expanded body**: that round's candidates as `CandidatePreview` thumbnails in a responsive
  grid, each a `<Link to={/picky-drafts/{id}/{index}}>`; caption = number + `meta.title`. A
  decided round marks its `winnerIndex` candidate with a coral `copy.winnerBadge`.
- **Default open = `defaultOpenId` else the latest (last) round.** Single-open accordion
  (opening one closes others). Expand/collapse animated with framer-motion `height`
  (`useReducedMotion` → duration 0). Mobile-first single column; the page just grows (no
  nested scroll).

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { theme } from "../theme";
import { copy } from "../copy";
import { CandidatePreview } from "./CandidatePreview";
import type { RoundData } from "../types";

function RoundItem({ round, open, onToggle, reduce }: {
  round: RoundData; open: boolean; onToggle: () => void; reduce: boolean;
}) {
  const { id, title, decides, status, winnerIndex } = round.meta;
  const no = `R${id}`;
  const decided = status === "decided" && winnerIndex != null;
  return (
    <div className="border-b border-white/10">
      <h3 className="m-0">
        <button type="button" aria-expanded={open} aria-controls={`r${id}-panel`}
          onClick={onToggle} className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7">
          <span aria-hidden="true" className="w-12 shrink-0 text-center font-black tabular-nums text-[32px] sm:w-16 sm:text-[44px] lg:text-5xl"
            style={{ color: open ? theme.coral : theme.mute }}>{no}</span>
          <span className="h-9 w-px shrink-0 sm:h-11" style={{ backgroundColor: theme.hairline }} aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-lg font-bold sm:text-xl" style={{ color: theme.fg }}>{title}</span>
            <span className="mt-1 block truncate text-[13px] sm:text-sm" style={{ color: theme.sub }}>{decides}</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"
            className="shrink-0 transition-transform duration-200 motion-reduce:transition-none"
            style={{ color: theme.sub, transform: open ? "rotate(180deg)" : "none" }}>
            <path d="M3.5 5.25 7 8.75l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" id={`r${id}-panel`} role="region" className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: "easeOut" }}>
            <ul className="grid grid-cols-2 gap-4 pb-9 pt-1 sm:grid-cols-3 sm:pb-11 lg:grid-cols-4">
              {round.candidates.map((c) => {
                const isWinner = decided && winnerIndex === c.meta.index;
                return (
                  <li key={c.meta.index}>
                    <Link to={`/picky-drafts/${id}/${c.meta.index}`} className="group block">
                      <div className="relative">
                        {isWinner && <span className="absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: theme.coral, color: theme.base }}>{copy.winnerBadge}</span>}
                        <CandidatePreview Component={c.default} />
                      </div>
                      <p className="mt-2 flex items-baseline gap-2">
                        <span className="font-serif text-[13px] tabular-nums" style={{ color: isWinner ? theme.coral : theme.sub }}>{String(c.meta.index).padStart(2, "0")}</span>
                        <span className="min-w-0 flex-1 truncate text-[13px]" style={{ color: theme.fg }}>{c.meta.title}</span>
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RoundAccordion({ rounds, defaultOpenId }: { rounds: RoundData[]; defaultOpenId?: number }) {
  const reduce = useReducedMotion() ?? false;
  const latestId = rounds.length ? rounds[rounds.length - 1].meta.id : null;
  const [openId, setOpenId] = useState<number | null>(defaultOpenId ?? latestId);
  const toggle = (id: number) => setOpenId((p) => (p === id ? null : id));
  return (
    <div className="border-t border-white/10">
      {rounds.map((round) => (
        <RoundItem key={round.meta.id} round={round} open={openId === round.meta.id} onToggle={() => toggle(round.meta.id)} reduce={reduce} />
      ))}
    </div>
  );
}
```

## HarnessBar (shared top bar)

The candidate page's header shell — a **sticky** full-width bar (`sticky top-0`), pinned at
the top as you scroll the candidate. Left = a slot for nav (filled by `HarnessChrome`); right
= the `PICKY-CLIENT DRAFTS` label with a white→pale-coral (`theme.coralPale`) text gradient.

```tsx
import type { ReactNode } from "react";
import { theme } from "../theme";
import { copy } from "../copy";

export function HarnessBar({ children }: { children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center gap-x-3 gap-y-1 border-b px-4 py-3 sm:px-6"
      style={{ backgroundColor: theme.bar, borderColor: "rgba(255,255,255,0.08)", color: theme.fg }}>
      {children}
      <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{
          background: `linear-gradient(90deg, ${theme.sub} 0%, ${theme.sub} 20%, ${theme.coralPale} 100%)`,
          WebkitBackgroundClip: "text", backgroundClip: "text",
          WebkitTextFillColor: "transparent", color: "transparent",
        }}>
        {copy.harnessLabel}
      </span>
    </header>
  );
}
```

## HarnessChrome (candidate-page remote)

Lives **only on the candidate page**; it fills `HarnessBar`'s left slot with the nav — **all
controls on the left** (`← List`, the `R{n}` round dropdown, the `‹ NN/NN ›` pager); the
`PICKY-CLIENT DRAFTS` label sits at the right (from `HarnessBar`). Three navigations,
deliberately different weights:

- **The back link = back to the accordion**, `/picky-drafts?round={roundId}`, source round expanded.
- **Candidate paging is one-click `‹ ›`** within the round. Clamp at the ends.
- **Round switching is a dropdown, never an arrow** — the menu lists every visible round
  (jump to its first candidate, shown as `R{id} {title}`) plus an entry back to the accordion.

Props are `{ roundId, index, total }`; the menu reads `visibleRounds`.

```tsx
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { visibleRounds } from "../registry";
import { theme } from "../theme";
import { HarnessBar } from "./HarnessBar";

export function HarnessChrome({ roundId, index, total }: { roundId: number; index: number; total: number }) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const page = (d: number) => navigate(`/picky-drafts/${roundId}/${Math.min(Math.max(index + d, 1), Math.max(total, 1))}`);
  // Fill the shared HarnessBar's left slot with the nav — all buttons on the left, label on the right (from HarnessBar).
  return (
    <HarnessBar>
      <Link to={`/picky-drafts?round=${roundId}`} className="flex items-center gap-1.5 text-[13px] font-medium hover:text-white" style={{ color: theme.mute }}>
        <span aria-hidden="true" className="text-[15px] leading-none">←</span> List
      </Link>
      <span className="h-4 w-px" style={{ backgroundColor: theme.hairline }} aria-hidden="true" />
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label="Switch round"
        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-medium hover:bg-white/5" style={{ color: theme.fg }} onClick={() => setOpen((v) => !v)}>
        R{roundId} <span aria-hidden="true" className="text-[11px]" style={{ color: theme.sub }}>▾</span>
      </button>
      <span className="h-4 w-px" style={{ backgroundColor: theme.hairline }} aria-hidden="true" />
      {/* Pager also inside the left group (all buttons on the left) */}
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous candidate" disabled={index <= 1} className="grid h-7 w-7 place-items-center rounded-md text-[15px] hover:bg-white/5 disabled:opacity-30" style={{ color: theme.fg }} onClick={() => page(-1)}>‹</button>
        <span className="px-1 text-[13px] tabular-nums" style={{ color: theme.mute }}>{String(index).padStart(2, "0")}<span style={{ color: theme.sub }}>/{String(total).padStart(2, "0")}</span></span>
        <button type="button" aria-label="Next candidate" disabled={index >= total} className="grid h-7 w-7 place-items-center rounded-md text-[15px] hover:bg-white/5 disabled:opacity-30" style={{ color: theme.fg }} onClick={() => page(1)}>›</button>
      </div>
      <AnimatePresence>
        {open ? (
          <>
            <button aria-label="Close" className="fixed inset-0 z-40" style={{ backgroundColor: "rgba(2,6,16,0.5)" }} onClick={() => setOpen(false)} />
            {/* Opens just below the header (absolute → scrolls with the header) */}
            <motion.nav aria-label="Jump to round" className="absolute left-4 top-full z-50 mt-1 max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-xl p-2 text-sm shadow-xl ring-1 ring-white/10 backdrop-blur sm:left-6"
              style={{ backgroundColor: `${theme.bar}F5`, color: theme.fg }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={{ duration: 0.16 }}>
              <button type="button" className="mb-1 w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/5" style={{ color: theme.mute }} onClick={() => { setOpen(false); navigate(`/picky-drafts?round=${roundId}`); }}>≡ To the accordion</button>
              <ul className="flex flex-col gap-0.5 border-t pt-1" style={{ borderColor: theme.hairline }}>
                {visibleRounds.map((r) => (
                  <li key={r.meta.id}>
                    <button type="button" className="w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/5" onClick={() => { setOpen(false); navigate(`/picky-drafts/${r.meta.id}/1`); }}>
                      <b style={{ color: theme.fg }}>R{r.meta.id}</b> <span style={{ color: theme.sub }}>{r.meta.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </HarnessBar>
  );
}
```

## CandidatePreview

Renders a candidate as a **clipped, pointer-events-none** thumbnail so the accordion grid
stays scroll-free and uniform:

```tsx
import type { ComponentType } from "react";

export function CandidatePreview({ Component }: { Component: ComponentType }) {
  return (
    <div className="pointer-events-none aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-white">
      <div className="origin-top-left scale-[0.5] [width:200%]"><Component /></div>
    </div>
  );
}
```

(Scaling a `200%`-wide child by `0.5` gives a faithful, non-interactive shrink. The rule that
matters is `overflow-hidden`, never `overflow-auto`.)

## No double scroll

A broken-feeling draft can't be judged on design, and the most common breakage is nested
scrolling. Enforce:

- Each route page is the single scroll context. Expanding an accordion round just makes the
  page taller — never trap the body in an inner scroller.
- Thumbnails are **clipped** (`overflow-hidden`), not scrollable.
- The candidate header is a `sticky top-0` bar (in flow), so it pins to the top without
  creating a nested scroll context.
- At most **one** horizontal filmstrip (`overflow-x-auto`) is allowed inside a candidate;
  never a nested vertical scroll.

## Mobile-first and motion

- Author every candidate and page for phone width first (~375px), then enhance upward. The
  accordion is a single column on phones.
- Use Motion (Framer Motion) with its current API (`motion.*`, `AnimatePresence`,
  `useReducedMotion`). Keep it purposeful and quick; honor reduced-motion (duration 0).

## Candidate authoring contract

A candidate renders **one named target surface — and only what that surface actually
shows.** Name the real screen it depicts (a product screen, or — when improving the harness
itself — either `/picky-drafts` (the accordion main) or `/picky-drafts/:roundId/:index` (the
candidate page)), then draw only the elements and states that occur on *that* surface. A
control or status that lives on a **sibling** surface must not appear: e.g. the candidate
pager `‹01/10›` and the "Now viewing" state belong to the candidate page's remote, never to a
mockup of the accordion main — putting them there is a **dead component** the user never
reaches, so it can't be judged. Unsure whether an element renders on the target surface?
Open that surface's real component (`PickyDraftsPage.tsx`, `RoundAccordion.tsx`,
`DraftPage.tsx`, `HarnessChrome.tsx`) and check. See `references/rounds.md` → *Surfaces that
share chrome or state* for the full check.

**Never redraw the harness's own top bar / remote.** The real `HarnessChrome` (a sticky top
header bar) sits above every candidate on the candidate page, so a candidate that mocks its
own bar (a decorative `← List` / round dropdown / pager) shows **two** headers at once — the
real functional one plus the dead mock. This bites hardest when the tournament is designing the
harness *itself* (every candidate is a review-page mockup and instinctively draws a remote).
Depict the **content** of the surface (masthead, accordion, gallery, candidate body) and let
the real chrome be the chrome — the remote is `HarnessChrome`'s job, not the candidate's.

**Color comes from `theme.ts` tokens (inline style), never hardcoded hex.** **User-facing
copy comes from the shared copy module, not hardcoded.** When the target has copy a copy gate
settled (see `SKILL.md` → *Copy is a settled axis* and `references/ux-writing.md`), each candidate
imports its strings from the shared `vetted-copy.ts` (the copy gate's output — distinct from the
harness's own `copy.ts`, which holds only the review-UI labels) — so the variation axis stays
*look*, all candidates share the same gate-passed words, and finalizing the copy updates every
candidate for free.

Each `candidate-XX.tsx` exports a default component and a named `meta`:

```tsx
import type { CandidateMeta } from "../../types";

export const meta: CandidateMeta = {
  index: 1,
  // Illustrative — write title/rationale in the user's language, about their product.
  title: "Calm neutral + single blue",
  rationale: "Trend: restrained neutral base, one key color to signal trust",
  kind: "trend", // round 1 candidates can omit kind
};

export default function Candidate() {
  // A real, finished render of THIS round's decision on its ONE named target surface —
  // draw only the elements/states that surface actually shows (see the note above).
  // Tokens for color (inline style); Tailwind for layout; Motion for interaction.
  // Mobile-first. No inner scroll.
  return <main className="min-h-[100dvh] ...">...</main>;
}
```

Keep candidates as self-contained modules. Share genuinely reusable primitives via
`components/`, but don't over-abstract — each candidate should be easy to read and judge on
its own.
