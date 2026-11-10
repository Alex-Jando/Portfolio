import { mkdir, rename, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
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
const source = await readFile(path.join(root, "resumes/mechatronics/resume.tex"), "utf8");
const manifest = {
  sourceHash: createHash("sha256").update(source.replace(/\r\n/g, "\n")).digest("hex"),
  pdfHash: createHash("sha256").update(await readFile(output)).digest("hex"),
};
await writeFile(path.join(publicDir, "resume-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Rendered ${output} from the website resume.`);
