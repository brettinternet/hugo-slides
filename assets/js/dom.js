(function() {
  /**
   * If link is not relative, open it in a new tab and pause the presentation
   */
  Reveal.addEventListener("ready", function(_event) {
    Array.prototype.slice.call(document.links).forEach(function(link) {
      if (link.href && link.href.indexOf(payload.baseUrl) === -1) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.onclick = function() {
          Reveal.togglePause();
        };
      }
    });
  });

  /**
   * handle corner actions
   * @source https://github.com/hakimel/reveal.js/issues/806#issuecomment-222417787
   */
  var header = document.getElementById("header");
  document.getElementById("reveal").appendChild(header);

  document.getElementById("open-notes").onclick = function() {
    Reveal.getPlugin("notes").open();
  };
})();
