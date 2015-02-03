/**
 * Gruntfile.js
 * (c) 2015 Michael Dominice
 * Gruntfile.js is freely distributable under the MIT license.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

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
                files : ['js/**/*.js']
            },
            css : {
                files : ['css/**/*.css']
            }
        }
    });

    grunt.registerTask('serve', ['connect', 'watch']);

};
