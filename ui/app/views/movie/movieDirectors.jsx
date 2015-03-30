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
  displayName: "movieDirectors",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["directors"]}],
  renderActions: function renderActions(){},
  action: {
    load: function (id) {
      movieActions.loadDirectors(id);
    }
  },
  getInitialState: function () {
    return {
      directors: []
    };
  },
  renderContent: function render() {
    return (
      <div className='slidingBloc'>
        <Title id="directors" title="DIRECTORS"/>
        <FormList data={this.state.directors} line={line} perPage={5}/>
      </div>
    );
  }
});
