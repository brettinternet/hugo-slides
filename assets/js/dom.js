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
   * Get theme styles
   */
  var revealRootDiv = window.Reveal.getRevealElement();
  var revealRootStyles = window.getComputedStyle(revealRootDiv);
  var themeColor = revealRootStyles.getPropertyValue("color");

  var bodyStyles = window.getComputedStyle(document.body);
  var themeBackgroundColor = bodyStyles.getPropertyValue("background-color");

  /**
   * Set styles
   */
  var headerRoot = document.getElementById("header");
  headerRoot.style.color = themeColor;

  var firebaseUiRoot = document.getElementById("firebase-ui");
  firebaseUiRoot.style.backgroundColor = themeBackgroundColor;

  /**
   * Set actions
   *
   * Top right
   */
  var firebaseUiRoot = document.getElementById("firebase-ui");

  var openSignInButton = document.getElementById("sign-in");
  openSignInButton.onclick = function() {
    firebaseUiRoot.style.display = "";
    firebaseUiRoot.setAttribute("aria-hidden", false);
  };

  var closeSignInButton = document.getElementById("firebase-ui-close");
  closeSignInButton.onclick = function() {
    firebaseUiRoot.style.display = "none";
    firebaseUiRoot.setAttribute("aria-hidden", true);
  };

  /**
   * Bottom left
   */
  var notesButton = document.getElementById("open-notes");
  notesButton.onclick = function() {
    Reveal.getPlugin("notes").open();
  };
})();
