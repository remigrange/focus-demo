//Get the form mixin.
var MovieCartridge = require('./cartridge');
var SlidingContent = require('./slidingContent');

var StickyNavigation = focus.components.common.stickyNavigation.component;

module.exports = React.createClass({
    render: function renderPeopleView() {
        return (
            <div className="peopleView">
                <StickyNavigation contentSelector="body"/>
                <SlidingContent id={this.props.id}/>
                <MovieCartridge id={this.props.id} style={{className: 'cartridgeCss'}}/>
            </div>
        );
    }
});
