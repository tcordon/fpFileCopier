const path = require("path");

/**
 * Return filename from a giben Path
 * @param {string} filePath
 * @returns string
 */
const getFilename = (filePath) => {
  return path.basename(filePath)
}

module.exports = {
  getFilename
}
