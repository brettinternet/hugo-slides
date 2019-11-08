if (window.firebase) {
  (function() {
    var auth = firebase.auth();
    var ui = new firebaseui.auth.AuthUI(auth);
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
        tosUrl: window.payload.baseUrl,
        privacyPolicyUrl: window.payload.baseUrl
      };
    }

    initApp = function() {
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
      var displayName;
      if (!user.displayName) {
        displayName = "anonymous";
        user.updateProfile({
          displayName: displayName
        });
      } else {
        displayName = user.displayName;
      }

      hideSignInButton();

      var usernameSpan = document.getElementById("username");
      usernameSpan.innerText = displayName;
      usernameSpan.style.display = "block";

      hideFirebaseUI();

      if (user.photoURL) {
        var userIconDiv = document.getElementById("user-icon");
        userIconDiv.classList.add("with-image");
        var image = document.createElement("img");
        image.src = user.photoURL;
        image.alt = user.displayName;
        userIconDiv.appendChild(image);
      }
    }

    var signOutButton = document.getElementById("sign-out");

    function handleSignOut() {
      showSignInButton();
      var userImage = signOutButton.getElementsByTagName("img")[0];
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
      document.getElementById("sign-out").style.display = "none";
    }

    function hideSignInButton() {
      document.getElementById("sign-in").style.display = "none";
      document.getElementById("sign-out").style.display = "";
    }

    /**
     * Login menu
     */
    document.getElementById("sign-in").onclick = showFirebaseUI;
    document.getElementById("firebase-ui-close").onclick = hideFirebaseUI;

    function showFirebaseUI(event) {
      var firebaseUiRoot = document.getElementById("firebase-ui");
      stopPropagation(event);
      firebaseUiRoot.style.display = "";
      firebaseUiRoot.setAttribute("aria-hidden", false);
      document.body.appendChild(firebaseUiRoot);
      firebaseUiRoot.onclick = stopPropagation;
      firebaseUiRoot.focus();

      document.addEventListener("click", handleDocumentClick);
    }

    function hideFirebaseUI() {
      var firebaseUiRoot = document.getElementById("firebase-ui");
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
  })();
}
