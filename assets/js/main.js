(function() {
  contentSetup();

  var options = Object.assign(
    {},
    camelize(revealHugoSiteParams),
    camelize(revealHugoPageParams)
  );

  Reveal.initialize(options);

  /**
   * Animate appearance, also so slide reset doesn't show
   */
  const reveal = document.getElementById("reveal");
  reveal.style.opacity = "0";
  Reveal.addEventListener("ready", function(_event) {
    setTimeout(function() {
      Reveal.slide(0, 0, 0, 0);
    }, 0);
    setTimeout(function() {
      reveal.style.transition = "opacity 500ms";
      reveal.style.opacity = "1";
    }, 500);
  });

  /**
   * handle corner elements
   * @source https://github.com/hakimel/reveal.js/issues/806#issuecomment-222417787
   */
  var header = document.getElementById("header");
  document.getElementById("reveal").appendChild(header);

  document.getElementById("open-notes").addEventListener("click", function() {
    Reveal.getPlugin("notes").open();
  });

  /**
   * A hack so that values arent escaped in code blocks (`&` -/-> `&amp;`)
   */
  function contentSetup() {
    var dataContentEl = document.getElementById("content");
    var revealScriptEl = document.getElementById("reveal-content");
    revealScriptEl.innerHTML = dataContentEl.dataset.content;
    dataContentEl.remove();
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
