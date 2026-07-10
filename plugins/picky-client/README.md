# plugins/picky-client — Codex repo-marketplace plugin target

This directory is the plugin folder that `.agents/plugins/marketplace.json` points at.
Codex does **not** discover a plugin whose local marketplace `source.path` is the marketplace
root itself (`./`) — the entry must target a concrete subdirectory (`$REPO_ROOT/plugins/<name>`).
So this thin folder exists only to be that target; it holds no vendored content.

## Single source of truth — no duplicated skill

The skill is **not** copied here. `.codex-plugin/plugin.json` references the canonical root
content with parent-relative paths:

| Manifest field | Resolves to |
|---|---|
| `skills` | `skills/` at the repo root (`../../skills/`) |

The Claude Code manifest lives at the repo root (`.claude-plugin/plugin.json`, with
`source: "./"`) and points at the same root `skills/`. The two platforms differ only in the
manifest shell — Claude Code allows the repo root as the plugin, Codex requires this
subdirectory target.

**Keep `name` and `version` in sync** between `.claude-plugin/plugin.json` and
`plugins/picky-client/.codex-plugin/plugin.json` when releasing.

## Install (Codex)

```bash
# add this repo as a marketplace, then install the plugin
/plugin marketplace add daviddev90/picky-client
/plugin install picky-client@daviddev90
```

Or run `/plugins` in Codex CLI to browse and install from the UI.
