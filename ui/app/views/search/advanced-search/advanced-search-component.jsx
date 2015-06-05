//Dependencies
let advancedSearchPageMixin = Focus.components.page.search.advancedSearch.mixin;
let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;

//The store should be an application singleton.
let searchStore = new Focus.store.SearchStore();

/**
 * Page de recherche avancée.
 * @type {Object}
 */
let WrappedAdvancedSearch = React.createClass({
		mixins: [advancedSearchPageMixin],
    store: searchStore,
    actions: require('action/search'),
    _getListType(list){
      list = list || this.store.getList() || [{movId:0}];
      return {type: list[0].movId ? 'Movie' : 'People'};
    },
    renderList(){
      if(this.isSimpleList()){
        return this.getSimpleListComponent(this._getListType());
      }
      return this.getGroupByListComponent();
    },
    // rneder each line depending on its type
    renderGroupByBlock(groupKey, list, maxRows){
      let List = this.getSimpleListComponent(this._getListType(list));
      return (
        <div data-focus='grouped-list'>
          <Title  title={groupKey} />
          {List}
          <Button handleOnClick={this.changeGroupByMaxRows(groupKey, 5)} label="Show more"/>
          <Button handleOnClick={this.showAllGroupListHandler(groupKey)} label="Show all"/>
        </div>
      );
    },
    render(){
      let FacetBox = this.getFacetBoxComponent();
      let SummaryList = this.getListSummaryComponent();
      let ActionBar = this.getActionBarComponent();
      return (
        <div data-focus='advanced-search'>
          {FacetBox}
          <div data-focus='results'>
            {SummaryList}
            {ActionBar}
            {this.renderList()}
          </div>
        </div>
      );
  }

});
module.exports = WrappedAdvancedSearch;
