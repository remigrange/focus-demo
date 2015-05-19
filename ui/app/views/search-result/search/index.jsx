/*global React, focusComponents*/
var action = require('../../action/search/quickSearch');

module.exports = React.createClass({
  mixins: [focusComponents.page.search.searchResult.mixin],
  actions: action,
  store: new focus.store.SearchStore(),
  render: function render() {
    var qs = this.quickSearchComponent();
    var summary = <div></div>;
    var helpContainer = <div/>;
    var scope = this.state.scope;
    var mountedHelp = $('.qs-help-container').html('');
    if(mountedHelp !== undefined && mountedHelp !== null && mountedHelp.length > 0){
      mountedHelp.html('');
      mountedHelp.toggleClass('qs-help-container');
    }
    if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
      var groupKey = 'Movies';
      var faIconClass = 'fa fa-film';
      if(scope !== null && scope !== undefined) {
        if (scope.toLowerCase() === 'people') {
          groupKey = 'People';
          faIconClass = 'fa fa-user';
        }
      } else {
        //TODO Check avec PIERRRE.
        if(this.state.list.length > 0){
          if(this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined){
            scope = 'PEOPLE';
            groupKey = 'People';
            faIconClass = 'fa fa-user';
          }
        }
      }
     var resultsContent = <div className='title-group-key'><i className ={faIconClass}></i> {groupKey} ({this.state.totalRecords}) </div>;
      if(!this.isSimpleList()) {
        resultsContent = <div>Total records ({this.state.totalRecords})</div>;
      }
      var linkFilterResult = <div></div>;
      if (this.state.totalRecords > 0) {
        if (scope !== null && scope !== undefined) {
          if (scope.toLowerCase() !== 'all') {
            var url = '#search/advanced/scope/' + scope + '/query/' + this.state.query;
            linkFilterResult = <div className='linkAdvancedSearch'> <a onClick={this.advancedSearch} data-action={url}>Advanced search</a></div>;
          }
        }
        helpContainer = <div className='qs-help-container'>
          <div><img src='./static/img/arrow-help.png'/></div>
          <div>Hover over a line and click on <i className="fa fa-eye"></i> to see a preview</div>
        </div>;
      }
      summary = React.createElement('div', {className: 'group-result-header'}, resultsContent, linkFilterResult);
    }
    var type = 'MOVIE';
    if(scope !== undefined && scope !== null){
        type = scope;
    } else {
      //TODO Check avec PIERRRE.
      if(this.state.list.length > 0){
        if(this.state.list[0].peoId !== null && this.state.list[0].peoId !== undefined){
          type = 'PEOPLE';
        }
      }
    }
    var list = this.isSimpleList() ? this.simpleListComponent({type: type}) : this.groupByListComponent();
    var qsAffix = <div id='qs-affix'> {qs}</div>
    var root = React.createElement('div', {className: 'search-panel'}, qsAffix, summary, list, helpContainer);
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var summary;
    var mostRelevent = <div></div>;
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
      linkFilterResult = <div className='linkAdvancedSearch'> <a onClick={this.advancedSearch} data-action={url}>Advanced search</a></div>;
      if(list.length >= 3){
        mostRelevent = <div className='qs-results-most-relevents'>The 3 most relevents</div>;
      }
    }
    summary = <div>{mostRelevent} {linkFilterResult}</div>;
    var goupHeader = React.createElement('div', {className: 'group-result-header'}, title, summary);

    return React.createElement('div', {className: 'listResultContainer panel qs-group-results'},
      goupHeader,
      this.simpleListComponent(
        {type: groupKey, list: list, maxRows: maxRows}));

  },
  /**
   * Navigation vers la page de recherche avancée.
   * @param {obejct} event - JS event.
   */
  advancedSearch: function (event){
    event.preventDefault();
    var url = $(event.target).closest('a').attr('data-action');
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
  }

});
