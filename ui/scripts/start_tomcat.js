#!/usr/bin/env node

var spawn = require('child_process').spawn;

module.exports = function startServer(port, path, callback) {
	var catalinaHome = process.env.CATALINA_HOME;
	var tomcat = spawn(catalinaHome + '/bin/startup.bat');
	tomcat.stdout.pipe(process.stdout);
	tomcat.stderr.pipe(process.stderr);
	callback();
}