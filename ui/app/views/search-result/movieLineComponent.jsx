/*global React, Focus.components */
module.exports = React.createClass({
  mixins: [Focus.components.list.selection.line.mixin],
  definitionPath: 'movie',
  renderLineContent: function (data) {
    var id = React.createElement('div', null, data.id);
    var logo = <div className="movie-background fa fa-film" ></div>;
    var movieTilte = this.displayFor('title', {style: {className: 'title-level-1'}});
    var genreIds = this.displayFor('genreIds', {style: {className: 'title-level-2'}});
    var released = this.displayFor('released', {style: {className: 'title-level-3'}});
    if(!data.genreIds){
      genreIds = '';
    }
    if(!data.released){
      released = '';
    }
    var item = <div className='item'>{movieTilte} {genreIds} {released} </div>
    var root = React.createElement('div', null, id, logo, item);
    return root;
  }
});
