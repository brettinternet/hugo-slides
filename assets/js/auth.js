(function() {
  var firebase = window.firebase;
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebase-ui", getUiConfig());

  /**
   * @return {!Object} FirebaseUI Config
   */
  function getUiConfig() {
    return {
      signInFlow: "popup",
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      tosUrl: window.payload.baseUrl,
      privacyPolicyUrl: window.payload.baseUrl
    };
  }

  var signOutButton = document.getElementById("sign-out");
  signOutButton.onclick = function() {
    firebase.auth().signOut();
    window.location.reload();
  };

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

    document.getElementById("sign-in").style.display = "none";
    var signOutButton = document.getElementById("sign-out");
    signOutButton.style.display = "";

    var usernameSpan = document.getElementById("username");
    usernameSpan.innerText = displayName;
    usernameSpan.style.display = "block";

    var firebaseUiRoot = document.getElementById("firebase-ui");
    firebaseUiRoot.style.display = "none";
    firebaseUiRoot.setAttribute("aria-hidden", true);

    if (user.photoURL) {
      var userIconDiv = document.getElementById("user-icon");
      userIconDiv.classList.add("with-image");
      var image = document.createElement("img");
      image.src = user.photoURL;
      image.alt = user.displayName;
      userIconDiv.appendChild(image);
    }
  }

  function handleSignOut() {
    document.getElementById("sign-in").style.display = "";
    var signOutButton = document.getElementById("sign-out");
    signOutButton.style.display = "none";

    var userImage = signOutButton.getElementsByTagName("img")[0];
    if (userImage) {
      userImage.remove();
    }
  }

  initApp = function() {
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          handleSignedInUser(user);
        } else {
          handleSignOut();
        }
      },
      function(error) {
        console.log(error);
      }
    );
  };

  window.addEventListener("load", function() {
    initApp();
  });
})();
