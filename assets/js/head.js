(function() {
  /**
   * @source https://github.com/hakimel/reveal.js#pdf-export
   */
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    payload.baseUrl +
    (window.location.search.match(/print-pdf/gi)
      ? "reveal-js/css/print/pdf.css"
      : "reveal-js/css/print/paper.css");
  document.getElementsByTagName("head")[0].appendChild(link);
})();