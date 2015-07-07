let render = Focus.application.render;
let Layout = Focus.components.application.layout.component;
let MenuLeft = require('../views/menu');
let footerText = 'Focus-démo - Propulsé par la Team Focus \u00A9 KleeGroup 2015';

render(Layout, 'body', {
    props: {MenuLeft, footerText}
});
