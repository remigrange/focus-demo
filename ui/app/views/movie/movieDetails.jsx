var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Block = focus.components.common.block.component;
module.exports = React.createClass({
  definitionPath: 'movie',
  displayName: 'movieDetails',
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ['movie']}],
  action: movieActions,
  renderContent: function render() {
      return (
        <div>
          <Block title="DETAILS" style={{className: "slidingBlock", titleId: "details"}}>
            {this._renderActions()}
            {this.fieldFor('title'), {isEdit: true}}
            {this.fieldFor('released')}
            {this.fieldFor('runtime')}
            {this.fieldFor('countryIds')}
            {this.fieldFor('languageIds')}
            {this.fieldFor('genreIds')}
          </Block>
          <Block title="STORYLINE" style={{className: "slidingBlock", titleId: "storyline"}}>
            {this.state.description}
          </Block>
        </div>
      );
  }
});
