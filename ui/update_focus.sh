npm update focus
cd node_modules/focus
npm install
gulp browserify
cd ../..
npm update focus-components
cd node_modules/focus-components
npm install
gulp componentify
gulp browserify
cd ../..

