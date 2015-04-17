/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var render = focus.application.render;
var Menu = React.createClass({
  mixins: [menuMixin],
  /** @inheriteddoc */
  renderTitle: function () {
    if (!this.props.brand) {
      return <h3>{this.props.title}</h3>;
    }
    return <div className='brand'>
      <img src={this.props.brand}/>
    </div>;
  },
  renderContent: function renderMenuContent() {
    var home = <a href='#'>
      <img src='static/img/home-32x32-white.svg'/>
    </a>;
    var search = <a onClick={this.openQuickSearchPopin} id='quick-search-link'>
      <img src='static/img/search-32x32-white.svg'/>
    </a>;
    var root = React.createElement('div', null, home, search);
    return root;
    /* return this.props.links.map(function (link) {
     if (!link.img) {
     return <a href= {link.url}>link.title</a>;
     } else {
     return <a href= {link.url}>
     <img src={link.img}/>
     </a>;
     }
     });*/

  },
  openQuickSearchPopin: function openQuickSearchPopin(event) {
    event.preventDefault();
    console.info('click on search icon');
    var SearchResultView = require('../search-result');
    React.createElement(SearchResultView, {
      props: {
        position: 'left',
        open: false,
        displaySelector: '#quick-search-link',
        style: {className: 'quick-search-popin'}
      }
    });
    render(SearchResultView, '#modalContainer', {props: {position: 'left', open: true, displaySelector: 'a[href="#search/quick"]', style: {className: 'quick-search-popin'}}});
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
        links={[{url: '#', name: '', img: 'static/img/home-32x32-white.svg'}, {
          url: '#search/quick',
          name: '',
          img: 'static/img/search-32x32-white.svg'
        }]}
        ref= 'menuLeft'
        style= {style}
        brand = 'static/img/brand.png'
      />);
  }
});
