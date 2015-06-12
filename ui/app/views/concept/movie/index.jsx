// Dependencies
let createDetail = Focus.components.page.createDetail;
let Detail = Focus.components.common.detail.component;

// Components

let MovieDetails = require('./movie-identity');
let MovieCastings = require('./movie-castings');
let MovieProducers = require('./movie-producers');
let MovieDirectors = require('./movie-directors');
let MoviePictures = require('./movie-pictures');
let CartridgeMovie = require('./movie-cartridge');


// Composants du cartouche

let SummaryMovie = React.createClass({
    render() {
        return (
            <div>
                SUMMARY {this.props.id || 'no Id'} ..............
            </div>
        );
    }
});

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = createDetail({
    displayName: 'MovieView',
    cartridgeConfiguration() {
        let props = {id: this.props.id, hasForm: false};
        return {
            summary: {component: SummaryMovie, props: props},
            barLeft:{component: Focus.components.common.button.back.component},
            cartridge: {component: CartridgeMovie, props: props},
            actions: {
                primary: [
                    {
                        label: 'imprimer',
                        action: () => {
                            console.log('print primaire');
                        },
                        icon: 'print'
                    },
                    {
                        label: 'archiver',
                        action: () => {
                            console.log('archiver primaire');
                        },
                        icon: 'archive'
                    }
                ],
                secondary: [
                    {
                        label: 'imprimer Secondaire',
                        action: () => {
                            console.log('print secondaire');
                        },
                        icon: 'print'
                    },
                    {
                        label: 'archiver',
                        action: () => {
                            console.log('archiver secondaire');
                        },
                        icon: 'archive'
                    }
                ]
            }
        };
    },
    render() {
        return (
            <Detail>
                <MovieDetails id={this.props.id}/>
                <MovieCastings id={this.props.id}/>
                <MovieProducers id={this.props.id}/>
                <MovieDirectors id={this.props.id}/>
                <MoviePictures id={this.props.id}/>
            </Detail>
        );
    }
});
