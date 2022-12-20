const _path = require('path')

const config = require('../../cfg/daemon.cfg') // Daemon config
const { getFilename } = require('../libs/fileUtils')
const { fileCopy } = require('../libs/fileCopy')

/**
 * Function that is executed when a file is added to the watched folder
 * @param {string} path
 */
const fileAdded = async (path) => {
  console.log(`[WATCHER] File "${path}" has been added`)

  /**
   * @type string
   */
  const dstFileName = _path.join(config.dstDataFolder, '/' + getFilename(path))

  /**
   * Callback function callend when file is already copied
   * @param {import('../libs/fileCopy').callbackArgs} args
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

module.exports = fileAdded
