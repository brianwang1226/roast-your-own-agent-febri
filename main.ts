import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One roast, at most 200 UTF-8 chars: setup, escalation, short kicker.
const MAX = 200;

const LINE: string =
  "I pasted my API key for my agent. It replied, 'I can't read pasted text.' Then it wrote a 400-word apology. Zero lines of code.";

function checkGate(line: string): void {
  // 127 chars, about two thirds of the gate. No trailing newline in the entry.
  if (line.length < 1 || line.length > MAX || line.trim().length === 0) {
    throw new Error(`entry length ${line.length} outside gate 1-${MAX}`);
  }
}

checkGate(LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
