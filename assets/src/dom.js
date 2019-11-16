import { inIframe } from "./utils";
const { Reveal, hugoPayload } = window;
const { baseUrl } = hugoPayload;

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

setThemeStyles();

if (!inIframe()) {
  showHeaderCorners();
}

/**
 * Bottom left
 */
const notesButton = document.getElementById("open-notes");
notesButton.onclick = function() {
  Reveal.getPlugin("notes").open();
};

function showHeaderCorners() {
  const header = document.getElementById("header");
  header.style.display = "";
}

const userMenuButton = document.getElementById("user-menu");
userMenuButton.onclick = showUserMenu;
function showUserMenu(event) {
  stopPropagation(event);
  const userDropdown = document.getElementById("user-dropdown");
  userDropdown.onClick = stopPropagation;
  userDropdown.style.display = "";
  userDropdown.setAttribute("aria-hidden", "false");
  document.addEventListener("click", handleDocumentClick);
  userMenuButton.classList.add("opaque");
  userMenuButton.onclick = hideUserMenu;
}

function hideUserMenu() {
  const userDropdown = document.getElementById("user-dropdown");
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
  const revealRootDiv = Reveal.getRevealElement();
  const revealRootStyles = window.getComputedStyle(revealRootDiv);
  const themeColor = revealRootStyles.getPropertyValue("color");

  const bodyStyles = window.getComputedStyle(document.body);
  const themeBackgroundColor = bodyStyles.getPropertyValue("background-color");

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

function handleDocumentClick() {
  hideUserMenu();
}

function stopPropagation(event) {
  event.stopPropagation();
}
