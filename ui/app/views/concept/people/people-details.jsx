// Mixins

let formMixin = Focus.components.common.form.mixin;

// Actions

let peopleActions = require('action/people').people;

// Stores

let peopleStore = require('stores/people');

// Components

let Block = Focus.components.common.block.component;

module.exports = React.createClass({
    definitionPath: 'people',
    displayName: 'peopleDetails',
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ['people']}],
    action: peopleActions,
    renderContent() {
        return (
            <Block title='people.detail.identity.title' actions={this._renderActions}>
                {this.fieldFor('lastname')}
                {this.fieldFor('firstName')}
                {this.fieldFor('imdbid')}
            </Block>
        );
    }
});
