/*global React, focusComponents */
module.exports = React.createClass({
  mixins: [focusComponents.list.selection.line.mixin],
  definitionPath: 'people',
  renderLineContent: function (data) {
    var id = React.createElement('div', null, data.id);
    var logo = <div className="movie-background fa fa-user" ></div>;
    var userName = this.displayFor('peoName', {style: {className: 'title-level-1'}});
    var item = <div className='item'>{userName}</div>
    var root = React.createElement('div', null, id, logo, item);
    return root;
  }
});
