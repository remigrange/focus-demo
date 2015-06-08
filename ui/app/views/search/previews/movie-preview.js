let MovieCartridge = require('views/movie/movie-cartridge');
let MovieDetails = require('views/movie/movie-details');

let MoviePreview = React.createClass({
    render() {
        return (
            <div>
                <MovieCartridge id={this.props.data.movId}/>
                <MovieDetails id={this.props.data.movId}/>
            </div>
        );
    }
});

module.exports = MoviePreview;