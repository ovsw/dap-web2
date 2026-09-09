const fs = require("fs");
const path = require("path");

// Serve only regular files inside the generated directory, including symlink targets.
function resolveStaticFile(directory, requestUrl) {
  try {
    const root = fs.realpathSync(directory);
    const rel = decodeURIComponent(requestUrl.split("?")[0]);
    if (rel.includes("\0") || rel.includes("\\")) return null;
    const file = path.resolve(root, "." + rel);
    const inside = (value) => value.startsWith(root + path.sep);
    if (file !== root && !inside(file)) return null;
    const target = fs.statSync(file).isDirectory()
      ? path.join(file, "index.html")
      : file;
    const real = fs.realpathSync(target);
    return inside(real) && fs.statSync(real).isFile() ? real : null;
  } catch (error) {
    return null;
  }
}

module.exports = { resolveStaticFile };
