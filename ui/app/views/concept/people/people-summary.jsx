// Stores

let peopleStore = require('stores/people');

// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let peopleActions = require('action/people').people;


module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'PeopleSummary',
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ['people']}],
    action: peopleActions,
    renderContent() {
        return <h1>{this.textFor('peoName')}</h1>;
    }
});
