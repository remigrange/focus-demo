/*global React*/
var formMixin = Focus.components.common.form.mixin;
var movieActions = require('../../action/movie').movie;
var movieStore = require('../../stores/movie');

var Field = React.createClass({
  getDefaultProps: function(){
    return {
      title: ''
    };
  },
  render: function renderField(){
    return (
      <div className='field'>
        <div className='title'>{this.props.title}</div>
        <div className='content'>{this.props.children}</div>
      </div>
    );
  }

});


module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'MovieCartridge',
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ['movie']}],
    action: movieActions,
    renderContent: function renderMovieCartridge() {
        return (
            <div className="movie-cartridge">
              <div className='picture'><img src="./static/img/logoMovie.png" /></div>
              <div className='title'>{this.state.title}</div>
              <div className='year'>{this.state.year}</div>
              <div className='country'>{this.state.countryIds}</div>
            </div>
        );
    }
});
