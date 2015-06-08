//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Stores

let peopleStore = require('../../stores/people');

// Actions

let peopleActions = require('../../action/people').filmography;

// Components

let Title = Focus.components.common.title.component;
let MovieCard = require('../movie/movie-card');
let FormList = Focus.components.common.list;

let Line = React.createClass({
    definitionPath: 'movie',
    mixins: [Focus.components.list.selection.line.mixin],
    renderLineContent(data) {
        return (
            <MovieCard picture='' name={data.title} middleName={data.genreIds} subName={data.year}/>
        );
    }
});
module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'peopleFilmography',
    mixins: [formMixin],
    getInitialState() {
        this.state = {
            filmography: []
        };
        return this.state;
    },
    stores: [{store: peopleStore, properties: ['filmography']}],
    action: {
        load(id) {
            peopleActions.loadFilmography(id);
        }
    },
    renderContent() {
        return (
            <div className='slidingBloc'>
                <Title id='filmography' title='FILMOGRAPHY'/>
                <FormList data={this.state.filmography} line={Line} perPage={5}/>
            </div>
        );
    }
});
