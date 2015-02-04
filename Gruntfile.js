/**
 * Gruntfile.js
 * (c) 2015 Michael Dominice
 * Gruntfile.js is freely distributable under the MIT license.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-6to5');

    grunt.initConfig({
        connect : {
            server : {
                options : {
                    debug : false,
                    port : parseInt(process.env.PORT || '8000', 10),
                    hostname : 'localhost',
                    livereload : 35730
                }
            }
        },
        jshint : {
            options : {
                jshintrc : true
            },
            js : {
                files : {
                    src : ['js/main.js']
                }
            },
            grunt : {
                files : {
                    src : ['Gruntfile.js']
                }
            }
        },
        '6to5' : {
            options : {
                sourceMap : true
            },
            source : {
                files : {
                    'build/random.js' : 'js/random.js',
                    'build/key.js' : 'js/key.js',
                    'build/tempo.js' : 'js/tempo.js',
                    'build/songseeder.js' : 'js/songseeder.js',
                    'build/main.js' : 'js/main.js'
                }
            }
        },
        uglify : {
            source : {
                options : {
                    sourceMap : true,
                    sourceMapIncludeSources : true,
                    sourceMapIn : 'build/main.js.map',
                    banner : [
                        '/**',
                        ' * main-min.js',
                        ' * (c) 2015 Michael Dominice',
                        ' * main-min.js is freely distributable under the MIT license.',
                        ' */'
                    ].join('\n')
                },
                files : {
                    'js/main-min.js' : [
                        'build/random.js',
                        'build/key.js',
                        'build/tempo.js',
                        'build/songseeder.js',
                        'build/main.js'
                    ]
                }
            }
        },
        jade : {
            source : {
                files : {
                    'index.html' : ['views/index.jade']
                }
            }
        },
        watch : {
            options : {
                livereload : 35730,
                livereloadOnError : false
            },
            html : {
                files : ['index.html']
            },
            grunt : {
                files : ['Gruntfile.js'],
                tasks : ['jshint:grunt']
            },
            js : {
                files : ['js/**/*.js', '!js/main-min.js'],
                tasks : ['jshint:js', '6to5', 'uglify']
            },
            css : {
                files : ['css/**/*.css']
            },
            jade : {
                files : ['views/**/*.jade'],
                tasks : ['jade']
            }
        }
    });

    grunt.registerTask('build', ['jshint', '6to5', 'uglify', 'jade']);
    grunt.registerTask('serve', ['build', 'connect', 'watch']);
    grunt.registerTask('default', ['build']);

};
