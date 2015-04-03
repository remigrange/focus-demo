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
    }

});
