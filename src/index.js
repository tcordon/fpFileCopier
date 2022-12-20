// @ts-ignore
var forever = require('forever');

// Pid of master process
console.log('[MONITOR] - Monitor pid', process.pid)

// Define a file to run as child process [daemon]
var child = new forever.Forever(__dirname+'/daemon.js', {
  max: 1,
  silent: false,
  args: []
});

const onProcessEnd = () => {
  console.log('[MONITOR] Script has ended')
  console.log(__dirname)
}

child.on('exit', onProcessEnd);
child.start();
