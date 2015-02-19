module.exports = function(grunt) {
    grunt.initConfig({
        jshint:{
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                node: true,
                jasmine: true
            }
        },
        jasmine_node:{
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                showColors: true,
            },
            all: ['src/spec/']
        },
        browserify: {
            'app.js': ['src/app/main.js']
        },
        watch:{
            files: ['Gruntfile.js', 'src/**/*.js'],
            tasks: ['jshint', 'jasmine_node', 'browserify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'jasmine_node', 'browserify', 'watch']);
};