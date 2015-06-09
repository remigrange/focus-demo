let MovieCartridge = require('views/movie/movie-cartridge');
let MovieIdentity = require('views/movie/movie-identity');

let MoviePreview = React.createClass({
    render() {
        return (
            <div>
                <MovieCartridge id={this.props.data.movId}/>
                <MovieIdentity id={this.props.data.movId}/>
            </div>
        );
    }
});

module.exports = MoviePreview;