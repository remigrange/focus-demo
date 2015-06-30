// Mixins
let formMixin = Focus.components.common.form.mixin;

// Stores
let domainStore = require('stores/domain');

// Actions
let domainActions = require('action/domain').identity;

// Components
let Block = Focus.components.common.block.component;

module.exports = React.createClass({
    displayName: 'domainDetail',
    definitionPath: 'applicationUser',
    mixins: [formMixin],
    stores: [{store: domainStore, properties: ['identity']}],
    action: domainActions,
    renderContent: function renderMovieView() {
        return (
            <Block title='domain.detail.identity.title' actions={this._renderActions}>
                {this.fieldFor('firstName')}
                {this.fieldFor('lastName')}
                {this.fieldFor('email')}
                {this.fieldFor('birthDate')}
                {this.fieldFor('pseudo')}
                {this.fieldFor('age')}
            </Block>
        );
    }
});
