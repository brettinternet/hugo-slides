(function() {
  var isMarkdown = document.getElementById("reveal-markdown");

  var options = Object.assign(
    {},
    camelize(payload.revealHugoSiteParams),
    camelize(payload.revealHugoPageParams)
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

  /**
   * Hugo makes params lowercase, so we must store in snake and convert
   */
  function camelize(map) {
    if (map) {
      Object.keys(map).forEach(function(k) {
        newK = k.replace(/(\_\w)/g, function(m) {
          return m[1].toUpperCase();
        });
        if (newK != k) {
          map[newK] = map[k];
          delete map[k];
        }
      });
    }
    return map;
  }
})();
