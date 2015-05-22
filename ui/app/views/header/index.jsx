//Needed components
var Header = Focus.components.application.header.component;
var Cartridge = Focus.components.application.cartridge.component;
var Bar = Focus.components.application.bar.component;

module.exports = React.createClass({
  displayName: 'AppHeader',
  render: function renderApplicationHeader() {
    return (
      <Header>
        <Bar appName='FOCUS'/>
        <Cartridge />
      </Header>
    );
  }
});
