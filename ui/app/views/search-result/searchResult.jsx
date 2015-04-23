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
    var helpContainer = <div className='qs-help_container'>
        <div><img src='./static/img/arrow-help.png'/></div>
        <div>Hover over a line and click on <i className="fa fa-eye"></i> to see a preview</div>
    </div>;
    var root = React.createElement('div', {className: 'search-panel'}, qs, summary, list, helpContainer);
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var summary = <div></div>;
    var mostRelevent = <div className='qs-results-most-relevents'>The 3 most relevents</div>;
    var scope = 'PEOPLE';
    var faIconClass = 'fa fa-user';
    if (groupKey.toLowerCase().indexOf('movie') >= 0) {
      scope = 'MOVIE';
      faIconClass = 'fa fa-film';
    }
    var title = <div className='title-group-key'><i className ={faIconClass}></i> {groupKey}</div>;
    if (list.length > 3) {
      title = <div className='title-group-key'><i className ={faIconClass}></i> {groupKey} ({list.length})</div>;
    }

    var linkFilterResult = <div></div>;
    var criteria = this.getCriteria();

    if (list.length > 0) {
      var url = '#search/advanced/scope/' + scope + '/query/' + criteria.query;
      linkFilterResult = <div className='linkAdvancedSearch'> <a href={url}>Advanced search</a></div>;
    }
    summary = <div>{mostRelevent} {linkFilterResult}</div>;
    var goupHeader = React.createElement('div', {className: 'group-result-header'}, title, summary);

    return React.createElement('div', {className: 'listResultContainer panel qs-group-results'},
      goupHeader,
      this.simpleListComponent(
        {type: groupKey, list: list, maxRows: maxRows}));

  }

});
