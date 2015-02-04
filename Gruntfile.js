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
        uglify : {
            source : {
                options : {
                    sourceMap : true
                },
                files : {
                    'js/main-min.js' : ['js/main.js']
                }
            }
        },
        jade : {
            index : {
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
                files : ['Gruntfile.js']
            },
            js : {
                files : ['js/main.js'],
                tasks : ['uglify']
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

    grunt.registerTask('build', ['uglify', 'jade']);
    grunt.registerTask('serve', ['build', 'connect', 'watch']);
    grunt.registerTask('default', ['build']);

};
