import camelCase from "lodash/camelCase";
import Reveal from "reveal.js";
import getNotesPlugin from "./plugin/notes/notes.js";

const { config, notesHtml } = window.hugoPayload.reveal;
const { siteParams, pageParams } = config;

contentSetup();

/**
 * Pugins require global Reveal pollution 🙄
 * Would be nice to rewrite plugins with reference
 * to `this.Reveal` rather than `Reveal`
 */
window.Reveal = Reveal;

const dependencies = [
  {
    src: require("reveal.js/plugin/markdown/marked.js"),
    condition: function() {
      return !!document.querySelector("[data-markdown]");
    }
  },
  {
    src: require("reveal.js/plugin/markdown/markdown.js"),
    condition: function() {
      return !!document.querySelector("[data-markdown]");
    }
  },
  {
    src: require("./plugin/highlight/highlight.js"),
    async: true
  },
  { src: require("reveal.js/plugin/zoom-js/zoom.js"), async: true },
  { src: require("reveal.js/plugin/math/math.js"), async: true },
  { src: getNotesPlugin(notesHtml), async: true }
];

const isMarkdown = document.getElementById("reveal-markdown");
const options = Object.assign(
  {},
  camelCaseKeys(siteParams),
  camelCaseKeys(pageParams),
  dependencies
);

Reveal.initialize(options);

const revealRootDiv = document.getElementById("reveal");

/**
 * our markdown hack to move reset to end of call stack
 * and slowly appear while slides reset
 *
 * It's also nice to animate appears for HTML
 */
if (isMarkdown) {
  revealRootDiv.style.opacity = "0";
  function handleMarkdownReady(_event) {
    setTimeout(function() {
      Reveal.slide(0, 0, 0, 0);
    }, 0);
    setTimeout(function() {
      revealRootDiv.style.transition = "opacity 500ms";
      revealRootDiv.style.opacity = "1";
    }, 500);
  }

  Reveal.addEventListener("ready", handleMarkdownReady);
} else {
  revealRootDiv.style.opacity = "0";
  function handleHtmlReady(_event) {
    revealRootDiv.style.transition = "opacity 250ms";
    revealRootDiv.style.opacity = "1";
  }

  Reveal.addEventListener("ready", handleHtmlReady);
}

/**
 * A hack so that values arent escaped in code blocks (`&` -/-> `&amp;`)
 * for usage with markdown's .RawContent
 */
function contentSetup() {
  var dataContentEl = document.getElementById("markdown-content-string");
  if (dataContentEl && dataContentEl.dataset.content) {
    var revealScriptEl = document.getElementById("reveal-markdown");
    revealScriptEl.innerHTML = dataContentEl.dataset.content;
    dataContentEl.remove();
  }
}

function camelCaseKeys(obj) {
  const newObj = {};
  for (let key in obj) {
    newObj[camelCase(key)] = obj[key];
  }
  return newObj;
}

/**
 * @TODO
 * @source https://github.com/hakimel/reveal.js#pdf-export
 */
// const link = document.createElement("link");
// link.rel = "stylesheet";
// link.type = "text/css";
// link.href =
//   hugoPayload.baseUrl +
//   (window.location.search.match(/print-pdf/gi)
//     ? "reveal-js/css/print/pdf.css"
//     : "reveal-js/css/print/paper.css");
// document.getElementsByTagName("head")[0].appendChild(link);
