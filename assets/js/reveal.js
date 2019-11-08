(function() {
  var isMarkdown = document.getElementById("reveal-markdown");

  var options = Object.assign(
    {},
    camelize(payload.revealSiteParams),
    camelize(payload.revealPageParams)
  );

  Reveal.initialize(options);

  /**
   * our markdown hack to move reset to end of call stack
   * and slowly appear while slides reset
   *
   * It's also nice to animate appears for HTML
   */
  const reveal = document.getElementById("reveal");
  if (isMarkdown) {
    reveal.style.opacity = "0";
    function handleMarkdownReady(_event) {
      setTimeout(function() {
        Reveal.slide(0, 0, 0, 0);
      }, 0);
      setTimeout(function() {
        reveal.style.transition = "opacity 500ms";
        reveal.style.opacity = "1";
      }, 500);
    }

    Reveal.addEventListener("ready", handleMarkdownReady);
  } else {
    reveal.style.opacity = "0";
    function handleHtmlReady(_event) {
      reveal.style.transition = "opacity 250ms";
      reveal.style.opacity = "1";
    }

    Reveal.addEventListener("ready", handleHtmlReady);
  }
})();
