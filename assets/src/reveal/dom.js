const { Reveal, hugoPayload } = window;
const { baseUrl } = hugoPayload;

setThemeStyles();

/**
 * If link is not relative, open it in a new tab and pause the presentation
 */
Reveal.addEventListener("ready", function(_event) {
  Array.prototype.slice.call(document.links).forEach(function(link) {
    if (link.href && link.href.indexOf(baseUrl) === -1) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.onclick = function() {
        Reveal.togglePause();
      };
    }
  });
});

const notesButton = document.getElementById("open-notes");
notesButton.style.display = "";
notesButton.onclick = function() {
  Reveal.getPlugin("notes").open();
};

function setThemeStyles() {
  if (Reveal) {
    /**
     * Get theme styles
     */
    const revealRootDiv = Reveal.getRevealElement();
    const revealRootStyles = window.getComputedStyle(revealRootDiv);
    const themeColor = revealRootStyles.getPropertyValue("color");

    const bodyStyles = window.getComputedStyle(document.body);
    const themeBackgroundColor = bodyStyles.getPropertyValue(
      "background-color"
    );

    /**
     * Set styles
     */
    const headerRoot = document.getElementById("header");
    headerRoot.style.color = themeColor;

    const dropdowns = document.getElementsByClassName("dropdown");
    Array.prototype.slice.call(dropdowns).forEach(function(element) {
      element.style.backgroundColor = themeBackgroundColor;
      element.style.color = themeColor;
    });
  }
}
