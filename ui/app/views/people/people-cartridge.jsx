// Stores

let peopleStore = require('../../stores/people');

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let peopleActions = require('../../action/people');


module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'PeopleCartridge',
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ['people']}],
    action: peopleActions,
    renderContent() {
        console.log('RENDERING PEOPLE CARTRIDGE');
        return (
            <div className='cartridge'>
                <div className='header'>
                    <div className='picture'>
                        <i className='fa fa-user'></i>
                    </div>
                    <div className='link'><a href=''>IMDB</a></div>
                    <div className='title'>{this.state.peoName}</div>
                    <div className='professions'>{this.state.professions}</div>
                </div>
                <div className='field'>
                    <div className='title'>{'PROFESSIONS'}</div>
                    <div className='content'>
                        {this.state.professions}
                    </div>
                </div>
            </div>
        );
    }
});
