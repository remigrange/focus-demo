var fs = require('fs');
var vendor = './vendor/';
var files = [
  'react/dist/react.js',
  'jquery/dist/jquery.js',
  'backbone/backbone.js',
  //'lodash/',
  //bootstrap
  'bootstrap/dist/css/bootstrap.css',
  'bootstrap/dist/js/bootstrap.js',
  //bootstrap-material
  'bootstrap-material/dist/css/material.min.css',
  'bootstrap-material/dist/js/material.min.js',
  'bootstrap-material/dist/css/ripples.min.css',
  'bootstrap-material/dist/js/ripples.min.js',
  //moment
  'moment/min/moment.min.js',
  //daterangepicker
  'daterangepicker/daterangepicker.js',
  'daterangepicker/daterangepicker-bs3.css',
  //showdown
  'showdown/dist/showdown.js',
  //focusjs
  'focusjs/dist/focus.js',
  //focusjs-components
  'focusjs-components/dist/js/focus-components.js',
  'focusjs-components/dist/css/focus-components.css',
  //font awesome
  'font-awesome/css/font-awesome.css'
  ];


var fonts = [
  //Fonts
  'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
  'bootstrap-material/dist/fonts/Material-Design-Icons.eot',
  'bootstrap-material/dist/fonts/Material-Design-Icons.svg',
  'bootstrap-material/dist/fonts/Material-Design-Icons.woff',
  'bootstrap-material/dist/fonts/Material-Design-Icons.ttf',
  'font-awesome/fonts/fontawesome-webfont.eot',
  'font-awesome/fonts/fontawesome-webfont.svg'
];


//Copy dependencies (js / css)
files.map(function(path){
  var splitedPath = path.split('/');
  var pth = splitedPath[splitedPath.length - 1];
  console.log(splitedPath, pth);
  fs.createReadStream('./node_modules/' + path)
    .pipe(
      fs.createWriteStream(vendor + pth)
    );
});


//Copy assets (fonts, images)
fonts.map(function(path){
  var splitedPath = path.split('/');
  var pth = splitedPath[splitedPath.length - 1];
  console.log(splitedPath, pth);
  fs.createReadStream('./node_modules/' + path)
    .pipe(
      fs.createWriteStream('./app/assets/fonts/' + pth)
    );
});
