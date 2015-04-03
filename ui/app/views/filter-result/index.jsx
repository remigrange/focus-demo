/*global focusComponents, React */
var FilterResult = require('./filterResult');
var Line = require('./lineComponent');

var config = {
    facetConfig: {
        Country: 'text',
        Genre: 'text',
        Language: 'text'
    },
    openedFacetList: {Genre: true},
    orderableColumnList: [
        {key: 'TITLE_SORT_ONLY', order: 'desc', label: 'Title desc'},
        {key: 'TITLE_SORT_ONLY', order: 'asc', label: 'Title asc'},
        {key: 'GENRE_IDS', order: 'desc', label: 'Genre desc'},
        {key: 'GENRE_IDS', order: 'asc', label: 'Genre asc'}],
    operationList: [],
    lineComponent: Line,
    onLineClick: function onLineClick(data) {
        var url = '';
        if(data.movId !== undefined && data.movId !== null){
            url = '#movie/' + data.movId;
        } else {
            if(data.peoId !== undefined && data.peoId !== null){
                url = '#people/' + data.peoId;
            }
        }
        Backbone.history.navigate(url, true);
    },
    isSelection: true,
    lineOperationList: [],
    criteria: {
        scope: 'MOVIE',
        searchText: ''
    },
    idField: 'movId',
    groupMaxRows: 3
};

module.exports = React.createClass({
    render: function () {
        config.criteria = {
            scope: this.props.scope,
            searchText: this.props.query
        };
        if(this.props.scope.toLowerCase() === 'movie'){
            config.idField = 'movId';
        } else if(this.props.scope.toLowerCase() === 'people'){
            config.idField = 'peoId';
            config.facetConfig = {};
            config.orderableColumnList = [
                {key: 'PEO_NAME', order: 'desc', label: 'Name desc'},
                {key: 'PEO_NAME', order: 'asc', label: 'Name asc'}];
            config.openedFacetList = {};
        }
        return <FilterResult
            facetConfig= {config.facetConfig}
            openedFacetList= {config.openedFacetList}
            orderableColumnList= {config.orderableColumnList}
            operationList= {config.operationList}
            lineComponent= {config.lineComponent}
            onLineClick= {config.onLineClick}
            isSelection= {config.isSelection}
            lineOperationList= {config.lineOperationList}
            criteria= {config.criteria}
            idField= {config.idField}
            groupMaxRows= {config.groupMaxRows}
        />;
    }
});
