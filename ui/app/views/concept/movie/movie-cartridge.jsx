// Stores

let movieStore = require('stores/movie');

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let movieActions = require('action/movie').movie;


module.exports = React.createClass({
    definitionPath: 'movie',
    displayName: 'MovieCartridge',
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ['movie']}],
    action: movieActions,
    renderContent() {
        return (
            <div className='cartridge-movie'>
                <div className='poster'>
                    <img src={this.state.poster}/>
                </div>
                <div className='summary'>
                    <h1 className='title'>{this.state.title}</h1>
                    <h2 className='year'>{this.state.year}</h2>
                    <h3 className='country'>{this.state.countryIds}</h3>
                </div>
            </div>
        );
    }
});
