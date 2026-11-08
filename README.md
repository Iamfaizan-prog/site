# Faizan — portfolio site

A static, multi-page portfolio for Python data pipelines, workflow automation and FastAPI backends. No build step, no framework. Open `index.html` in a browser or drop the folder on any static host.

The original single-page file (`gemini-code-1794161976557.html`) is kept untouched for reference.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, sample pipeline run, what I build, selected work, toolbelt, contact |
| `work.html` | Work index: both case studies, plus what ships with every build |
| `datapilot-lite.html` | Case study: Excel cleaning pipeline |
| `leadflow-lite.html` | Case study: n8n lead intake workflow |
| `skills.html` | Skills matrix, how a build runs |
| `about.html` | About, principles, engagements, FAQ |
| `contact.html` | Email, what to include in a brief, copy-email button |
| `404.html` | Not found page |

## Files

```
assets/
  site.css    design tokens and every component
  site.js     theme toggle, mobile menu, quick jump, copy email
  favicon.svg
```

## Editing

**Colour, type, radius, motion.** The tokens are at the top of `assets/site.css` under `:root`, `[data-theme="dark"]` and `[data-theme="light"]`. Change `--accent` and the two ramps and the whole site follows.

**Add a project.** Three steps:

1. Copy `datapilot-lite.html` to `your-project.html` and replace the title, summary, meta, flow, run panel, table, limits and links.
2. Add an entry to `work.html` and a smaller one to `index.html` (copy a `.case` block).
3. Add the page to the footer "Case studies" list and to the quick-jump dialog in **every** page. The dialog is repeated in each file because there is no build step; search for `id="jump-list"`.

**Update skills.** Each group in `skills.html` is a `.matrix-block` with a table of tool, use and where it shipped. Add rows, not cards.

**Change contact details.** Search the folder for `faizanlinuxx` and replace the email, GitHub and LinkedIn URLs.

**Theme.** Dark is the default when the system has no preference. The toggle stores the choice in `localStorage`; the small inline script in each `<head>` applies it before paint so there is no flash.

**Quick jump.** `Ctrl K` / `Cmd K` opens the page search. It is an enhancement: the normal navigation works without JavaScript.

## Before publishing

- The run numbers (1,284 rows, 1.56s, 5 leads, 1.84s) are sample data. They are labelled as samples on the case pages. Replace them with real runs when you have them, or leave the labels in place.
- The service descriptions, process steps and FAQ answers are drafts written from the existing stack. Read them once and adjust anything that does not match how you actually work.
- The case studies describe DataPilot-lite and LeadFlow-lite from the original site. Confirm the implementation details (review rows, retries, draft replies) before publishing, since they go beyond the original one-line descriptions.

## Deploy

Any static host works:

- **GitHub Pages:** push the folder, enable Pages on the branch root.
- **Netlify / Vercel:** drag the folder in, no build command, publish directory `/`.
- **Your own server:** copy the files; no runtime needed.

## Credit

Redesign process: [unslop](https://x.com/heydamir) by Damir Sokolovsky, licensed CC BY 4.0.
