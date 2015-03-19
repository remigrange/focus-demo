var MovieCartridge = require('./cartridge');

module.exports = React.createClass({
    displayName: "MovieCartridge",
    render: function () {
        return (
            <div className="movieView">
                <div className="slidingContent">
                </div>
                <div className="movieCartridge">
                    <MovieCartridge id={this.props.id} />
                </div>
            </div>
        );
    }
});
