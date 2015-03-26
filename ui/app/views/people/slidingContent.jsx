var PeopleDetails = require('./peopleDetails');
var PeopleFilmography = require('./peopleFilmography');
var PeoplePictures = require('./peoplePictures');
module.exports = React.createClass({
  displayName: 'slidingContent',
  render: function renderSlidingContent() {
    return (
      <div className="details">
        <div id='slidingContent'>
          <PeopleDetails id={this.props.id}/>
          <PeopleFilmography id={this.props.id}/>
          <PeoplePictures id={this.props.id}/>
        </div>
      </div>
    );
  }
});
