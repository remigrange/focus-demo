// TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Stores

let movieStore = require('../../stores/movie');

// Actions

let movieDirectorsActions = require('../../action/movie').directors;

// Components

let Block = Focus.components.common.block.component;
let PeopleCard = require('../people/people-card');

let Line = React.createClass({
  definitionPath: 'people',
  mixins: [Focus.components.list.selection.line.mixin],
  renderLineContent(data){
    return (
      <PeopleCard picture='' name={data.peoName} subName=''/>
    );
  }
});

module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'movieDirectors',
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ['directors']}],
  action: movieDirectorsActions,
  renderContent() {
    return (
        <Block title='movie.detail.directors.title'>
          {this.listFor('directors', {LineComponent: Line})}
        </Block>
    );
  }
});
