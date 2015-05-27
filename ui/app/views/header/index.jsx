//Needed components
var Header = Focus.components.application.header.component;
var Cartridge = Focus.components.application.cartridge.component;
var ContentBar = Focus.components.application.contentBar.component;
var Bar = Focus.components.application.bar.component;

module.exports = React.createClass({
  displayName: 'AppHeader',
  render: function renderApplicationHeader() {
    return (
      <Header>
        <ContentBar>
          <Bar appName='FOCUS'/>
          <Cartridge />
        </ContentBar>
        <div data-focus='content-actions'>
          <button className="btn btn-success btn-fab btn-raised mdi-action-language"></button>
          <button className="btn btn-danger btn-fab btn-raised mdi-social-notifications"></button>
          <button className="btn btn-primary btn-fab btn-raised mdi-action-account-circle"></button>
        </div>
      </Header>
    );
  }
});
