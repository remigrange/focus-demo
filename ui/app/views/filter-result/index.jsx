/*global focusComponents, React */
var SearchFilterResult = focusComponents.page.search.filterResult.component;
var Title = focusComponents.common.title.component;
var Button = focusComponents.common.button.action.component;

var serviceCommon = require('../../services');


var action = {
    search: function (criteria) {
        var page = criteria.pageInfos.page;
        if (page === undefined || page === null) {
            page = 0;
        }
        criteria.pageInfos.skip = page;
        criteria.group = criteria.pageInfos.group;
        if (criteria.group === undefined || criteria.group === null) {
            criteria.group = '';
        }
        if (criteria.pageInfos.order !== undefined) {
            criteria.pageInfos.sortFieldName = criteria.pageInfos.order.key;
            if (criteria.pageInfos.order.order !== undefined && criteria.pageInfos.order.order !== null) {
                if (criteria.pageInfos.order.order.toLowerCase() === 'asc') {
                    criteria.pageInfos.sortDesc = false;
                } else if (criteria.pageInfos.order.order.toLowerCase() === 'desc') {
                    criteria.pageInfos.sortDesc = true;
                }
            }
        } else {
            criteria.pageInfos.sortFieldName = undefined;
            criteria.pageInfos.sortDesc = undefined;
        }
        serviceCommon.common.searchByScope(criteria).then(
            function success(data) {

                var dataRet = {
                    facet: data.facet,
                    list: data.list,
                    pageInfos: {
                        currentPage: criteria.pageInfos.page,
                        perPage: 1000,
                        totalRecords: data.totalRecords
                    }
                };
                if (criteria.group) {
                    dataRet.pageInfos = {};
                }
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors: ', errors);
            }
        );
    }
};
var Line = React.createClass({
    mixins: [focusComponents.list.selection.line.mixin],
    renderLineContent: function (data) {
        return <div className="item">
            <div className="mov-logo" >
                <img src="./static/img/logoMovie.png"/>
            </div>
            <div>
                <div className="title-level-1">
                            {data.title}
                </div>
                <div className="title-level-2">
                            {data.genreIds}
                </div>
                <div className="title-level-3">
                            {data.released}
                </div>
            </div>
        </div>;
    }
});

var config = {
    facetConfig: {
        Language: 'text',
        Genre: 'text',
        Country: 'text'
    },
    orderableColumnList: {TITLE_SORT_ONLY: 'Title', GENRE_IDS: 'Genre'},
    operationList: [],
    lineComponent: Line,
    onLineClick: function onLineClick(line) {
        alert('click sur la ligne ' + line.title);
    },
    isSelection: true,
    lineOperationList: [
        {label: '',
         action: function(data) {
             alert(data.title);
         },
         style: 'preview-content',
         priority: 1},
    ],
    criteria: {
        scope: 'MOVIE',
        searchText: ''
    },
    idField: 'movId',
    groupMaxRows: 3
};

var seeMore = function () {
    seeMore();
};


module.exports = React.createClass({
    render: function () {
        config.criteria = {
            scope: this.props.scope,
            searchText: this.props.query
        };
        var filterResult = React.createElement(
            React.createClass({
                mixins: [focusComponents.page.search.filterResult.mixin],
                actions: action,
                store: new focus.store.SearchStore(),
                render: function () {
                    var root = React.createElement('div', {className: 'search-result'},
                        this.liveFilterComponent(),
                        React.createElement(
                            'div',
                            {className: 'resultContainer'},
                            this.listSummaryComponent(),
                            this.actionBarComponent(),
                            this.resultListComponent()
                        )
                    );
                    return root;
                },
                renderGroupBy: function renderGroupBy(groupKey, list, maxRows) {
                    var buttonSeeMore = <div></div>;
                    if (list.length > config.groupMaxRows) {
                        if(maxRows > config.groupMaxRows){
                            buttonSeeMore = <Button handleOnClick = {this.changeGroupByMaxRows(groupKey, config.groupMaxRows)} label = "See Less" className='btn-show-all' />;
                        } else {
                            buttonSeeMore = <Button handleOnClick = {this.changeGroupByMaxRows(groupKey, 10)} label = "See More" className='btn-show-all' />;
                        }
                    }
                    return <div className="listResultContainer panel">
                        <Title className="results-groupBy-title" title={groupKey} />
                             {this.renderSimpleList(groupKey, list, maxRows)}
                        <div className='btn-group-by-container'>
                            <div className = "btn-see-more-less" >{buttonSeeMore}</div>
                            <div className = "btn-show-all" ><Button handleOnClick = {this.showAllGroupListHandler(groupKey)} label = "Show all" /></div>
                        </div>
                    </div>;

                }
            }),
            config);
        return filterResult;
    }
});
