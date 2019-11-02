(function() {
  var options = Object.assign(
    {},
    camelize(payload.revealHugoSiteParams),
    camelize(payload.revealHugoPageParams)
  );

  Reveal.initialize(options);

  /**
   * Animate appearance, also so slide reset doesn't show
   * with our markdown hack
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
