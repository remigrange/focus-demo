/*global focusComponents, React*/
var SearchResult = focusComponents.page.search.searchResult.component;
var serviceCommon = require('../../services');
module.exports= React.createClass({
    render: function(){

        var action = {
            search: function(criteria) {
                //TODO handle pageInfo
                var critere = {
                    criteria: {
                        scope: 'MOVIE',
                        query: criteria.criteria.query
                    },
                    pageInfos: {
                        sortFieldName: undefined,
                        sortDesc: undefined
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
                                currentPage: 2,
                                perPage: 50,
                                totalRecords: 10
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

            operationList: [
            ],
            action: action,
            lineComponent: Line,
            onLineClick: function onLineClick(line){
                alert('click sur la ligne ' + line.title);
            },
            isSelection: true,
            lineOperationList: [
            ],
            criteria: {
                scope: 'MOVIE',
                searchText: 'Fantastic'
            },
            //TODO USE REFERENCE
            scopes: [
                {id: 'MOVIE', label: 'MOVIE', active: true },
                {id: 'PEOPLE', label: 'PEOPLE', active: true },
                {id: 'ALL', label: 'ALL', active: true}
            ]


        };



        var searchResult = React.createElement(React.createClass({mixins: [focusComponents.page.search.searchResult.mixin], actions: config.action}),
            {
                lineComponent: Line,
                onLineClick: function onLineClick(line){
                    alert('click sur la ligne ' + line.title);
                },
                operationList: config.operationList,
                scopeList: config.scopes

            }
        );
        return searchResult;
    }
});
