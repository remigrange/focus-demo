// Components

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;

// Mixins

let i18nMixin = Focus.components.common.i18n.mixin;

// Formatters

let numberFormatter = Focus.definition.formatter.number;

// Config

let scopeConfig = require('../../../../config/scopes');

let Group = React.createClass({
    mixins: [i18nMixin],
    _getShowAllHandler(key) {
        if (scopeConfig[key]) {
            key = scopeConfig[key];
        }
        return () => {
            this.props.showAllHandler(key);
        };
    },
    render() {
        return (
            <div className="listResultContainer panel" data-focus="group-result-container">
                <Title title={`${this.props.groupKey} (${numberFormatter.format(this.props.count, '(0,0)')})`}/>
                <p>{this.i18n('search.mostRelevant')}</p>
                <div className="resultContainer">
                    {this.props.children}
                </div>
                <div data-focus='group-actions'>
                    <Button handleOnClick={this.props.showMoreHandler} label={this.i18n('show.more')}/>
                    <Button handleOnClick={this._getShowAllHandler(this.props.groupKey)} label={this.i18n('show.all')}/>
                </div>
            </div>
        );
    }
});

module.exports = Group;
