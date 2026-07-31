#!/usr/bin/env node
/**
 * Generates social share (Open Graph / Twitter) images at 1200x630.
 *
 * Social platforms crop to roughly 1.91:1. The site's own art is square or
 * portrait, so linking previously produced badly cropped previews. This
 * renders branded cards in the site's dark palette instead.
 *
 * Output: public/og/<slug>.jpg  (plus public/og/default.jpg)
 * JPEG, not PNG: these cards are photographic and are refetched by every link
 * scraper, so lossy compression cuts them ~80% with no visible difference.
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

// Cards that carry artwork reserve the right side for it, so text wraps sooner.
const IMAGE_PANEL_WIDTH = 470;

// Sources below this width look soft once scaled into the panel, so they are
// skipped in favour of a clean text-only card.
const MIN_SOURCE_WIDTH = 380;

/**
 * Renders artwork into the right-hand panel.
 *
 * `cover` fills the panel and crops overflow, which suits photos and
 * screenshots. Sources too small to fill it are letterboxed onto the card
 * background rather than upscaled into a blurry mess.
 */
async function panel(imagePath) {
  const meta = await sharp(imagePath).metadata();
  // Upscaling past this factor visibly softens the panel.
  const scale = Math.max(IMAGE_PANEL_WIDTH / meta.width, HEIGHT / meta.height);
  const wouldBlur = scale > 1.15;

  // Logos, diagrams, and screenshots are flat art: cropping them cuts off
  // meaning, and light ones read as a glaring slab against the dark card. Inset
  // those on the surface colour. Photographs crop safely, so let them bleed.
  //
  // Entropy separates the two reliably where brightness does not: the FIRA car
  // is photographed on a white table, so it is "light" but still a photo.
  // Measured here, photos land at 6.5+ and flat art at 2.2 or below.
  const stats = await sharp(imagePath).stats();
  const isFlatArt = stats.entropy < 4.5;

  // Inset also protects against blur, but only when cropping cannot save us.
  // A tall-enough source (a square photo, say) still fills the panel sharply
  // after a centre crop, so judge blur on the crop rather than the full fit.
  const cropScale = IMAGE_PANEL_WIDTH / meta.width;
  const canCropSharply = cropScale <= 1.15 && meta.height >= HEIGHT * 0.75;

  if (isFlatArt || (wouldBlur && !canCropSharply)) {
    const inset = await sharp(imagePath)
      .resize(IMAGE_PANEL_WIDTH - 56, HEIGHT - 96, {
        fit: "contain",
        background: { r: 24, g: 38, b: 66, alpha: 1 },
      })
      .toBuffer();

    const buffer = await sharp({
      create: {
        width: IMAGE_PANEL_WIDTH,
        height: HEIGHT,
        channels: 4,
        background: { r: 24, g: 38, b: 66, alpha: 1 },
      },
    })
      .composite([{ input: inset, gravity: "center" }])
      .png()
      .toBuffer();

    return { buffer, inset: true };
  }

  const buffer = await sharp(imagePath)
    .resize(IMAGE_PANEL_WIDTH, HEIGHT, {
      fit: "cover",
      position: "attention",
      background: { r: 17, g: 28, b: 52, alpha: 1 },
    })
    .toBuffer();

  return { buffer, inset: false };
}

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
function fitTitle(title, maxTextWidth) {
  for (const size of [82, 72, 62, 54, 48]) {
    const maxChars = Math.floor(maxTextWidth / (size * CHAR_RATIO));
    const lines = wrap(title, maxChars, 3);
    const fits = lines.every((line) => line.length <= maxChars);
    if (fits && lines.length <= 3) return { lines, size };
  }
  const size = 48;
  const maxChars = Math.floor(maxTextWidth / (size * CHAR_RATIO));
  return {
    lines: wrap(title, maxChars, 3).map((line) =>
      line.length > maxChars ? `${line.slice(0, maxChars - 3)}...` : line,
    ),
    size,
  };
}

/**
 * Eyebrow text is letter-spaced, so it consumes more width per character than
 * the monospace advance alone. Truncate it to the same column as the title.
 */
function fitEyebrow(eyebrow, maxTextWidth) {
  const text = String(eyebrow || "").toUpperCase();
  const perChar = 26 * CHAR_RATIO + 4; // font-size * ratio + letter-spacing
  const maxChars = Math.floor(maxTextWidth / perChar);
  if (text.length <= maxChars) return text;
  return `${text.slice(0, Math.max(1, maxChars - 1)).trimEnd()}\u2026`;
}

function card({ eyebrow, title, subtitle, hasImage }) {
  // Artwork occupies the right panel, so text must wrap earlier.
  const textWidth = hasImage ? WIDTH - IMAGE_PANEL_WIDTH - TEXT_X - 60 : MAX_TEXT_WIDTH;

  const { lines: titleLines, size: titleSize } = fitTitle(title, textWidth);
  // Keep the first title line clear of the eyebrow (y=150) no matter how many
  // lines wrap; otherwise long titles ride up and collide with it.
  const EYEBROW_BASELINE = 150;
  const SUBTITLE_SIZE = 28;
  const SUBTITLE_LEADING = 40;
  const FOOTER_TOP = 520; // accent rule sits at y=546

  // Flow the block downward from the eyebrow instead of centring it, so a
  // three-line title cannot run into the subtitle beneath it.
  const titleStartY = EYEBROW_BASELINE + titleSize + 26;
  const titleBottom = titleStartY + (titleLines.length - 1) * (titleSize * 1.16);

  const subtitleMaxChars = Math.floor(textWidth / (SUBTITLE_SIZE * CHAR_RATIO));
  const subtitleTop = titleBottom + 62;
  const subtitleRoom = Math.max(0, Math.floor((FOOTER_TOP - subtitleTop) / SUBTITLE_LEADING) + 1);
  const subtitleLines = subtitle
    ? wrap(subtitle, subtitleMaxChars, Math.min(hasImage ? 3 : 2, subtitleRoom))
    : [];

  // Decorative circles would sit under the artwork panel, so drop them there.
  const flourish = hasImage
    ? ""
    : `<circle cx="1080" cy="120" r="190" fill="${ACCENT}" opacity="0.07"/>
  <circle cx="1150" cy="560" r="150" fill="${ACCENT}" opacity="0.05"/>`;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BACKGROUND}"/>
      <stop offset="100%" stop-color="${SURFACE}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${ACCENT}"/>
  ${flourish}

  <text x="${TEXT_X}" y="150" font-family="'Courier New', Courier, monospace" font-size="26" font-weight="700" letter-spacing="4" fill="${ACCENT}">${escapeXml(fitEyebrow(eyebrow, textWidth))}</text>

  ${titleLines
    .map(
      (line, i) =>
        `<text x="${TEXT_X}" y="${titleStartY + i * (titleSize * 1.16)}" font-family="'Courier New', Courier, monospace" font-size="${titleSize}" font-weight="700" fill="${PRIMARY}">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}

  ${subtitleLines
    .map(
      (line, i) =>
        `<text x="${TEXT_X}" y="${subtitleTop + i * SUBTITLE_LEADING}" font-family="'Courier New', Courier, monospace" font-size="${SUBTITLE_SIZE}" fill="${MUTED}">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}

  <rect x="${TEXT_X}" y="546" width="54" height="4" fill="${ACCENT}"/>
  <text x="${TEXT_X}" y="592" font-family="'Courier New', Courier, monospace" font-size="26" fill="${MUTED}">jando.live</text>
</svg>`);
}

async function render(name, options) {
  const file = path.join(OUT_DIR, `${name}.jpg`);

  // Resolve artwork first: a missing or too-small source falls back to the
  // text-only layout rather than producing an upscaled, blurry panel.
  let artwork = null;
  if (options.image) {
    const imagePath = path.join(ROOT, "public", options.image.replace(/^\//, ""));
    try {
      const meta = await sharp(imagePath).metadata();
      if (meta.width >= MIN_SOURCE_WIDTH && meta.height >= MIN_SOURCE_WIDTH) {
        artwork = await panel(imagePath);
      } else {
        console.warn(`  ${name}: source ${meta.width}x${meta.height} too small; text-only card`);
      }
    } catch {
      console.warn(`  ${name}: could not read ${options.image}; text-only card`);
    }
  }

  const base = sharp(card({ ...options, hasImage: Boolean(artwork) }));
  if (!artwork) {
    await base.jpeg({ quality: 86, mozjpeg: true }).toFile(file);
    return file;
  }

  // Composite artwork, then lay the accent rules back on top. Bled photos also
  // get a left-edge fade so they blend into the card; inset art already sits on
  // the card colour, where a fade would just smear its light edge.
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${BACKGROUND}" stop-opacity="1"/>
    <stop offset="100%" stop-color="${BACKGROUND}" stop-opacity="0"/>
  </linearGradient></defs>
  ${artwork.inset ? "" : `<rect x="${WIDTH - IMAGE_PANEL_WIDTH}" y="0" width="170" height="${HEIGHT}" fill="url(#f)"/>`}
  <rect x="${WIDTH - IMAGE_PANEL_WIDTH}" y="0" width="4" height="${HEIGHT}" fill="${ACCENT}" opacity="0.5"/>
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="${ACCENT}"/>
</svg>`);

  await sharp(await base.png().toBuffer())
    .composite([
      { input: artwork.buffer, left: WIDTH - IMAGE_PANEL_WIDTH, top: 0 },
      { input: overlay, left: 0, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(file);
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
      image: "/images/alexander-jando-headshot.webp",
    }),
  );

  const staticPages = [
    { name: "projects", eyebrow: "Portfolio", title: "Projects", subtitle: "Hardware and software case studies." },
    { name: "about", eyebrow: "Background", title: "About Me", subtitle: "Who I am and what I like building.", image: "/images/alexander-jando-headshot.webp" },
    { name: "resume", eyebrow: "Experience", title: "Resume", subtitle: "Mechatronics engineering resume.", image: "/images/alexander-jando-headshot.webp" },
    { name: "contact", eyebrow: "Get in touch", title: "Contact", subtitle: "Ways to reach me.", image: "/images/alexander-jando-headshot.webp" },
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
        image: readField(source, "image"),
      }),
    );
  }

  console.log(`Generated ${written.length} social share images in public/og/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
