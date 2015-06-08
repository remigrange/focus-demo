//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = Focus.components.common.form.mixin;
var movieProducersActions = require('../../action/movie').producers;
var movieStore = require('../../stores/movie');
var Title = Focus.components.common.title.component;
var PeopleCard = require('./component/peopleCard');
var Block = Focus.components.common.block.component;

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
  displayName: "movieProducers",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["producers"]}],
  action: movieProducersActions,
  renderContent: function render() {
    return (
      <Block title='movie.detail.producers.title'>
        {this.listFor("producers", {LineComponent: line})}
      </Block>
    );
  }
});
