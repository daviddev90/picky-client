# docs — picky-client design & development records

이 폴더는 **picky-client 스킬을 설계·개발한 기록**입니다. 원래는 이 스킬을
도그푸딩(dogfooding)하던 `no-sashimi` 앱의 `docs/`에 있었으나, 그 앱과는 무관한
스킬 개발 산출물이라 여기(스킬 미러 저장소)로 이전했습니다. 추후 스킬을 개선할 때
설계 근거·이력을 참고하는 용도입니다.

플러그인 패키징(`.claude-plugin/plugin.json`)은 `skills/`만 싣기 때문에, 이 `docs/`
폴더는 저장소에는 남지만 **배포되는 플러그인 산출물에는 포함되지 않습니다.**

## 구성

- `superpowers/specs/` — 각 개선 사이클의 설계 스펙(brainstorming 산출물)
  - UX-writing 게이트 / 아코디언 하네스 / 생성 게이트(강제 리서치) / 적용·타깃 인식 /
    비주얼 크래프트 픽-게이트
- `superpowers/plans/` — 스펙을 구현으로 옮긴 실행 계획(writing-plans 산출물)
- `picky-client-process-review.md` — 스킬 가이드라인 진단 + 개선 제안 메모
- `picky-client.md` — no-sashimi 앱을 도그푸딩하며 돌린 실제 토너먼트 결정 로그
  (Round 1~4). 스킬이 실사용된 구체 예시로 참고 가치가 있어 함께 보존.

## 스킬 위치 (참고)

- **라이브(작업 대상)**: `~/.claude/skills/picky-client/` — git 미추적
- **미러(이 저장소)**: `C:/dev/picky-client/` — git 추적, GitHub 배포용(푸시는 승인 필요)
