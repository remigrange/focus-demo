/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({
  mixins: [menuMixin],
  /** @inheriteddoc */
  renderTitle: function () {
    if(!this.props.brand){
      return <h3>{this.props.title}</h3>;
    }
    return <div className='brand'><img src={this.props.brand}/> </div>;
  },
  renderContent: function renderMenuContent() {
    return this.props.links.map(function (link) {
      if (!link.img) {
        return <a href= {link.url}>link.title</a>;
      } else {
        return <a href= {link.url}>
          <img src={link.img}/>
        </a>;
      }
    });
  }
});

module.exports = React.createClass({
  render: function renderLeftMenu() {
    var style = {className: 'left-menu'};
    return (
      <Menu
        open={true}
        position= 'left'
        direction= 'vertical'
        title= ''
        links={[{url: '#', name: '', img: 'static/img/home-32x32-white.svg'}, {url: '#search/quick', name: '', img: 'static/img/search-32x32-white.svg'}]}
        ref= 'menuLeft'
        style= {style}
        brand = 'static/img/brand.png'
      />);
  }
});
