var Title = focus.components.common.title.component;
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');

var MovieCartridge = require('./cartridge');

module.exports = React.createClass({
    displayName: 'slidingContent',
    render: function renderSlidingContent() {
        return (
            <div className="detail-content">
                <MovieCartridge id={this.props.id} style={{className: 'catridgeContainer'}}/>
                <div id="slidingContent">
                    <MovieDetails id={this.props.id}/>
                    <Castings id={this.props.id}/>
                    <MovieProducers id={this.props.id}/>
                    <MovieDirectors id={this.props.id}/>
                    <MoviePictures id={this.props.id}/>
                </div>

            </div>
        );
    }
});
