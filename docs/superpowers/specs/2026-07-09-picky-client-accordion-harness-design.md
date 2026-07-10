# picky-client — 아코디언 하네스 승격 (`/picky-drafts` 2단 네비 + 리모컨 개편 + 스킬 반영)

Design spec. Status: **implemented**. Date: 2026-07-09.

> **반영 결과:** 회롱이 하네스를 2단(`/picky-drafts` 아코디언 → `/picky-drafts/:roundId/:index`)으로
> 전환 완료 — theme/copy 토큰, hidden 플래그(Round 2), RoundAccordion(실데이터), 리모컨 개편.
> 구 3단(`/drafts`·`/draft-round{N}`) 및 RoundsPage/RoundPage 제거. 실제 브라우저 E2E(노트북 Chrome,
> 콘솔 0: 아코디언 토글·우승 배지·시안 이동·페이저·목록 복귀). picky-client 스킬 `references/harness.md`
> 전면 재작성 + `SKILL.md`(2표면) + `scaffold_round.mjs` 주석 반영(경로 충돌 처리 포함). 라이트 값/토글은 out-of-scope(seam만).
> 계획: `docs/superpowers/plans/2026-07-09-picky-client-accordion-harness.md`.

## Problem

picky-client의 리뷰 하네스는 지금 **3단**으로 접근한다: `/drafts`(라운드 지도) →
`/draft-round{N}`(시안 그리드) → `/draft-round{N}/:index`(개별 시안 풀스크린). 중립
화이트 셸이다.

Round 1~4 토너먼트로 **이 하네스 자체의 디자인**을 정했고, 우승은 Round 4 #7
(코랄 매거진 아코디언)이다. #7은 라운드를 **접었다 펴는 아코디언**이라, 메인에서 라운드를
펼치면 시안이 바로 보인다 → 중간 "라운드 그리드" 단계가 사라진다. 그래서:

1. #7 디자인을 실제 하네스로 승격해야 한다(현재는 `/draft-round4/7`의 mock 시안일 뿐).
2. 3단 → **2단**(아코디언 메인 → 개별 시안)으로 네비게이션이 바뀐다.
3. 네비 구조가 바뀌므로 **좌상단 리모컨**도 바뀐다.
4. 앞으로 **picky-client 스킬**을 호출하면 이 하네스가 생성되어야 한다(스킬 반영).
5. **테마**: 다크 기본, 라이트 추후 지원 가능하도록 토큰 구조 마련.

## Decisions (확정)

- **스킬 기본 룩**: 코랄 매거진(#7)을 스킬 **기본값**으로. 팔레트는 토큰이라 프로젝트별
  교체 가능.
- **라이트 모드**: 지금은 **토큰만 배선**(모든 색을 토큰 경유, 하드코딩 제거). 다크만
  구현, 라이트 값/토글은 추후.
- **범위**: 회롱이 하네스 **재구축 + 스킬 반영** 둘 다. 회롱이 먼저(실동작 검증) → 스킬 문서.
- **경로**: `/picky-drafts`. 사용 중이면 대안 제안(예: `/_picky`, `/design-drafts`).
  회롱이에선 미사용 → 그대로 사용.

## Architecture — 2단, `/picky-drafts`

### 라우트 (`routes.tsx`, dev 전용)
- `GET /picky-drafts` — 아코디언 메인 (**PickyDraftsPage**)
- `GET /picky-drafts/:roundId/:index` — 개별 시안 풀스크린 (**DraftPage**, 개편)
- 기존 `/drafts`, `/draft-round{N}`, `/draft-round{N}/:index` **제거**.
- 정적 `/picky-drafts`는 앱의 greedy `/:email`보다 상위 랭크(React Router 정적>동적).
  `/picky-drafts/:roundId/:index`는 3세그먼트라 `/:email`(1)·`/analysis/:docId`(2)와 무충돌.
- 개별 시안 라우트는 라운드별 반복 대신 `:roundId` 동적 1개로 단순화
  (`getRound(Number(roundId))`).

### 페이지·컴포넌트
| 파일 | 역할 | 상태 |
|---|---|---|
| `pages/PickyDraftsPage.tsx` | 아코디언 메인 (마스트헤드 + 라운드 아코디언) | **신규** |
| `pages/DraftPage.tsx` | 개별 시안 풀스크린 | 개편(라우트·리모컨) |
| `components/RoundAccordion.tsx` | 라운드 아코디언(접힘/펼침, #7 로직 일반화) | **신규** |
| `components/HarnessChrome.tsx` | 시안 페이지 리모컨 | 개편 |
| `components/CandidatePreview.tsx` | 후보 썸네일(9:16 클립) | 재사용 |
| `theme.ts` (harness 루트) | 팔레트 토큰(다크; 라이트 seam) | 신규(round4/theme 승격) |
| `pages/RoundsPage.tsx`, `pages/RoundPage.tsx` | 라운드 지도/그리드 | **제거**(아코디언에 흡수) |
| `registry.ts`, `rounds/**`, `sampleData.ts` | 데이터·후보 | 그대로 |

### 아코디언 메인 (`/picky-drafts`) — #7을 실제 데이터로
- 마스트헤드: `PICKY` / 프로젝트명 / "드래프트 리뷰"(숫자 없이 단독, 코랄은 강조어) / lede.
- **라운드 아코디언** = registry의 실제 라운드. 각 항목:
  - **접힘**: 큰 serif 라운드 넘버 + 하이라인 + `round.meta.decides`. 상태 라벨 없음.
  - **펼침**: 그 라운드의 **실제 후보**를 `CandidatePreview` 썸네일 그리드/필름스트립으로.
    각 썸네일 클릭 → `/picky-drafts/{roundId}/{index}`. 캡션 = 번호 + `candidate.meta.title`.
  - **열린 라운드 번호만 코랄**(열린 항목 따라 이동). 셰브론 위/아래.
- **최신 = 현재**: 가장 큰 id 라운드가 현재 → 기본 펼침. 하위 라운드 = 지난 라운드.
- **결정된 라운드**(`meta.status==="decided"`)는 우승 후보(`meta.winnerIndex`)에 우승 배지.
  미결정 지난 라운드(예: abandoned Round 2)는 배지 없이 후보만(정직).
- 단일 오픈 아코디언, framer-motion height(useReducedMotion→0), 모바일 단일 컬럼, 더블 스크롤 금지.

### 개별 시안 페이지 (`/picky-drafts/:roundId/:index`)
- 후보 컴포넌트 풀스크린 렌더(현 DraftPage 전환 애니메이션 유지).
- **리모컨(HarnessChrome, 개편)**:
  - `← 목록` → `/picky-drafts?round={roundId}`(돌아가면 **왔던 라운드가 펼쳐진** 채로).
  - 라운드 내 `‹ NN/NN ›` 이전/다음 시안.
  - 라운드 전환 드롭다운(다른 라운드 첫 시안 또는 아코디언으로).
  - 중립 화이트 → **테마 토큰** 적용(다크). 페이저는 시안 페이지에만.
- 아코디언 메인은 스스로 네비 → **떠 있는 페이저 리모컨 없음**(필요 시 최소 상단 바만).

### 데이터 매핑 & Round 2 정리
- 현 registry: Round 1(decided #11), Round 2(open·abandoned), Round 3(decided #1), Round 4(open).
- "최신 id=현재" → Round 4 현재(펼침). Round 1·3 지난(우승 배지). **Round 2**는 방치 상태:
  스펙 결정 → **decided로 표시(대표안 1개 지정)하거나 하네스에서 숨김**. 기본안: registry에
  `hidden?: boolean`(옵셔널) 플래그 추가해 Round 2 숨김(파일·이력은 보존). 최소 변경.
- 아코디언 안 후보 = 실제 후보 컴포넌트(그 라운드가 무엇이든). 하네스가 자기 자신을
  썸네일로 보이는 재귀적 구조는 정상(디자인 갤러리).

### 테마 토큰 레이어 (다크 기본, 라이트 seam)
- `theme.ts`가 토큰(coral/base/card/bar/fg/mute/sub/hairline)을 export. **모든 하네스
  색 사용은 토큰 경유**(하드코딩 hex 제거)가 이번 작업의 핵심 준비.
- 구조: `themes = { dark: {...현재값}, light: {/* 추후 */} }` + 활성 테마 기본 dark.
  런타임 토글/`prefers-color-scheme`는 추후(값만 채우면 되도록 seam만).
- 테마 색은 하네스 루트에 **스코프**(전역 `:root` 오염 금지) — 실제 회롱이 앱에 영향 없음.
  인라인 `style`로 토큰 적용(Tailwind 클래스 문자열에 토큰 금지 — v4 정적 스캔 제약).

## Phase 2 — picky-client 스킬 반영 (`~/.claude/skills/picky-client/`)
- `references/harness.md`: 2단 `/picky-drafts` 아코디언 하네스로 재작성 — 파일 레이아웃,
  아코디언 동작(접힘=결정 / 펼침=후보, 최신=현재, 열린 항목 코랄, 결정 라운드 우승 배지,
  상태 라벨 없음), 개편 리모컨, **경로 충돌 처리**, 테마 토큰(코랄 매거진 기본, 라이트 seam),
  더블 스크롤 금지·모바일 퍼스트.
- `SKILL.md`: "The review harness" 3표면 → **2표면**, 경로·리모컨·최초 설정 갱신.
- `scripts/scaffold_round.mjs`: 라운드별 후보 스캐폴딩은 유지(검토만; 하네스 페이지는 1회 설정).

## Scope / Phases
- **Phase 1 (회롱이)**: 라우트·PickyDraftsPage(실데이터 아코디언)·DraftPage 개편·HarnessChrome
  개편·theme 토큰·Round 2 숨김·구 페이지 제거. 브라우저 E2E(노트북 Chrome).
- **Phase 2 (스킬)**: harness.md / SKILL.md / scaffold 반영.
- **Phase 3 (추후, out-of-scope)**: 라이트 팔레트 값 + 토글/`prefers-color-scheme`.

## Out of scope
- 라이트 모드 실제 값/토글(토큰 seam만).
- 회롱이 실제 제품 페이지(`/`, `/analysis/*`, `/user/*`) 변경 — 하네스는 dev 전용 유지.
- Round 1~4 후보 컴포넌트 재디자인(데이터로 그대로 사용).

## Risks / notes
- 하네스가 자기 자신(Round 4 후보=하네스 디자인)을 썸네일로 렌더 → 재귀적으로 보이나 정상.
- 개별 시안 페이지에서 후보의 자체 리모컨 목업과 실제 HarnessChrome이 좌상단에 겹칠 수
  있음(하네스 속 하네스). 실제 하네스에선 실제 리모컨 하나가 정답 — 후보 목업은 데모용.
- 구 경로 제거 시 `docs/picky-client.md`의 `/draft-round*` 링크는 과거 기록이므로 유지(경로만
  신규). 로그에 신규 경로 표기.
- 테마 토큰 스코프를 하네스 루트로 한정하지 않으면 실제 앱 색이 오염될 수 있음 → 인라인/스코프 준수.

## Implementation discipline
- 각 단계 후 `tsc -b` 0 · `eslint` 0 · 죽은-컴포넌트/점 grep 0 · **실제 브라우저 E2E
  (노트북 Chrome, 콘솔 0, 아코디언 인터랙션·시안 이동·목록 복귀까지)**.
- 스킬 편집은 writing-skills(RED/GREEN) 정신 유지(하네스는 문서라 실동작은 회롱이에서 검증).
- 커밋은 의미 단위로 main 직접(원격 push는 확인 후).
