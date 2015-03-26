var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = focus.components.common.title.component;
module.exports = React.createClass({
  definitionPath: 'people',
  displayName: 'peopleIdentification',
  mixins: [formMixin],
  stores: [{store: peopleStore, properties: ['people']}],
  action: peopleActions,
  renderContent: function render() {
    return (
      <div className='slidingBloc'>
        <Title id="identification" title="IDENTIFICATION"/>
          {this.fieldFor('lastName')}
          {this.fieldFor('firstName')}
          {this.fieldFor('imdbid')}
      </div>
    );
  }
});
