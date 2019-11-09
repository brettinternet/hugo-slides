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

  setThemeStyles();

  if (!inIframe()) {
    showHeaderCorners();
  }

  /**
   * Bottom left
   */
  var notesButton = document.getElementById("open-notes");
  notesButton.onclick = function() {
    Reveal.getPlugin("notes").open();
  };

  function showHeaderCorners() {
    var header = document.getElementById("header");
    header.style.display = "";
  }

  var userMenuButton = document.getElementById("user-menu");
  userMenuButton.onclick = showUserMenu;
  function showUserMenu(event) {
    stopPropagation(event);
    var userDropdown = document.getElementById("user-dropdown");
    userDropdown.onClick = stopPropagation;
    userDropdown.style.display = "";
    userDropdown.setAttribute("aria-hidden", "false");
    document.addEventListener("click", handleDocumentClick);
    userMenuButton.classList.add("opaque");
    userMenuButton.onclick = hideUserMenu;
  }

  function hideUserMenu() {
    var userDropdown = document.getElementById("user-dropdown");
    userDropdown.style.display = "none";
    userDropdown.setAttribute("aria-hidden", "true");
    document.removeEventListener("click", handleDocumentClick);
    userMenuButton.classList.remove("opaque");
    userMenuButton.onclick = showUserMenu;
  }

  function setThemeStyles() {
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

    var dropdowns = document.getElementsByClassName("dropdown");
    Array.prototype.slice.call(dropdowns).forEach(function(element) {
      element.style.backgroundColor = themeBackgroundColor;
      element.style.color = themeColor;
    });
  }

  function handleDocumentClick() {
    hideUserMenu();
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }
})();
