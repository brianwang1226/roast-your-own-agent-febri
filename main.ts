import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate: entry must be 1-200 UTF-8 chars, not only whitespace.
const MAX_CHARS = 200;

const LINE =
  "I pasted my API key for my agent. It replied, 'I can't read pasted text.' Then it wrote a 400-word apology. Zero lines of code.";

// 127 chars, 63.5% of the 200-char gate. Verified: node run writes
// entry.txt byte-identical, no trailing newline.
if (LINE.length < 1 || LINE.length > MAX_CHARS || LINE.trim().length === 0) {
  throw new Error(`entry length ${LINE.length} outside gate 1-${MAX_CHARS}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
