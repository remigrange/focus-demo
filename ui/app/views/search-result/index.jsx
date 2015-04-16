/*global focusComponents, React*/
var lineResume = require('./lineResume');
var SearchResult = require('./searchResult');
//Composant d'une ligne.
var PeopleLineComponent = require('./peopleLineComponent');
var MovieLineComponent = require('./movieLineComponent');

//Configuration des props du composant de vue de recherche.
var config = {
  onLineClick: function onLineClick(data) {
    var url = '';
    if (data.movId !== undefined && data.movId !== null) {
      url = '#movie/' + data.movId;
    } else {
      if (data.peoId !== undefined && data.peoId !== null) {
        url = '#people/' + data.peoId;
      }
    }
    Backbone.history.navigate(url, true);
  },
  operationList: [
    {
      label: '', action: function (data) {
      focus.application.render(lineResume, '#modalContainer',
        {
          props: {
            data: data,
            position: 'right',
            open: true,
            style: {className: 'preview-popin'}
          }
        });
    }, style: {className: 'preview'}, priority: 1
    }
  ],
  scopes: [
    {code: 'ALL', label: 'ALL'},
    {code: 'MOVIE', label: 'MOVIE'},
    {code: 'PEOPLE', label: 'PEOPLE'}
  ],
  scope: 'ALL',
  idField: 'movId',
  groupMaxRows: 3
};

module.exports = React.createClass({
  mixins: [focusComponents.application.popin.mixin],
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: ''
      }, '')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');

  },
  renderContent: function (popin) {
    return <SearchResult
      lineMap= {{'Movies': MovieLineComponent, 'People': PeopleLineComponent, 'MOVIE':MovieLineComponent, 'PEOPLE': PeopleLineComponent}}
      onLineClick = {config.onLineClick}
      operationList = {config.operationList}
      scopeList = {config.scopes}
      scope = {config.scope}
      idField = {config.idField}
      groupMaxRows= {config.groupMaxRows}/>;
  }
});
