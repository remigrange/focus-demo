//Get the form mixin.
var MovieCartridge = require('./cartridge');
var SlidingContent = require('./slidingContent');

var StickyNavigation = focus.components.common.stickyNavigation.component;

module.exports = React.createClass({
    render: function renderMovieView() {
        return (
            <div className="movieView">
                <StickyNavigation contentSelector="#slidingContent"/>
                <div className="movieDetails">
                    <SlidingContent id={this.props.id} style={{className:'slidingContentCss'}}/>

                    <MovieCartridge id={this.props.id} style={{className:'movieCartridgeCss'}}/>
                </div>
            </div>
        );
    }
});
