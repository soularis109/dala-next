// Vector artwork derived from the document v2 palette and folder canvas layout.
// Originals remain available; only the finale loads these generated surfaces.
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sharp = createRequire(join(root, "tools-candidates", "package.json"))("sharp");
const out = join(root, "public/images/finale");
await mkdir(out, { recursive: true });
const defs = `<defs>
  <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FCFAF5"/><stop offset="1" stop-color="#F1ECE2"/></linearGradient>
  <linearGradient id="pocket" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#EEE7DA"/><stop offset="1" stop-color="#E4DACA"/></linearGradient>
</defs>`;
const panel = `<rect x="260" y="90" width="1526" height="1865" rx="18" fill="url(#paper)" stroke="#A6AAA5" stroke-width="6"/>`;
const surfaces = {
  "folder-back-panel": `<rect x="260" y="90" width="1526" height="1865" rx="18" fill="#041E42" stroke="#D6BE93" stroke-width="6"/>
    <path d="M290 118V1925" stroke="#D6BE93" stroke-opacity=".55" stroke-width="4"/>`,
  "folder-panel": `${panel}<path d="M290 118V1925" stroke="#D6BE93" stroke-width="5"/>`,
  "folder-cover": `${panel}
    <rect x="1778" y="803" width="80" height="324" rx="18" fill="#EFE7D8" stroke="#B8A17C" stroke-width="5"/>
    <path d="M322 130V1915" stroke="#D6BE93" stroke-width="5"/>
    <path d="M365 130V1915" stroke="#D6D5D0" stroke-width="3"/>
    <rect x="440" y="330" width="590" height="26" rx="4" fill="#041E42" opacity=".85"/>
    <path d="M440 402H1190M440 445H990" stroke="#A8ACAB" stroke-width="12" stroke-linecap="round"/>
    <path d="M440 510H1585" stroke="#D6BE93" stroke-width="4"/>`,
  "folder-pocket": `<path d="M263 1370L1510 1370L1783 1270V1937Q1783 1952 1768 1952H278Q263 1952 263 1937Z" fill="url(#pocket)" stroke="#B8AE9C" stroke-width="6"/>
    <path d="M282 1386H1514L1764 1294" fill="none" stroke="#D6BE93" stroke-width="5"/>
    <path d="M292 1410V1923H1755V1330" fill="none" stroke="#D5C9B7" stroke-width="3"/>`,
};
for (const [name, body] of Object.entries(surfaces)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048">${defs}${body}</svg>`;
  await writeFile(join(out, `${name}.svg`), svg);
  await sharp(Buffer.from(svg)).png().toFile(join(out, `${name}.png`));
}

// Full-page transparent overlay: same A4 UV space as document-master-v2.svg.
// Path lettering keeps VISA independent of installed fonts and platform metrics.
const visa = `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="1188" viewBox="0 0 840 1188">${defs}
  <rect x="82" y="354" width="676" height="274" rx="12" fill="#041E42" opacity=".07"/>
  <rect x="76" y="344" width="688" height="274" rx="10" fill="url(#paper)" stroke="#D6BE93" stroke-width="3"/>
  <rect x="88" y="356" width="664" height="250" rx="5" fill="none" stroke="#DCD7CC" stroke-width="1.5"/>
  <path d="M110 390L143 474H163L196 390H174L153 449L132 390Z M218 390H240V474H218Z M330 392H278Q262 392 262 410V422Q262 439 280 439H305V454H263V474H313Q330 474 330 456V438Q330 420 312 420H286V410H330Z M349 474L379 390H403L433 474H410L404 456H377L371 474Z M383 437H398L391 414Z" fill="#041E42" fill-rule="evenodd"/>
  <path d="M468 393H714M468 423H675M468 453H697" stroke="#A8ACAB" stroke-width="7" stroke-linecap="round"/>
  <path d="M110 504H730" stroke="#D6BE93" stroke-width="2"/>
  <g stroke="#899090" stroke-width="6" stroke-linecap="round"><path d="M112 530H300M352 530H542M590 530H716M112 557H247M352 557H484M590 557H690"/></g>
  <path d="M111 586H718" stroke="#D6D5D0" stroke-width="3" stroke-dasharray="3 7"/>
</svg>`;
await writeFile(join(out, "visa-overlay.svg"), visa);
for (const height of [2048, 4096]) {
  await sharp(Buffer.from(visa), { density: 384 })
    .resize(Math.round(height * 840 / 1188), height)
    .png().toFile(join(out, `visa-overlay-${height}.png`));
}
console.log("Generated light folder surfaces and A4 VISA overlay in public/images/finale.");
