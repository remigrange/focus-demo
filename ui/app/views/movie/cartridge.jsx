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
            <div className="cartridge-movie">
                <div className="poster">
                    Movie Poster
                </div>
                <div className="summary">
                    <h1 className='title'>{this.state.title}</h1>
                    <h2 className='year'>{this.state.year}</h2>
                    <h3 className='country'>{this.state.countryIds}</h3>
                </div>
            </div>
        );
    }
});
