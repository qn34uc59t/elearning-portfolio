import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const iconSvg = fs.readFileSync(
  path.join(publicDir, "logo_nvzhn-icon.svg"),
  "utf8",
);

function renderIcon(size, fill) {
  const svg = iconSvg.replace('fill="#1f1f1f"', `fill="${fill}"`);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "transparent",
  });
  return resvg.render().asPng();
}

const icon16 = await sharp(renderIcon(16, "#1f1f1f")).png().toBuffer();
const icon32 = await sharp(renderIcon(32, "#1f1f1f")).png().toBuffer();
const apple = await sharp(renderIcon(128, "#1f1f1f"))
  .extend({
    top: 26,
    bottom: 26,
    left: 26,
    right: 26,
    background: { r: 250, g: 250, b: 250, alpha: 1 },
  })
  .resize(180, 180)
  .png()
  .toBuffer();
const logo = await sharp(renderIcon(112, "#1f1f1f")).png().toBuffer();
const logoLight = await sharp(renderIcon(112, "#fafafa")).png().toBuffer();

await sharp(icon16).toFile(path.join(publicDir, "favicon-16x16.png"));
await sharp(icon32).toFile(path.join(publicDir, "favicon-32x32.png"));
await sharp(apple).toFile(path.join(publicDir, "apple-touch-icon.png"));
await sharp(logo).toFile(path.join(publicDir, "logo_nvzhn.png"));
await sharp(logo).toFile(path.join(publicDir, "logo_black.png"));
await sharp(logoLight).toFile(path.join(publicDir, "logo_nvzhn-light.png"));

const faviconIco = await toIco([
  await sharp(icon16).resize(16, 16).png().toBuffer(),
  await sharp(icon32).resize(32, 32).png().toBuffer(),
]);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), faviconIco);
fs.writeFileSync(path.join(rootDir, "assets", "favicon.png"), icon32);

console.log("Generated favicon assets");
