var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
module.exports = React.createClass({
  definitionPath: 'movie',
  displayName: 'movieDetails',
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["movie"]}],
  action: movieActions,
  renderContent: function render() {
      return (
        <div>
          <div className='slidingBloc'>
            <Title id="details" title="DETAILS"/>
            {this._renderActions()}
            {this.fieldFor('title'), {isEdit: true}}
            {this.fieldFor('released')}
            {this.fieldFor('runtime')}
            {this.fieldFor('countryIds')}
            {this.fieldFor('languageIds')}
            {this.fieldFor('genreIds')}
          </div>
          <div className='slidingBloc'>
            <Title id="storyline" title="STORYLINE"/>
            {this.state.description}
        </div>
        </div>
      );
  }
});
