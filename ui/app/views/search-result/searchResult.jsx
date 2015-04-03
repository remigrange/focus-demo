/*global React, focusComponents*/
var action = require('../../action/search/quickSearch');

module.exports = React.createClass({
    mixins: [focusComponents.page.search.searchResult.mixin],
    actions: action,
    store: new focus.store.SearchStore(),
    render: function render() {
        var qs = this.quickSearchComponent();
        var summary = <div></div>;
        if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
            var resultsContent = <div className='results'>{this.state.totalRecords} results </div>;
            var linkFilterResult = <div></div>;
            if (this.state.totalRecords > 0) {
                var quickSearch = this.refs.quickSearch;
                if(quickSearch !== null && quickSearch !== undefined){
                    var criteria = this.refs.quickSearch.getValue();
                    if(criteria.scope.toLowerCase() !== 'all'){
                        var url = '#search/advanced/scope/' + criteria.scope + '/query/' + criteria.query;
                        linkFilterResult = <div className='linkFilterResult'>
                            <a href={url}>Filter result&nbsp;&nbsp;&nbsp;
                                <img src='./static/img/arrow-right-16.png'/>
                            </a>
                        </div>;
                    }
                }
            }
            summary = <div className='summary'>
                                        {resultsContent}
                                        {linkFilterResult}
            </div>;
        }
        var list = this.listComponent();
        var search = <div className='search-part'> {qs} {summary} {list}</div>
        var lineResumeContent = <div id='lineResume'></div>;
        var root = React.createElement('div', {className: 'search-panel'}, search, lineResumeContent);
        return root;
    },
    renderGroupBy: function renderGroupBy(groupKey, list, maxRows) {
        var title = React.createElement(focusComponents.common.title.component, { title: groupKey });
        var showMoreButton = React.createElement(focusComponents.common.button.action.component, { handleOnClick: this.changeGroupByMaxRows(groupKey, maxRows + 3), label: 'Show more' });
        return React.createElement( 'div', { className: 'listResultContainer panel' },
            title,
            this.renderSimpleList(groupKey, list, maxRows),
            showMoreButton);

    }

});
