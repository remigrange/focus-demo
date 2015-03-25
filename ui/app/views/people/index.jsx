//Get the form mixin.
var MovieCartridge = require('./cartridge');
var SlidingContent = require('./slidingContent');

var StickyNavigation = focus.components.common.stickyNavigation.component;

module.exports = React.createClass({
    render: function renderPeopleView() {
        return (
            <div className="movieView">
                <StickyNavigation contentSelector="#slidingContent"/>
                <div className="details">
                    <SlidingContent id={this.props.id} style={{className: 'slidingContentCss'}}/>
                </div>
                <MovieCartridge id={this.props.id} style={{className: 'cartridgeCss'}}/>
            </div>
        );
    }
});
