/*global React, Focus*/
var formMixin = Focus.components.common.form.mixin;
var movieActions = require('../../action/movie').movie;
var movieStore = require('../../stores/movie');
var Block = Focus.components.common.block.component;

module.exports = React.createClass({
  definitionPath: 'movie',
  displayName: 'movieDetails',
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ['movie']}],
  action: movieActions,
  renderContent: function renderMovieView() {
      return (
          <Block title='movie.detail.identity.title' actions={this._renderActions}>
            {this.fieldFor('title')}
            {this.fieldFor('released')}
            {this.fieldFor('runtime')}
            {this.fieldFor('countryIds')}
            {this.fieldFor('languageIds')}
            {this.fieldFor('genreIds')}
          </Block>
      );
  }
});
/**
 *       <Block title='movie.detail.storyLine'>
         {this.state.description}
       </Block>
 */
