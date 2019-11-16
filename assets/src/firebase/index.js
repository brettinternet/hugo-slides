import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";
import auth from "./auth";
import sync from "./sync";
import camelCase from "lodash/camelCase";
import { inIframe } from "../utils";

const { config } = window.hugoPayload.firebase;
if (config) {
  const firebaseConfig = {};
  for (let key in config) {
    firebaseConfig[camelCase(key)] = config[key];
  }

  /**
   * Rename non-camelcase key 🙄
   */
  if (firebaseConfig && !inIframe()) {
    const firebasePlugins = [auth, sync];
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

    firebasePlugins.forEach(init => init(firebase));
  }
}
