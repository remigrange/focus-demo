var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports = React.createClass({
    definitionPath: "movie",
    displayName: "cartridge",
    getInitialState: function () {
        this.state = {actors: [],
            producers: [],
            directors: []};
        return this.state;
    },
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,
    renderContent: function renderMovieCartridge() {
        return (
            <div className="cartridge">
                <div className="header">
                    <div className="picture"><img src="./static/img/logoMovie.png" width="100%" height="100%"/></div>
                    <div className="title">{this.state.title}</div>
                    <div className="year">{this.state.year}</div>
                </div>
                <div className="field">
                    <div className="title">{"GENRES"}</div>
                    <div className="content">
                        {this.state.genreIds}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"DIRECTORS"}</div>
                    <div className="content">
                        {this.state.directors.map(function (people) {
                            return (
                                <div>{people.peoName}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"PRODUCERS"}</div>
                    <div className="content">
                        {this.state.producers.map(function (people) {
                            return (
                                <div>{people.peoName} {people.comment}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"MAIN ACTORS"}</div>
                    <div className="content">
                        {this.state.actors.map(function (people) {
                            return (
                                <div>{people.peoName}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"COUNTRIES"}</div>
                    <div className="content">
                        {this.state.countryIds}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"LANGUAGES"}</div>
                    <div className="content">
                        {this.state.languageIds}
                    </div>
                </div>
            </div>
        );
    }
});
