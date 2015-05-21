
//Récupération des dépendances.
var detailMixin = Focus.components.page.detail.mixin;
var Detail = Focus.components.common.detail.component;

//Blocs composants la page.
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');
//Composants du cartouche
var SummaryMovie = React.createClass({render: function(){<div>SUMMARY ..............</div>}});
var CartridgeMovie = React.createClass({render: function(){<div>CARTRIDGE ..............</div>}});

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = React.createClass({
    mixins: [detailMixin],
    cartridgeConfiguration : {
      summary: SummaryMovie,
      cartridge: CartridgeMovie
    },
    /** @inheritedDoc */
    displayName: 'MovieView',
    /** @inheritedDoc */
    render: function renderMovieView() {
        return (
          <Detail>
            <MovieDetails id={this.props.id}/>
            <Castings id={this.props.id}/>
            <MovieProducers id={this.props.id}/>
            <MovieDirectors id={this.props.id}/>
            <MoviePictures id={this.props.id}/>
          </Detail>
        );
    }
});


/*

 */
