// Components

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;

// Mixins

let i18nMixin = Focus.components.common.i18n.mixin;

let Group = React.createClass({
    mixins: [i18nMixin],
    render() {
        return (
            <div className="listResultContainer panel" data-focus="group-result-container">
                <Title title={`${this.props.groupKey} (${numberFormatter.format(this.props.count, '(0,0)')})`}/>
                <p>{this.i18n('search.mostRelevant')}</p>
                <div className="resultContainer">
                    {this.props.children}
                </div>
                <div data-focus='group-actions'>
                    <Button handleOnClick={this.props.showAll(this.props.groupKey)}
                            label={this.i18n('show.all')}/>
                </div>
            </div>
        );
    }
});

module.exports = Group;
