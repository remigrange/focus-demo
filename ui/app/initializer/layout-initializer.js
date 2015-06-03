var render = Focus.application.render;
var Layout = Focus.components.application.layout.component;
var MenuLeft = require('../../views/menu/leftMenu');
render(Layout, 'body', {
  props: {
  MenuLeft: MenuLeft
}});
