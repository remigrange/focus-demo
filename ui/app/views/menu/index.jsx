// Mixins
let menuMixin = Focus.components.application.menu.mixin;

// Components

let Popin = Focus.components.application.popin.component;
let QuickSearch = require('views/search/quick-search');

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
    _getItems() {
        return ([
            {
                icon: 'home',
                route: 'home',
                name: 'Home',
                onClick: this._closeQuickSearchPopin
            },
            {
                icon: 'search',
                name: 'Search',
                onClick: this._toggleQuickSearchPopin
            },/*
            {
                icon: 'video-camera',
                route: '',
                onClick: this._closeQuickSearchPopin
            },
            {
                icon: 'user',
                route: '',
                onClick: this._closeQuickSearchPopin
            },
            {
                icon: 'cog',
                route: '',
                onClick: this._closeQuickSearchPopin
            },
            {
                icon: 'info-circle',
                route: '',
                onClick: this._closeQuickSearchPopin
            }*/
        ]);
    },
    _toggleQuickSearchPopin() {
        this.refs['quick-search-popin'].toggleOpen();
    },
    _closeQuickSearchPopin() { // for now the popin is controlled this way, maybe a future improvement would be to use the "opened" prop of the popin
        if (this.refs['quick-search-popin'].state.opened) {
            this._toggleQuickSearchPopin();
        }
    },
    _togglePreviewPopin(previewComponent) {
        if (previewComponent) {
            this.setState({previewComponent});
        }
        this.refs['preview-popin'].toggleOpen();
    },
    _onQuickSearchPopinClose() {
        if (this.refs['preview-popin'].state.opened) {
            this.refs['preview-popin'].toggleOpen();
        }
    },
    render() {
        return (
            <div>
                <Menu
                    open={true}
                    position='left'
                    direction='vertical'
                    title=''
                    items={this._getItems()}
                    ref='menu'
                    >
                </Menu>
                <Popin data-focus='quick-search-popin' onPopinClose={this._onQuickSearchPopinClose} ref='quick-search-popin' type='from-menu'>
                    <QuickSearch closePopin={this._closeQuickSearchPopin} menuRef={this} togglePreviewPopin={this._togglePreviewPopin}/>
                </Popin>
                <Popin
                    overlay={false}
                    type='from-menu'
                    level={1}
                    ref='preview-popin'
                    >
                    {this.state && this.state.previewComponent}
                </Popin>
            </div>
        );
    }
});

module.exports = Wrapper;
