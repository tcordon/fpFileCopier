const chokidar = require('chokidar');
const _path = require('path')
const config = require('../cfg/daemon.cfg') // Daemon config
const { fileCopy } = require('./libs/fileCopy')

// Pid of forked process
console.log('[WATCHER] child pid', process.pid)

// Config data
console.log('[WATCHER] config.orgFolder', config.orgDataFolder)
console.log('[WATCHER] config.dstFolder', config.dstDataFolder)

// Define Folder Watcher
var watcher = chokidar.watch(config.orgDataFolder, { persistent: true });

/**
 * Define functions to be executed on distinct File Events
 */
watcher.on('add', require('./watcherEvents/fileAdded'))
watcher.on('change', require('./watcherEvents/fileModified'))
watcher.on('unlink', require('./watcherEvents/fileRemoved'))

/* This is executed when the watcher has ended scanning a folder */
watcher.on('ready', () => console.log('[WATCHER] Initial scan complete. Ready for changes'))