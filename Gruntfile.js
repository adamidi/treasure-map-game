
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files : 'js/*.js'
        },
        jsdoc : {
            dist : {
                src : 'js/*.js',
                dest : 'doc'
            }
        }
    });

    // Load the jshint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['jshint','jsdoc']);
};