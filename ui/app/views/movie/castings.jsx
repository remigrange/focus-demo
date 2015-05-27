//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = Focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Block = Focus.components.common.block.component;
var PeopleCard = require('./component/peopleCard');
var line = React.createClass({
  definitionPath: 'people',
  mixins: [Focus.components.list.selection.line.mixin],
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
        <Block title='movie.detail.cast.title'>
        {this.listFor("castings", {LineComponent: line})}
      </Block>
    );
  }
});
