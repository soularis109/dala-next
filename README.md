# dala-next

Preview: https://soularis109.github.io/dala-next/

The home page uses the original Dala reference from `5a6b95e`, restyled with the FMB theme. The document prototype modules remain available but are inactive.

Animation inventory and implementation pointers: [docs/animation-scenario.md](docs/animation-scenario.md).

PPNeueMontreal and team/investor images were missing from the original repository. The FMB theme uses Montserrat and Playfair Display; the original Inter fallback remains bundled. Missing portraits still require the original files. Analytics and Intercom are disabled.

Pushes to `main` publish through the existing GitHub Actions workflow. No publishing is required to inspect this local reference. Follow AGENTS.md for lightweight checks; do not start a server or run a production build without the required authorization.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## FMB — темна тема, кольори та шрифти

Тема підключена через `public/css/fmb-theme.css` після базових стилів. Семантичні змінні й утиліти FMB доступні для нових компонентів.

| Колір | HEX | Призначення |
| --- | --- | --- |
| Deep Navy | `#041e42` | Основний темний фон, поверхні та текст кнопок |
| Classic Champagne | `#d6be93` | Акценти, рамки, розділювачі та hover-стани |
| Warm Ivory | `#f6f2e9` | Основний текст, заголовки, світлі відблиски й hover кнопок |
| Black | `#000000` | Допоміжний колір для світлих поверхонь |
| White | `#ffffff` | Сильні текстові виділення та логотип на Navy |

Тема за замовчуванням темна: Navy — фон, Ivory — текст, Champagne — акценти. Кнопки Champagne мають текст Navy, а при hover стають Ivory. На світлих допоміжних поверхнях використовується Navy або чорний текст. Шкала анімацій починається з темного: **Navy → Champagne → Ivory**.

Заголовки — **Playfair Display** (400–700, типово 500), основний текст і підзаголовки — **Montserrat Light 300**, звичайний текст — 400, смислові виділення та кнопки — **Montserrat Bold 700**. Шрифти завантажуються через Google Fonts із `display=swap`; резервні — Georgia / Times New Roman для заголовків та системні sans-serif для тексту.

Усі активні WebGL-анімації отримують спільну гамму у фінальному shader-проході після bloom і depth blur: тіні Navy, середні тони Champagne, відблиски Ivory. Кольори передаються зі змінних CSS у uniforms. Це охоплює морфінг фігур, розліт і повернення, реакцію на курсор, передні частинки, зерно та 3D-фігури інвесторів. Віньєтка затемнює плавно, без обрізання тьмяних частинок. Геометрія та сценарії анімацій збережені.

Фон задається на `html`; прозорий `body` з `isolation: isolate` утримує canvas позаду контенту, не закриваючи його. Завантажувач, маски переходів, меню та CSS hover-ефекти також використовують темну палітру FMB.

Субтитри Reels (System · CapCut) задаються у CapCut, не в коді сайту.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
