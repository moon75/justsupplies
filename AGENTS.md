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
- Conserve the user's usage by avoiding unnecessary tool calls, analysis, and repeated checks.
- This project is web-only and focuses on recreating the reference website design.
- Build only the requested website UI, styling, and interactions.
- Do not create, generate, edit, or research images or other assets.
- The client will provide final images, logos, fonts, product data, and other assets.
- Use lightweight local placeholders when an asset is missing.
- Do not perform visual browser checks unless the user explicitly requests them.
- The user will handle visual review and report any corrections.

## Token-saving rules

- Never read whole large files; grep first, then read only the needed line range.
- Do not re-read a file you just edited or already read this session.
- Do not explore the repo structure unless asked; ask for the file path if unsure.
- Do not spawn subagents/Agent tool unless explicitly asked.
- Do not run build, lint, or typecheck unless asked; the user tests in the browser.
- Do not start or restart the dev server; the user keeps it running.
- Read node_modules Next.js docs only when using an unfamiliar Next.js API.
- Batch independent edits/tool calls into one step.
- Summarize changes in 1–3 lines max. Do not echo code back in replies.
- No plans, options, or explanations unless asked; just make the change.
- If a request is ambiguous, ask one short question instead of guessing and redoing work.
- Do not commit, push, or run git commands unless asked.
- Do not fetch or browse the reference website again; use existing notes/components.
- Do not refactor, rename, or clean up code outside the requested change.
- Build pages from reusable block components. Before creating a section, check `src/components` for an existing one that matches (product grid, FAQ, hero, banner, reviews, newsletter, etc.) and reuse it with props instead of rebuilding.
- Use one dynamic template per page type (product, collection, blog, policy) rather than separate pages.
