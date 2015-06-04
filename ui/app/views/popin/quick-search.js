let Popin = Focus.components.application.popin.component;
let QuickSearch = require('views/search/quick-search');

let QuickSearchPopin = React.createClass({
    render() {
        return (
            <Popin data-focus='quick-search-popin' ref='quick-search-popin' type='from-menu'>
                <QuickSearch togglePopin={this.refs['quick-search-popin'].toggleOpen}/>
            </Popin>
        );
    }
});

module.exports = QuickSearchPopin;