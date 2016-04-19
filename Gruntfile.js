'use strict';

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean : {
            dist : ['bower_components/*/*', '!bower_components/*/dist']
        }
    });

    grunt.registerTask('default', ['clean:dist']);
};