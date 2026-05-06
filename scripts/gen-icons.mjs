// Generates all icon variants and the OG fallback from public/logo.png.
//
// Usage:
//   node scripts/gen-icons.mjs
//
// Outputs (all into public/):
//   - icon-32.png            32×32    browser tab (modern) — TRANSPARENT bg
//   - icon-192.png           192×192  PWA / Android Chrome — TRANSPARENT bg
//   - icon-512.png           512×512  PWA splash             — TRANSPARENT bg
//   - apple-touch-icon.png   180×180  iOS home screen        — INDIGO BG ROUNDED
//   - icon-maskable.png      512×512  Android maskable PWA   — INDIGO BG (full bleed)
//   - app-icon.png           1024×1024 standalone for IG profile / marketing — INDIGO BG ROUNDED
//   - favicon.ico            16+32+48 multi-size for legacy browsers
//   - og-default.png         1200×630 social-share fallback (logo + UNLOCKY wordmark on bg-bg)
//
// Why two variants:
//   - Browser tabs (icon-32/192/512, favicon.ico): the icon sits on top
//     of the browser's chrome which has its own background. Transparent
//     looks clean and pops against any tab color.
//   - Home screens (apple-touch-icon, app-icon): iOS and Android render
//     app icons as if they're "real apps" with backgrounds. A logo on
//     transparent bg there looks like it's floating — wrong vibe.
//     Indigo rounded square = intentional, brand-aligned, native-app feel.
//   - Android maskable (icon-maskable): launchers crop these to circles,
//     squircles, or whatever shape the OEM uses. Need full-bleed bg with
//     logo in inner ~70% safe zone so cropping never clips the icon.
//
// Re-run this script every time public/logo.png changes.
//
// favicon.ico is built from PNG buffers manually because sharp does not
// emit ICO format directly. The format is well-documented (header + per-image
// directory entries + raw PNG payloads).

import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const PUBLIC = join(REPO_ROOT, "public");
const SOURCE = join(PUBLIC, "logo.png");

// Brand background color (matches --color-bg in src/index.css).
const BG = { r: 14, g: 14, b: 20, alpha: 1 };

// Brand primary indigo (matches --color-indigo in src/index.css). Used
// as the background for the app-icon / apple-touch / maskable variants.
const INDIGO = "#6366F1";

async function genPng(size, outName) {
  await sharp(SOURCE)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(PUBLIC, outName));
  console.log(`  ${outName} (${size}×${size})`);
}

/**
 * Build an ICO buffer from N PNG buffers (different sizes).
 * ICO format spec:
 *   - Header: 6 bytes (reserved=0, type=1, count=N)
 *   - Per image: 16-byte directory entry (width, height, palette, reserved,
 *     planes, bpp, byte size, offset)
 *   - Then raw PNG data for each image (we use PNG mode for >256x256 support)
 */
function buildIco(pngBuffers, sizes) {
  const headerLen = 6 + 16 * pngBuffers.length;
  let offset = headerLen;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(pngBuffers.length, 4); // count

  const directory = Buffer.alloc(16 * pngBuffers.length);
  pngBuffers.forEach((buf, i) => {
    const size = sizes[i];
    const dirOffset = i * 16;
    directory[dirOffset] = size === 256 ? 0 : size; // width (0 = 256)
    directory[dirOffset + 1] = size === 256 ? 0 : size; // height
    directory[dirOffset + 2] = 0; // palette
    directory[dirOffset + 3] = 0; // reserved
    directory.writeUInt16LE(1, dirOffset + 4); // planes
    directory.writeUInt16LE(32, dirOffset + 6); // bpp
    directory.writeUInt32LE(buf.length, dirOffset + 8); // byte size
    directory.writeUInt32LE(offset, dirOffset + 12); // offset
    offset += buf.length;
  });

  return Buffer.concat([header, directory, ...pngBuffers]);
}

async function genFavicon() {
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(
    sizes.map((size) =>
      sharp(SOURCE)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  );
  const ico = buildIco(buffers, sizes);
  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  console.log(`  favicon.ico (16+32+48 multi-size)`);
}

/**
 * 1200×630 OG fallback: logo on the left, UNLOCKY wordmark + tagline on
 * the right, both centered vertically over the brand bg color. Used as
 * the og:image when no specific image (achievement/profile/unlock) applies.
 *
 * Layout via SVG — Sharp can rasterize SVG to PNG. The SVG embeds the
 * logo as a base64 PNG so we don't need an external file ref.
 */
async function genOgDefault() {
  const logoBuf = readFileSync(SOURCE);
  const logoB64 = logoBuf.toString("base64");

  const W = 1200;
  const H = 630;
  const LOGO_SIZE = 320;
  const LOGO_X = 140;
  const LOGO_Y = (H - LOGO_SIZE) / 2;
  const TEXT_X = LOGO_X + LOGO_SIZE + 80;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="${W}" height="${H}" fill="rgb(${BG.r},${BG.g},${BG.b})"/>
      <image x="${LOGO_X}" y="${LOGO_Y}" width="${LOGO_SIZE}" height="${LOGO_SIZE}"
             href="data:image/png;base64,${logoB64}"/>
      <text x="${TEXT_X}" y="285" font-family="Inter, sans-serif" font-size="120" font-weight="900"
            fill="#ffffff" letter-spacing="-3">UNLOCKY</text>
      <text x="${TEXT_X}" y="345" font-family="Inter, sans-serif" font-size="32" font-weight="500"
            fill="rgba(255,255,255,0.6)" letter-spacing="2">COLECCIONA TUS LOGROS ABSURDOS</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(PUBLIC, "og-default.png"));
  console.log(`  og-default.png (1200×630, logo + wordmark on bg)`);
}

/**
 * Compose the logo on top of an indigo rounded-corner square. iOS uses
 * roughly 22.5% of width as the corner radius for the "squircle" home
 * screen icon — we match that so the generated apple-touch-icon already
 * looks rounded if the OS doesn't apply its own mask, and matches the
 * native crop if it does. Logo sits in the inner ~70% safe zone so
 * Android's variable launcher masks never clip into the lock symbol.
 */
async function genRoundedAppIcon(size, outName) {
  const radius = Math.round(size * 0.225);
  // 82% of canvas — bigger than the typical iOS apps but matches the
  // chunky, illustrated aesthetic of the padlock (which has its own
  // contour/border, so it can afford to fill more of the square without
  // looking cramped against the indigo edges).
  const logoSize = Math.round(size * 0.82);
  const inset = Math.round((size - logoSize) / 2);

  // Background: rounded square in indigo, drawn as SVG so sharp can
  // rasterize at exact size without aliasing the corner curve.
  const bgSvg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${INDIGO}"/>
    </svg>
  `;
  const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  // Logo resized to fit the safe zone, kept transparent so it composes
  // cleanly over the indigo background.
  const logo = await sharp(SOURCE)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(bg)
    .composite([{ input: logo, top: inset, left: inset }])
    .png()
    .toFile(join(PUBLIC, outName));
  console.log(`  ${outName} (${size}×${size}, indigo bg, rounded ${radius}px)`);
}

/**
 * Android maskable: full-bleed indigo (no rounded corners — launchers
 * apply their own mask shape). Same logo safe zone.
 */
async function genMaskable(size, outName) {
  // Android maskable safe zone spec is "inner 80% of the canvas" — any
  // pixel outside that radius can get cropped by the launcher's shape.
  // We size the logo at 75% so the contour has a small breath of indigo
  // before the crop boundary, never getting clipped on circle/squircle.
  const logoSize = Math.round(size * 0.75);
  const inset = Math.round((size - logoSize) / 2);

  const bgSvg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${INDIGO}"/>
    </svg>
  `;
  const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  const logo = await sharp(SOURCE)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(bg)
    .composite([{ input: logo, top: inset, left: inset }])
    .png()
    .toFile(join(PUBLIC, outName));
  console.log(`  ${outName} (${size}×${size}, indigo full-bleed, maskable safe zone)`);
}

async function main() {
  console.log(`Generating icons from ${SOURCE}...\n`);
  // Browser tab variants — transparent
  await genPng(32, "icon-32.png");
  await genPng(192, "icon-192.png");
  await genPng(512, "icon-512.png");
  await genFavicon();

  // Home-screen / app variants — indigo rounded square
  await genRoundedAppIcon(180, "apple-touch-icon.png");
  await genRoundedAppIcon(1024, "app-icon.png");
  await genMaskable(512, "icon-maskable.png");

  // Social share fallback
  await genOgDefault();
  console.log(`\n✓ Done. Re-run when public/logo.png changes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
