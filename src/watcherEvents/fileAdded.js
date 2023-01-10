import _path from 'path'
import console from 'console'

import config from '../../cfg/daemon.cfg' // Daemon config
import { getFilename } from '../libs/fileUtils'
import { fileCopy } from '../libs/fileCopy'

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
  const fileCopyCallBack = (args) => {
    console.log('[WATCHER-COPIER] - Callback Init: ', args)
    fileCopy(args.src, args.dst)
  }

  /**
   * Function that simulates a HTTP Request to an Outside endPoint
   * @param {*} callback
   */
  const httpRequestSimulator = (callBack) => {
    console.log('[httpRequestSimulator] - Start')
    // Simulate a long timeout HTTP Request
    setTimeout(() => {
      callBack()
      console.log('[httpRequestSimulator] - Fired CallBack()')
    }, 10000)
    console.log('[httpRequestSimulator] - Ended')
  }

  // Make HTTP Call and copy file when ended, with a callback function
  httpRequestSimulator(() => {
    fileCopyCallBack({
      src: path,
      dst: dstFileName
    })
  })
}

export default fileAdded
