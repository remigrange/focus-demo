/*global focusComponents, React*/
var serviceCommon = require('../../services');
var lineResume = require('./lineResume');
//Actions de la page.
var action = {
    search: function(criteria) {
        //TODO handle pageInfo
        var page = 0;
        if((criteria.pageInfos.page !== undefined) && (criteria.pageInfos.page !== null)){
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
                if(data.list !== undefined){
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
                //TODO NOTIIFICATION
                console.info('Errrors ', errors);
            }
        );
    }
};

//Composant d'une ligne.
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

//Configuration des props du composant de vue de recherche.
var config = {

    //todo: a enlever
    operationList: [
    ],
    action: action,
    lineComponent: Line,
    //Click sur une ligne
    onLineClick: function onLineClick(line){
        var data = line;
        focus.application.render(lineResume, '#lineResume',
            {props: {
                title: data.title,
                description: data.description,
                released: data.released,
                countryIds: data.countryIds,
                languageIds: data.languageIds,
                runtime: this.runtime }});
        //alert('click sur la ligne ' + line.title);
    },
    //Est ce qu'on peut sélectionner la ligne.
    //Todo: a enlever
    isSelection: true,
    //Opération d'une ligne
    lineOperationList: [
    ],
    criteria: {
        scope: 'MOVIE',
        searchText: 'Fantastic'
    },
    //TODO USE REFERENCE
    scopes: [
        {code: 'ALL', label: 'ALL'},
        {code: 'MOVIE', label: 'MOVIE'},
        {code: 'PEOPLE', label: 'PEOPLE'}
    ],
    scope: 'ALL'


};

module.exports= React.createClass({
    render: function(){
        var searchResult = React.createElement(React.createClass(
                {   mixins: [focusComponents.page.search.searchResult.mixin],
                    actions: config.action,
                    store: new focus.store.SearchStore(),
                    render: function render(){
                        var qs = this.quickSearchComponent();
                        var summary = <div></div>;
                        if(this.state.totalRecords !== undefined && this.state.totalRecords !== null){
                            var resultsContent = <div className='results'>{this.state.totalRecords} results </div>;
                            var linkFilterResult = <div></div>;
                            if(this.state.totalRecords > 0){
                                linkFilterResult = <div className='linkFilterResult'>
                                                        <a href='#filterResult'>Filter result&nbsp;&nbsp;&nbsp;<img src='./static/img/arrow-right-16.png'/></a>
                                                    </div>;
                            }
                            summary = <div className='summary'>
                                        {resultsContent}
                                        {linkFilterResult}
                                      </div>;
                        }
                        var list = this.listComponent();
                        var root = React.createElement('div', {className: 'search-panel'}, qs, summary, list);
                        return root;
                    }}),
                {
                    lineComponent: Line,
                    onLineClick: config.onLineClick,
                    operationList: config.operationList,
                    scopeList: config.scopes,
                    scope: config.scope
                }
        );
        return searchResult;
    }
});
