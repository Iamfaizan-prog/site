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


