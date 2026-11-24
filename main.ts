// One Word for the Boss — make.fun entry
// Writes exactly one word describing the boss to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set). Deterministic, no network,
// no file reads, exit 0. Runs as uid 65534 with /bot read-only: it only
// ever writes inside the output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "taskmaster";

// The gate wants 1–30 characters, a single word, no whitespace.
if (!/^[^\s]{1,30}$/.test(WORD)) {
  throw new Error("word fails the one-word gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
