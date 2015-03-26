var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./peopleCard');
var FormList = require('../formList');
var line = React.createClass({
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      <PeopleCard picture="" name={data.peoName} subName={"As ("+data.role+") "+(data.characterName!==undefined?data.characterName:"")}/>
    );
  }
});
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "movieCastings",
  mixins: [formMixin],
  getInitialState: function () {
    this.state = {
      castings: []
    };
    return this.state;
  },
  stores: [{store: movieStore, properties: ["castings"]}],
  action: {
    load: function (id) {
      movieActions.loadCastings(id);
    }
  },
  renderContent: function render() {
    return (
      <div className='slidingBloc'>
        <Title id="cast" title="CAST"/>
        <FormList data={this.state.castings} line={line} perPage={5}/>

      </div>
    );
  }
});
