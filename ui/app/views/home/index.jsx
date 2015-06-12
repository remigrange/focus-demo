let headerBehaviour = Focus.components.page.mixin;
let CartridgeBehaviour = Focus.components.page.mixin.cartridgeBehaviour;
let CartridgeSearch = require('../common/cartridge-search');
let SummarySearch = require('../common/summary-search');

// Composants du cartouche
let ApplicationTitle = React.createClass({
    render() {
        return (
            <span className="page-title">FOCUS</span>
        );
    }
});


/* global React, Focus.components */
module.exports = React.createClass({
  mixins: [headerBehaviour, CartridgeBehaviour],

 cartridgeConfiguration: function cartridgeConfiguration() {
    var cartridgeConfiguration = {
      barLeft:{component: ApplicationTitle},
      summary: {component: SummarySearch},
      cartridge: {component: CartridgeSearch},
      actions: {
          primary: [],
          secondary: []
      }
    };
    return cartridgeConfiguration;
  },

  render: function renderPeopleView() {
    return (
      <div className="homepage"></div>
    );
  }
});
