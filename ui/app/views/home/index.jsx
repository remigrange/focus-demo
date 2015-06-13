let cartridgeBehaviour = Focus.components.page.mixin.cartridgeBehaviour;
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
//Creates a View for hehe home page which is
let HomeView = React.createClass({
  mixins: [cartridgeBehaviour],
 cartridgeConfiguration() {
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
  render() {
    return (
      <div className="homepage"></div>
    );
  }
});
module.exports = HomeView;
