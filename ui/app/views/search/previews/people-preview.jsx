let PeopleCartridge = require('views/concept/people/people-cartridge');
let PeopleDetails = require('views/concept/people/people-details');

let PeoplePreview = React.createClass({
  render() {
    return (
        <div>
          <PeopleCartridge id={this.props.data.peoId}/>
          <PeopleDetails id={this.props.data.peoId}/>
        </div>
    );
  }
});

module.exports = PeoplePreview;