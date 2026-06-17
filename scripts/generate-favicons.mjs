import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const publicDir = join(import.meta.dirname, "..", "public");
const paths = [...readFileSync(join(publicDir, "favicon.svg"), "utf8").matchAll(
  /<path d="[^"]+"\/>/g,
)].map((match) => match[0]);

const pathMarkup = paths.join("\n    ");

const variants = [
  { name: "favicon-light", fill: "#1f1f1f" },
  { name: "favicon-dark", fill: "#fafafa" },
];

for (const { name, fill } of variants) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <g transform="translate(0 11.5)" fill="${fill}">
    ${pathMarkup}
  </g>
</svg>`;

  writeFileSync(join(publicDir, `${name}.svg`), svg);

  for (const size of [16, 32]) {
    const buffer = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
    writeFileSync(join(publicDir, `${name}-${size}x${size}.png`), buffer);
  }
}

const lightPngs = [16, 32].map((size) =>
  readFileSync(join(publicDir, `favicon-light-${size}x${size}.png`)),
);

try {
  const toIco = (await import("to-ico")).default;
  writeFileSync(join(publicDir, "favicon.ico"), await toIco(lightPngs));
} catch {
  console.warn("Skipping favicon.ico generation (install to-ico to enable).");
}
