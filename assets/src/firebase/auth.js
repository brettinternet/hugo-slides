import { auth as firebaseAuthUI } from "firebaseui";

export default firebase => {
  const { baseUrl } = window.hugoPayload;
  const auth = firebase.auth();
  const ui = new firebaseAuthUI.AuthUI(auth);
  ui.start("#firebase-ui", getUiConfig());

  /**
   * @return {!Object} FirebaseUI Config
   */
  function getUiConfig() {
    return {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GithubAuthProvider.PROVIDER_ID
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      tosUrl: baseUrl,
      privacyPolicyUrl: baseUrl
    };
  }

  const initApp = function() {
    auth.onAuthStateChanged(
      function(user) {
        if (user) {
          handleSignedInUser(user);
        } else {
          handleSignOut();
        }
      },
      function(error) {
        console.error(error);
      }
    );
  };

  window.addEventListener("load", function() {
    initApp();
  });

  /**
   *
   * @param {!firebase.User} user
   */
  function handleSignedInUser(user) {
    hideSignInButton();
    hideFirebaseUI();

    setDisplayName(user);
    if (user.photoURL) {
      setUserImage(user);
    }
  }

  const signOutButton = document.getElementById("sign-out");
  const userMenuButton = document.getElementById("user-menu");

  function handleSignOut() {
    showSignInButton();
    const userImage = document
      .getElementById("user-icon")
      .getElementsByTagName("img")[0];
    if (userImage) {
      userImage.remove();
    }
  }

  signOutButton.onclick = function() {
    auth.signOut();
    window.location.reload();
  };

  function showSignInButton() {
    document.getElementById("sign-in").style.display = "";
    userMenuButton.style.display = "none";
  }

  function hideSignInButton() {
    document.getElementById("sign-in").style.display = "none";
    userMenuButton.style.display = "";
  }

  /**
   * Login menu
   */
  document.getElementById("sign-in").onclick = showFirebaseUI;
  document.getElementById("firebase-ui-close").onclick = hideFirebaseUI;

  function showFirebaseUI(event) {
    stopPropagation(event);
    const firebaseUiRoot = document.getElementById("firebase-ui");
    firebaseUiRoot.style.display = "";
    firebaseUiRoot.setAttribute("aria-hidden", false);
    document.body.appendChild(firebaseUiRoot);
    firebaseUiRoot.onclick = stopPropagation;
    firebaseUiRoot.focus();

    document.addEventListener("click", handleDocumentClick);
  }

  function hideFirebaseUI() {
    const firebaseUiRoot = document.getElementById("firebase-ui");
    firebaseUiRoot.style.display = "none";
    firebaseUiRoot.setAttribute("aria-hidden", true);
    document.removeEventListener("click", handleDocumentClick);
  }

  function handleDocumentClick() {
    hideFirebaseUI();
  }

  function stopPropagation(event) {
    event.stopPropagation();
  }

  /**
   * Login side effects
   */
  function setDisplayName(user) {
    let displayName;
    if (!user.displayName) {
      displayName = "anonymous";
      user.updateProfile({
        displayName: displayName
      });
    } else {
      displayName = user.displayName;
    }
    const usernameSpan = document.getElementById("username");
    usernameSpan.innerText = displayName;
    usernameSpan.style.display = "block";
  }

  function setUserImage(user) {
    const userIconDiv = document.getElementById("user-icon");
    userIconDiv.classList.add("with-image");
    const image = document.createElement("img");
    image.src = user.photoURL;
    image.alt = user.displayName;
    userIconDiv.appendChild(image);
  }
};
