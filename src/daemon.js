import chokidar from 'chokidar'
import console from 'console'

import config from '../cfg/daemon.cfg' // Daemon config
import fileAdded from './watcherEvents/fileAdded'
import fileModified from './watcherEvents/fileModified'
import fileRemoved from './watcherEvents/fileRemoved'

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
watcher.on('add', fileAdded)
watcher.on('change', fileModified)
watcher.on('unlink', fileRemoved)

/* This is executed when the watcher has ended scanning a folder */
watcher.on('ready', () => console.log('[WATCHER] Initial scan complete. Ready for changes'))
