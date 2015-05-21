
//Récupération des dépendances.
var StickyNavigation = Focus.components.common.stickyNavigation.component;
var Title = Focus.components.common.title.component;

//Blocs composants la page.
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');


/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = React.createClass({
    /** @inheritedDoc */
    displayName: 'MovieView',
    /** @inheritedDoc */
    render: function renderMovieView() {
        return (

            <div className="detail movie-view">
                <StickyNavigation contentSelector="body"/>
                <div className="detail-content">
                  <MovieDetails id={this.props.id}/>
                  <Castings id={this.props.id}/>
                  <MovieProducers id={this.props.id}/>
                  <MovieDirectors id={this.props.id}/>
                  <MoviePictures id={this.props.id}/>
                </div>
            </div>
        );
    }
});


/*
<Detail navigation={false}>
  <MovieDetails id={this.props.id}/>
  <Castings id={this.props.id}/>
  <MovieProducers id={this.props.id}/>
  <MovieDirectors id={this.props.id}/>
  <MoviePictures id={this.props.id}/>
</Detail>
 */
