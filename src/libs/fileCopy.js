import fsExtra from 'fs-extra'
import console from 'console'

/**
 * @typedef {Object} callbackArgs
 * @property {string} src
 * @property {string} dst
 */

/**
 * Copy a file from src to dst. Once copied it will execute callback function
 * Callback function will receibe src and dst as parameters
 * @param {string} src
 * @param {string} dst
 * @param {(args: callbackArgs) => void=} callbackFunction
 * @param {boolean=} overwrite
 */
const fileCopy = async (src, dst, callbackFunction, overwrite = false) => {
  if (overwrite) {
    // Copy the file. overwritting destination file.
    fsExtra.copy(src, dst)
      .then(() => {
        if (callbackFunction) {
          callbackFunction({ src, dst })
        }
      })
      .catch(err => console.error('error', err))
  } else {
    // We must verify that destination file doesnt exist. We can't overwrite
    fsExtra.access(dst, err => {
      // If destination file doesnt exist... err = destination file doesnt exists
      // error = undefind / null => destination file exists
      if (err) {
        fsExtra.copy(src, dst)
          .then(() => {
            if (callbackFunction) {
              callbackFunction({ src, dst })
            }
          })
          .catch(err => console.error('error', err))
      } else {
        console.log(`[FILE-COPY-ERROR]: Destination file exists: ${dst}`)
      }
    })
  }
}

export {
  fileCopy
}
