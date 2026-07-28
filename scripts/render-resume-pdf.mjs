import { mkdir, rename } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicDir = path.join(root, "public/resume");
const output = path.join(publicDir, "EngineeringResume.pdf");
const temporaryOutput = path.join(publicDir, "EngineeringResume.browser.pdf");
const resumeUrl = process.env.RESUME_URL || "http://127.0.0.1:8080/resume";
const chromium = process.env.CHROMIUM_BIN || "chromium";

await mkdir(publicDir, { recursive: true });

const result = spawnSync(chromium, [
  "--headless",
  "--no-sandbox",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${temporaryOutput}`,
  resumeUrl,
], { stdio: "inherit" });

if (result.status !== 0) {
  throw new Error(`Could not render the resume PDF from ${resumeUrl}.`);
}

await rename(temporaryOutput, output);
console.log(`Rendered ${output} from the website resume.`);
