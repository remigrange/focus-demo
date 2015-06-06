var childProcess = require('child_process')

console.log('###########################################');
console.log('######### Focus demo standalone api #######');
console.log('###########################################');
console.log('# Work on your UI code, change will be    #');
console.log('# taken into account and served           #');
console.log('# localhost port 8081.                    #');
console.log('###########################################');
console.log();

var brunch = childProcess.exec('brunch watch');

var server = childProcess.exec('node server/server.js');

brunch.stdout.pipe(process.stdout);
brunch.stderr.pipe(process.stderr);
server.stdout.pipe(process.stdout);
brunch.stderr.pipe(process.stderr);
