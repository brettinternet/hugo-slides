# Hugo Slides

[![Build Status](https://travis-ci.org/brettinternet/hugo-slides.svg?branch=master)](https://travis-ci.org/brettinternet/hugo-slides)

A simple directory for your Reveal.js markdown slides. [View demo](https://brettinternet.github.io/hugo-slides/)

### Purpose

The [JAMstack](https://jamstack.org) is the simplest method to host and maintain slides. With GitHub pages, static sites are incredibly easy to maintain, and this is the simplicity I've looked for with hosting Reveal.js presentations.

My intent here has been to avoid Hugo's shortcodes and fragments except for HTML. Markdown and HTML are parsed in GitHub-flavored markdown previews. Besides the content's frontmatter, I'd like for the markdown to be fully readable outside of the context of a Reveal.js slide. Should the web frontend fail, a simple markdown file as a standalone document is presentable.

### Features

- [x] Directory to navigate all markdown files in `content` directory and view as Reveal.js slides
- [x] A hidden note button in the bottom left for mobile views that are unable to use `s` hotkey
- [x] Customize Reveal.js configuration for overall site and per presentation via content frontmatter
- [x] Theme customization for Reveal.js and Highlight.js
  - Choose from the `assets/highlight-js/` and `static/reveal-js/css/theme/` folders for themes
- [x] Mobile friendly and responsive
- [ ] Plugin: Add serverless slide sync via Firebase and presenter authentication
- [ ] Plugin: Question/comment submission to Firebase
- [ ] Improve responsiveness of the Reveal.js notes plugin view

### Bugs

- [ ] Improve markdown loading to Reveal.js
  - [ ] [Auto-sliding](https://github.com/hakimel/reveal.js/#auto-sliding) is unpredictable because of the way markdown content is loaded into Reveal.js
  - [ ] Fix subtle vertical slide animations when traversing slides horizontally
