// Actions

let searchAction = require('action/search').search;

// Mixins

let AdvancedSearch = Focus.components.page.search.advancedSearch.component;

// Components

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;
let MovieLineComponent = require('../lines/movieLineComponent');
let PeopleLineComponent = require('../lines/peopleLineComponent');


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
                <Button handleClickAction={this.props.showAll(this.props.groupKey)} label="Show all"/>
            </div>
        );
    }
});

/**
 * Page de recherche avancée.
 * @type {Object}
 */
let WrappedAdvancedSearch = React.createClass({
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
    componentWillMount() {
        console.log('WrappedAdvancedSearch call', this.props, 'state', this.state);
    },
    render() {
        return (
            <AdvancedSearch
                data-focus='advanced-search'
                searchAction={searchAction}
                groupComponent={Group}
                isSelection={true}
                lineComponentMapper={this._lineComponentMapper}
                groupMaxRows={3}
                {...this.props}
                />
        );
    }

});

module.exports = WrappedAdvancedSearch;
