/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var render = focus.application.render;
var isFirstTime = true;
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
  },
  openQuickSearchPopin: function openQuickSearchPopin(event) {
    event.preventDefault();
    console.info('click on search icon');
    if(isFirstTime){
      var SearchResultView = require('../search-result');
      render(SearchResultView, '#modalContainer', {
        props: {
          position: 'left',
          open: true,
          displaySelector: '#quick-search-link',
          style: {className: 'quick-search-popin'}
        }
      });
      isFirstTime = false;
    }
    //this.refs.qs._toggleOpen();
  }
});

module.exports = React.createClass({
  render: function renderLeftMenu() {
    var style = {className: 'left-menu'};
    var menu = <Menu
      open={true}
      position= 'left'
      direction= 'vertical'
      title= ''
      links={[]}
      ref= 'menuLeft'
      style= {style}
      brand = 'static/img/brand.png'
    />;
    return React.createElement('div', null, menu);
  }
});
