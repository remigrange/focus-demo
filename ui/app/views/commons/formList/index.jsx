//var SelectionList = focus.components.list.selection.list.component;
var Button = focus.components.common.button.action.component;

//Pour étendre SelectionList
//TODO Comment étendre une méthode d'un mixin d'une meilleur façon que celle la ?
var MySelectionList = React.createClass(
  _.extend(focus.components.list.selection.list.mixin,
    {
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
  }
  )
);

module.exports = React.createClass({
  getDefaultProps: function() {
    data: []
  },
  getInitialState: function(){
    return { maxElements:  this.props.perPage * page};
  },
  fetchNextPage: function fetchNextPage(page) {
    this.setState({maxElements:this.props.perPage * page });
  },
  getDataToUse: function getDataToUse() {
    if(!this.props.data){
      return [];
    }
    return this.props.data.slice(0, this.state.maxElements ? this.state.maxElements : this.props.perPage);
  },

  render: function renderFormList() {
    var data =  this.props.data || [];
    var hasMoreData = data.length > (this.state.maxElements ? this.state.maxElements : this.props.perPage);
    return (
      <MySelectionList data={this.getDataToUse()} hasMoreData={hasMoreData} lineComponent={this.props.line} isSelection={false} isManualFetch={true} fetchNextPage={this.fetchNextPage}/>
    );
  }
});
