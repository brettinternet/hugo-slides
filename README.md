_This project is archived. See [brettinternet/slides](https://github.com/brettinternet/slides) for the next phase of this work._

# Hugo Slides

A simple directory for your Reveal.js markdown slides. [View demo](https://brettinternet.github.io/hugo-slides/)

### Purpose

The [JAMstack](https://jamstack.org) is the simplest method to host and maintain slides. With GitHub pages, static sites are incredibly easy to maintain, and this is the simplicity I've looked for with hosting Reveal.js presentations. Here I implement a _very_ simple and browsable directory for the content. All the assets are managed by the theme so you can focus on HTML or markdown content. Firebase can be used to sync slides with viewers.

### Features

- [x] Directory to navigate all markdown files in `content` directory and view as Reveal.js slides
- [x] Customize Reveal.js configuration for overall site and per presentation via content frontmatter
- [x] Theme customization for Reveal.js and Highlight.js
  - Choose from the `assets/highlight-js/` and `static/reveal-js/css/theme/` folders for themes
- [x] Mobile friendly and responsive
- Plugin ideas
  - [x] Add serverless slide sync via Firebase and presenter authentication
    - Logging into multiple clients is permitted. For example, you could use a phone as a remote or to read presenter notes as slides come up.
    - [ ] Sync additional actions like pausing (will require Reveal library modification), zoom.js actions
  - [ ] Plugin: Question/comment submission to Firebase
- [x] Improve features of the Reveal.js notes plugin view
  - Improved responsiveness
  - Buttons to modify font size for note text
  - Time div should be a fixed header while notes body scrolls
  - [ ] Add notes-only view touch swiping for slide changes on mobile (or next slide button for spacebar-equivalent action)
- [ ] Make slide types configurable
  - [ ] Add [code-surfer](https://github.com/pomber/code-surfer) slide type

## Usage

## Install

```sh
hugo new site slides

cd slides

git init

git submodule add https://github.com/brettinternet/hugo-slides.git theme/hugo-slides
```

For minimal setups, you can remove the site's `archtypes`, `layouts`, and `static` directories to rely on the theme's usage of these modules.

For additional configuration files such as `.travis.yml` and `config.toml`, see the [exampleSite directory](exampleSite/) or [my slides repo](https://github.com/brettinternet/slides).

## Setup

### Configuration

Reveal and Hightlightjs parameters can be set in `config.yml` and in content frontmatter.

For example, in the [`exampleSite/config.yml`](exampleSite/config.yml) we have:

```yml
params:
  repo: "https://github.com/brettinternet/hugo-slides"
  author:
    name: "@brettinternet"
    homepage: "https://brettinternet.com"

  highlightjs:
    theme: "solarized-dark"
  revealjs:
    hash: true
    theme: "solarized"

  # Firebase config provided by console when you create a project/app
  firebase:
    api_key: "..."
    auth_domain: "my-slides.firebaseapp.com"
    database_url: "https://my-slides.firebaseio.com"
    project_id: "my-slides"
    sotrage_bucket: "my-slides.appspot.com"
    messaging_sender_id: "123"
    app_id: "..."

  # Login with GitHub into the app, then go to Firebase console > Develop > Authentication > Users and retrive your `User UID`
  presenter_uids: ["123abc"]
```

See [archtypes](archtypes) for markdown and HTML example content configurations.

To test Firebase slide synchronization, sign in with your GitHub account on [the demo site](https://brettinternet.github.io/hugo-slides/). Open a different browser or incognito window to view a viewer's sync ability with the presenter. Simply toggle the lightning bolt button icon. In the demo, any user can be a presenter, however in your app you may specify IDs as `presenter_uids` to distinguish presenters.

### Content

Reveal's `?print-pdf` query option in the URL alters styles to optimize the layout for PDF printouts. Otherwise, styles are included for a printable page layout.

Put images in `/static/images/` used by content posts and reference them with `<img data-src="/<baseURL>/images/image.png"` in order to [lazy-load images](https://github.com/hakimel/reveal.js/#lazy-loading). This is the explicitly chosen method in order to avoid Hugo shortcodes.

#### HTML

Create an HTML content slide from the archtype's boilerplate:

```sh
hugo new my-presentation.html
```

All absolute links are modified to open in a new window and pause the presentation so the slideshow isn't disrupted.

See [`exampleSite/content/demo.html`](content/demo.html) for example usage of the [Reveal.js API](https://github.com/hakimel/reveal.js).

TOML frontmatter appears to be a better candidate for HTML content since VS Code and Prettier prettify the indented items for subfields.

#### Markdown

Create a markdown content slide from the archtype's boilerplate:

```sh
hugo new my-presentation.md
```

Creating slides with markdown is convenient because there is less boilerplate. Additionally, if the web frontend fails, a simple markdown file as a standalone document would still be presentable in preview mode.

However, in order to utilize all the Reveal.js features, use HTML to access the full API.

You may use `.md` or `.markdown` for markdown file extensions.

## Develop

The way Hugo handles JS is painful, so we use parcel to bundle our JavaScript theme files as well as third party dependencies. Unfortunately, because we're bundling outside of Hugo, HMR is doesn't work directly through Hugo so refreshes are needed for JS changes to take effect.

#### Setup

Install JavaScript dependencies:

```sh
npm install
```

`postinstall` will run `bin/postinstall.js` which prepares some of the CSS theme files for highlight.js and reveal.js.

#### Server

```sh
npm start
```

A `prestart` script runs `bin/prestart.js` which cleans up previous Parcel bundle artifacts and prepopulates the `assets/bundle` directory so the concurrent race condition doesn't allow Hugo to miss these JS and CSS dependencies on the initial load.

#### Build

```sh
npm build
```
