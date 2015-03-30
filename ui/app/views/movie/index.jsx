//Get the form mixin.
var SlidingContent = require('./slidingContent');
var StickyNavigation = focus.components.common.stickyNavigation.component;

module.exports = React.createClass({
    render: function renderMovieView() {
        return (
            <div className="movieView">
                <StickyNavigation contentSelector="body"/>
                <SlidingContent id={this.props.id}/>
            </div>
        );
    }
});
