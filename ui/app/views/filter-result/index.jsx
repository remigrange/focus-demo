var SearchFilterResult = focusComponents.page.search.filterResult.component;
var serviceComman = require('../../services');

module.exports =  React.createClass({
    render:function(){

        var action = {
            search: function(criteria) {
                var critere = {
                    criteria: {
                        scope: "MOVIE",
                        searchText : "Fantastic"
                    },
                    facets: [
                    ]
                };
                serviceComman.common.searchByScope(critere).then(
                    function success(data) {

                        var dataRet = {
                            facet: data.facet,
                            list: data.list,
                            pageInfos:{},
                            searchContext:{}
                        };
                        focus.dispatcher.handleServerAction({data: dataRet, type: "update"});
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
               return <div>
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
                Language: "text",
                Genre: "text",
                Country: "text"
            },
            orderableColumnList:{title: "key.title", description: "key.genreIds"},
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