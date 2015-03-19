//Get the form mixin.
var formMixin = focus.components.common.form.mixin;
var MovieCartridge = require('./cartridge');
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports = React.createClass({
    definitionPath: "movie",
    displayName: "MovieView",
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,

    renderContent: function () {
        return (
            <div className="movieView">
                <div className="slidingContent">
                </div>
                <div className="movieCartridge">
                    <MovieCartridge movie={this.state} />
                </div>
            </div>
        );
    }
});
