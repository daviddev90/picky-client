# picky-client

**Pick-driven UI/UX design for [Claude Code](https://claude.com/claude-code).** Instead of
guessing one design and editing it forever, picky-client presents **candidate drafts (시안)** as a
tournament — you flip through real, rendered options on `localhost` and pick the one you like. The
winner seeds the next round with fresh variations, and decisions compound round by round until the
design is settled.

> Most people can't *describe* the design they want, but they know it the instant they see it.
> picky-client turns a blank-page decision into a quick pick.

## Why it works

- **Choosing beats specifying.** Ten concrete options beat one vague brief.
- **One axis at a time.** Each round decides one thing — tone, then type, then layout, then copy —
  so small confident picks compound into a coherent design.
- **Real renders, not mockups.** Candidates are actual React components in *your* stack, so what you
  pick is what you ship.
- **A durable record.** Every round, candidate, rationale, and winner is logged in
  `docs/picky-client.md`, so the process survives across sessions.

## How it works

1. **Name the decision** and the screen it lives on (e.g. "Round 1 — tone & manner").
2. **Triage** — *taste* decisions (tone, color, type, mood) run as a 10-way tournament; *function*
   decisions (layout, control placement, navigation) converge on 3–5 grounded options with a
   trade-off critique.
3. **Mount the candidates** in a tiny dev-only review harness under `src/picky-client/`.
4. **Browse & pick** at `/picky-drafts` — an accordion of rounds; open a round, click any candidate
   full-screen, decide.
5. **Seed the next round** from the winner. Repeat until you're happy.

It also ships a **self-contained, language-neutral UX-writing gate** (`references/ux-writing.md`) for
the rounds that decide the *words*: a production-question test and a seven-lens adversarial gate that
catches over-purification (swapping a standard term the audience actually says for a "plainer"
coinage) and other copy failures — in the user's own language.

## Install

```bash
# add this marketplace (public GitHub repo)
/plugin marketplace add daviddev90/picky-client
# install the plugin
/plugin install picky-client@daviddev90
```

Or non-interactively:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

## Use

Once installed, just ask — in **any language**:

- "picky-client로 톤앤매너 시안 만들어줘"
- "make a few versions of this hero and I'll pick"
- "让我们用一场 tournament 决定这个页面的风格"

Candidates and all harness/UI copy render in the language you're working in; only the tool's own
`PICKY-CLIENT DRAFTS` label is fixed.

## Requirements & scope

- Targets **React + TypeScript + Vite + React Router + Tailwind + Motion (Framer Motion)**. Other
  stacks work with small adaptations (see `references/harness.md`); the auto-discovery registry uses
  Vite's `import.meta.glob`, which needs a webpack `require.context` / manual list on Next.js.
- The harness is **dev-only** and must be **removed before a production build** — it's a self-contained
  capsule (one folder + tagged mount lines) you delete before deploy. See `references/removing.md`.

## License

MIT © daviddev90
