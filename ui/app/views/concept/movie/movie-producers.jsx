//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let movieProducersActions = require('../../action/movie').producers;

// Stores

let movieStore = require('../../stores/movie');

// Components

let Title = Focus.components.common.title.component;
let PeopleCard = require('../people/people-card');
let Block = Focus.components.common.block.component;

let Line = React.createClass({
    definitionPath: 'people',
    mixins: [Focus.components.list.selection.line.mixin],
    renderLineContent(data) {
        return (
            <PeopleCard picture='' name={data.peoName} subName=''/>
        );
    }
});

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'movieProducers',
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ['producers']}],
    action: movieProducersActions,
    renderContent() {
        return (
            <Block title='movie.detail.producers.title'>
                {this.listFor('producers', {lineComponent: Line})}
            </Block>
        );
    }
});
