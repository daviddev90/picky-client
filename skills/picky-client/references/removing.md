# Removing picky-client before production

picky-client is a **dev-only design tool**. Its harness (every candidate draft, the pages, the
accordion) must **never ship in a production build**. Remove it before deploying.

## Why a runtime guard is not enough

Gating the mount with `import.meta.env.DEV` (Vite) / `process.env.NODE_ENV` (Next) only stops
the routes from *rendering* in production — the harness **code is still bundled**. The static
`import` of the routes pulls in `registry.ts`, whose `import.meta.glob(..., { eager: true })`
eagerly imports every candidate file; tree-shaking does not reliably drop it (no `sideEffects`
guarantee), and the guard is framework-specific anyway. **Measured:** a Vite prod build with
the guard still bundled the harness (candidate strings present in the output JS, ~1MB+).

So the guard is optional defense-in-depth; **the real exclusion is deletion.**

## The capsule (set this up at install time so removal is trivial)

When first adding picky-client to a project, establish:

1. **Everything under one folder** — `src/picky-client/`; nothing of the harness lives outside
   it (registry, theme, copy, pages, components, rounds all inside).
2. **One tagged mount in the host** — the only host-app code that references the harness is the
   route mount. Tag every such line with a `// [picky-client]` (or `{/* [picky-client] */}`)
   marker so removal is a grep, not a hunt.
3. **A `src/picky-client/README.md`** stating it is dev-only + the removal steps.

## Removal (framework-agnostic, 2 steps)

1. Delete the folder: `src/picky-client/`.
2. Delete every `[picky-client]`-tagged line in the host:
   ```bash
   grep -rn "\[picky-client\]" src        # → remove the lines OUTSIDE the folder
   ```

Then it's gone. To undo, restore from the pre-removal commit (`git checkout`/`git restore`).

## When the user deploys / builds for production

When the user says they're about to **deploy**, **ship**, or run a **production build** — or
asks how to keep the harness out of production — run (or walk them through) the removal above,
then verify the bundle is clean:

```bash
npx vite build --outDir dist-check     # local build ONLY (not a deploy command)
# Probe only source-preserved STRING LITERALS. Minification renames component/identifier names
# (e.g. RoundAccordion), so those never appear in the bundle and can't detect a leak — a route
# path and a rendered label do survive.
grep -rl "PICKY-CLIENT DRAFTS\|picky-drafts" dist-check/assets   # → 0 matches
```

Do **not** run a deploy command yourself (that's the user's call, and often the project's
`build` script chains a deploy). Just remove + verify, or hand the user the two steps.

## Framework variants

**Removal** (delete the folder + tagged lines) is framework-agnostic. **Authoring / running** the
harness is not: its code targets **Vite** — the auto-discovery registry uses `import.meta.glob` and
the mount gate uses `import.meta.env.DEV`, both Vite-only. Porting to another bundler is a real
rewrite of those two integration points, not a config tweak.

- **Vite / CRA:** as above; mount under `import.meta.env.DEV`.
- **Next.js:** `import.meta.glob` does **not** exist in a webpack / Turbopack build — there is no
  drop-in. Replace the registry with webpack `require.context` or a hand-kept candidate list, and
  swap `import.meta.env.DEV` → `process.env.NODE_ENV !== "production"`. Put the harness under a
  dev-only route segment; to remove, delete that segment folder + the tagged lines before deploy.
- **Plain HTML / other:** the harness needs a React + bundler toolchain to build (candidates are
  `.tsx` components), so stand it up with that stack's own module-discovery + React entry, gate it
  dev-only, then remove that entry + the folder before shipping.

The **removal** principle is constant regardless of stack: **one folder + `[picky-client]`-tagged
mount lines → delete before production.**
