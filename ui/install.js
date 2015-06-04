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
  
  //focusjs
  'focusjs/dist/focus.js',
  //focusjs-components
  'focusjs-components/dist/js/focus-components.js',
  'focusjs-components/dist/css/focus-components.css'
  ];


var fonts = [
  //Fonts
  'bootstrap/dist/fonts/glyphicons-halflings-regular.eot'//,
  //'focusjs-components/dist/'
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
