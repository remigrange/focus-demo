/*global React, Focus */
//Récupération des dépendances.
var createDetail = Focus.components.page.createDetail;
var Detail = Focus.components.common.detail.component;

//Blocs composants la page.
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');
//Composants du cartouche
var SummaryMovie = React.createClass({
  render: function(){return (<div>SUMMARY {this.props.id || 'no Id'} ..............</div>); }
});

var CartridgeMovie = require('./cartridge');

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = createDetail({
  displayName: 'MovieView',
  cartridgeConfiguration: function() {
     var props = {id: this.props.id, hasForm: false};
     return {
      summary: {component: SummaryMovie, props: props},
      cartridge: {component: CartridgeMovie, props: props}
    };
  },
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
