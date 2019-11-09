if (window.firebase) {
  (function() {
    var firebaseConfig = camelize(window.payload.firebase);
    /**
     * Rename non-camelcase key 🙄
     */
    if (firebaseConfig && !inIframe()) {
      Object.defineProperty(
        firebaseConfig,
        "databaseURL",
        Object.getOwnPropertyDescriptor(firebaseConfig, "databaseUrl")
      );
      delete firebaseConfig["databaseUrl"];

      firebase.initializeApp(firebaseConfig);

      if (firebaseConfig.measurementId) {
        firebase.analytics();
      }
    } else {
      window.firebase = null;
    }
  })();
}
