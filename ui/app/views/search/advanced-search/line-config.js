let MovieLineComponent = require('../lines/movieLineComponent');
let PeopleLineComponent = require('../lines/peopleLineComponent');

module.exports = {
  lineMap: {
    'Movie': MovieLineComponent,
    'People': PeopleLineComponent
  },
  onLineClick(data) {
      //Should be on the line and not in the config
      let url = data.movId ? `#movie/${data.movId}` : `#people/${data.peoId}`;
      Backbone.history.navigate(url, true);
  }
};
