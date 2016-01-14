'use strict';
var spawn = require('child_process').spawn;

var nodeProcesses = {};

module.exports = function (grunt) {
    grunt.registerMultiTask('spawnProcess', 'Spawn multiple processes from grunt', function () {
        var callback = this.async();
        var cmd = this.data.cmd || 'node';
        var args = this.data.args || [];
        var spawnOptions = this.data.spawnOptions || {};
        
        var id = cmd + args.join(' ');
        if(!id || !id.length){
            grunt.log.error('Couldn\'t construct the id. That\'s impossible, please contact the author of this plugin.');
            callback();
            return;
        }
        
        var isWin = /^win/.test(process.platform);
        if(isWin){
            cmd = cmd.replace('npm', 'npm.cmd');
        }

        if(nodeProcesses[id]){
            nodeProcesses[id].kill();
        }
        nodeProcesses[id] = spawn(cmd, args, spawnOptions);

        nodeProcesses[id].stdout.on('data', function (data) {
            process.stdout.write(data.toString());
        });

        nodeProcesses[id].stderr.on('data', function (data) {
            process.stdout.write(data.toString());
        });

        callback();
    });
}