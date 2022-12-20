const chokidar = require('chokidar')
const config = require('../cfg/daemon.cfg') // Daemon config

// Pid of forked process
console.log('[WATCHER] child pid', process.pid)

// Config data
console.log('[WATCHER] config.orgFolder', config.orgDataFolder)
console.log('[WATCHER] config.dstFolder', config.dstDataFolder)

// Define Folder Watcher
const watcher = chokidar.watch(config.orgDataFolder, { persistent: true })

/**
 * Define functions to be executed on distinct File Events
 */
watcher.on('add', require('./watcherEvents/fileAdded'))
watcher.on('change', require('./watcherEvents/fileModified'))
watcher.on('unlink', require('./watcherEvents/fileRemoved'))

/* This is executed when the watcher has ended scanning a folder */
watcher.on('ready', () => console.log('[WATCHER] Initial scan complete. Ready for changes'))
