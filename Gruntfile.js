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
            src: ['**/vendor/*/*', 
                  '!**/vendor/*/dist',
                  '**/vendor/**/*.css*',
                  '!**/vendor/**/*.min.css*',
                  '**/vendor/**/*.js*',
                  '!**/vendor/**/*.min.js*']
          }
        }
    });

    grunt.registerTask('default', 
      ['bower:install', 
       'clean:dist']
    );
};