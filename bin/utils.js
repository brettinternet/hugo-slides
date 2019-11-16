const fs = require("fs");
const path = require("path");

/**
 * Remove directory recursively
 * @param {String} dirPath
 * @source https://stackoverflow.com/a/42505874/6817437
 */
exports.rimraf = dirPath => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function(entry) {
      var entry_path = path.join(dirPath, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

/**
 * Copy a file
 * @param {String} source
 * @param {String} target
 * @source https://stackoverflow.com/a/26038979/6817437
 */
exports.copyFileSync = (source, target) => {
  let targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};

/**
 * Copy directory recursively
 * @param {String} source
 * @param {String} target
 * @source https://stackoverflow.com/a/26038979/6817437
 */
exports.copyFolderRecursiveSync = (source, target) => {
  const files = [];

  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
};
