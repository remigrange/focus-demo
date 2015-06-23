// Dependencies

let keys = _.keys;
let isArray = _.isArray;
let omit = _.omit;

// Actions

let searchAction = require('action/search').search;

// Formatters

let numberFormatter = Focus.definition.formatter.number;

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
    componentDidMount() {
        this.refs['advanced-search'].search();
    },
    getInitialState() {
        return {
            scope: this.props.scope,
            query: this.props.query
        }
    },
    cartridgeConfiguration() {
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
            barLeft: {component: PageTitle},
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
            mixins: [i18nMixin],
            getInitialState() {
                return ({
                    count: 0
                });
            },
            componentDidMount() {
                let advancedSearch = self.refs['advanced-search'];
                let facets = Focus.search.builtInStore.searchStore.getFacet();
                let currentGroupingKey = advancedSearch.state.groupSelectedKey || 'FCT_SCOPE';
                let currentGrouping = facets[currentGroupingKey];
                this.setState({
                    count: currentGrouping[this.props.groupKey].count
                });
            },
            render() {
                let Title = FocusComponents.common.title.component;
                let Button = FocusComponents.common.button.action.component;
                return (
                    <div className="listResultContainer panel" data-focus="group-result-container">
                        <Title title={`${this.props.groupKey} (${numberFormatter.format(this.state.count, '(0,0)')})`}/>
                        <p>{this.i18n('search.mostRelevant')}</p>
                        <div className="resultContainer">
                            {this.props.children}
                        </div>
                        <div data-focus='group-actions'>
                            <Button handleOnClick={this.props.showAll(this.props.groupKey)}
                                    label={this.i18n('show.all')}/>
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
