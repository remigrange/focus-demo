/*global focusComponents, React */
//Component for the application header.
var AppHeader = focusComponents.application.header.component;
var Cartouche = focus.components.application.cartridge.component;
//Create the view.
module.exports = React.createClass({
  render: function () {
    var notification = <div className='header-menu-item'>
      <i className="fa fa-bell-o"></i>
      <span className="badge badge-alerte">11</span>
    </div>;
    var eye = <div className='header-menu-item'>
      <i className="fa fa-eye"></i>
      <span className="badge badge-warning">11</span>
    </div>;
    var user = <div className='header-menu-item'>
      <i className="fa fa-user"></i>
    </div>;
    return React.createElement('div', null,
      React.createElement(AppHeader, null,
        React.createElement('div', {className: 'content-bar'},
          React.createElement('div', {className: 'real-bar'},
            React.createElement('div', {className: 'actions-left'},
              React.createElement('button', {className: 'btn btn-raise btn-default fa fa-reply-all header-back'}, ' Back')
            ),
           /* React.createElement('div', {className: 'entete'},
              'Super film vraiment top...',
              React.createElement('button', {className: 'btn btn-info btn-raise'}, 'Context'),
            ),*/

            React.createElement('div', {className: 'user-infos'}, notification, eye, user)
          ),
         // React.createElement(Cartouche, {className: 'cartridge'})
         React.createElement(Cartouche, {className: 'entete-tall'})
        ),
        React.createElement('div', {className: 'entete-actions'},
          React.createElement('button', {className: 'btn btn-success btn-fab btn-raised fa fa-bell-o'}),
          React.createElement('button', {className: 'btn btn-danger btn-fab btn-raised fa fa-eye'}),
          React.createElement('button', {className: 'btn btn-primary btn-fab btn-raised fa fa-user'})
        )
      )
    );
  }
});
