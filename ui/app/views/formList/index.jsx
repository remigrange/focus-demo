//var SelectionList = focus.components.list.selection.list.component;
var Button = focus.components.common.button.action.component;

//Pour étendre SelectionList
//TODO Comment étendre une méthode d'un mixin d'une meilleur façon que celle la ?
var MySelectionList = React.createClass($.extend(focus.components.list.selection.list.mixin, {
  _renderManualFetch: function renderManualFetch(){
    if(this.props.isManualFetch && this.props.hasMoreData){
      var style = {className: "primary"};
      return (
        <li className="sl-button">
          <Button label="Next"
            type="button"
            handleOnClick={this._handleShowMore}
            style={style}/>
        </li>
      );
    }
  }
}));

module.exports = React.createClass({
  fetchNextPage: function fetchNextPage(page) {
    this.props.maxElements = this.props.perPage * page;
    this.forceUpdate();
  },
  getDataToUse: function getDataToUse() {
    return this.props.data.slice(0, this.props.maxElements ? this.props.maxElements : this.props.perPage);
  },

  render: function renderFormList() {
    return (
      <MySelectionList data={this.getDataToUse()} hasMoreData={this.props.data.length > (this.props.maxElements ? this.props.maxElements : this.props.perPage)} lineComponent={this.props.line} isSelection={false} isManualFetch={true} fetchNextPage={this.fetchNextPage}/>
    );
  }
});
