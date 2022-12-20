const chokidar = require('chokidar');
const { fileCopy } = require('./libs/fileCopy')
const { getFilename } = require('./libs/fileUtils')

/**
 * @typedef {Object} daemonConfig
 * @property {string} orgFolder
 * @property {string} dstFolder
 */

/**
 * Daemon Config
 * @type daemonConfig
 */
const config = {
  orgFolder: __dirname + '/../data/org',
  dstFolder: __dirname + '/../data/dst'
}

// Pid of forked process
console.log('[WATCHER] child pid', process.pid)

// Daemon config
console.log('[WATCHER] config.orgFolder', config.orgFolder)
console.log('[WATCHER] config.dstFolder', config.dstFolder)

// Define folder watcher
var watcher = chokidar.watch(config.orgFolder, { persistent: true });

/************ Define Watcher Event Functions ********************/

/**
 * Function that is executed when a file is added to the watched folder
 * @param {string} path
 */
const fileAdded = async (path) => {
  console.log(`[WATCHER] File "${path}" has been added`)

  /**
   * @type string
   */
  const dstFileName = config.dstFolder + '/' + getFilename(path)

  /**
   * Callback function callend when file is already copied
   * @param {import('./libs/fileCopy').callbackArgs} args
   * @returns void
   */
  const fileCopyCallback = (args) => {
    console.log('[WATCwHER-COPIER] - Callback Args: ', args)
    setTimeout( () => {
      console.log(`[WATCHER-COPIER] - File ${args.dst} Copied`)
    }, 10000)
  }
  fileCopy(path, dstFileName, fileCopyCallback)
}

/**
 * Function that is executed when a file is modified in the watched folder
 * @param {string} path
 */
const fileModified = async (path) => { console.log(`[WATCHER] File "${path}" has been modified`)}

/**
 * Function that is executed when a file is removed from teh watched folder
 * @param {string} path
 */
const fileRemoved = async (path) => { console.log(`[WATCHER] File "${path}" has been removed`)}

/**
 * Define functions to bee executend on distinct events
 */
watcher.on('add', fileAdded)
watcher.on('change', fileModified)
watcher.on('unlink', fileRemoved)

/* This is executed when the watcher has ended scanning a folder */
watcher.on('ready', () => console.log('[WATCHER] Initial scan complete. Ready for changes'))