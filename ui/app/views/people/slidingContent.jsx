var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = focus.components.common.title.component;
var MovieCard = require('./movieCard');
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'slidingContent',
  getInitialState: function () {
    this.state = {
      filmography: []
    };
    return this.state;
  },
  mixins: [formMixin],
  stores: [{store: peopleStore, properties: ['people', 'filmography']}],
  action: {
    load: function load(id) {
      peopleActions.load(id);
      peopleActions.loadFilmography(id);
    }
  },
  renderContent: function renderSlidingContent() {
    return (
      <div id='slidingContent'>
        <div className='slidingBloc'>
          <Title id="identification" title="IDENTIFICATION"/>
          {this.fieldFor('lastName')}
          {this.fieldFor('firstName')}
          {this.fieldFor('imdbid')}
        </div>
        <div className='slidingBloc'>
          <Title id="filmography" title="FILMOGRAPHY"/>
          {this.state.filmography.map(function (movie) {
            return (
              <MovieCard picture="" name={movie.title} middleName={movie.genresIds} subName={movie.year}/>
            );
          })}
        </div>
        <div className='slidingBloc noBorderBottom'>
          <Title id="pictures" title="PICTURES"/>
        </div>
      </div>
    );
  }
});
