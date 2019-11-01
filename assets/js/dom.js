(function() {
  contentSetup();

  /**
   * A hack so that values arent escaped in code blocks (`&` -/-> `&amp;`)
   */
  function contentSetup() {
    var dataContentEl = document.getElementById("content");
    var revealScriptEl = document.getElementById("reveal-content");
    revealScriptEl.innerHTML = dataContentEl.dataset.content;
    dataContentEl.remove();
  }

  // var images = document.getElementsByTagName("img");
  // console.log("document.images: ", document.images, images);
  // Array.prototype.slice.call(document.images).forEach(function(image) {
  //   console.log("image: ", image);
  //   var src = image.src.split("/static/")[1];
  //   if (src) {
  //     image.removeAttribute("src");
  //     image.dataset.src = payload.baseUrl + src;
  //   }
  // });

  // var frames = document.getElementsByTagName("iframe");
})();
