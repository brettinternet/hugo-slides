// (function() {
//   contentSetup();

//   /**
//    * A hack so that values arent escaped in code blocks (`&` -/-> `&amp;`)
//    * for usage with markdown's .RawContent
//    */
//   function contentSetup() {
//     var dataContentEl = document.getElementById("markdown-content-string");
//     console.log("dataContentEl: ", dataContentEl);
//     if (dataContentEl && dataContentEl.dataset.content) {
//       var revealScriptEl = document.getElementById("reveal-markdown");
//       revealScriptEl.innerHTML = dataContentEl.dataset.content;
//       dataContentEl.remove();
//     }
//   }
// })();
