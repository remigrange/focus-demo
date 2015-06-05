let MovieCartridge = require('views/movie/cartridge');
let MovieDetails = require('views/movie/movieDetails');

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