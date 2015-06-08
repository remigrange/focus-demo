/*global React, Focus.components */
module.exports = React.createClass({
  mixins: [Focus.components.list.selection.line.mixin],
  definitionPath: 'people',
  renderLineContent: function (data) {
    return (
        <div className="people-line">
          <div data-focus="sl-icon" className="fa fa-user" ></div>
          <div className="level1">{this.textFor('peoName')}</div>
          <div className="level2">{this.textFor('userName')}</div>
        </div>
    );
  }
});
