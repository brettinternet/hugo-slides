const { execSync } = require("child_process");
const logger = require("./logger");

try {
  execSync(`hugo server -s exampleSite --verbose --watch`, {
    // cwd: repoDir,
    stdio: "inherit"
  });
} catch (err) {
  logger.err("start", "Unable to start Hugo development server", err);
  process.exit(1);
}
