/*global React, focusComponents */
var Field = focusComponents.common.field.component;
module.exports = React.createClass({
  mixins: [focusComponents.application.popin.mixin, focusComponents.common.mixin.definition, focusComponents.common.mixin.fieldComponentBehaviour],
  definitionPath: 'people',
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'preview-popin-header'
      }, '')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function (data) {
    var peopleLink = '#people/' + this.props.data.peoId;

    var root = <div> <div className ="movie-preview-header">
      <div className='movie-preview-picture'></div>
      <div className='movie-preview-description'>
        <div className="title-level-1">{this.props.data.peoName}</div>
        <div className="title-level-3">IMBD ID <span className='movie-preview-imdb-id'>{this.props.data.imdbId}</span></div>
      </div>
    </div>
      <div className='clear'></div>
      <div className="movie-preview-detailed-sheet" ><a href={peopleLink}>Detailed sheet </a></div>
    </div>;

    return root;
  }
});
