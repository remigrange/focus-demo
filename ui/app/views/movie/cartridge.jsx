module.exports = React.createClass({
    getInitialState: function () {
        this.props.movie = {actors: [],
            producers: [],
            directors: []};
        return this.state;
    },
    render: function renderMovieDetail() {
        return (
            <div>
                <div className="header">
                    <div className="picture"></div>
                    <div className="title">{this.props.movie.title}</div>
                    <div className="year">{this.props.movie.released}</div>
                </div>
                <div className="field">
                    <div className="title">{"GENRES"}</div>
                    <div className="content">
                        {this.props.movie.genreIds}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"DIRECTORS"}</div>
                    <div className="content">
                        {this.props.movie.directors.map(function (people) {
                            return (
                                <div>{people.peoName}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"PRODUCERS"}</div>
                    <div className="content">
                        {this.props.movie.producers.map(function (people) {
                            return (
                                <div>{people.peoName} {people.comment}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"MAIN ACTORS"}</div>
                    <div className="content">
                        {this.props.movie.actors.map(function (people) {
                            return (
                                <div>{people.peoName}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"COUNTRIES"}</div>
                    <div className="content">
                        {this.props.movie.countryIds}
                    </div>
                </div>
                <div className="field">
                    <div className="title">{"LANGUAGES"}</div>
                    <div className="content">
                        {this.props.movie.languageIds}
                    </div>
                </div>
            </div>
        );
    }
});
