// Stores

let movieStore = require('stores/movie');

// Actions

let movieAction = require('action/movie');

// Mixins

let formBehaviour = Focus.components.common.form.mixin;
let i18nBehaviour = Focus.components.common.i18n.mixin;

// Components

let Button = Focus.components.common.button.action.component;

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
                            <h1>{this.textFor('title')}</h1>
                            <p>{this.textFor('released')}</p>
                        </div>
                    </div>
                    <div data-focus='details'>
                        <h2>{this.i18n('quick-search.preview.details.title')}</h2>
                        {this.displayFor('languageIds')}
                        {this.displayFor('genreIds')}
                    </div>
                    <div data-focus='footer'>
                        <Button handleOnClick={this._navigateToDetails}
                                label='button.navigateToDetails'
                                shape="ghost"/>
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
    },
    _navigateToDetails() {
        let route = `#movie/${this.state.movId}`;
        Backbone.history.navigate(route, true);
        this.props.closePopin();
    }
});

module.exports = MoviePreview;
