#!/usr/bin/env node
/**
 * scaffold_round.mjs — create a picky-client round folder with 10 candidate stubs.
 *
 * Usage:
 *   node scaffold_round.mjs <projectRoot> <roundNumber> ["what this round decides"] ["short title"]
 *
 * Example:
 *   node scaffold_round.mjs C:/dev/ax-workshop-tools 1 "tone & manner" "Tone"
 *
 * Creates (never overwrites existing files):
 *   <projectRoot>/src/picky-client/rounds/round<N>/round.meta.ts
 *   <projectRoot>/src/picky-client/rounds/round<N>/candidate-01.tsx ... candidate-10.tsx
 *
 * The stubs are shaped for the registry in references/harness.md, so the /picky-drafts
 * accordion and /picky-drafts/<roundId>/<index> pages pick them up automatically once the
 * harness scaffolding (types.ts, theme.ts, copy.ts, registry.ts, routes.tsx, pages/) exists.
 *
 * This only scaffolds files — it does NOT create the harness itself or wire routes.
 * Set those up once per project following references/harness.md.
 */

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(here, "..", "assets");
const CANDIDATE_COUNT = 10;

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const [projectRoot, roundArg, decides = "TODO: what this round decides", titleArg] =
    process.argv.slice(2);

  if (!projectRoot || !roundArg) {
    console.error(
      'Usage: node scaffold_round.mjs <projectRoot> <roundNumber> ["what this round decides"] ["short title"]',
    );
    process.exit(1);
  }

  const round = Number(roundArg);
  if (!Number.isInteger(round) || round < 1) {
    console.error(`Round number must be a positive integer, got: ${roundArg}`);
    process.exit(1);
  }

  // RoundMeta requires `title` (short round name); default keeps the stub compiling.
  const title = titleArg && titleArg.trim() ? titleArg : `Round ${round}`;

  const roundDir = join(projectRoot, "src", "picky-client", "rounds", `round${round}`);
  await mkdir(roundDir, { recursive: true });

  const candidateTemplate = await readFile(
    join(assetsDir, "candidate.template.tsx"),
    "utf8",
  );
  const roundMetaTemplate = await readFile(
    join(assetsDir, "round.meta.template.ts"),
    "utf8",
  );

  const created = [];
  const skipped = [];

  const metaPath = join(roundDir, "round.meta.ts");
  if (await exists(metaPath)) {
    skipped.push(metaPath);
  } else {
    const metaContent = roundMetaTemplate
      .replaceAll("__ROUND__", String(round))
      .replaceAll("__TITLE__", title.replaceAll('"', '\\"'))
      .replaceAll("__DECIDES__", decides.replaceAll('"', '\\"'));
    await writeFile(metaPath, metaContent, "utf8");
    created.push(metaPath);
  }

  for (let index = 1; index <= CANDIDATE_COUNT; index += 1) {
    const index2 = String(index).padStart(2, "0");
    const candidatePath = join(roundDir, `candidate-${index2}.tsx`);

    if (await exists(candidatePath)) {
      skipped.push(candidatePath);
      continue;
    }

    const content = candidateTemplate
      .replaceAll("__INDEX2__", index2)
      .replaceAll("__INDEX__", String(index))
      .replaceAll("__ROUND__", String(round));
    await writeFile(candidatePath, content, "utf8");
    created.push(candidatePath);
  }

  console.log(`Round ${round} scaffolded at ${roundDir}`);
  console.log(`  created: ${created.length} file(s)`);
  if (skipped.length > 0) {
    console.log(`  skipped (already existed): ${skipped.length} file(s)`);
    for (const path of skipped) console.log(`    - ${path}`);
  }
  console.log("Next: fill in each candidate-XX.tsx and round.meta.ts, then run the dev server.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
