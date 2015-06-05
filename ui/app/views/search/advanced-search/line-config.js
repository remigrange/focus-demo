
let MovieLineComponent = require('../lines/movieLineComponent');
let PeopleLineComponent = require('../lines/peopleLineComponent');
module.exports = {
  lineMap: {
    'movie': MovieLineComponent,
    'people': PeopleLineComponent
  },
  onLineClick(data){
      //Should be on the line and not in the config
      var url = '';
      if(data.movId !== undefined && data.movId !== null){
          url = `#movie/${data.movId}`;
      } else {
          if(data.peoId !== undefined && data.peoId !== null){
              url = `#people/${data.peoId}`;
          }
      }
      Backbone.history.navigate(url, true);
  }
};
