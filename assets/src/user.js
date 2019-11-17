import { inIframe } from "./utils";

if (!inIframe()) {
  showHeaderCorners();
}

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

function handleDocumentClick() {
  hideUserMenu();
}

function stopPropagation(event) {
  event.stopPropagation();
}
