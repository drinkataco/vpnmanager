module.exports = function(grunt) {
    pkg: grunt.file.readJSON('package.json'),
    clean : {
        dist : ['components/*/*', '!components/*/dist']
    }
};