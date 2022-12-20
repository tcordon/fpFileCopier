// @ts-ignore
const console = require('console')
const forever = require('forever')
const _path = require('path')

// Pid of master process
console.log('[MONITOR] - Monitor pid', process.pid)

// Define a file to run as child process [daemon]
const child = new forever.Forever(_path.join(__dirname, '/daemon.js'), {
  max: 1,
  silent: false,
  args: []
})

const onProcessEnd = () => {
  console.log('[MONITOR] Script has ended')
  console.log(__dirname)
}

child.on('exit', onProcessEnd)
child.start()
