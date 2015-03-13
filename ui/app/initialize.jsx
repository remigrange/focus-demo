/* global focus*/
console.log(focus);
console.log(focusComponents);
focus.components = focusComponents;
var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});
require("router");
Backbone.history.start();
//setTimeout(focus.application.render(Hello, document.querySelector('#container')), 3000);
//focus.application.render(Hello, '#page', {props: {name: "rodolphe ....."}});
