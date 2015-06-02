//Needed components
var Header = Focus.components.application.header.component;
var Cartridge = Focus.components.application.cartridge.component;
var ContentBar = Focus.components.application.contentBar.component;
var Bar = Focus.components.application.bar.component;
var ContentActions = Focus.components.application.contentActions.component;

module.exports = React.createClass({
  displayName: 'AppHeader',
  render: function renderApplicationHeader() {
    return (
      <Header>
        <ContentBar>
          <Bar appName='FOCUS'/>
          <Cartridge />
        </ContentBar>
        <ContentActions />
      </Header>
    );
  }
});
