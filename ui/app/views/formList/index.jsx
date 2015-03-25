var SelectionList = focus.components.list.selection.list.component;
module.exports = React.createClass({
  render: function renderFormList() {
    return (
      <SelectionList data={this.props.data} hasMoreData={true} lineComponent={this.props.line} isSelection={false} isManualFetch={true}/>
    );
  }
});
