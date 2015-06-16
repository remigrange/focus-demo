let movieStore = require('stores/movie');
let movieAction = require('action/movie');

let storeBehaviour = Focus.components.common.mixin.storeBehaviour;
let i18n = Focus.components.common.i18n.mixin;

let map = _.map;

let MoviePreview = React.createClass({
    mixins: [storeBehaviour, i18n],
    stores: [{
        store: movieStore,
        properties: ['movie']
    }],
    componentWillMount() {
        movieAction.movie.load(this.props.data.movId);
    },
    render() {
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
                            <h3>{this.state.title}</h3>
                            <p>{this.state.released}</p>
                        </div>
                    </div>
                    <div data-focus='details'>
                        <h4>{this.i18n('movie.preview.details')}</h4>
                        <ul>
                            {map({
                                'movie.preview.language': this.state.languageIds,
                                'move.preview.genres': this.state.genreIds
                            }, (value, key) => {
                                return (
                                    <li><b>{`${this.i18n(key)} : `}</b>{value}</li>
                                );
                            })}
                        </ul>
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