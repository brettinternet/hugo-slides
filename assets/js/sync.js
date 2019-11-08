if (window.firebase) {
  (function() {
    // if authed, set presentation to active
    // if not authed, alert that presentation is active
    var isSynced = false;
    var database = firebase.database();
    var activePresentationTableName = "presentations";
    var presentationRef = database.ref(
      activePresentationTableName + "/" + getSlideId()
    );
    var clientFingerprint = uuidv4();

    var states = {
      OVERVIEW_SHOWN: "overviewshown",
      OVERVIEW_HIDDEN: "overviewhidden"
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        userRevealAction(getState(), Reveal.getIndices());
      }
    });

    Reveal.addEventListener("slidechanged", function(_event) {
      userRevealAction(getState(), Reveal.getIndices()); // event.timeStamp?
    });

    Reveal.addEventListener("fragmentshown", function(_event) {
      userRevealAction(getState(), Reveal.getIndices());
    });

    Reveal.addEventListener("fragmenthidden", function(_event) {
      userRevealAction(getState(), Reveal.getIndices());
    });

    Reveal.addEventListener("overviewhidden", function(_event) {
      userRevealAction(getState(), Reveal.getIndices());
    });

    Reveal.addEventListener("overviewshown", function(_event) {
      userRevealAction(getState(), Reveal.getIndices());
    });

    window.addEventListener("beforeunload", function(_event) {
      if (window.Reveal && isAuthorizedPresenter()) {
        killPresentation();
      }
    });

    presentationRef.on("value", handleActivePresentationValues);

    function handleActivePresentationValues(snapshot) {
      var values = snapshot.val();
      if (values) {
        if (isNotSender(values.fingerprint)) {
          showSyncButton();

          if (isSynced) {
            var state = values.state;
            var location = values.location;
            setSlideLocation(location);
            setSlideState(state);
          }
        }
      } else {
        hideSyncButton();
      }
    }

    /**
     * @param {String} state Attribute of a slide, one of `state`
     * @param {Object} location Describes the position of the current slide
     * @param {Object} location.h Horizontal positioning (starts at 0)
     * @param {Object} location.v Vertical positioning (starts at 0)
     * @param {Object} location.f Fragment positioning within a slide (starts at -1)
     */
    function emitRevealAction(state, location) {
      presentationRef.set({
        state: state,
        location: {
          h: location.h,
          v: location.v,
          f: location.f || null
        },
        fingerprint: clientFingerprint
      });
    }

    function userRevealAction(state, location) {
      if (isAuthorizedPresenter()) {
        emitRevealAction(state, location);
      }
      // if (/** user proposed action */ false) {
      //   stopSync();
      // }
    }

    var isDemoMode = demoModeActive(payload.presenterUids);
    function isAuthorizedPresenter() {
      var currentUser = firebase.auth().currentUser;
      return currentUser && (isPresenterUid(currentUser.uid) || isDemoMode);
    }

    function isPresenterUid(uid) {
      return payload.presenterUids.indexOf(uid) > -1;
    }

    function demoModeActive(uid) {
      return uid && uid.length === 1 && uid[0] === "DEMO";
    }

    /**
     * @param {String} requestFingerprint Uniquely identifies the requesting client
     * @returns {Boolean} Requesting fingerprint does not match this client
     */
    function isNotSender(requestFingerprint) {
      return clientFingerprint !== requestFingerprint;
    }

    function getSlideId() {
      return payload.slideId;
    }

    function getState() {
      return Reveal.isOverview()
        ? states.OVERVIEW_SHOWN
        : states.OVERVIEW_HIDDEN;
    }

    function setSlideState(state) {
      switch (state) {
        case states.OVERVIEW_SHOWN:
          Reveal.toggleOverview(true);
          break;
        case states.OVERVIEW_HIDDEN:
          Reveal.toggleOverview(false);
          break;
      }
    }

    function setSlideLocation(location) {
      if (!location) throw Error("Unable to identify location from sync.");
      Reveal.slide(location.h, location.v, location.f);
    }

    function killPresentation() {
      // event listeners should clean up themselves
      presentationRef.remove();
    }

    /**
     * @source https://stackoverflow.com/a/2117523/6817437
     */
    function uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(
        c
      ) {
        return (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16);
      });
    }

    /**
     * Sync button
     */
    var syncButton = document.getElementById("sync");
    function showSyncButton() {
      syncButton.style.display = "";
    }

    function hideSyncButton() {
      syncButton.style.display = "none";
      stopSync();
    }

    syncButton.onclick = activateSync;
    function activateSync() {
      if (syncButton.checked === "true") {
        stopSync();
      } else {
        syncClient();
      }
    }

    function syncClient() {
      isSynced = true;
      syncButton.classList.add("active");
      syncButton.checked = "true";
      presentationRef.once("value").then(handleActivePresentationValues);
      syncButton.title = "Unsync";
      syncButton.setAttribute("aria-label", "Synced");
    }

    function stopSync() {
      isSynced = false;
      syncButton.classList.remove("active");
      syncButton.checked = "false";
      syncButton.title = "Sync";
      syncButton.setAttribute("aria-label", "Unsynced");
    }
  })();
}
