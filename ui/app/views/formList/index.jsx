var SelectionList = focus.components.list.selection.list.component;

module.exports = React.createClass({
  getDefaultProps: function getFieldDefaultProps() {
    return {
      maxElements: 0
    };
  },
  fetchNextPage: function fetchNextPage(page) {
    this.props.maxElements = this.props.perPage * page;
    //return this.render();
    //focus.application.render(this, this.props.container, {props: this.props});
    React.render(this.render(), document.querySelector(this.props.container));
  },
  getDataToUse: function getDataToUse(maxElements) {
    return this.props.data.slice(0, maxElements===0?this.props.perPage:maxElements);
  },

  render: function renderFormList() {
    return (
      <SelectionList data={this.getDataToUse(this.props.maxElements)} hasMoreData={true} lineComponent={this.props.line} isSelection={false} isManualFetch={true} fetchNextPage={this.fetchNextPage}/>
    );
  }
});
