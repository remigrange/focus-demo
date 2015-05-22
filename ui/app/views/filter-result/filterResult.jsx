/*global React, Focus.components */
var Title = Focus.components.common.title.component;
var Button = Focus.components.common.button.action.component;
var action = require('../../action/search/filterSearch');

module.exports = React.createClass({
  mixins: [Focus.components.page.search.filterResult.mixin],
  actions: action,
  store: new Focus.store.SearchStore(),
  render: function () {
    var list = this.isSimpleList() ? this.simpleListComponent({type: this.props.criteria.scope.toLowerCase()}) : this.groupByListComponent();
    var root = React.createElement('div', {className: 'search-result'},
      this.liveFilterComponent(),
      React.createElement(
        'div',
        {className: 'resultContainer'},
        this.listSummaryComponent(),
        this.actionBarComponent(),
        list
      )
    );
    return root;
  },
  renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
    var buttonSeeMore = <div></div>;
    if (list.length > this.props.groupMaxRows && maxRows <= this.props.groupMaxRows) {
      buttonSeeMore = <Button handleOnClick = {this.changeGroupByMaxRows(groupKey, 10)} label = "See More" className='btn-show-all' />;
    }
    return <div className="listResultContainer panel">
      <Title className="results-groupBy-title" title={groupKey} />
      {this.simpleListComponent(
        {type: this.props.criteria.scope.toLowerCase(), list: list, maxRows: maxRows})}
      <div className='btn-group-by-container'>
        <div className = "btn-see-more" >{buttonSeeMore}</div>
        <div className = "btn-show-all" >
          <Button handleOnClick = {this.showAllGroupListHandler(groupKey)} label = "Show all" />
        </div>
      </div>
    </div>;

  }
});
