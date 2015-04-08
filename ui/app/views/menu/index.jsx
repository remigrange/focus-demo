/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({
  mixins: [menuMixin],
  renderContent: function renderMenuContent() {
    if (this.props.type === 'menuLeft') {
      return this.props.links.map(function (link) {
        if(!link.img){
          return <a href= {link.url}>aaa</a>;
        } else {
          return <a href= {link.url}><img src={link.img}/></a>;
        }
      });
    }
    return this.renderLinks();
  }
});

module.exports = React.createClass({
  render: function renderPeopleView() {
    return (
      <Menu
        open={true}
        position= {this.props.position}
        direction= {this.props.direction}
        title= {this.props.title}
        links={this.props.links}
        ref= {this.props.reference}
        type= {this.props.reference}
        style= {this.props.style}
      />);
  }
});
