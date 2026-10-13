# picky-client

Choose a UI/UX direction by comparing real drafts. picky-client researches relevant examples, builds distinct candidates, and presents them in a removable review harness. Your pick guides the next round, and the settled design is applied to the real product.

Taste rounds offer ten directions. Functional decisions offer three to five grounded options with usability trade-offs. Candidates preserve the existing theme, product behavior, and reviewed copy.

## Install as a skill

The canonical skill lives in [skills/picky-client](skills/picky-client). From your project directory, run the [Skills CLI](https://github.com/vercel-labs/skills) with Node.js 22.20.0 or later:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Select your agent when prompted, or specify its ID:

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

Installation is project-local by default. Add `-g` to install at the agent's user-wide location. For manual project installation, copy the entire `skills/picky-client` folder into `.agents/skills/`, a supported skill location in [OpenCode](https://opencode.ai/docs/skills/) and [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). oh-my-opencode uses OpenCode's skill installation.

## Install as a native plugin

### Claude Code

From your terminal, with Claude Code 2.1.292 or later:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

For older versions, use the two-command installation:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

Inside a Claude Code session, version 2.1.275 or later supports `/plugin install picky-client --marketplace daviddev90/picky-client`. See [Claude Code plugin installation](https://code.claude.com/docs/en/discover-plugins).

### Codex

From your terminal:

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Inside Codex, use `/plugins` to browse plugins. See the [Codex CLI reference](https://learn.chatgpt.com/docs/cli/reference).

Both native plugins use the canonical root `skills/` directory. The root [plugin.json](plugin.json) packages the portable/Codex plugin, and [.claude-plugin/plugin.json](.claude-plugin/plugin.json) provides the Claude Code compatibility manifest. See the [plugin packaging documentation](https://developers.openai.com/plugins/build/plugins).

## Use

Ask in your working language:

> Use picky-client to make layout drafts for this screen so I can choose.

| Installation | Explicit invocation |
|---|---|
| Codex plugin | `$picky-client:picky-client` |
| Codex standalone skill | `$picky-client` |
| Claude Code plugin | `/picky-client:picky-client` |
| Claude Code standalone skill | `/picky-client` |

In other agents, ask to use picky-client. The agent shares a reachable review URL, logs decisions in your project's `docs/picky-client.md`, and waits for your selection. Candidates and review labels use your working language; the tool name remains `PICKY-CLIENT DRAFTS`.

## Review harness

The supplied harness uses React, TypeScript, Vite, React Router, Tailwind, and Motion. Other stacks adapt the integration points; native targets use a web preview before the design is applied in their own stack. The harness is development-only and is removed before production builds.

Browser renders verify readiness. Hosts with subagents delegate builds and reviews; other hosts perform the checks sequentially and record same-agent review. Read the [skill](skills/picky-client/SKILL.md) for the workflow and [docs](docs/README.md) for a historical example.

## License

MIT © daviddev90
