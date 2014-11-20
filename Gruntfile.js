module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            todo: {
                files: [{
                    expand: true,
                    cwd: 'todo/assets/todomvc-common/',
                    src: ['*.*'],
                    dest: 'todo/build/'
                }, {
                    expand: true,
                    cwd: 'todo/assets/',
                    src: ['styles.css'],
                    dest: 'todo/build/'
                }]
            }
        },
        webpack: {
            todo: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './todo/client.js',
                output: {
                    path: './todo/build/js',
                    filename: 'client.js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.jsx$/, loader: 'jsx-loader' }
                    ]
                },
                watch: true
            }
        },
        nodemon: {
            todo: {
                script: './todo/server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        },
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-nodemon');


    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.error('Please specify a target.');
        grunt.log.error('Available options: chat, todo, routing');
    });


    grunt.registerTask('todo', ['copy:todo', 'webpack:todo', 'nodemon:todo']);
};
