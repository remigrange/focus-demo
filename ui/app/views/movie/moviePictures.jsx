var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
module.exports = React.createClass({
  definitionPath: "movie",
  displayName: "moviePictures",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["movie"]}],
  action: movieActions,
  renderContent: function render() {
    return (
      <div className='slidingBloc noBorderBottom'>
        <Title id="pictures" title="PICTURES"/>
      </div>
    );
  }
});
