var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
module.exports = React.createClass({
  definitionPath: "movie",
  displayName: "movieDetails",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["movie"]}],
  action: movieActions,
  renderContent: function render() {
    return (
      <div>
        <div className='slidingBloc'>
          <Title id="details" title="DETAILS"/>
          {this.displayFor("title")}
          {this.displayFor("released")}
          {this.displayFor("runtime")}
          {this.displayFor("countryIds")}
          {this.displayFor("languageIds")}
          {this.displayFor("genreIds")}
        </div>
        <div className='slidingBloc'>
          <Title id="storyline" title="STORYLINE"/>
          {this.state.description}
        </div>
      </div>
    );
  }
});
