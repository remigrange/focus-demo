/*global React, focusComponents*/
var action = require('../../action/search/quickSearch');

module.exports = React.createClass({
  mixins: [focusComponents.page.search.searchResult.mixin],
  actions: action,
  store: new focus.store.SearchStore(),
  render: function render() {
    var qs = this.quickSearchComponent();
    var summary = <div></div>;
    var scope = this.state.scope
    if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
      var resultsContent = <div className='results'>{this.state.totalRecords} results </div>;
      var linkFilterResult = <div></div>;
      if (this.state.totalRecords > 0) {
        if (scope !== null && scope !== undefined) {
          if (scope.toLowerCase() !== 'all') {
            var url = '#search/advanced/scope/' + scope + '/query/' + this.state.query;
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
    var type = 'MOVIE';
    if(scope !== undefined && scope !== null){
        type = scope;
    }
    var list = this.isSimpleList() ? this.simpleListComponent({type: type}) : this.groupByListComponent();
    var root = React.createElement('div', {className: 'search-panel'}, qs, summary, list);
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var title = <h3 className='title-group-key'>{groupKey}</h3>;
    var summary = <div></div>;
    var count = <div>list.length items</div>;
    if (list.length > 3) {
      count = <div className='count-results'>
        <span> {list.length} items </span>
        <div> Three most relevents </div>
      </div>;
    }
    var linkFilterResult = <div></div>;
    var criteria = this.getCriteria();
    var scope = 'PEOPLE';
    if (groupKey.toLowerCase().indexOf('movie') >= 0) {
      scope = 'MOVIE';
    }
    if (list.length > 0) {
      var url = '#search/advanced/scope/' + scope + '/query/' + criteria.query;
      linkFilterResult = <div className='linkAdvancedSearch'>
        <a href={url}>Advanced search&nbsp;&nbsp;&nbsp;
          <img src='./static/img/arrow-right-16.png'/>
        </a>
      </div>;
    }
    summary = <div>{count} {linkFilterResult}</div>
    return React.createElement('div', {className: 'listResultContainer panel'},
      title,
      summary,
      this.simpleListComponent(
        {type: groupKey, list: list, maxRows: maxRows}));

  }

});
