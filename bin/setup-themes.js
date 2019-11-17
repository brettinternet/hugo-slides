const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const logger = require("./logger")("setup-themes.js");

const appRootDir = path.join(__dirname, "..");
const nodeModules = path.join(appRootDir, "node_modules");

const highlightModuleThemes = path.join(nodeModules, "highlight.js", "styles");
const revealModuleThemes = path.join(nodeModules, "reveal.js", "css", "theme");

const assetsThemeDir = path.join(appRootDir, "static", "themes");
const staticThemeDir = path.join(appRootDir, "static", "themes");

const highlightAssetsThemes = path.join(assetsThemeDir, "highlight");
const revealAssetsThemes = path.join(assetsThemeDir, "reveal");
const highlightStaticThemes = path.join(staticThemeDir, "highlight");
const revealStaticThemes = path.join(staticThemeDir, "reveal");

try {
  fse.removeSync(staticThemeDir);
  fse.removeSync(assetsThemeDir);
} catch (err) {
  logger.error("Unable to clean up theme folders", err);
  process.exit(1);
}

try {
  fse.copySync(highlightModuleThemes, highlightStaticThemes);
  fs.unlinkSync(path.join(highlightStaticThemes, "darkula.css"));
} catch (err) {
  logger.error("Unable to prepare highlight theme folders", err);
  process.exit(1);
}

try {
  fse.copySync(highlightModuleThemes, highlightAssetsThemes);
  fs.unlinkSync(path.join(highlightAssetsThemes, "darkula.css"));
} catch (err) {
  logger.error("Unable to prepare theme folders", err);
  process.exit(1);
}

try {
  execSync(
    `parcel build ${path.join(
      revealModuleThemes,
      "*.css"
    )} -d ${revealAssetsThemes} --no-minify --no-cache --no-source-maps --no-content-hash`,
    {
      stdio: "inherit"
    }
  );

  execSync(
    `parcel build ${path.join(
      highlightAssetsThemes,
      "*.css"
    )} -d ${highlightStaticThemes} --public-url ./`,
    {
      stdio: "inherit"
    }
  );

  execSync(
    `parcel build ${path.join(
      revealAssetsThemes,
      "*.css"
    )} -d ${revealStaticThemes} --public-url ./`,
    {
      stdio: "inherit"
    }
  );
} catch (err) {
  logger.error("Unable to bundle CSS", err);
  process.exit(1);
}

logger.info("Script complete.");
process.exit(0);
