import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const sharp=createRequire(new URL('../tools-candidates/package.json',import.meta.url))('sharp');
const paths={V:'M0 0L18 60H32L50 0H38L25 45L12 0Z',I:'M0 0H14V60H0Z',S:'M44 0H10Q0 0 0 12V25Q0 34 12 34H30V48H0V60H34Q44 60 44 48V34Q44 22 32 22H14V12H44Z',A:'M0 60L20 0H36L56 60H42L37 44H18L13 60ZM22 32H33L28 15Z'};
const word=[..."VISA"].map((c,i)=>`<path transform="translate(${190+i*170} 80) scale(2.5)" d="${paths[c]}" fill-rule="evenodd"/>`).join('');
const mark=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="394" viewBox="0 0 1024 394"><g fill="#041e42" stroke="#041e42"><rect x="15" y="15" width="994" height="364" rx="18" fill="none" stroke-width="18"/><rect x="40" y="40" width="944" height="314" rx="8" fill="none" stroke-width="5"/><g stroke="none">${word}</g><path d="M190 290H830" stroke-width="9"/></g></svg>`;
const body=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="394" viewBox="0 0 1024 394"><rect x="8" y="8" width="1008" height="378" rx="35" fill="#041e42" stroke="#d6be93" stroke-width="16"/><rect x="35" y="35" width="954" height="324" rx="20" fill="#0d2a4c" stroke="#d6be93" stroke-width="3"/><rect x="190" y="150" width="644" height="94" rx="40" fill="#d6be93"/><ellipse cx="512" cy="197" rx="135" ry="120" fill="#041e42" stroke="#d6be93" stroke-width="12"/></svg>`;
for(const [name,svg] of [['visa-mark',mark],['visa-body',body]]){
 await writeFile(new URL(`../public/images/${name}.svg`,import.meta.url),svg);
 await sharp(Buffer.from(svg)).png().toFile(new URL(`../public/images/${name}.png`,import.meta.url).pathname);
}
