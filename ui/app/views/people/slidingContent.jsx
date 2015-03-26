var PeopleDetails = require('./peopleDetails');
var PeopleFilmography = require('./peopleFilmography');

module.exports = React.createClass({
  displayName: 'slidingContent',
  render: function renderSlidingContent() {
    return (
      <div className="details">
        <div id='slidingContent'>
          <PeopleDetails id={this.props.id}/>
          <PeopleFilmography id={this.props.id}/>

        </div>
      </div>
    );
  }
});
