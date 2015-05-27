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
  renderContent: function render() {
    return (
        <Block title='movie.detail.directors.title'>
          {this.listFor("directors", {LineComponent: line})}
        </Block>
    );
  }
});
