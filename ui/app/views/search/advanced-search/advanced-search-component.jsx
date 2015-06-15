// Dependencies

let keys = _.keys;
let isArray = _.isArray;
let omit = _.omit;
// Actions

let searchAction = require('action/search').search;


// Mixins
let i18nMixin = Focus.components.common.i18n.mixin;
let AdvancedSearch = Focus.components.page.search.advancedSearch.component;

// Components

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;
let MovieLineComponent = require('../lines/movieLineComponent');
let PeopleLineComponent = require('../lines/peopleLineComponent');
let CartridgeSearch = require('../../common/cartridge-search');
let SummarySearch = require('../../common/summary-search');

let Group = React.createClass({
    render() {
        let Title = FocusComponents.common.title.component;
        let Button = FocusComponents.common.button.action.component;
        return (
            <div className="listResultContainer panel" data-focus="group-result-container">
                <Title title={this.props.groupKey}/>
                <div className="resultContainer">
                    {this.props.children}
                </div>
                <Button handleOnClick={this.props.showAll(this.props.groupKey)} label="Show all"/>
            </div>
        );
    }
});


// Composants du cartouche
let PageTitle = React.createClass({
    mixins: [i18nMixin],
    render() {
        return (
            <span className="page-title">{this.i18n('search.advanced.page.title')}</span>
        );
    }
});



/**
 * Page de recherche avancée.
 * @type {Object}
 */
let WrappedAdvancedSearch = React.createClass({
    getInitialState() {
        return {
            scope: this.props.scope,
            query: this.props.query
        }
    },
    cartridgeConfiguration () {
        let buildProps = {
            searchAction: searchAction, 
            query: this.props.query,
            scope: this.props.scope,
            scopeList: [
                  {
                    "code": "MOVIE",
                    "label": "MOVIE",
                    "active": true
                  },
                  {
                    "code": "PEOPLE",
                    "label": "PEOPLE",
                    "active": true
                  },
                  {
                    "code": "ALL",
                    "label": "ALL",
                    "active": true
                  }
                ]
        };
        return {
            summary: {
                component: Focus.components.page.search.searchHeader.summary, 
                props: buildProps
            },
            barLeft:{component: PageTitle},
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
    _lineComponentMapper(list) {
        if (list.length < 1) {
            return MovieLineComponent;
        } else {
            return list[0].movId ? MovieLineComponent : PeopleLineComponent;
        }
    },
    _getListType(list) {
        list = list || this.store.getList() || [{movId: 0}];
        return {type: list[0].movId ? 'Movie' : 'People'};
    },
    _searchHandler(criteria) {
        let facets = criteria.facets;
        let newState = {
            query: criteria.criteria.query,
            scope: criteria.criteria.scope
        };
        if (isArray(facets) && facets.length === 1 && facets[0].key === 'Scope') {
            let scopeFacet = facets[0];
            criteria.pageInfos.group = scopeFacet.value;
            criteria.facets = [];
            newState.scope = scopeFacet.value;
        }
        this.setState(newState);
        searchAction(criteria);
    },
    _unselectScopeAction() {
        let criteria = this.refs['advanced-search'].getSearchCriteria();
        criteria.criteria.scope = 'ALL';
        this._searchHandler(criteria);
    },
    render() {
        let props = omit(this.props, ['scope', 'query']);
        props.scope = this.state.scope;
        props.query = this.state.query;
        return (
            <AdvancedSearch
                ref='advanced-search'
                data-focus='advanced-search'
                searchAction={this._searchHandler}
                groupComponent={Group}
                isSelection={true}
                lineComponentMapper={this._lineComponentMapper}
                groupMaxRows={3}
                cartridgeConfiguration={this.cartridgeConfiguration}
                unselectScopeAction={this._unselectScopeAction}
                {...props}
                />
        );
    }

});

module.exports = WrappedAdvancedSearch;
