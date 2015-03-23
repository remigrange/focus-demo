/*global focusComponents, React*/
var SearchResult = focusComponents.page.search.searchResult.component;
var serviceCommon = require('../../services');
var lineResume = require('./lineResume');
//Actions de la page.
var action = {
    search: function(criteria) {
        //TODO handle pageInfo
        var page=0;
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
            facets: []
        }
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
                        perPage: 50,
                        totalRecords: 100
                    },
                    searchContext: {
                        scope: criteria.criteria.scope,
                        query: criteria.criteria.query
                    }
                };
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(error) {
                //TODO
                console.info('Errrors');
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
        {code: 'MOVIE', label: 'MOVIE'},
        {code: 'PEOPLE', label: 'PEOPLE'},
        {code: 'ALL', label: 'ALL'}
    ],
    scope: 'PEOPLE'


};

module.exports= React.createClass({
    render: function(){
        var searchResult = React.createElement(React.createClass({mixins: [focusComponents.page.search.searchResult.mixin], actions: config.action}),{
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
