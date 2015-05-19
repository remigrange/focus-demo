exports.config = {
  sourceMaps: false,
  paths: {
    "public": '../api/src/main/webapp/static/'
  },
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(bower_components|vendor)/
      },
      order: {
        before: [
            'vendor/react-0.13.2.js',
            'vendor/jquery-1.11.2.min.js',
            'vendor/bootstrap.min.js',
            'vendor/ripples.min.js',
            'vendor/material.min.js',
            /*'vendor/zepto.js',*/
            'vendor/lodash.js',
            'vendor/focus.js',
            'vendor/focus-components.js'
        ],
        after: ['vendor/picker.js']
      }
    },
    stylesheets: {
      joinTo: 'stylesheets/app.css'
    },
    templates: {
      joinTo: 'javascripts/app.js'
    }
  },
  plugins: {
    uglify: {
      mangle: false,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    },
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    },
    react: {
      harmony: true
    },
    appcache: {
      staticRoot: '/static',
      network: ['*'],
      fallback: {}
    },
    browserSync: {
      port: 8080,
      logLevel: "debug"
    }
  }
};
