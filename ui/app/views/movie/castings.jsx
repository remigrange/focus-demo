//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./component/peopleCard');
var FormList = require('../commons/formList');
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
  stores: [{store: movieStore, properties: ["castings"]}],
  action: {
    load: function (id) {
      movieActions.loadCastings(id);
    }
  },
  renderContent: function renderContentCastings() {
    return (
      <div className='slidingBloc'>
        <Title id="cast" title="CAST"/>
        {this.listFor("castings", {LineComponent: line})}
      </div>
    );
  }
});
