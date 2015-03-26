/*global focusComponents, React */
var SearchFilterResult = focusComponents.page.search.filterResult.component;
var Title = focusComponents.common.title.component;
var Button = focusComponents.common.button.action.component

var serviceCommon = require('../../services');



var action = {

    search: function(criteria) {
        var page = criteria.pageInfos.page;
        if(page === undefined || page === null ){
            page = 0;
        }
        criteria.pageInfos.skip = page;
        criteria.group = criteria.pageInfos.group;
        if(criteria.group === undefined || criteria.group === null ){
            criteria.group = '';
        }
        if(criteria.pageInfos.order !== undefined){
            criteria.pageInfos.sortFieldName = criteria.pageInfos.order.key;
            if(criteria.pageInfos.order.order !== undefined && criteria.pageInfos.order.order !== null){
                if(criteria.pageInfos.order.order.toLowerCase() === 'asc'){
                    criteria.pageInfos.sortDesc = false;
                }else if(criteria.pageInfos.order.order.toLowerCase() === 'desc'){
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
                if(criteria.group) {
                    dataRet.pageInfos = {};
                }
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(error) {
                //TODO
                console.info("Errrors");
            }
        );
    }
};
var Line = React.createClass({
    mixins: [focusComponents.list.selection.line.mixin],
    renderLineContent: function(data){
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
    operationList: [
        /*{label: "Button1_a", action: function() {alert("Button1a");}, style:undefined, priority: 1},*/
    ],
    action: action,
    lineComponent: Line,
    onLineClick: function onLineClick(line){
        alert('click sur la ligne ' + line.title);
    },
    isSelection: true,
    lineOperationList: [],
    criteria: {
        scope: 'MOVIE',
        searchText: 'Fantastic'
    },
    idField: 'MOV_ID',
    groupMaxRows: 1
    // groupMaxRows: this.state.groupMaxRows
};

var seeMore = function(){
    seeMore();
};


module.exports = React.createClass({
    getInitialState: function() {
        return {
            groupMaxRows: 3
        };
    },
    seeMore: function() {
        this.setState({groupMaxRows: 10});
    },

    render: function(){
        var currentView = this;
        config.groupMaxRows = this.state.groupMaxRows;
        var filterResult = React.createElement(
                React.createClass({
                    mixins: [focusComponents.page.search.filterResult.mixin],
                    actions: action,
                    store: new focus.store.SearchStore(),
                    render: function() {
                        var root = React.createElement('div', { className: 'search-result' },
                            this.liveFilterComponent(),
                            React.createElement(
                                'div',
                                { className: 'resultContainer' },
                                this.listSummary(),
                                this.actionBar(),
                                this.resultList()
                            )
                        );
                        return root;
                    },
                    groupList: function(groupKey) {
                         return <div className="listResultContainer panel">
                             <Title title={groupKey} />
                             {this._renderSimpleList({ groupKey: groupKey }, this.state.list[groupKey])}
                             <Button handleOnClick = {currentView.seeMore()} label = "See More" />
                             <Button handleOnClick = {this.showAllGroupListHandler(groupKey)} label = "Show all" />
                         </div>;

                    }
                }),
                config);
        return filterResult;
    }
});
