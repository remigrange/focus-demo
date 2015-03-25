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
      <PeopleCard picture="" name={data.peoName} subName=""/>
    );
  }
});
module.exports = React.createClass({
  definitionPath: "movie",
  displayName: "movieProducers",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["movie"]}],
  action: movieActions,
  getInitialState: function () {
    this.state = {
      producers: []
    };
    return this.state;
  },
  renderContent: function render() {
    return (
      <div className='slidingBloc'>
        <Title id="producers" title="PRODUCERS"/>
        <FormList data={this.state.producers} line={line} perPage={5}/>
      </div>
    );
  }
});
