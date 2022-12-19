var forever = require('forever');

// Pid of master process
console.log('[MONITOR] - Monitor pid', process.pid)

var child = new forever.Forever(__dirname+'/daemon.js', {
  max: 1,
  silent: false,
  args: []
});

const onProcessEnd = () => {
  console.log('[MONITOR] Ha finalizada la ejecución del Script')
  console.log(__dirname)
}

child.on('exit', onProcessEnd);
child.start();
