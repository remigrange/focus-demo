/*global React, focusComponents */
var Field = focusComponents.common.field.component;
module.exports = React.createClass({
  mixins: [focusComponents.application.popin.mixin, focusComponents.common.mixin.definition, focusComponents.common.mixin.fieldComponentBehaviour],
  definitionPath: 'movie',
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
    var movieLink = '#movie/' + this.props.data.movId;
    var released = <div/>;
    if(this.props.data.released !== undefined && this.props.data.released !== null) {
      var options = {
        isEdit: false,
        hasLabel: false,
        value: this.props.data.released,
        refContainer: this.props.data.released,
        style: {className: 'movie-preview-release-date'}
      };
      var fieldProps = this._buildFieldProps('released', options, this);
      released = React.createElement(Field, fieldProps);
    }

    var root = <div> <div className ="movie-preview-header">
      <div className='movie-preview-picture'></div>
      <div className='movie-preview-description'>
        <div className="title-level-1">{this.props.data.title}</div>
        <div className="title-level-3">IMBD ID <span className='movie-preview-imdb-id'>{this.props.data.imdbId}</span></div>
        <div className="genres">{this.props.data.genreIds}</div>
        <div className="description">{this.props.data.description}</div>
      </div>
    </div>
    <div className='clear'></div>
    <div className ="movie-preview-detail">
      <div className='title'> Details</div>
      <div className='title-line'></div>
      <div className='movie-detail-line'><div className='movie-detail-label'>Country </div><div>{this.props.data.countryIds}</div></div>
      <div className='movie-detail-line'><div className='movie-detail-label'>Language </div><div>{this.props.data.languageIds}</div></div>
      <div className='movie-detail-line'><div className='movie-detail-label'>Released </div><div>{released}</div></div>
      <div className='movie-detail-line'><div className='movie-detail-label'>Runtime </div><div>{this.props.data.runtime}</div></div>
    </div>
    <div className="movie-preview-detailed-sheet" ><a href={movieLink}>Detailed sheet </a></div>
    </div>;

    return root;
  }
});
