//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Store

let movieStore = require('../../stores/movie');

// Actions

let movieCastingActions = require('action/movie').castings;

// Components

let Block = Focus.components.common.block.component;
let PeopleCard = require('../people/people-card');

let Line = React.createClass({
    definitionPath: 'people',
    mixins: [Focus.components.list.selection.line.mixin],
    renderLineContent(data) {
        return (
            <PeopleCard picture='' name={data.peoName}
                        subName={'As (' + data.role + ') ' + (data.characterName!==undefined?data.characterName:'')}/>
        );
    }
});

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'movieCastings',
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ['castings']}],
    action: movieCastingActions,
    renderContent() {
        return (
            <Block title='movie.detail.cast.title'>
                {this.listFor('castings', {lineComponent: Line})}
            </Block>
        );
    }
});
