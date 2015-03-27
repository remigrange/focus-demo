//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./peopleCard');
var FormList = require('../commons/formList');
var line = React.createClass({
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      <PeopleCard picture="" name={data.peoName} subName=""/>
    );
  }
});
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "movieProducers",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["producers"]}],
  action: {
    load: function (id) {
      movieActions.loadProducers(id);
    }
  },
  renderActions: function renderActions(){},
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
