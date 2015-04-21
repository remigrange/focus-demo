//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./component/peopleCard');
var Block = focus.components.common.block.component;
var line = React.createClass({
  definitionPath: 'people',
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
  renderContent: function render() {
    return (
      <Block title="PRODUCERS" style={{className: "slidingBlock", titleId: "producers"}}>
        {this.listFor("producers", {LineComponent: line})}
      </Block>
    );
  }
});
