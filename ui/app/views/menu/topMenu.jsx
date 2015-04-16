/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({
  mixins: [menuMixin],
  /**
   * Render the title content
   * @returns {XML} - title content
   */
  renderTitle: function () {
    return <h3>{this.props.title}</h3>;
  },
  renderContent: function renderMenuContent() {
    return this.renderLinks();
  }
});

module.exports = React.createClass({
  render: function renderTopMenu() {
    return (
      <Menu
        open={true}
        position= {this.props.position}
        direction= {this.props.direction}
        title= {this.props.title}
        links={this.props.links}
        ref= {this.props.reference}
        style= {this.props.style}
      />);
  }
});
