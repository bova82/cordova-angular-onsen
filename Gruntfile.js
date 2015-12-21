module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'www/{,*/}*',
            'www/.git{,*/}*'
          ]
        }]
      }
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      livereload: {
        files: ['app/{,*/}*']
      }
    },

    copy: {
      all: {
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', 'img/**/*', 'fonts/**/*'],
        dest: 'www/'
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          'www/scripts/{,*/}*.js',
          'www/styles/{,*/}*.css',
          'www/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'www/fonts/*',
        ]
      }
    },

    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'www/',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglify'],
              css: ['concat', 'cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['www/{,*/}*.html'],
      css: ['www/styles/{,*/}*.css'],
      js: ['www/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          'www/',
          'www/img',
          'www/css'
        ],
        patterns: {
          html: [[/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    wiredep : {
      task: {
        src: 'app/index.html',
        options: {
            overrides: {
              "OnsenUI": {
                "main": [
                  "js/onsenui.js",
                  "css/ionicons/fonts/ionicons.eot",
                  "css/ionicons/fonts/ionicons.svg",
                  "css/ionicons/fonts/ionicons.ttf",
                  "css/ionicons/fonts/ionicons.woff",
                  "css/font_awesome/css/font-awesome.min.css",
                  "css/ionicons/css/ionicons.min.css",
                  "css/onsenui.css",
                  "css/onsen-css-components.css"
                ]
              }
            }
        }
      }
    },

    autoprefixer: {
      options: {
        options: {
          browsers: [
            'last 5 Chrome versions',
            'last 5 Firefox versions',
            'not ie <= 8',
            '>3%'
          ]
        }
      },
    },

    exec: {
      prepare: {
        command: 'cordova prepare',
        stdout: true,
        stderr: true
      },
      run_browser: {
        command: 'cordova run browser',
        stdout: true,
        stderr: true
      },
      run_android: {
        command: 'cordova run android',
        stdout: true,
        stderr: true
      },
      emulate_android: {
        command: 'cordova emulate android',
        stdout: true,
        stderr: true
      },
      run_ios: {
        command: 'cordova run ios',
        stdout: true,
        stderr: true
      },
      emulate_ios: {
        command: 'cordova emulate ios',
        stdout: true,
        stderr: true
      },
      serve: {
        command: 'cordova serve',
        stdout: true,
        stderr: true
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task(s).
  grunt.registerTask('default', ['run_browser']);
  grunt.registerTask('build_cordova', ['clean', 'wiredep', 'useminPrepare',
      'concat', 'uglify', 'autoprefixer', 'cssmin', 'copy', 'filerev', 'usemin']);
  grunt.registerTask('run_browser', ['build_cordova', 'exec:run_browser']);
  grunt.registerTask('run_android', ['build_cordova', 'exec:run_android']);
  grunt.registerTask('emulate_android', ['build_cordova', 'exec:emulate_android']);
  grunt.registerTask('run_ios', ['build_cordova', 'exec:run_ios']);
  grunt.registerTask('emulate_ios', ['build_cordova', 'exec:emulate_ios']);
  grunt.registerTask('serve', ['build_cordova', 'exec:serve']);

};
