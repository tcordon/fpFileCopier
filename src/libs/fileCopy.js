const fsExtra = require('fs-extra');

const fileCopy = async (src, dst, callbackFunction = () => {}) => {
  fsExtra.access(dst, err => {
    // Si el fichero destino no existe... err = no existe
    // error = undefind / null => existe
    if(err) {
      fsExtra.copy(src, dst)
        .then( () => callbackFunction({ src, dst }))
        .catch(err => console.error('error',err))
    }else {
      console.log(`[FILE-COPY-ERROR]: Destination file exists: ${dst}`);
    }
  })
}

module.exports = { fileCopy }