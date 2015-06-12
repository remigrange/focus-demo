let QuickSearch = Focus.components.search.searchBar.component;
module.exports = React.createClass({
    render() {
        return (
            <div className='cartridge-search'>
              <h1>Que recherchez vous</h1>
              <QuickSearch />
            </div>
        );
    }
});
