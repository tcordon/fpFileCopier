const path = require("path");

const getFilename = (filePath) => {
  return path.basename(filePath)
}

module.exports = {
  getFilename
}