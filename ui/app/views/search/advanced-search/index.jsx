// Dependencies

let assign = _.assign;

// Components

let AdvancedSearch = FocusComponents.page.search.advancedSearch.component;
let PageTitle = require('./components/page-title');
let Group = require('./components/group');
let MovieLineComponent = require('../lines/movieLineComponent');
let PeopleLineComponent = require('../lines/peopleLineComponent');

// Services

let service = require('../../../services/search');

// Build the props for each configuration.
let props = assign(
    {},
    require('./config/facet-config'),
    require('./config/column-config'),
    require('./config/line-config'),
    {scopesConfig: require('../../../config/scopes')}
);

let cartridgeConfiguration = () => {
    return {
        summary: {
            component: Focus.components.page.search.searchHeader.summary,
            props: {service}
        },
        barLeft: {component: PageTitle},
        cartridge: {
            component: Focus.components.page.search.searchHeader.cartridge,
            props: {service}
        },
        actions: {
            primary: [],
            secondary: []
        }
    };
};

let lineComponentMapper = (groupKey, list) => {
    if (list.length < 1) {
        return MovieLineComponent;
    } else {
        return list[0].movId ? MovieLineComponent : PeopleLineComponent;
    }
};

module.exports = React.createClass({
    render() {
        return (
            <AdvancedSearch
                cartridgeConfiguration={cartridgeConfiguration}
                groupComponent={Group}
                lineComponentMapper={lineComponentMapper}
                service={service}
                {...props}
            />
        );
    }
});
