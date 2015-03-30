var PeopleDetails = require('./peopleDetails');
var PeopleFilmography = require('./peopleFilmography');
var PeoplePictures = require('./peoplePictures');
var MovieCartridge = require('./cartridge');
module.exports = React.createClass({
    displayName: 'slidingContent',
    render: function renderSlidingContent() {
        return (
            <div className="details">
                <MovieCartridge id={this.props.id} style={{className: 'cartridgeCss'}}/>
                <div id='slidingContent'>
                    <PeopleDetails id={this.props.id}/>
                    <PeopleFilmography id={this.props.id}/>
                    <PeoplePictures id={this.props.id}/>
                </div>
            </div>
        );
    }
});
