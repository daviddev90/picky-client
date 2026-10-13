---
name: picky-client
description: Compare UI/UX candidate drafts and let the user choose a design direction. Use for requested draft-selection workflows, rather than a single design edit or visual bug fix.
---

# picky-client

Build a browsable review harness for the user's design decision. Distinguish candidates ready
for review, the user's selection, a settled design, and its verified application to the app.
Inspecting or installing this skill does not start a design round.

## Host execution

Follow the user's request and applicable project instructions, including tooling and model rules.
Read references relative to this skill's installed directory and discover optional skills through
the host's available skill catalog.

When native subagents are available, delegate candidate builds with explicit file ownership.
Keep shared harness and copy files under one owner. Follow user/project model instructions;
otherwise use the host's default inheritance. Batch independent work within the host's concurrency
limits. Give independent reviewers the brief and raw evidence without the author's conclusions.
When subagents are unavailable, build candidates and run each review pass sequentially. Record
these as same-agent reviews, including cold-read approximations; do not label them independent
or zero-knowledge. These execution rules apply to every delegation and review in the references.
Actual browser renders establish visual readiness.

## Before you generate

Resolve the target's design-system status before creating candidates. If the theme is fixed and
the user has not asked to change it, preserve its colors, typeface identity, and materials by
using the existing tokens in every candidate, including experimental candidates. Vary only open
axes such as layout, hierarchy, placement, density, and microinteractions. An open theme permits
a tone/palette round. If the status cannot be established from the request and project, ask the
user before choosing a theme scope.

Capture the real screen, render stack, token source and scope, audience/language, and existing
features and states in the Brief. For native targets, record the techniques the platform can
reproduce. For existing screens, read their code and retain a home for every feature, handler,
route, accessibility contract, and loading/empty/error/disabled/dark state. Record which states
are decided in the tournament and which will be resolved at application.

## Decision triage

Classify the axis the round decides, and record the reason in the log.

- **Taste:** Open tone, color, typography personality, mood, or equally usable compositions
  use ten genuinely distinct candidates.
- **Function/convention:** Layout, controls, canvas/panel sizing, density, or navigation narrowed
  by usability and current tool conventions use three to five grounded candidates with trade-offs.
  If fewer than two meaningful alternatives remain, give one reasoned recommendation.

A work-surface screen keeps the tool quality bar in every round. Mixed requests can separate
function and taste decisions. A fixed theme starts with an open layout/structure decision;
an open theme normally starts with tone and manner.

## The core loop

1. **Name the decision and ground it.** Read [generation-gate.md](references/generation-gate.md)
   and [rounds.md](references/rounds.md) before generating each round. Research current practice
   live, including actual services in the product's field or with a similar feature or role.
   Record the queries, source links, and findings used this round. Taste rounds use the research,
   text slate, direction gate, delegated build, and error gate. Function rounds use the convergent
   path with current conventions and an independent grounding/quality check.

   example) Research real services that provide the feature being designed or serve a similar role.

2. **Prepare copy and candidates.** Use the shared vetted-copy module described below. Copy review
   and visual generation may run concurrently. Delegate candidate builds from the approved directions
   and Brief, then run the relevant checks in generation-gate.md.
3. **Mount and verify the review harness.** At first setup, read
   [harness.md](references/harness.md) and [removing.md](references/removing.md). Use the removable
   `src/picky-client/` capsule, tagged host mount lines, and its removal README. Reuse an existing
   harness. If `/picky-drafts` conflicts with an existing route, agree on an alternative.
   Before handoff, open the harness and representative candidates in an actual browser, exercise
   list/candidate navigation, and capture screenshots showing readiness. Additional per-candidate
   browser checks follow `browserRenderCheck`; turning them off does not waive this baseline.
4. **Log and hand off.** Read [log-format.md](references/log-format.md) and update
   `docs/picky-client.md` with the Brief, candidate rationales, research, checks, evidence, and status.
   Give the user a review URL they can actually reach and explain what to choose. Use a remote-access
   URL when the user is on another device. Candidates ready for review do not mean the user has chosen.
5. **Continue from the user's choice.** Record the winner, propose the next open decision, and proceed
   when the user agrees. A later taste round preserves the winner as candidate #1, adds five distinct
   trend-aligned variations (#2–#6), and four experimental variations (#7–#10). Preserve all selected
   winners when there are several, then fill the remaining slots to total ten with the trend/experimental
   balance in rounds.md. Function rounds carry the winner and use their smaller convergent set.
6. **Settle and apply.** When the user settles the design or requests application, read
   [applying.md](references/applying.md). Apply the accumulated decisions to the real target while
   preserving existing functionality, reconciling structure and token scope, and retaining rollback
   discipline within authorized commit scope. Run the actual no-regression and visual/state checks,
   including accessibility, content stress, language, and motion checks. Record the design spec and
   application result. A requested mid-tournament preview remains a partial application.

Do not generate further rounds or finalize the design without the user's decision. Before a
production build or deployment, remove the development harness and verify its exclusion using
removing.md; a runtime DEV guard alone does not remove it from the bundle.

## Copy is a settled axis

Before presenting candidates with user-facing words, read [ux-writing.md](references/ux-writing.md)
and use its available UX-writing skill or fallback gate. Apply project voice rules such as
`i-am-david` when required. Store reviewed strings in one shared `vetted-copy` module that all
candidates import. Hold those words fixed during visual rounds; an explicit copy round can reopen
that axis. The reference supplies the copy-review procedure and two-stream workflow.

## Non-negotiable quality bar

Every candidate and harness page must be judgeable and faithful to its surface.

- Use a single page scroll context, responsive phone-width layouts, complete content, and visible hierarchy.
- Keep candidates in separate components/modules and use the project's stack and current library APIs.
- Use semantic controls and visible keyboard focus. Preserve existing accessibility contracts;
  complete accessibility and state validation happen on the real screen at application.
- Show only controls and states belonging to the depicted surface. Keep harness navigation in the
  harness rather than duplicating it inside candidates.
- On editors, dashboards, and workspaces, make the canvas/document/table dominate, keep primary tools
  reachable, and keep titles and navigation from permanently consuming work-surface space.
- Write harness strings, candidate titles/rationales, and accessibility labels in the user's language,
  matching the product's language requirements. Reference snippets are illustrative. Keep the tool
  brand `PICKY-CLIENT DRAFTS` fixed and use consistent candidate terminology elsewhere.

## Browser render tooling

Follow the current user/project instructions for browser tooling, signed-in profiles, resource
ownership, and cleanup. Read the relevant browser skill when needed. Use screenshots and actual
interaction for visual verification; source inspection does not replace a render. Record only
checks actually performed and do not install browser integrations without authorization.

## Helper script

For the ten-candidate taste path, the existing scaffold creates round metadata and candidate stubs:

```bash
node "<installed-skill-dir>/scripts/scaffold_round.mjs" <projectRoot> <roundNumber> ["what this round decides"] ["short title"]
```

Replace `<installed-skill-dir>` with the directory containing this SKILL.md. Use the actual smaller
candidate set for function rounds; do not present unused scaffold stubs as candidates.
