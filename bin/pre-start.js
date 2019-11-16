const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const logger = require("./logger")("start.js");
const { execSync } = require("child_process");

const appRootDir = path.join(__dirname, "..");
const bundleDir = path.join(appRootDir, "assets", "bundle");

try {
  fse.removeSync(bundleDir);
} catch (err) {
  logger.error("Unable to clean up bundle folder", err);
  process.exit(1);
}

try {
  if (!fs.existsSync(bundleDir)) {
    fs.mkdirSync(bundleDir);
    fs.mkdirSync(path.join(bundleDir, "js"));
    fs.mkdirSync(path.join(bundleDir, "css"));
  }
} catch (err) {
  logger.error("Unable to recreate bundle folder", err);
  process.exit(1);
}

try {
  execSync(`npm run build-js`, {
    stdio: "inherit"
  });
} catch (err) {
  logger.error("Unable to prepopulate JS bundle", err);
  process.exit(1);
}

try {
  execSync(`npm run build-css`, {
    stdio: "inherit"
  });
} catch (err) {
  logger.error("Unable to prepopulate CSS bundle", err);
  process.exit(1);
}

logger.info("Script complete.");
process.exit(0);
