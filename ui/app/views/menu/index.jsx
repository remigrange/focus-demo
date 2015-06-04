// Mixins

let menuMixin = Focus.components.application.menu.mixin;

// Components

let QuickSearchPopin = require('views/search/quick-search/popin');

let Menu = React.createClass({
    mixins: [menuMixin],
    renderContent() {
        if (this.props.type === 'menuLeft') {
            return this.props.links.map(function (link) {
                if (!link.img) {
                    return <a href={link.url}>link.title</a>;
                } else {
                    return <a href={link.url}><img src={link.img}/></a>;
                }
            });
        }
        return this.renderLinks();
    }
});


let Wrapper = React.createClass({
    _getLinks() {
        return ([
            {
                icon: 'home',
                route: 'home',
                clickHandler: this._closeQuickSearchPopin
            },
            {
                icon: 'search',
                clickHandler: this._toggleQuickSearchPopin
            }
        ]);
    },
    _toggleQuickSearchPopin() {
        this.refs['quick-search-popin'].toggleOpen();
    },
    _closeQuickSearchPopin() { // for now the popin is controlled this way, maybe a future improvement would be to use the "opened" prop of the popin
        if (this._quickSearchPopinOpened) {
            this._quickSearchPopinOpened = false;
            this._toggleQuickSearchPopin();
        }
    },
    render() {
        return (
            <Menu
                open={true}
                position='left'
                direction='vertical'
                title=''
                links={this._getLinks()}
                ref='menu'
                brand='static/img/brand.png'
            >
                <QuickSearchPopin ref='quick-search-popin'/>
            </Menu>
        );
    }
});

module.exports = Wrapper;
