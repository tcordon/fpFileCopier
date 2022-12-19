const chokidar = require('chokidar');
const { fileCopy } = require('./libs/fileCopy')
const { getFilename } = require('./libs/fileUtils')

// Pid of forked process
console.log('[CHILD] child pid', process.pid)

// Daemon Config
const config = {
  orgFolder: __dirname + '/../data/org',
  dstFolder: __dirname + '/../data/dst'
}

console.log('[CHILD] config.orgFolder', config.orgFolder)
console.log('[CHILD] config.dstFolder', config.dstFolder)


var watcher = chokidar.watch(config.orgFolder, { persistent: true });

const fileAdded = async (path) => {
  console.log(`[CHILD-WATCHER] File "${path}" has been added`)

  const dstFileName = config.dstFolder + '/' + getFilename(path)
  const fileCopyCallback = (args) => {
    console.log('[CHILD-COPIER] - Callback Args: ', args)
    setTimeout( () => {
      console.log(`[CHILD-COPIER] - File ${args.dst} Copied`)
    }, 10000)
  }
  fileCopy(path, dstFileName, fileCopyCallback)
}
const fileModified = async (path) => { console.log(`[CHILD-WATCHER] File "${path}" has been modified`)}
const fileRemoved = async (path) => { console.log(`[CHILD-WATCHER] File "${path}" has been removed`)}

watcher.on('add', fileAdded)
watcher.on('change', fileModified)
watcher.on('unlink', fileRemoved)

watcher.on('ready', () => console.log('[CHILD-WATCHER] Initial scan complete. Ready for changes'))