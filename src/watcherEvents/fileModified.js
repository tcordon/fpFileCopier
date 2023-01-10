import console from 'console'

/**
 * Function that is executed when a file is modified in the watched folder
 * @param {string} path
 */
const fileModified = async (path) => { console.log(`[WATCHER] File "${path}" has been modified`) }

export default fileModified
