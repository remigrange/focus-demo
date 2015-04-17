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
    return <div className='top-menu-items-container'>
      <div className='top-menu-item'>
        <i className="fa fa-bell-o"></i>
        <span className="badge badge-alerte">4</span>
      </div>
      <div className='top-menu-item'>
        <i className="fa fa-eye"></i>
        <span className="badge badge-warning">11</span>
      </div>
      <div className='top-menu-item'>
        <i className="fa fa-user"></i>
      </div>
    </div>;
  }
});

module.exports = React.createClass({
  render: function renderTopMenu() {
    var links = [{url: '', name: '', img: 'static/img/home-32x32-white.svg'},
      {url: '', name: '', img: 'static/img/search-32x32-white.svg'},
      {url: '', name: '', img: 'static/img/search-32x32-white.svg', style: {className: 'user'}}
    ];
    return (
      <Menu
        open={true}
        position= {this.props.position}
        direction= {this.props.direction}
        title= {this.props.title}
        links={links}
        ref= {this.props.reference}
        style= {this.props.style}
      />);
  }
});
