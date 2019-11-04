(function() {
  // if authed, set presentation to active
  // if not authed, alert that presentation is active

  window.Reveal.addEventListener("slidechanged", function(event) {
    console.log("SLIDECHANGED event: ", event, event.timeStamp);
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    // if authorized (role-based admin/presenter)
    // submit change to firebase
  });

  Reveal.addEventListener("fragmentshown", function(event) {
    console.log("FRAGMENTSHOWN event: ", event, event.timeStamp);
    // event.fragment = the fragment DOM element
  });
  Reveal.addEventListener("fragmenthidden", function(event) {
    console.log("FRAGMENTHIDDEN event: ", event, event.timeStamp);
    // event.fragment = the fragment DOM element
  });

  // firebase changes submit changes to Reveal
  // As long as this device didn't emit those changes, else recursion

  // Reveal.slide(indexh, indexv);
  // Reveal.prevFragment();
  // Reveal.nextFragment();

  // window.addEventListener('unload', function(event) {
  // deactivate presentation
  // })
})();
