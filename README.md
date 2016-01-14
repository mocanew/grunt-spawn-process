# Spawn multiple processes from grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-spawnProcess --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-spawnProcess');
```

## The "spawnProcess" task
### Overview
In your project's Gruntfile, add a section named `spawnProcess` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
    watch: {
            server: {
                files:  ['server.js'],
                tasks:  ['spawnProcess:server'],
                options: {
                    spawn: false // IMPORTANT, do not delete
                }
            },
            anotherServer: {
                files: ['another server.js'],
                tasks: ['spawnProcess:anotherServer'],
                options: {
                    spawn: false // IMPORTANT, do not delete
                }
            }
    },
    spawnProcess: {
        server: {
            cmd: 'node',
            args: ['server.js']
        },
        anotherServer: {
            // cmd: 'node', // node is the default command
            args: ['another server.js']
        },
        webpack: {
            cmd: 'npm',
            args: ['run', 'webpack-dev-server']
        }
    }
})
require('load-grunt-tasks')(grunt);

grunt.registerTask('default', ['spawnProcess:server', 'spawnProcess:anotherServer', 'spawnProcess:webpack', 'watch']);
```

### Options

#### options.cmd
Type: `String`
Default value: `node`

The command that will be executed.

#### options.args
Type: 'Array'
Default: '[]'

The args that will be sent to the command

#### options.spawnOptions
Type: 'Object',
Default: '{}'

The options for child_process.spawn. You can see the list [here](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback).
