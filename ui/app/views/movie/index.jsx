//Get the form mixin.
var SlidingContent = require('./slidingContent');
var StickyNavigation = Focus.components.common.stickyNavigation.component;
var Title = Focus.components.common.title.component;
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');
module.exports = React.createClass({
    render: function renderMovieView() {
        return (
            <div className="detail movieView">
                <StickyNavigation contentSelector="body"/>
                <SlidingContent id={this.props.id}/>
            </div>
        );
    }
});
