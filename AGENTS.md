<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Build & Verification Rules (Resource Management)

- **NEVER run full production builds** (`npm run build`, `next build`, `yarn build`, `pnpm build`) during iterative coding or after making file changes.
- **NEVER start or restart a dev server** (`npm run dev`, `next dev`) unless explicitly asked by the user.
- **Lightweight verification only:** To verify code changes, run targeted type-checking (`npx tsc --noEmit`) or lint only the modified files (`npx eslint <modified-files>`).
- **Batch your checks:** Do not run verification commands after every single file edit; complete the full set of changes first and run a single check at the very end.
