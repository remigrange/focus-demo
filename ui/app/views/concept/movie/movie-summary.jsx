

// Stores

let movieStore = require('stores/movie');

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let movieActions = require('action/movie').movie;


module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'MovieSummary',
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ['movie']}],
    action: movieActions,
    renderContent() {
        return <h1>{this.textFor('title')}</h1>;
    }
});
