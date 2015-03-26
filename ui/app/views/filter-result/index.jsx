/*global focusComponents, React */
var SearchFilterResult = focusComponents.page.search.filterResult.component;
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
        /*{label: "Button1_a", action: function() {alert("Button1a");}, style:undefined, priority: 1},
         {label: "Button1_b",action: function() {alert("Button1b");},style:undefined,priority: 1},
         {label: "Button2_a",action: function() {alert("Button2a");},style:undefined,priority: 2},
         {label: "Button2_b",action: function() {alert("Button2b");},style: undefined,priority: 2},*/
    ],
    action: action,
    lineComponent: Line,
    onLineClick: function onLineClick(line){
        /*var data = line;
        focus.application.render(lineResume, '#lineResume',
            {props: {
                title: data.title,
                description: data.description,
                released: data.released,
                countryIds: data.countryIds,
                languageIds: data.languageIds,
                runtime: this.runtime }});*/
        alert('click sur la ligne ' + line.title);
    },
    isSelection: true,
    lineOperationList: [],
    criteria: {
        scope: 'MOVIE',
        searchText: 'Fantastic'
    },
    idField: 'MOV_ID'
};



module.exports = React.createClass({
    render: function(){
        /*return <SearchFilterResult facetConfig = {config.facetConfig}
                                    orderableColumnList={config.orderableColumnList}
                                    groupableColumnList={config.groupableColumnList}
                                    operationList={config.operationList}
                                    action={config.action}
                                    lineComponent={Line}
                                    onLineClick={config.onLineClick}
                                    isSelection={true}
                                    lineOperationList={config.lineOperationList}
                                    criteria={config.criteria}


        />;*/
        var filterResult = React.createElement(
                React.createClass({
                    mixins: [focusComponents.page.search.filterResult.mixin],
                    actions: action,
                    store: new focus.store.SearchStore(),
                    render: function render() {
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
                    }
                }),
                config);
        return filterResult;
    }
});
