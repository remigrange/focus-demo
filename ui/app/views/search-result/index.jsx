/*global focusComponents, React*/
var MoviePreview = require('./moviePreview');
var PeoplePreview = require('./peoplePreview');
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
    //TODO check with PIERRE
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
  },
  operationList: [
    {
      label: '', action: function (data) {
      var Preview = MoviePreview;
      if(!data.movId){
        Preview = PeoplePreview;
      }
      focus.application.render(Preview, '#previewModal',
        {
          props: {
            data: data,
            position: 'right',
            open: true,
            style: {className: 'preview-popin'}
          }
        });
    }, style: {className: 'preview fa fa-eye'}, priority: 1
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

var parentselector = '.quick-search-popin';

var qs = React.createElement(SearchResult, {
  lineMap: {
    'Movies': MovieLineComponent,
    'People': PeopleLineComponent,
    'MOVIE': MovieLineComponent,
    'PEOPLE': PeopleLineComponent
  },
  onLineClick: config.onLineClick,
  operationList: config.operationList,
  scopeList: config.scopes,
  scope: config.scope,
  idField: config.idField,
  groupMaxRows: config.groupMaxRows,
  parentSelector: parentselector
});

module.exports = React.createClass({
  mixins: [focusComponents.application.popin.mixin],
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'quick-search-popin-header'
      }, 'Quick search')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');

  },
  renderContent: function (popin) {
   /* var parentselector;
    if (this.props.style.className !== null && this.props.style.className !== undefined) {
      parentselector = '.' + this.props.style.className;
    }
    return <SearchResult
      lineMap= {{
        'Movies': MovieLineComponent,
        'People': PeopleLineComponent,
        'MOVIE': MovieLineComponent,
        'PEOPLE': PeopleLineComponent
      }}
      onLineClick = {config.onLineClick}
      operationList = {config.operationList}
      scopeList = {config.scopes}
      scope = {config.scope}
      idField = {config.idField}
      groupMaxRows= {config.groupMaxRows}
      parentSelector = {parentselector}/>;*/
    return qs;
  }
});
