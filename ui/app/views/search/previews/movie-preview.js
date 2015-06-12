let MovieCartridge = require('views/concept/movie/movie-cartridge');
let MovieIdentity = require('views/concept/movie/movie-identity');

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