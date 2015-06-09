/*global React, Focus.components */
module.exports = React.createClass({
    mixins: [Focus.components.list.selection.line.mixin],
    definitionPath: 'movie',
    renderLineContent: function (data) {
        return (
            <div className="movie-line">
                <div data-focus="sl-icon" className="fa fa-film" ></div>
                <div className="level1">{this.textFor('title')}</div>
                <div className="level2">{this.textFor('genreIds')}</div>
                <div className="level3">{this.textFor('released')}</div>
            </div>
        );
    }
});
