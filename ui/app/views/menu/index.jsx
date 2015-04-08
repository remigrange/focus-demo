/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({
  mixins: [menuMixin],
  renderContent: function renderMenuContent() {
    return this.renderLinks();
  }
});

module.exports = React.createClass({
  render: function renderPeopleView() {
    return (
      <Menu
        open={true}
        position='top'
        direction='horizontal'
        title='Focus'
        links={[{url: '#', name: 'Home'}]}
        ref= 'menuTop'
      />);
  }
});
