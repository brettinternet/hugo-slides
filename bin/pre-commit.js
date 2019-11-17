const fs = require("fs");
const path = require("path");

const appRootDir = path.join(__dirname, "..");
const bundleDir = path.join(appRootDir, "assets", "bundle");

/**
 * Parcel produces JS files for watched CSS in the output directory
 * If those exist we need to build our bundles for production
 * and overwrite the development files
 */
const devFilePath = path.join(bundleDir, "css", "main.js");
if (fs.existsSync(devFilePath)) {
  require("./setup-bundle.js");
}
