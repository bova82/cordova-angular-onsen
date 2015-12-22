module.exports = function(grunt) {

  // Set folders reused throughout the script
  var SRC_FOLDER = 'app';
  var DIST_FOLDER = 'www';
  var SRC_SASS_REL = 'sass';
  var SRC_CSS_REL = 'css';
  var SRC_JS_REL = 'js';
  var SRC_IMG_REL = 'img';
  var SRC_FONTS_REL = 'fonts';
  var DIST_CSS_REL = 'styles';
  var DIST_JS_REL = 'scripts';
  var DIST_IMG_REL = 'img';
  var DIST_FONTS_REL = 'fonts';
  var paths = {
    src: SRC_FOLDER,
    dist: DIST_FOLDER,
    src_css: SRC_FOLDER + SRC_CSS_REL,
    src_sass: SRC_FOLDER + SRC_SASS_REL,
    src_js: SRC_FOLDER + SRC_JS_REL,
    src_img: SRC_FOLDER + SRC_IMG_REL,
    src_fonts: SRC_FOLDER + SRC_FONTS_REL,
    src_img_rel: SRC_IMG_REL,
    src_fonts_rel: SRC_FONTS_REL,
    dist_css: DIST_FOLDER + DIST_CSS_REL,
    dist_js: DIST_FOLDER + DIST_JS_REL,
    dist_img: DIST_FOLDER + DIST_IMG_REL,
    dist_fonts: DIST_FOLDER + DIST_FONTS_REL
  };

  // Project configuration.
  grunt.initConfig({
    paths: paths,
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= paths.dist %>/{,*/}*',
            '<%= paths.dist %>/.git{,*/}*'
          ]
        }]
      },
      css: {
        files: [{
          src: ['<%= paths.src_css %>/*.css']
        }]
      }
    },

    watch: {
      js: {
        files: ['<%= paths.src_js %>/*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      html : {
        files: ['<%= paths.src %>/**/*.html'],
        tasks: ['wiredep'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['<%= paths.src_sass %>/*.sass', 'app/sass/*.scss'],
        tasks: ['clean:css', 'compass'],
        options: {
          livereload: true
        }
      }
    },

    copy: {
      all: {
        expand: true,
        cwd: '<%= paths.src %>',
        src: ['**/*.html', '<%= paths.src_img_rel %>/**/*', '<%= paths.src_fonts_rel %>/**/*'],
        dest: '<%= paths.dist %>'
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= paths.dist_js %>/{,*/}*.js',
          '<%= paths.dist_css %>/{,*/}*.css',
          '<%= paths.dist_img %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= paths.dist_fonts %>/*',
        ]
      }
    },

    compass : {
      dist: {
        options: {
          sassDir: '<%= paths.src_sass %>',
          cssDir: '<%= paths.src_css %>'
        }
      }
    },

    useminPrepare: {
      html: '<%= paths.src %>/index.html',
      options: {
        dest: '<%= paths.dist %>',
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
      html: ['<%= paths.dist %>/{,*/}*.html'],
      css: ['<%= paths.dist_css %>/{,*/}*.css'],
      js: ['<%= paths.dist_js %>/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= paths.dist %>',
          '<%= paths.dist_img %>',
          '<%= paths.dist_css %>'
        ],
        patterns: {
          html: [[/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    wiredep : {
      task: {
        src: '<%= paths.src %>/index.html',
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task(s).
  grunt.registerTask('default', ['run_browser']);
  grunt.registerTask('build_cordova', ['clean:build', 'wiredep', 'compass', 'useminPrepare',
      'concat', 'uglify', 'autoprefixer', 'cssmin', 'copy', 'filerev', 'usemin']);
  grunt.registerTask('run_browser', ['build_cordova', 'exec:run_browser']);
  grunt.registerTask('run_android', ['build_cordova', 'exec:run_android']);
  grunt.registerTask('emulate_android', ['build_cordova', 'exec:emulate_android']);
  grunt.registerTask('run_ios', ['build_cordova', 'exec:run_ios']);
  grunt.registerTask('emulate_ios', ['build_cordova', 'exec:emulate_ios']);
  grunt.registerTask('serve', ['build_cordova', 'exec:serve']);

};
