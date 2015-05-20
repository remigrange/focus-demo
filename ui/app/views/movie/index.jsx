//Get the form mixin.
var SlidingContent = require('./slidingContent');
var StickyNavigation = Focus.components.common.stickyNavigation.component;

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
