/* global React, focusComponents */
module.exports = React.createClass({
  mixins: [focusComponents.application.popin.mixin],
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {className: 'home-popin-header'
      }, 'Welcome page popin')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');

  },
  renderContent: function (popin) {
    return React.createElement('div', {className: 'welcome-title'}, 'Bienvenue à la formation FOCUS');
  }
  /*render: function () {
    return <h3 className="welcome-title">Bienvenue à la formation FOCUS</h3>;
  }*/
});
