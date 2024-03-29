let peopleStore = require('stores/people');
let peopleAction = require('action/people');

let formBehaviour = Focus.components.common.form.mixin;
let i18nBehaviour = Focus.components.common.i18n.mixin;

// Components

let Button = Focus.components.common.button.action.component;

let PeoplePreview = React.createClass({
    mixins: [i18nBehaviour, formBehaviour],
    definitionPath: 'people',
    stores: [{
        store: peopleStore,
        properties: ['people']
    }],
    action: peopleAction.people,
    renderContent() {
        if (this.state && this.state.peoId) {
            return (
                <div data-focus='movie-preview'>
                    <div data-focus='head'>
                        <div data-focus='poster'>
                            {this.state.poster &&
                            <img src={this.state.poster}/>
                            }
                            {!this.state.poster &&
                            <div data-focus='empty'>
                                <i className='fa camera-retro'></i>
                            </div>
                            }
                        </div>
                        <div data-focus='summary'>
                            <h1>{this.textFor('peoName')}</h1>
                            <p>{this.textFor('imdbid')}</p>
                        </div>
                    </div>
                    <div data-focus='details'>
                        <h2>{this.i18n('quick-search.preview.details.title')}</h2>
                        {this.displayFor('firstName')}
                        {this.displayFor('lastName')}
                        {this.displayFor('comment')}
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
        let route = `#people/${this.state.peoId}`;
        Backbone.history.navigate(route, true);
        this.props.closePopin();
    }
});

module.exports = PeoplePreview;
