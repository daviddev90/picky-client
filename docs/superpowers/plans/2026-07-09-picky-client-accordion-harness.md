# picky-client 아코디언 하네스 승격 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** picky-client 리뷰 하네스를 #7(코랄 매거진 아코디언)으로 승격 — `/picky-drafts` 2단 네비게이션(아코디언 메인 → 개별 시안), 리모컨 개편, 팔레트 토큰화, 그리고 picky-client 스킬 반영.

**Architecture:** 기존 3단(`/drafts` → `/draft-round{N}` → `/draft-round{N}/:index`)을 2단(`/picky-drafts` 아코디언 메인 → `/picky-drafts/:roundId/:index` 개별 시안)으로 합친다. 아코디언 메인은 `registry`의 실제 라운드/후보를 렌더하고 펼치면 후보 썸네일이 바로 보인다. 모든 색은 `theme.ts` 토큰 경유(다크 기본, 라이트 seam).

**Tech Stack:** React 19, TypeScript(strict, verbatimModuleSyntax), Vite, React Router v7(선언형 `<Routes>`), Tailwind v4, framer-motion.

## Global Constraints

- **TS strict + verbatimModuleSyntax**: 타입 전용 import는 `import type`. `any` 금지.
- **색은 토큰 경유**: 하네스 색은 전부 `src/picky-client/theme.ts`의 토큰을 **인라인 `style`로** 적용. Tailwind v4는 클래스 문자열 안의 JS 값을 정적 스캔 못 하므로 `bg-[${theme.x}]` 금지. 뉴트럴 유틸(spacing/layout/`white/10`)은 클래스 OK.
- **dev 전용**: 하네스 라우트는 `import.meta.env.DEV`에서만 마운트(`App.tsx`).
- **경로**: `/picky-drafts`, `/picky-drafts/:roundId/:index`. 정적 세그먼트라 앱의 greedy `/:email`보다 상위 랭크.
- **더블 스크롤 금지 · 모바일 퍼스트**: 페이지 1개 스크롤. 펼친 아코디언은 페이지를 늘릴 뿐. 최대 1개 가로 필름스트립 허용.
- **검증(이 프로젝트는 유닛 테스트 프레임워크 없음)**: 각 태스크 = `npx tsc -b`(EXIT 0) + `npx eslint src/picky-client`(EXIT 0), 그리고 화면 변화가 있는 태스크는 **실제 브라우저 E2E(claude-in-chrome, 노트북 Chrome, 콘솔 0)**. 브라우저 전 **좀비 vite 정리**(5173 리스너 kill) 후 클린 `npm run dev`.
- **`npm run build` 절대 금지**(= firebase deploy). 타입체크는 `npx tsc -b`.
- 커밋은 태스크 단위로 main 직접. 원격 push는 하지 않음.

---

### Task 1: 하네스 팔레트 토큰 + 하네스 카피

**Files:**
- Create: `src/picky-client/theme.ts`
- Create: `src/picky-client/copy.ts`

**Interfaces:**
- Produces: `theme: ThemeTokens`(활성=dark), `themes: { dark, light }`, `type ThemeTokens`, `type ThemeName` — from `theme.ts`. `copy`(brand/project/title/accentWord/lede/winnerBadge) — from `copy.ts`.

- [ ] **Step 1: `theme.ts` 작성**

```ts
// picky-client 하네스 팔레트 토큰. 모든 하네스 색은 여기서 온다(하드코딩 hex 금지).
// 다크 기본. 라이트는 seam만(추후 값 채움 → 지금은 다크로 폴백해 동작 유지).
// 색은 인라인 style로 적용 — Tailwind v4 정적 스캔이 클래스 문자열 안의 JS 값을
// 못 읽으므로 토큰을 클래스에 넣지 않는다.

export interface ThemeTokens {
  coral: string; // 키컬러
  base: string; // 캔버스
  card: string; // 카드/패널 매트
  bar: string; // 리모컨 바
  fg: string; // 본문
  mute: string; // 보조
  sub: string; // 뮤트
  hairline: string; // 하이라인/워터마크
}

const dark: ThemeTokens = {
  coral: "#F2683C",
  base: "#0B0E16",
  card: "#161B27",
  bar: "#12161F",
  fg: "#E8ECF4",
  mute: "#9AA3B8",
  sub: "#6B7280",
  hairline: "#334155",
};

// 라이트 seam — 추후 값 채움. 지금은 다크로 폴백(라이트 미구현).
const light: ThemeTokens = dark;

export const themes = { dark, light } as const;
export type ThemeName = keyof typeof themes;

// 활성 테마 — 지금은 다크 고정. (추후 context / toggle / prefers-color-scheme 교체 지점)
export const theme: ThemeTokens = themes.dark;
```

- [ ] **Step 2: `copy.ts` 작성**

```ts
// picky-client 하네스 카피(회롱이). 스킬 기본값은 프로젝트별로 project/title을 갈아끼운다.
export const copy = {
  brand: "PICKY",
  project: "회롱이 리디자인",
  title: "드래프트 리뷰", // 숫자 없이 단독
  accentWord: "리뷰", // 코랄 강조는 이 단어에만
  lede: "라운드마다 무엇을 정하는지 보고, 펼쳐서 시안을 고르세요",
  winnerBadge: "우승",
} as const;

export type Copy = typeof copy;
```

- [ ] **Step 3: 타입체크**

Run: `npx tsc -b`
Expected: EXIT 0

- [ ] **Step 4: 커밋**

```bash
git add src/picky-client/theme.ts src/picky-client/copy.ts
git commit -m "picky-client: 하네스 팔레트 토큰 + 카피 모듈 (다크 기본, 라이트 seam)"
```

---

### Task 2: `hidden` 라운드 플래그 + Round 2 숨김 + `visibleRounds`

**Files:**
- Modify: `src/picky-client/types.ts` (RoundMeta에 `hidden?`)
- Modify: `src/picky-client/rounds/round2/round.meta.ts` (`hidden: true`)
- Modify: `src/picky-client/registry.ts` (`visibleRounds` export)

**Interfaces:**
- Produces: `RoundMeta.hidden?: boolean`; `visibleRounds: RoundData[]`(hidden 제외) — from `registry.ts`. `getRound`/`rounds`는 hidden 포함 유지(직접 URL 접근 대비).

- [ ] **Step 1: `types.ts`의 `RoundMeta`에 `hidden?` 추가**

`src/picky-client/types.ts`의 `RoundMeta` 인터페이스를 아래로 교체:

```ts
export interface RoundMeta {
  id: number; // 1-based round number
  decides: string; // one line: what this round decides (user's language)
  status: RoundStatus;
  winnerIndex?: number; // 1-based index of the winning candidate, when decided
  hidden?: boolean; // 하네스 목록에서 숨김(방치된 라운드). 파일·이력·직접 URL은 보존.
}
```

- [ ] **Step 2: Round 2를 hidden으로**

`src/picky-client/rounds/round2/round.meta.ts`를 아래로 교체:

```ts
import type { RoundMeta } from "../../types";

export const meta: RoundMeta = {
  id: 2,
  decides: "코랄 매거진(11번)을 더 깔끔하게 — 카피, 군더더기, 가운데점 정리",
  status: "open",
  hidden: true, // 방치된 라운드(사용자 지시로 무시) — 하네스 아코디언에서 숨김
};
```

- [ ] **Step 3: `registry.ts`에 `visibleRounds` 추가**

`src/picky-client/registry.ts` 끝(`getRound` 위)에 추가:

```ts
// 하네스 아코디언이 쓰는 목록 — hidden 라운드 제외. (rounds/getRound는 전체 유지)
export const visibleRounds: RoundData[] = rounds.filter(
  (round) => !round.meta.hidden,
);
```

- [ ] **Step 4: 타입체크**

Run: `npx tsc -b`
Expected: EXIT 0

- [ ] **Step 5: 커밋**

```bash
git add src/picky-client/types.ts src/picky-client/rounds/round2/round.meta.ts src/picky-client/registry.ts
git commit -m "picky-client: hidden 라운드 플래그 + Round 2 숨김 + visibleRounds"
```

---

### Task 3: `RoundAccordion` 컴포넌트 (실데이터 아코디언)

**Files:**
- Create: `src/picky-client/components/RoundAccordion.tsx`

**Interfaces:**
- Consumes: `theme`(theme.ts), `copy`(copy.ts), `CandidatePreview`(components/CandidatePreview.tsx), `RoundData`(types.ts), react-router `Link`.
- Produces: `RoundAccordion({ rounds: RoundData[]; defaultOpenId?: number })`.

- [ ] **Step 1: `RoundAccordion.tsx` 작성**

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { theme } from "../theme";
import { copy } from "../copy";
import { CandidatePreview } from "./CandidatePreview";
import type { RoundData } from "../types";

function RoundItem({
  round,
  open,
  onToggle,
  reduce,
}: {
  round: RoundData;
  open: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  const { id, decides, status, winnerIndex } = round.meta;
  const no = String(id).padStart(2, "0");
  const headerId = `round-${id}-header`;
  const panelId = `round-${id}-panel`;
  const decided = status === "decided" && winnerIndex != null;

  return (
    <div className="border-b border-white/10">
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
        >
          {/* 큰 serif 라운드 넘버 — 펼쳐진 라운드만 코랄 */}
          <span
            aria-hidden="true"
            className="w-12 shrink-0 select-none text-center font-serif leading-none tabular-nums text-[32px] sm:w-16 sm:text-[44px] lg:text-5xl"
            style={{ color: open ? theme.coral : theme.mute }}
          >
            {no}
          </span>
          <span
            className="h-9 w-px shrink-0 sm:h-11"
            style={{ backgroundColor: theme.hairline }}
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span
              className="block truncate text-lg font-bold leading-tight sm:text-xl"
              style={{ color: theme.fg }}
            >
              {decides}
            </span>
            <span
              className="mt-1 block truncate text-[13px] leading-snug sm:text-sm"
              style={{ color: theme.sub }}
            >
              {round.candidates.length}개 시안
              {decided ? ` · ${copy.winnerBadge} #${winnerIndex}` : ""}
            </span>
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 motion-reduce:transition-none"
            style={{ color: theme.sub, transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="M3.5 5.25 7 8.75l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="grid grid-cols-2 gap-4 pb-9 pt-1 sm:grid-cols-3 sm:pb-11 lg:grid-cols-4">
              {round.candidates.map((c) => {
                const isWinner = decided && winnerIndex === c.meta.index;
                return (
                  <li key={c.meta.index}>
                    <Link to={`/picky-drafts/${id}/${c.meta.index}`} className="group block">
                      <div className="relative">
                        {isWinner && (
                          <span
                            className="absolute right-2 top-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide"
                            style={{ backgroundColor: theme.coral, color: theme.base }}
                          >
                            {copy.winnerBadge}
                          </span>
                        )}
                        <CandidatePreview Component={c.default} />
                      </div>
                      <p className="mt-2 flex items-baseline gap-2">
                        <span
                          className="font-serif text-[13px] tabular-nums"
                          style={{ color: isWinner ? theme.coral : theme.sub }}
                        >
                          {String(c.meta.index).padStart(2, "0")}
                        </span>
                        <span
                          className="min-w-0 flex-1 truncate text-[13px]"
                          style={{ color: theme.fg }}
                        >
                          {c.meta.title}
                        </span>
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

export function RoundAccordion({
  rounds,
  defaultOpenId,
}: {
  rounds: RoundData[];
  defaultOpenId?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const latestId = rounds.length ? rounds[rounds.length - 1].meta.id : null;
  const initial = defaultOpenId ?? latestId;
  const [openId, setOpenId] = useState<number | null>(initial);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="border-t border-white/10">
      {rounds.map((round) => (
        <RoundItem
          key={round.meta.id}
          round={round}
          open={openId === round.meta.id}
          onToggle={() => toggle(round.meta.id)}
          reduce={reduce}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 타입체크 + 린트**

Run: `npx tsc -b && npx eslint src/picky-client/components/RoundAccordion.tsx`
Expected: 둘 다 EXIT 0

- [ ] **Step 3: 커밋**

```bash
git add src/picky-client/components/RoundAccordion.tsx
git commit -m "picky-client: RoundAccordion — 실데이터 아코디언(펼침=후보 썸네일, 결정 라운드 우승 배지)"
```

---

### Task 4: `PickyDraftsPage` + `/picky-drafts` 라우트 + App 마운트

**Files:**
- Create: `src/picky-client/pages/PickyDraftsPage.tsx`
- Modify: `src/picky-client/routes.tsx` (`/picky-drafts` Route 추가)
- (App.tsx는 Task 6에서 정리; 이 태스크에선 routes.tsx만)

**Interfaces:**
- Consumes: `visibleRounds`(registry), `RoundAccordion`, `theme`, `copy`, react-router `useSearchParams`.
- Produces: `PickyDraftsPage()`; `routes.tsx`가 `/picky-drafts` 엘리먼트 노출.

- [ ] **Step 1: `PickyDraftsPage.tsx` 작성**

```tsx
import { useSearchParams } from "react-router-dom";
import { visibleRounds } from "../registry";
import { RoundAccordion } from "../components/RoundAccordion";
import { theme } from "../theme";
import { copy } from "../copy";

// /picky-drafts — 아코디언 메인. 라운드를 펼쳐 시안에 바로 접근한다.
export function PickyDraftsPage() {
  const [params] = useSearchParams();
  const raw = Number(params.get("round"));
  const defaultOpenId = Number.isFinite(raw) && raw > 0 ? raw : undefined;

  const [titleHead, titleTail] = copy.title.split(copy.accentWord);

  return (
    <main
      className="min-h-[100dvh] overflow-x-hidden antialiased"
      style={{ backgroundColor: theme.base, color: theme.fg }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <header className="pt-14 pb-9 sm:pt-20 sm:pb-12">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: theme.fg }}
            >
              {copy.brand}
            </span>
            <span
              className="h-3 w-px"
              style={{ backgroundColor: theme.hairline }}
              aria-hidden="true"
            />
            <span
              className="text-[11px] font-medium tracking-[0.02em]"
              style={{ color: theme.mute }}
            >
              {copy.project}
            </span>
          </div>
          <h1 className="mt-8 text-4xl font-black leading-[0.98] tracking-tight sm:mt-10 sm:text-5xl lg:text-6xl">
            {titleHead}
            <span style={{ color: theme.coral }}>{copy.accentWord}</span>
            {titleTail}
          </h1>
          <p
            className="mt-6 max-w-md text-[15px] leading-relaxed sm:mt-7"
            style={{ color: theme.mute }}
          >
            {copy.lede}
          </p>
        </header>

        <section className="pb-16 sm:pb-24">
          {visibleRounds.length === 0 ? (
            <p
              className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm"
              style={{ color: theme.sub }}
            >
              아직 라운드가 없어요
            </p>
          ) : (
            <RoundAccordion rounds={visibleRounds} defaultOpenId={defaultOpenId} />
          )}
        </section>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: `routes.tsx`에 `/picky-drafts` 추가**

`src/picky-client/routes.tsx` 상단 import에 추가하고 반환 배열에 엘리먼트를 추가한다. 이 태스크에서는 구 라우트를 남겨둔 채(=병행) 새 라우트를 추가만 한다(구 제거는 Task 6):

import 추가:
```tsx
import { PickyDraftsPage } from "./pages/PickyDraftsPage";
```
반환 배열 맨 앞에 추가:
```tsx
    <Route key="picky-drafts" path="/picky-drafts" element={<PickyDraftsPage />} />,
```

- [ ] **Step 3: 타입체크 + 린트**

Run: `npx tsc -b && npx eslint src/picky-client`
Expected: 둘 다 EXIT 0

- [ ] **Step 4: 브라우저 E2E**

좀비 정리 후 클린 서버:
```bash
# 5173 리스너 kill (PowerShell): Get-NetTCPConnection -LocalPort 5173 -State Listen | %{ Stop-Process -Id $_.OwningProcess -Force }
npm run dev   # background
```
claude-in-chrome(노트북 Chrome)로 `http://localhost:5173/picky-drafts` 열기. 확인:
- 마스트헤드 "드래프트 리뷰"(숫자 없이 단독, 리뷰 코랄).
- 실제 라운드가 아코디언으로: Round 1(결정 · 우승 #11), Round 3(결정 · 우승 #1), Round 4(진행). **Round 2 안 보임**.
- 최신(Round 4) 기본 펼침, 번호 코랄. 펼친 라운드에 **실제 후보 썸네일** 렌더.
- Round 1 헤더 클릭 → 펼쳐지고 코랄 이동, Round 4 접힘. 결정 라운드 우승 후보에 배지.
- 콘솔 에러 0.

- [ ] **Step 5: 커밋**

```bash
git add src/picky-client/pages/PickyDraftsPage.tsx src/picky-client/routes.tsx
git commit -m "picky-client: /picky-drafts 아코디언 메인 페이지(실데이터)"
```

---

### Task 5: `DraftPage` 개편 + `/picky-drafts/:roundId/:index` + `HarnessChrome` 리모컨 개편

**Files:**
- Modify: `src/picky-client/pages/DraftPage.tsx` (roundId를 props → params)
- Modify: `src/picky-client/components/HarnessChrome.tsx` (개편: 시안 페이지 전용 리모컨, 테마)
- Modify: `src/picky-client/routes.tsx` (`/picky-drafts/:roundId/:index` 추가)

**Interfaces:**
- Consumes: `getRound`/`visibleRounds`(registry), `theme`(theme.ts), react-router `useParams`/`useNavigate`.
- Produces: `DraftPage()`(props 없음, params에서 roundId·index); `HarnessChrome({ roundId: number; index: number; total: number })`.

- [ ] **Step 1: `HarnessChrome.tsx` 전체 교체 (시안 페이지 리모컨, 테마)**

```tsx
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { visibleRounds } from "../registry";
import { theme } from "../theme";

// 개별 시안 페이지의 리모컨. 목록(→ 아코디언, 왔던 라운드 펼침) + 라운드 내 페이저 + 라운드 전환.
export function HarnessChrome({
  roundId,
  index,
  total,
}: {
  roundId: number;
  index: number;
  total: number;
}) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const page = (delta: number) => {
    const next = Math.min(Math.max(index + delta, 1), Math.max(total, 1));
    navigate(`/picky-drafts/${roundId}/${next}`);
  };

  return (
    <>
      <div
        className="fixed left-3 top-3 z-50 flex max-w-[calc(100vw-1.5rem)] flex-wrap items-center gap-1 rounded-2xl px-1.5 py-1 text-sm shadow-md ring-1 ring-white/10 backdrop-blur"
        style={{ backgroundColor: `${theme.bar}E6`, color: theme.fg }}
      >
        <Link
          to={`/picky-drafts?round=${roundId}`}
          className="rounded-full px-2.5 py-1 font-medium hover:bg-white/5"
          style={{ color: theme.mute }}
        >
          ← 목록
        </Link>
        <span className="h-4 w-px" style={{ backgroundColor: theme.hairline }} aria-hidden="true" />
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="라운드 이동"
          className="flex items-center gap-1 rounded-full px-2.5 py-1 font-medium hover:bg-white/5"
          style={{ color: theme.fg }}
          onClick={() => setOpen((v) => !v)}
        >
          Round {roundId} <span aria-hidden="true">▾</span>
        </button>
        <span className="h-4 w-px" style={{ backgroundColor: theme.hairline }} aria-hidden="true" />
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="이전 시안"
            disabled={index <= 1}
            className="rounded-full px-1.5 py-1 hover:bg-white/5 disabled:opacity-30"
            style={{ color: theme.fg }}
            onClick={() => page(-1)}
          >
            ‹
          </button>
          <span className="tabular-nums" style={{ color: theme.mute }}>
            {String(index).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="다음 시안"
            disabled={index >= total}
            className="rounded-full px-1.5 py-1 hover:bg-white/5 disabled:opacity-30"
            style={{ color: theme.fg }}
            onClick={() => page(1)}
          >
            ›
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <button
              aria-label="닫기"
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(2,6,16,0.5)" }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              aria-label="라운드 바로가기"
              className="fixed left-3 top-16 z-50 max-h-[70vh] w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto overscroll-contain rounded-2xl p-3 text-sm shadow-xl ring-1 ring-white/10 backdrop-blur"
              style={{ backgroundColor: `${theme.bar}F5`, color: theme.fg }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.16 }}
            >
              <button
                type="button"
                className="mb-2 w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/5"
                style={{ color: theme.mute }}
                onClick={() => {
                  setOpen(false);
                  navigate(`/picky-drafts?round=${roundId}`);
                }}
              >
                ≡ 아코디언으로
              </button>
              <ul className="flex flex-col gap-1 border-t pt-2" style={{ borderColor: theme.hairline }}>
                {visibleRounds.map((round) => (
                  <li key={round.meta.id}>
                    <button
                      type="button"
                      className="w-full rounded-lg px-2 py-1.5 text-left hover:bg-white/5"
                      onClick={() => {
                        setOpen(false);
                        navigate(`/picky-drafts/${round.meta.id}/1`);
                      }}
                    >
                      <b style={{ color: theme.fg }}>R{round.meta.id}</b>{" "}
                      <span style={{ color: theme.sub }}>{round.meta.decides}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: `DraftPage.tsx` 전체 교체 (params 기반)**

```tsx
import { useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getRound } from "../registry";
import { HarnessChrome } from "../components/HarnessChrome";
import { theme } from "../theme";

// /picky-drafts/:roundId/:index — 후보 하나 풀스크린. 리모컨은 떠 있고 페이지가 스크롤.
export function DraftPage() {
  const params = useParams();
  const reduceMotion = useReducedMotion();

  const roundId = Number(params.roundId);
  const round = getRound(roundId);
  const total = round?.candidates.length ?? 0;
  const raw = Number(params.index ?? 1);
  const index = Math.min(
    Math.max(Number.isFinite(raw) ? raw : 1, 1),
    Math.max(total, 1),
  );
  const candidate = round?.candidates.find((c) => c.meta.index === index);

  if (!round || !candidate) {
    return (
      <main
        className="grid min-h-[100dvh] place-items-center"
        style={{ backgroundColor: theme.base, color: theme.sub }}
      >
        시안을 찾을 수 없어요
      </main>
    );
  }

  const Comp = candidate.default;

  return (
    <>
      <HarnessChrome roundId={roundId} index={index} total={total} />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration: 0.2 }}
        >
          <Comp />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 3: `routes.tsx`에 시안 라우트 추가**

`src/picky-client/routes.tsx` 반환 배열의 `/picky-drafts` 엘리먼트 바로 뒤에 추가:

```tsx
    <Route
      key="picky-draft"
      path="/picky-drafts/:roundId/:index"
      element={<DraftPage />}
    />,
```

`DraftPage` import는 이미 존재(구 라우트가 쓰고 있음). 단, 구 라우트는 `<DraftPage roundId=... />`로 props를 넘기고 있어 이제 시그니처가 안 맞는다 → **구 per-round 라우트 생성 부분은 Task 6에서 제거**한다. 이 태스크에서 타입 에러가 나면, 구 `...rounds.flatMap(...)` 블록의 `<DraftPage roundId=... />`/`<RoundPage .../>`를 잠시 주석 처리하고 진행(Task 6에서 완전 삭제).

- [ ] **Step 4: 타입체크 + 린트**

Run: `npx tsc -b && npx eslint src/picky-client`
Expected: 둘 다 EXIT 0

- [ ] **Step 5: 브라우저 E2E**

`http://localhost:5173/picky-drafts` → Round 4 펼침 → 후보 썸네일 클릭 → `/picky-drafts/4/N` 풀스크린 확인:
- 후보가 풀스크린 렌더.
- 리모컨(테마 다크): `← 목록` · `Round 4 ▾` · `‹ NN/NN ›`.
- `‹`/`›`로 같은 라운드 내 이전/다음 이동.
- `Round ▾` → 다른 라운드로 점프.
- `← 목록` → `/picky-drafts?round=4`, **Round 4가 펼쳐진 채** 복귀.
- 콘솔 에러 0.

- [ ] **Step 6: 커밋**

```bash
git add src/picky-client/pages/DraftPage.tsx src/picky-client/components/HarnessChrome.tsx src/picky-client/routes.tsx
git commit -m "picky-client: 개별 시안 라우트(/picky-drafts/:roundId/:index) + 리모컨 개편(테마·목록복귀·페이저)"
```

---

### Task 6: 구 3단 라우트·페이지 제거 + App 정리 + 로그 갱신

**Files:**
- Modify: `src/picky-client/routes.tsx` (구 라우트 블록 제거, 최종형)
- Delete: `src/picky-client/pages/RoundsPage.tsx`, `src/picky-client/pages/RoundPage.tsx`
- Modify: `src/App.tsx` (주석의 경로 표기)
- Modify: `docs/picky-client.md` (하네스 구조 · 경로 갱신)

**Interfaces:**
- Produces: `routes.tsx` 최종형(2 라우트만).

- [ ] **Step 1: `routes.tsx` 최종형으로 교체**

```tsx
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import { PickyDraftsPage } from "./pages/PickyDraftsPage";
import { DraftPage } from "./pages/DraftPage";

// 선언형 <Routes>에 spread할 route ELEMENT들(dev 전용). 정적 "/picky-drafts"는
// 앱의 greedy "/:email"보다 상위 랭크(React Router 정적>동적). ":roundId/:index"는
// 3세그먼트라 "/:email"(1)·"/analysis/:docId"(2)와 무충돌.
export function pickyClientRouteElements(): ReactElement[] {
  return [
    <Route key="picky-drafts" path="/picky-drafts" element={<PickyDraftsPage />} />,
    <Route
      key="picky-draft"
      path="/picky-drafts/:roundId/:index"
      element={<DraftPage />}
    />,
  ];
}
```

- [ ] **Step 2: 구 페이지 삭제**

```bash
git rm src/picky-client/pages/RoundsPage.tsx src/picky-client/pages/RoundPage.tsx
```

- [ ] **Step 3: `App.tsx` 주석 갱신**

`src/App.tsx`에서 구 경로 주석을 교체:
```tsx
          {/* dev-only picky-client 하네스 (/picky-drafts, /picky-drafts/:roundId/:index) */}
```

- [ ] **Step 4: `docs/picky-client.md` 하네스 구조 갱신**

`### 하네스 구조` 블록을 아래로 교체:
```md
### 하네스 구조 (2단, /picky-drafts)
- `/picky-drafts` — 아코디언 메인(중립 셸 대체). 라운드를 펼쳐 후보 썸네일에 바로 접근.
  최신 라운드 기본 펼침·코랄, 결정 라운드는 우승 배지. Round 2는 hidden.
- `/picky-drafts/{roundId}/{index}` — 개별 시안 풀스크린 + 좌상단 리모컨(목록 복귀 ·
  라운드 드롭다운 · 페이저). 테마 토큰(다크 기본).
- 구 3단(`/drafts` · `/draft-round{N}` · `/draft-round{N}/{index}`)은 제거됨.
```

- [ ] **Step 5: 타입체크 + 린트**

Run: `npx tsc -b && npx eslint src/picky-client`
Expected: 둘 다 EXIT 0

- [ ] **Step 6: 브라우저 E2E (회귀)**

- `http://localhost:5173/picky-drafts` 정상, 후보 클릭→시안→목록 복귀 정상, 콘솔 0.
- `http://localhost:5173/drafts` 는 이제 앱 라우트로 안 잡힘(구 제거) → 앱 기본 동작(예: 404/`/:email`)로 떨어지는지 확인(하네스가 더 이상 응답 안 함).

- [ ] **Step 7: 커밋**

```bash
git add -A src/picky-client/routes.tsx src/App.tsx docs/picky-client.md
git commit -m "picky-client: 구 3단 라우트/페이지 제거 → 2단(/picky-drafts) 전환 + 로그 갱신"
```

---

### Task 7: picky-client 스킬 반영 — `references/harness.md` 재작성

**Files:**
- Modify: `~/.claude/skills/picky-client/references/harness.md` (전체 재작성)

**Interfaces:** (문서 — 코드 인터페이스 없음)

- [ ] **Step 1: 현행 harness.md 통독**

Run: `cat ~/.claude/skills/picky-client/references/harness.md`
목적: 유지할 규율(더블 스크롤 금지·모바일 퍼스트·registry auto-discovery·framer-motion)과 교체할 부분(3표면 → 2표면) 식별.

- [ ] **Step 2: harness.md를 2단 아코디언 하네스로 재작성**

아래 섹션을 담아 재작성한다(회롱이 구현을 일반화한 스펙; 값·경로는 프로젝트별 치환 안내):
- **경로(2단)**: `/picky-drafts`(아코디언 메인), `/picky-drafts/:roundId/:index`(개별 시안). **경로 충돌 처리**: `/picky-drafts`가 이미 쓰이면 대안 제안(`/_picky`, `/design-drafts`)하고 사용자 확인. 정적>동적 랭크로 greedy 라우트 위에 옴. dev 전용(`import.meta.env.DEV`).
- **파일 레이아웃**: `theme.ts`(팔레트 토큰, 다크 기본·라이트 seam, 색은 인라인 style), `copy.ts`(하네스 카피), `registry.ts`(round.meta/candidate glob 자동 발견 + `visibleRounds`=hidden 제외), `components/RoundAccordion.tsx`, `components/CandidatePreview.tsx`, `components/HarnessChrome.tsx`(시안 페이지 리모컨), `pages/PickyDraftsPage.tsx`, `pages/DraftPage.tsx`, `routes.tsx`, `App`(또는 라우터)에서 dev-only 마운트.
- **아코디언 메인 동작**: 접힘=라운드 번호+`meta.decides`(상태 라벨 없음), 펼침=그 라운드 후보를 `CandidatePreview` 썸네일로(클릭→시안). 최신 id=현재→기본 펼침, 열린 라운드 번호만 코랄, 결정 라운드(`status==="decided"`)는 `winnerIndex` 후보에 우승 배지. 단일 오픈, framer-motion height(`useReducedMotion`→0). `?round=N`으로 특정 라운드 펼쳐 진입.
- **리모컨(HarnessChrome)**: 시안 페이지 전용 — `← 목록`(→`/picky-drafts?round=N`, 왔던 라운드 펼침) + 라운드 내 페이저 `‹NN/NN›` + 라운드 전환 드롭다운. 테마 토큰. 아코디언 메인엔 떠 있는 페이저 리모컨 없음(자기 네비).
- **테마**: 코랄 매거진(코랄+블루블랙)이 기본 룩, 팔레트는 `theme.ts` 토큰. 모든 색 토큰 경유(하드코딩 hex 금지, Tailwind 클래스에 토큰 금지 — 인라인 style). 라이트는 seam만(추후 값).
- **품질 바(유지)**: 더블 스크롤 금지(펼침은 페이지를 늘림, 필름스트립 1개 허용), 모바일 퍼스트, 완성감, 현재 라이브러리 idiomatic 사용.
- **최초 설정**: `src/picky-client/`가 없으면 위 파일들 1회 셋업 후 Round 1 시작. 있으면 라운드만 추가.

- [ ] **Step 3: 잔여 구 경로 표현 제거 확인**

Run: `grep -nE "/drafts|/draft-round|RoundsPage|RoundPage" ~/.claude/skills/picky-client/references/harness.md`
Expected: 매치 없음(모두 신규 경로/구조로 교체됨). 남아 있으면 수정.

- [ ] **Step 4: 커밋(문서 — repo 밖 파일이라 스펙/플랜으로 기록)**

harness.md는 repo 밖이므로 별도 커밋 대상 아님. 대신 Task 8 완료 후 `docs/superpowers/specs/...`에 반영 결과를 한 줄 남긴다(Task 8 Step 4).

---

### Task 8: picky-client 스킬 — `SKILL.md` 하네스 섹션 + scaffold 점검 + 반영 기록

**Files:**
- Modify: `~/.claude/skills/picky-client/SKILL.md` (하네스 섹션·경로·최초 설정)
- Review: `~/.claude/skills/picky-client/scripts/scaffold_round.mjs`
- Modify: `docs/superpowers/specs/2026-07-09-picky-client-accordion-harness-design.md` (Status)

- [ ] **Step 1: `SKILL.md`의 "The review harness (common UI)" 섹션 교체**

3표면(`/drafts`·`/draft-round{N}`·`/draft-round{N}/{index}`) 설명을 2표면으로 교체:
- **`/picky-drafts` — 아코디언 메인.** 라운드를 접었다 펴며(접힘=결정, 펼침=후보 썸네일) 시안에 바로 접근. 최신=현재 기본 펼침, 결정 라운드 우승 배지.
- **`/picky-drafts/{roundId}/{index}` — 개별 시안 풀스크린.** 좌상단 리모컨(목록 복귀 · 라운드 드롭다운 · 페이저).
그리고 "First-time setup", "Reference files"의 harness.md 설명, Non-negotiable quality bar의 경로 언급을 신규 구조로 정합화. 경로 충돌 처리 한 줄 추가.

- [ ] **Step 2: `scaffold_round.mjs` 점검**

Run: `cat ~/.claude/skills/picky-client/scripts/scaffold_round.mjs`
확인: 라운드별 `round{N}/round.meta.ts` + `candidate-XX.tsx` 스캐폴딩은 registry 자동발견과 그대로 호환(하네스 페이지는 1회 설정이라 무관). 경로/문구에 구 3단 표현이 있으면만 수정. 없으면 변경 없음.

- [ ] **Step 3: grep로 구조 정합성 확인**

Run: `grep -nE "draft-round|/drafts|RoundPage|RoundsPage" ~/.claude/skills/picky-client/SKILL.md`
Expected: 매치 없음(신규 구조로 교체). 남으면 수정.

- [ ] **Step 4: 스펙 Status 갱신 + 커밋**

`docs/superpowers/specs/2026-07-09-picky-client-accordion-harness-design.md`의 Status를 `implemented`로, 하단에 반영 결과 한 줄(회롱이 2단 전환 완료 · 스킬 harness.md/SKILL.md 반영 · 브라우저 E2E 통과) 추가.

```bash
git add docs/superpowers/specs/2026-07-09-picky-client-accordion-harness-design.md
git commit -m "picky-client 스킬(harness.md/SKILL.md) 아코디언 하네스 반영 + 스펙 implemented"
```

---

## Self-Review

**Spec coverage:**
- 2단 라우트 → Task 4,5,6. 아코디언 메인(실데이터) → Task 3,4. 개별 시안+리모컨 개편 → Task 5. 구 제거 → Task 6. 테마 토큰 → Task 1(+전 태스크 토큰 경유). Round 2 숨김 → Task 2. 스킬 반영 → Task 7,8. 경로 충돌 처리 → Task 7,8(스킬 문서). 라이트 seam → Task 1. ✅ 전 항목 태스크 있음.
- Out-of-scope(라이트 값/토글, 실제 제품 페이지, 후보 재디자인)는 계획에서 제외됨(일관).

**Placeholder scan:** 코드 스텝은 전부 실제 코드. 검증은 tsc/eslint/브라우저(유닛 테스트 프레임워크 부재를 Global Constraints에 명시). "적절히 처리" 류 없음. ✅

**Type consistency:**
- `HarnessChrome({ roundId, index, total })` — Task 5에서 정의·소비 일치.
- `RoundAccordion({ rounds, defaultOpenId })` — Task 3 정의, Task 4 소비 일치.
- `visibleRounds` — Task 2 정의, Task 4·5·7 소비 일치.
- `DraftPage()`(props 없음, params) — Task 5 정의, Task 6 routes 소비 일치. (구 `<DraftPage roundId=.../>`는 Task 5 Step 3에서 임시 주석 → Task 6에서 삭제, 시그니처 정합.)
- `theme`/`copy` — Task 1 정의, 이후 전부 동일 이름 사용. ✅
