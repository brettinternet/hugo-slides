# Hugo Slides

[![Build Status](https://travis-ci.org/brettinternet/hugo-slides.svg?branch=master)](https://travis-ci.org/brettinternet/hugo-slides)

A simple directory for your Reveal.js markdown slides. [View demo](https://brettinternet.github.io/hugo-slides/)

### Purpose

The [JAMstack](https://jamstack.org) is the simplest method to host and maintain slides. With GitHub pages, static sites are incredibly easy to maintain, and this is the simplicity I've looked for with hosting Reveal.js presentations. Here I implement an incredible simple browsable directory for the content.

My original intent with the implementation was to avoid creating slides with HTML in favor of markdown and skip Hugo's shortcodes and fragments to avoid marrying the slide content with the static site builder. I wanted the markdown to be fully readable outside of the context of a Reveal.js slide.

### Features

- [x] Directory to navigate all markdown files in `content` directory and view as Reveal.js slides
- [x] A hidden note button in the bottom left for mobile views that are unable to use `s` hotkey
- [x] Customize Reveal.js configuration for overall site and per presentation via content frontmatter
- [x] Theme customization for Reveal.js and Highlight.js
  - Choose from the `assets/highlight-js/` and `static/reveal-js/css/theme/` folders for themes
- [x] Mobile friendly and responsive
- Plugin ideas
  - [ ] Add serverless slide sync via Firebase and presenter authentication
  - [ ] Plugin: Question/comment submission to Firebase
- [ ] Improve responsiveness of the Reveal.js notes plugin view

### Configuration

See [archtypes](archtypes) for markdown and HTML example content files.

### Content

Reveal's `?print-pdf` query option in the URL alters styles to optimize the layout for PDF printouts. Otherwise, styles are included for a printable page layout.

Put images in `/static/images/` used by content posts and reference them with `<img data-src="/<baseURL>/images/image.png"` in order to [lazy-load images](https://github.com/hakimel/reveal.js/#lazy-loading). This is the explicitly chosen method in order to avoid Hugo shortcodes.

#### HTML

Create an HTML content slide from the archtype's boilerplate:

```sh
hugo new my-presentation.html
```

All absolute links are modified to open in a new window and pause the presentation so the slideshow isn't disrupted.

See [`content/demo.html`](content/demo.html) for example usage of the [Reveal.js API](https://github.com/hakimel/reveal.js).

TOML frontmatter appears to be a better candidate for HTML content since VS Code and Prettier prettify the indented items for subfields.

#### Markdown

Create a markdown content slide from the archtype's boilerplate:

```sh
hugo new my-presentation.md
```

Creating slides with markdown is convenient because there is less boilerplate. Additionally, if the web frontend fails, a simple markdown file as a standalone document would still be presentable in preview mode.

However, in order to utilize all the Reveal.js features, use HTML to access the full API.

You may use `.md` or `.markdown` for markdown file extensions.
