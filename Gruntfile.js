'use strict';


module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.initConfig({
        pkg: require('./package.json'),

        // Install Bower
        bower: {
          install: {}
        },

        // Clean files, keep minified dist
        clean: {
          dist: {
            src: ['static/vendor/*/*', 
                  '!static/vendor/*/dist',
                  'static/vendor/**/*.css*',
                  '!static/vendor/**/*.min.css*',
                  'static/vendor/**/*.js*',
                  '!static/vendor/**/*.min.js*']
          }
        }
    });

    // grunt.registerTask('default', [ 'bower:install']);
    grunt.registerTask('default', 
      ['bower:install', 
       'clean:dist']
    );
};