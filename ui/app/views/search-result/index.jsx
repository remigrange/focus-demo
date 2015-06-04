// Components

let MoviePreview = require('./moviePreview');
let MovieLineComponent = require('./movieLineComponent');

let PeoplePreview = require('./peoplePreview');
let PeopleLineComponent = require('./peopleLineComponent');

let SearchResult = require('./searchResult');



//Configuration des props du composant de vue de recherche.
let config = {
  onLineClick: function onLineClick(data) {
    let url = '';
    if (data.movId !== undefined && data.movId !== null) {
      url = '#movie/' + data.movId;
    } else {
      if (data.peoId !== undefined && data.peoId !== null) {
        url = '#people/' + data.peoId;
      }
    }
    Backbone.history.navigate(url, true);
    $('.quick-search-popin .popin-close-btn').click();
    //On ferme la popin de preview si elle est affichée.
    let qsPreview = $('.preview-popin .popin-close-btn');
    if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
      qsPreview.click();
    }
  },
  operationList: [
    {
      label: '', action: function (data) {
      let Preview = MoviePreview;
      if(!data.movId){
        Preview = PeoplePreview;
      }
      Focus.application.render(Preview, '#previewModal',
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

let parentselector = '.quick-search-popin';

let qs = React.createElement(SearchResult, {
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
  mixins: [Focus.components.application.popin.mixin],
  renderPopinHeader(popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'quick-search-popin-header'
      }, 'Quick search')
    );
  },
  renderPopinFooter(popin) {
    return React.createElement('div', null, '');

  },
  renderContent(popin) {
    return qs;
  },
  /** @inheritdoc */
  componentDidMount() {
    let source = document.querySelector(this.props.displaySelector);
    let currentView = this;
    if (source !== undefined && source !== null) {
      source.onclick = function () {
        currentView._toggleOpen();
      };
    }
  }
});
