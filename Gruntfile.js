module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: 
    {
      options: 
      {
        laxcomma: true,
        smarttabs: true
      },
      all: ['src/**/*.js', 'test/**/*.js']
    },

    nodeunit: 
    {
      all: ['test/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('test', ['jshint', 'nodeunit']);
  grunt.registerTask('default', ['test']);

};
