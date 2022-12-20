/**
 * Function that is executed when a file is removed from teh watched folder
 * @param {string} path
 */
const fileRemoved = async (path) => { console.log(`[WATCHER] File "${path}" has been removed`)}

module.exports = fileRemoved
