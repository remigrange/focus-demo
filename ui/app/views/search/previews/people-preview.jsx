let PeopleCartridge = require('views/people/cartridge');
let PeopleDetails = require('views/people/peopleDetails');

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