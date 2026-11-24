<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project working rules

- Minimize token usage.
- Reuse existing design references.
- Never repeat website analysis.
- Read only relevant files.
- Do not use Playwright unless requested.
- Do not run automated screenshot comparisons.
- Edit only requested components.
- Preserve completed designs.
- Keep responses concise.
- The user will test visually in their browser.
- Do not generate images or use the Imagegen skill.
- Use local placeholder images until product images are provided.
- Focus only on layout, styling, and functionality.
- Product images will be replaced later.
