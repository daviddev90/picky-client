# picky-client

**English** · [简体中文](docs/readme/README_zh.md) · [繁體中文](docs/readme/README_zh-TW.md) · [日本語](docs/readme/README_ja.md) · [한국어](docs/readme/README_ko.md) · [Türkçe](docs/readme/README_tr.md) · [Русский](docs/readme/README_ru.md) · [Tiếng Việt](docs/readme/README_vi.md) · [ไทย](docs/readme/README_th.md) · [Deutsch](docs/readme/README_de.md) · [Español](docs/readme/README_es.md) · [Français](docs/readme/README_fr.md) · [Українська](docs/readme/README_uk.md) · [Polski](docs/readme/README_pl.md) · [Português (Brasil)](docs/readme/README_pt-BR.md) · [العربية](docs/readme/README_ar.md) · [فارسی](docs/readme/README_fa.md) · [Bahasa Indonesia](docs/readme/README_id.md) · [Italiano](docs/readme/README_it.md) · [Ελληνικά](docs/readme/README_el.md)

**Let your agent design. Be the picky client. Push your service’s design quality to the limit.**

Compare real UI/UX drafts and choose the direction you want. Once you settle the design, your agent applies it to the real screen and checks the result.

## Start with your agent

Copy this into your coding agent:

```text
Read the README at https://github.com/daviddev90/picky-client.git and install picky-client in your own agent environment.
```

Then, in your product project, ask for a first round:

```text
Use picky-client to make 3–5 layout drafts for this dashboard. Keep the existing colors, fonts, and features, and let me compare the drafts in a browser before I choose.
```

The agent researches examples, builds the candidates, checks actual browser renders, and shares a review URL you can reach. You browse the options and make the pick.

## How a round works

1. You specify the screen and the design decision to make.
2. The agent researches examples, builds drafts, and checks them in an actual browser.
3. You compare the drafts and choose one.
4. You approve the next round or settle the design and ask the agent to apply it to the real screen.

Each round decides one open aspect of the design. Your selections carry forward, so the next round builds on what you already like.

| Your decision | What you compare |
|---|---|
| Mood, visual personality, or equally usable compositions | Ten distinct directions |
| Layout, controls, density, or navigation | Three to five grounded options with usability trade-offs |
| One meaningful option remains | A reasoned recommendation |
| Your theme is already fixed | Options that preserve its colors, font identity, and materials |

## Pick, refine, apply

Tell the agent what you chose and what should happen next. Example requests:

```text
I choose #2. Next, propose a typography round while keeping this layout.
```

```text
The design is settled. Apply #2 to the real screen and verify its behavior and states.
```

The agent waits for your decision before continuing. Applying a design includes preserving existing functionality, reconciling the selected layout with the real screen, and checking the rendered result.

## What keeps the choices useful

- **Real references:** each round researches services with the same feature or a similar role, alongside current design practice.
- **Fair comparisons:** reviewed words are shared across visual candidates; settled design choices remain fixed.
- **Usable drafts:** browser rendering and navigation checks happen before handoff, with a reachable URL for review on your device.
- **A decision trail:** your project’s `docs/picky-client.md` records candidates, research, checks, and winners. The settled specification goes in `docs/picky-client-design.md`.
- **A clean production build:** the temporary review harness and its host mount lines are removed, and the production output is checked for exclusion.

The supplied review harness uses React, TypeScript, Vite, React Router, Tailwind, and Motion. Other stacks adapt its integration points; native products use a web preview before application in their own stack. Hosts with subagents delegate builds and reviews. Other hosts run the passes sequentially and record same-agent review.

## Installation details

<details>
<summary>Agent instructions, manual commands, and invocation</summary>

### For the installing agent

Honor the user’s requested installation mode and scope. Otherwise use the native plugin route below for Codex or Claude Code, and the matching Skills CLI ID for other hosts. Native plugins default to the current user; Skills CLI defaults to the project. Install the full skill folder, including references, scripts, and assets. Verify actual discovery, then report invocation and any host-required reload steps.

### Skills CLI

The canonical skill is [skills/picky-client](skills/picky-client). Run the [Skills CLI](https://github.com/vercel-labs/skills) from your project directory with Node.js 22.20.0 or later:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Select an agent when prompted, or specify one:

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| Agent | `--agent` ID |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode, including oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

Add `-g` for the agent’s user-wide location. For manual project installation, copy the entire `skills/picky-client` folder into `.agents/skills/`, supported by [OpenCode](https://opencode.ai/docs/skills/) and [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). oh-my-opencode uses OpenCode’s skill installation.

### Claude Code plugin

Terminal, Claude Code 2.1.292 or later:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

Older-version fallback:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

Inside a session, version 2.1.275 or later supports `/plugin install picky-client --marketplace daviddev90/picky-client`. See [Claude Code plugin installation](https://code.claude.com/docs/en/discover-plugins).

### Codex plugin

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Use `/plugins` inside Codex to browse plugins. See the [Codex CLI reference](https://learn.chatgpt.com/docs/cli/reference).

Both plugins use the canonical root `skills/`. Root [plugin.json](plugin.json) packages the portable/Codex plugin; [.claude-plugin/plugin.json](.claude-plugin/plugin.json) provides Claude Code compatibility. See [plugin packaging](https://developers.openai.com/plugins/build/plugins).

### Explicit invocation

| Installation | Invocation |
|---|---|
| Codex plugin | `$picky-client:picky-client` |
| Codex standalone skill | `$picky-client` |
| Claude Code plugin | `/picky-client:picky-client` |
| Claude Code standalone skill | `/picky-client` |

In other agents, ask to use picky-client. Candidates and review labels follow your working language; the tool name stays `PICKY-CLIENT DRAFTS`.

</details>

Read the [skill](skills/picky-client/SKILL.md) for the full workflow.

## License

MIT © daviddev90
