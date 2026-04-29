# Website project workflow

This document is the simple operating rhythm for building the portfolio website
and store across mobile, laptop, and main PC without needing to keep every Git
detail in your head.

## The short version

Use GitHub as the shared source of truth.

1. Make changes in a branch.
2. Commit those changes with a short note.
3. Push the branch to GitHub.
4. Open or update a pull request.
5. Merge when the work is ready for the live/main version.
6. Pull the latest changes before working from another computer.

The main branch should stay as the clean, stable version of the project.

## What each Git word means

- **Repository**: the project folder stored in GitHub.
- **Branch**: a safe workspace for a specific set of changes.
- **Commit**: a saved checkpoint with a message.
- **Push**: send your saved checkpoints to GitHub.
- **Pull**: bring the latest GitHub version down to your computer.
- **Pull request**: a review/merge page for a branch before it becomes part of
  the main project.

## Recommended branches

Use small branches with clear names:

- `cursor/site-scaffold-2961`
- `cursor/content-draft-2961`
- `cursor/shop-products-2961`
- `cursor/visual-direction-2961`

Keep `main` as the stable branch. Make feature branches from `main`.

## Mobile workflow

Use mobile for direction, notes, prioritising, and asking an agent to make
structured changes.

Good mobile tasks:

- "Create a first site scaffold."
- "Add a workflow guide for laptop and PC work."
- "Turn these rough notes into product page placeholders."
- "Draft the first homepage copy."
- "Open a PR for the current branch."

Mobile is not ideal for detailed visual polishing, image management, or long
copy editing.

## Laptop weekend workflow

Use the laptop for content gathering and structure.

Start of session:

```bash
git checkout main
git pull origin main
```

Create a focused branch:

```bash
git checkout -b cursor/content-draft-2961
```

Work on content, then save it:

```bash
git status
git add .
git commit -m "Draft initial website content"
git push -u origin cursor/content-draft-2961
```

Then open a pull request on GitHub, or ask the agent to open/update it.

## Main PC workflow

Use the main PC for heavier development, styling, product setup, image editing,
and testing.

Start every session by syncing:

```bash
git checkout main
git pull origin main
```

Then either create a new branch:

```bash
git checkout -b cursor/visual-direction-2961
```

Or continue an existing branch:

```bash
git fetch origin cursor/content-draft-2961
git checkout cursor/content-draft-2961
git pull origin cursor/content-draft-2961
```

Save work regularly:

```bash
git status
git add .
git commit -m "Describe the change clearly"
git push -u origin cursor/visual-direction-2961
```

## A good commit habit

Commit when a meaningful checkpoint is complete:

- Added a page
- Updated copy
- Added products
- Changed layout
- Fixed a bug
- Improved documentation

Avoid giant commits that mix many unrelated ideas.

Good commit messages:

- `Add initial homepage structure`
- `Draft portfolio project content`
- `Add product placeholders`
- `Document development workflow`

## How pull requests fit in

A pull request is not only for teams. It gives you:

- a clear page showing what changed
- a place for notes and decisions
- a safe review step before changing `main`
- a visible history of how the website evolved

For this project, pull requests can be lightweight. Open them early as drafts,
then merge when the branch feels ready.

## Simple rule for multiple computers

Before starting work:

```bash
git pull origin main
```

After finishing work:

```bash
git add .
git commit -m "Your message"
git push -u origin your-branch-name
```

If you are not sure what state the project is in:

```bash
git status
```

`git status` is the safest command to run. It tells you what changed and what
branch you are on.

## What the agent can handle

You can ask the agent to:

- create branches
- scaffold the site
- commit changes
- push branches
- open or update pull requests
- explain what changed
- turn rough notes into structured content
- add pages and components
- help resolve confusing Git states

Useful prompts:

- "Check the repo status and tell me what branch I am on."
- "Commit and push the current work with a clear message."
- "Create a branch for the shop scaffold."
- "Open a draft PR for this branch."
- "Pull the latest main branch and start a new content branch."
- "Explain what changed in this pull request in plain English."

## First build direction

The first useful version should include:

- homepage
- about page
- work/portfolio page
- shop page
- journal or updates page
- contact page
- basic content structure for projects, products, and posts

The early goal is not perfection. The goal is a working foundation that can be
edited, promoted, and improved.
