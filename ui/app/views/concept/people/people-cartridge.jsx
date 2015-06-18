// Stores

let peopleStore = require('stores/people');

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let peopleActions = require('action/people').people;


module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'PeopleCartridge',
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ['people']}],
    action: peopleActions,
    renderContent() {
        return (
            <div className='cartridge-people'>
                <div className="photo fa fa-user fa-5x"></div>
                <div className='summary'>
                    <h1 className='title'>{this.state.peoName}</h1>
                    <h2 className='professions'>{this.state.professions}</h2>
                </div>
            </div>
        );
    }
});
