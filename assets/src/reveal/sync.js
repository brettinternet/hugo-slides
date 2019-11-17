// const { Reveal } = window;

// export const setRevealSlideLocation = location => {
//   Reveal.slide(location.h, location.v, location.f);
// };

// export const setRevealEventListeners = firebase => {
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       userSlideAction(getRevealState(), Reveal.getIndices());
//     }
//   });

//   Reveal.addEventListener("slidechanged", function(_event) {
//     userSlideAction(getRevealState(), Reveal.getIndices()); // event.timeStamp?
//   });

//   Reveal.addEventListener("fragmentshown", function(_event) {
//     userSlideAction(getRevealState(), Reveal.getIndices());
//   });

//   Reveal.addEventListener("fragmenthidden", function(_event) {
//     userSlideAction(getRevealState(), Reveal.getIndices());
//   });

//   Reveal.addEventListener("overviewhidden", function(_event) {
//     userSlideAction(getRevealState(), Reveal.getIndices());
//   });

//   Reveal.addEventListener("overviewshown", function(_event) {
//     userSlideAction(getRevealState(), Reveal.getIndices());
//   });

//   window.addEventListener("beforeunload", function(_event) {
//     if (window.Reveal && isAuthorizedPresenter()) {
//       killPresentation();
//     }
//   });
// };
