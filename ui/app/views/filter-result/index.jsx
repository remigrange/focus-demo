var SearchFilterResult = focusComponents.page.search.filterResult.component;
var serviceComman = require('../../services');

module.exports =  React.createClass({
    render:function(){

        var returnedData =  {
            facet: {
                FCT_PAYS: {
                    "FRA": {label: "France", count: 5},
                    "GER": {label: "Germany", count: 8}
                },
                FCT_STATUS: {
                    "OPE": {label: "Open", count: 7},
                    "CLO": {label: "Closed", count: 2},
                    "ST1": {label: "Status 1", count: 2},
                    "ST2": {label: "Status 2", count: 2},
                    "ST3": {label: "Status 3", count: 2},
                    "ST4": {label: "Status 4", count: 2},
                    "ST5": {label: "Status 5", count: 2}
                },
                FCT_REGION: {
                    "IDF": {label: "Ile de France", count: 11},
                    "NPC": {label: "Nord - Pas de Calais", count: 6}
                }
            },
            data: [{id:1, title : "toto", body:"ceci est un test"},{id:2, title:"tata",body:"deuxieme test"}, {id:3, title:"titi",body:"troisième test"}],
            pageInfos: {},
            searchContext: {}
        };

        var action = {
            //var crite
            search: function(criteria) {
                serviceComman.common.searchByScope(criteria).then(
                    function success(data) {
                        focus.dispatcher.handleServerAction({data: data, type: "update"});
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
                return <div><div>data.title</div><div>data.description</div></div>;
            }
        });

        var config = {
            facetConfig: {
                FCT_MOVIE_COUNTRY: "text",
                FCT_MOVIE_GENRE: "text",
                FCT_MOVIE_LANGUAGE: "text"
            },
            orderableColumnList:{title: "key.title", description: "key.description"},
            groupableColumnList:{title: "key.title"},
            operationList: [
                {label: "Button1_a", action: function() {alert("Button1a");}, style:undefined, priority: 1},
                {label: "Button1_b",action: function() {alert("Button1b");},style:undefined,priority: 1},
                {label: "Button2_a",action: function() {alert("Button2a");},style:undefined,priority: 2},
                {label: "Button2_b",action: function() {alert("Button2b");},style: undefined,priority: 2},
            ],
            action: action,
            lineComponent: Line,
            onLineClick : function onLineClick(line){
                alert('click sur la ligne ' + line.title);
            },
            isSelection:true,
            lineOperationList:[
                {label: "Button1_a",action: function(data) {alert(data.title);},style: undefined,priority: 1},
                {label: "Button1_b",action: function(data) {alert(data.title);},style: undefined,priority: 1},
                {label: "Button2_a",action: function(data) {alert(data.title);},style: undefined,priority: 2},
                {label: "Button2_b",action: function(data) {alert(data.title);},style: undefined,priority: 2}
            ]

        }


        return <SearchFilterResult  facetConfig={config.facetConfig}
                                    orderableColumnList={config.orderableColumnList}
                                    groupableColumnList={config.groupableColumnList}
                                    operationList={config.operationList}
                                    action={config.action}
                                    lineComponent={Line}
                                    onLineClick={function onLineClick(line){ alert('click sur la ligne ' + line.title); }}
                                    isSelection={true}
                                    lineOperationList={config.lineOperationList}


        />;
        //return <div> Rodolphe Search ROUTE </div>
    }
});