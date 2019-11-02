# Hugo Slides

[![Build Status](https://travis-ci.org/brettinternet/hugo-slides.svg?branch=master)](https://travis-ci.org/brettinternet/hugo-slides)

A simple directory for your Reveal.js markdown slides. [View demo](https://brettinternet.github.io/hugo-slides/)

### Purpose

The [JAMstack](https://jamstack.org) is the simplest method to host and maintain slides. With GitHub pages, static sites are incredibly easy to maintain, and this is the simplicity I've looked for with hosting Reveal.js presentations. Here I implement an incredible simple browsable directory for the content.

My original intent with the implementation was to avoid creating slides with HTML in favor of markdown and skip Hugo's shortcodes and fragments to avoid marrying the slide content with the static site builder. I wanted the markdown to be fully readable outside of the context of a Reveal.js slide. Then, should the web frontend fail, a simple markdown file as a standalone document would be presentable. However, in order to utilize all the Reveal.js features, I've found that just using the HTML API is the easiest way to create slides.

### Features

- [x] Directory to navigate all markdown files in `content` directory and view as Reveal.js slides
- [x] A hidden note button in the bottom left for mobile views that are unable to use `s` hotkey
- [x] Customize Reveal.js configuration for overall site and per presentation via content frontmatter
- [x] Theme customization for Reveal.js and Highlight.js
  - Choose from the `assets/highlight-js/` and `static/reveal-js/css/theme/` folders for themes
- [x] Mobile friendly and responsive
- [x] Add `?print-pdf` for styles optimal for PDF printouts
- Content manipulation
  - [x] Put images in `/static/images/` used by content posts and reference them with `<img data-src="/<baseURL>/images/image.png"` in order to [lazy-load images](https://github.com/hakimel/reveal.js/#lazy-loading). This is the explicitly chosen method in order to avoid shortcodes.
  - [x] All links open in a new window and pause the presentation so the slideshow isn't disrupted
- Plugin ideas
  - [ ] Add serverless slide sync via Firebase and presenter authentication
  - [ ] Plugin: Question/comment submission to Firebase
- [ ] Improve responsiveness of the Reveal.js notes plugin view

### Bugs

- [x] Improve markdown loading to Reveal.js
  - **Using `.html` content files with frontmatter, HTML based on the Reveal.js API is the best method to harness all features of the Reveal library**
  - TOML appears to be a better candidate for html content since VS Code seems to prettify the indented items for subfields
