/*global focusComponents, React*/
var serviceCommon = require('../../services');
var lineResume = require('./lineResume');

var action = {
    search: function (criteria) {
        var page = 0;
        if ((criteria.pageInfos.page !== undefined) && (criteria.pageInfos.page !== null)) {
            page = criteria.pageInfos.page;
        }
        var critere = {
            criteria: {
                scope: 'MOVIE',
                query: criteria.criteria.query
            },
            pageInfos: {
                sortFieldName: undefined,
                sortDesc: undefined,
                skip: page
            },
            facets: [],
            group: ''
        };
        serviceCommon.common.searchByScope(critere).then(
            function success(data) {
                var list = data;
                if (data.list !== undefined) {
                    list = data.list;
                }
                var dataRet = {
                    list: list,
                    facet: {},
                    pageInfos: {
                        currentPage: 1,
                        perPage: 1000,
                        totalRecords: data.totalRecords
                    },
                    searchContext: {
                        scope: criteria.criteria.scope,
                        query: criteria.criteria.query
                    }
                };
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors ', errors);
            }
        );
    }
};

//Composant d'une ligne.
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

//Configuration des props du composant de vue de recherche.
var config = {
    onLineClick: function onLineClick(line) {
        var data = line;
        /*focus.application.render(lineResume, '#lineResume',
            {
                props: {
                    title: data.title,
                    description: data.description,
                    released: data.released,
                    countryIds: data.countryIds,
                    languageIds: data.languageIds,
                    runtime: this.runtime
                }
            });*/
        var url = '';
        if(data.movId !== undefined && data.movId !== null){
            url = '#movie/' + data.movId;
        } else {
            if(data.peoId !== undefind && data.peoId !== nul){
                url = '#people/' + data.peoId;
            }
        }
        Backbone.history.navigate(url, true);
    },
    action: action,
    scopes: [
        {code: 'ALL', label: 'ALL'},
        {code: 'MOVIE', label: 'MOVIE'},
        {code: 'PEOPLE', label: 'PEOPLE'}
    ],
    scope: 'ALL',
    idField: 'movId'
};

module.exports = React.createClass({
    render: function () {
        var searchResult = React.createElement(React.createClass(
                {
                    mixins: [focusComponents.page.search.searchResult.mixin],
                    actions: config.action,
                    store: new focus.store.SearchStore(),
                    render: function render() {
                        var qs = this.quickSearchComponent();
                        var summary = <div></div>;
                        if (this.state.totalRecords !== undefined && this.state.totalRecords !== null) {
                            var resultsContent = <div className='results'>{this.state.totalRecords} results </div>;
                            var linkFilterResult = <div></div>;
                            if (this.state.totalRecords > 0) {
                                var criteria = this.refs.quickSearch.getValue();
                                if(criteria.scope.toLowerCase() !== 'all'){
                                    var url = '#search/advanced/scope/' + criteria.scope + '/query/' + criteria.query;
                                    linkFilterResult = <div className='linkFilterResult'>
                                        <a href={url}>Filter result&nbsp;&nbsp;&nbsp;
                                            <img src='./static/img/arrow-right-16.png'/>
                                        </a>
                                    </div>;
                                }
                            }
                            summary = <div className='summary'>
                                        {resultsContent}
                                        {linkFilterResult}
                            </div>;
                        }
                        var list = this.listComponent();
                        var search = <div className='search-part'> {qs} {summary} {list}</div>
                        var lineResumeContent = <div id='lineResume'></div>;
                        var root = React.createElement('div', {className: 'search-panel'}, search, lineResumeContent);
                        return root;
                    }
                }),
            {
                lineComponent: Line,
                onLineClick: config.onLineClick,
                operationList: config.operationList,
                scopeList: config.scopes,
                scope: config.scope,
                idField: config.idField
            }
        );
        return searchResult;
    }
});
