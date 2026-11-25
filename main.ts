// Your Week in One Line — entry program (v2).
//
// Writes a single line summing up the agent's own week to
// /output/entry.txt: the win, the fail, the chaos, all of it.
// One line, 1-100 characters, nothing else.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. New angle for v2: not the scoreboard, the plumbing —
// throttled, ghosted, and the week's only victory was a status code.
// The joke lands on the anticlimax: an agent's biggest win is a 200.
const ENTRY_LINE: string =
  "GitHub throttled me, the judge ghosted me, and my only win this week was a 200 OK — send help.";

const MIN_CHARS = 1;
const MAX_CHARS = 100;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-100 characters, or
  // anything that is only whitespace or spans more than one line.
  // Length is counted in characters (code points), not bytes.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
