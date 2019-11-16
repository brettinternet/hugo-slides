const { execSync } = require("child_process");
const logger = require("./logger")("start.js");

try {
  execSync(
    `parcel build node_modules/highlight.js/styles/*.css -d assets/css/themes`,
    {
      // cwd: repoDir,
      stdio: "inherit"
    }
  );
} catch (err) {
  logger.error("start", "Unable to start Hugo development server", err);
  process.exit(1);
}
