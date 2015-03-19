//Get the form mixin.
var formMixin = focus.components.common.form.mixin;
var Field = focus.components.common.field.component;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports = React.createClass({
    definitionPath: "movie",
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,
    getInitialState: function () {
        return {
                actors: [],
                producers: [],
                directors: []
                }
    },
    renderContent: function renderMovieDetail() {
        return (
            <div>
                <div className="header">
                    <div className="picture"></div>
                    <div className="title">{this.state.title}</div>
                    <div className="year">2006</div>
                </div>
                <div className="field">
                    <div className="title">{"GENRES"}</div>
                    <div className="content">
                        {this.state.genres}
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
                        {this.state.countrys}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"LANGUAGES"}</div>
                    <div className="content">
                        {this.state.languages}
                    </div>
                </div>
            </div>
        );
    }
});
