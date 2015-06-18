let movieStore = require('stores/movie');
let movieAction = require('action/movie');

let formBehaviour = Focus.components.common.form.mixin;
let i18nBehaviour = Focus.components.common.i18n.mixin;
let map = _.map;

let MoviePreview = React.createClass({
    mixins: [i18nBehaviour, formBehaviour],
    definitionPath: 'movie',
    stores: [{
        store: movieStore,
        properties: ['movie']
    }],
    action: movieAction.movie,
    renderContent() {
        if (this.state && this.state.movId) {
            return (
                <div data-focus='movie-preview'>
                    <div data-focus='head'>
                        <div data-focus='poster'>
                            {this.state.poster &&
                            <img src={this.state.poster}/>
                            }
                            {!this.state.poster &&
                            <div data-focus='empty'>
                                <i className='fa fa-film'></i>
                            </div>
                            }
                        </div>
                        <div data-focus='summary'>
                            <h3>{this.textFor('title')}</h3>
                            <p>{this.textFor('released')}</p>
                        </div>
                    </div>
                    <div data-focus='details'>
                        <h4>{this.i18n('movie.preview.details')}</h4>
                        {this.displayFor('languageIds')}
                        {this.displayFor('genreIds')}
                    </div>
                </div>
            );
        } else {
            return (
                <div data-focus='preview-loader'>
                    <i className='fa fa-circle-o-notch fa-spin'></i>
                </div>
            );
        }
    }
});

module.exports = MoviePreview;
