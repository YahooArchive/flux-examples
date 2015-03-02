module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['./' + grunt.option('taskName') + '/build'],
        concurrent: {
            dev: ['nodemon:dev', 'webpack:dev'],
            options: {
                logConcurrentOutput: true
            }
        },
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
        nodemon: {
            dev: {
                script: './' + grunt.option('taskName') + '/server.js',
                options: {
                    ignore: ['build/**'],
                    ext: 'js,jsx'
                }
            }
        },
        webpack: {
            dev: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './' + grunt.option('taskName') + '/client.js',
                output: {
                    path: './' + grunt.option('taskName') + '/build/js',
                    filename: 'client.js'
                },
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
                    ]
                },
                stats: {
                    colors: true
                },
                devtool: 'source-map',
                watch: true,
                keepalive: true
            }
        }
    });


    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['clean', 'concurrent:dev']);
    grunt.registerTask('todo', ['clean', 'copy:todo', 'concurrent:dev']);
};
