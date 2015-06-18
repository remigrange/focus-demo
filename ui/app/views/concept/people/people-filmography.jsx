//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Stores

let peopleStore = require('stores/people');

// Actions

let peopleActions = require('action/people').filmography;

// Components

let MovieCard = require('../movie/movie-card');
let Block = Focus.components.common.block.component;

let Line = React.createClass({
    definitionPath: 'movie',
    mixins: [Focus.components.list.selection.line.mixin],
    renderLineContent(data) {
        return (
            <MovieCard picture='' name={data.title} middleName={data.genreIds} />
        );
    }
});
module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'peopleFilmography',
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ['filmography']}],
    action: peopleActions,
    renderContent() {
        return (
            <Block title='people.detail.filmography.title'>
              {this.listFor('filmography', {lineComponent: Line})}
            </Block>
          );
    }
});
