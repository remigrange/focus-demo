/*global React*/
let assign = _.assign;
//Get the component
let AdvancedSearch = require('./advanced-search-component');

//Build the props for each configuration.
let props = assign(
  {},
  require('./facet-config'),
  require('./column-config'),
  require('./line-config')
);



//Instanciate the component with the props.
module.exports = React.createClass({
  render(){
    return (<AdvancedSearch {...props} />);
  }
});
