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
            referenceNames: ['scopes']
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
    _getGroupComponent() {
        let self = this;
        return React.createClass({
            render() {
                let Title = FocusComponents.common.title.component;
                let Button = FocusComponents.common.button.action.component;
                return (
                    <div className="listResultContainer panel" data-focus="group-result-container">
                        <Title title={this.props.groupKey}/>
                        <div className="resultContainer">
                            {this.props.children}
                        </div>
                        <div data-focus='group-actions'>
                            <Button handleOnClick={this.props.showAll(this.props.groupKey)} label="Show all"/>
                        </div>
                    </div>
                );
            }
        });
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
    render() {
        let props = omit(this.props, ['scope', 'query']);
        props.scope = this.state.scope;
        props.query = this.state.query;
        return (
            <AdvancedSearch
                ref='advanced-search'
                data-focus='advanced-search'
                searchAction={searchAction}
                groupComponent={this._getGroupComponent()}
                isSelection={true}
                lineComponentMapper={this._lineComponentMapper}
                groupMaxRows={3}
                cartridgeConfiguration={this.cartridgeConfiguration}
                {...props}
                />
        );
    }

});

module.exports = WrappedAdvancedSearch;
