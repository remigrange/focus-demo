// Mixins

let cartridgeBehaviour = Focus.components.page.mixin.cartridgeBehaviour;

// Service

let service = require('../../services/search');

// Composants du cartouche

let ApplicationTitle = React.createClass({
    render() {
        return (
            <span className="page-title">FOCUS</span>
        );
    }
});

let navigateAdvancedSearch = function () {
    let route = '#search/advanced';
    return Backbone.history.navigate(route, true);
};

//Creates a View for hehe home page which is
let HomeView = React.createClass({
    mixins: [cartridgeBehaviour],
    cartridgeConfiguration() {
        let buildProps = {
            service,
            onSearchCriteriaChange: navigateAdvancedSearch
        };
        return {
            barLeft: {component: ApplicationTitle},
            summary: {
                component: Focus.components.page.search.searchHeader.summary,
                props: buildProps
            },
            cartridge: {
                component: Focus.components.page.search.searchHeader.cartridge,
                props: buildProps
            },
            actions: {
                primary: [],
                secondary: []
            }
        };
    },
    render() {
        return (
            <div className="homepage"></div>
        );
    }
});
module.exports = HomeView;
