// Mixins

let i18nMixin = Focus.components.common.i18n.mixin;

let PageTitle = React.createClass({
    mixins: [i18nMixin],
    render() {
        return (
            <span className="page-title">{this.i18n('search.advanced.page.title')}</span>
        );
    }
});

module.exports = PageTitle;
