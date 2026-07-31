#!/usr/bin/env node
/**
 * Generates social share (Open Graph / Twitter) images at 1200x630.
 *
 * Social platforms crop to roughly 1.91:1. The site's own art is square or
 * portrait, so linking previously produced badly cropped previews. This
 * renders branded cards in the site's dark palette instead.
 *
 * Output: public/og/<slug>.png  (plus public/og/default.png)
 *
 * Run: npm run og:build
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

// Matches the site's dark theme in src/app/global.css
const BACKGROUND = "#111c34";
const SURFACE = "#182642";
const ACCENT = "#fca311";
const PRIMARY = "#edf1f7";
const MUTED = "#b7c1d1";

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * Wraps to fit the available pixel width. The display font is monospace,
 * so character advance is a reliable fraction of the font size.
 */
const CHAR_RATIO = 0.6; // monospace advance width / font-size
const TEXT_X = 90;
const MAX_TEXT_WIDTH = WIDTH - TEXT_X * 2;

function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:]$/, "")}...`;
  }
  return lines;
}

/**
 * Picks the largest font size at which the title fits the card, then wraps.
 * Prevents long titles from overflowing the right edge.
 */
function fitTitle(title) {
  for (const size of [82, 72, 62, 54, 48]) {
    const maxChars = Math.floor(MAX_TEXT_WIDTH / (size * CHAR_RATIO));
    const lines = wrap(title, maxChars, 3);
    const fits = lines.every((line) => line.length <= maxChars);
    if (fits && lines.length <= 3) return { lines, size };
  }
  const size = 48;
  const maxChars = Math.floor(MAX_TEXT_WIDTH / (size * CHAR_RATIO));
  return {
    lines: wrap(title, maxChars, 3).map((line) =>
      line.length > maxChars ? `${line.slice(0, maxChars - 3)}...` : line,
    ),
    size,
  };
}

function card({ eyebrow, title, subtitle }) {
  const { lines: titleLines, size: titleSize } = fitTitle(title);
  const titleStartY = 300 - (titleLines.length - 1) * (titleSize * 0.58);

  const subtitleMaxChars = Math.floor(MAX_TEXT_WIDTH / (28 * CHAR_RATIO));
  const subtitleLines = subtitle ? wrap(subtitle, subtitleMaxChars, 2) : [];

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BACKGROUND}"/>
      <stop offset="100%" stop-color="${SURFACE}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${ACCENT}"/>
  <circle cx="1080" cy="120" r="190" fill="${ACCENT}" opacity="0.07"/>
  <circle cx="1150" cy="560" r="150" fill="${ACCENT}" opacity="0.05"/>

  <text x="${TEXT_X}" y="150" font-family="'Courier New', Courier, monospace" font-size="26" font-weight="700" letter-spacing="4" fill="${ACCENT}">${escapeXml((eyebrow || "").toUpperCase())}</text>

  ${titleLines
    .map(
      (line, i) =>
        `<text x="${TEXT_X}" y="${titleStartY + i * (titleSize * 1.16)}" font-family="'Courier New', Courier, monospace" font-size="${titleSize}" font-weight="700" fill="${PRIMARY}">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}

  ${subtitleLines
    .map(
      (line, i) =>
        `<text x="${TEXT_X}" y="${455 + i * 40}" font-family="'Courier New', Courier, monospace" font-size="28" fill="${MUTED}">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}

  <rect x="${TEXT_X}" y="546" width="54" height="4" fill="${ACCENT}"/>
  <text x="${TEXT_X}" y="592" font-family="'Courier New', Courier, monospace" font-size="26" fill="${MUTED}">jando.live</text>
</svg>`);
}

async function render(name, options) {
  const file = path.join(OUT_DIR, `${name}.png`);
  await sharp(card(options)).png({ compressionLevel: 9 }).toFile(file);
  return file;
}

/** Reads `key: "value"` out of an MDX metadata block without executing it. */
function readField(source, key) {
  const match = source.match(new RegExp(`\\n\\s*${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return match ? match[1].replace(/\\"/g, '"') : null;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const written = [];

  written.push(
    await render("default", {
      eyebrow: "Engineering Portfolio",
      title: "Alexander Jando",
      subtitle: "Embedded systems, robotics, and software projects.",
    }),
  );

  const staticPages = [
    { name: "projects", eyebrow: "Portfolio", title: "Projects", subtitle: "Hardware and software case studies." },
    { name: "about", eyebrow: "Background", title: "About Me", subtitle: "Who I am and what I like building." },
    { name: "resume", eyebrow: "Experience", title: "Resume", subtitle: "Mechatronics engineering resume." },
    { name: "contact", eyebrow: "Get in touch", title: "Contact", subtitle: "Ways to reach me." },
    { name: "collection", eyebrow: "Writing", title: "Field Notes", subtitle: "Build notes, experiments, and side quests." },
  ];
  for (const page of staticPages) written.push(await render(page.name, page));

  const projectDir = path.join(ROOT, "src", "content", "projects");
  for (const entry of await fs.readdir(projectDir)) {
    if (!entry.endsWith(".mdx")) continue;
    const source = await fs.readFile(path.join(projectDir, entry), "utf8");
    const slug = readField(source, "slug");
    if (!slug) continue;
    written.push(
      await render(`project-${slug}`, {
        eyebrow: readField(source, "category") || "Project",
        title: readField(source, "title") || slug,
        subtitle: readField(source, "summary") || "",
      }),
    );
  }

  console.log(`Generated ${written.length} social share images in public/og/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
