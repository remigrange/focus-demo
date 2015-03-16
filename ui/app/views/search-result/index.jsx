var SearchFilterResult = focusComponents.page.searchfilterResult


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
            list: [{id:1, title : "toto", body:"ceci est un test"},{id:2, title:"tata",body:"deuxieme test"}, {id:3, title:"titi",body:"troisième test"}],
            pageInfos: {},
            searchContext: {}
        };

        var action = {
            search: function(criteria) {
                window.setTimeout(
                    function() {
                        var data = {
                            facet: returnedData.facet,
                            list: returnedData.list,
                            pageInfos:returnedData.pageInfos,
                            searchContext: returnedData.searchContext
                        };

                        focus.dispatcher.handleServerAction({
                            data: data, type: "update"
                        })
                    },
                    1000);
            }
        };
        var Line = React.createClass({
            mixins: [focusComponents.list.selection.line.mixin],
            renderLineContent: function(data){
                var title = React.createElement('div',null,data.title);
                var body = React.createElement('div',null,data.body);
                var root = React.createElement('div',null,title,body);
                return root;
            }
        });

        var config = {
            facetConfig: {
                FCT_PAYS: "text",
                FCT_STATUS: "text",
                FCT_REGION: "text"
            },
            orderableColumnList:{col1: "Colonne 1", col2: "Colonne 2", col3: "Colonne 3"},
            groupableColumnList:{col1: "Colonne 1", col2: "Colonne 2"},
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

        return <SearchFilterResult config={config.config}
                                    orderableColumnList={config.orderableColumnList}
                                    groupableColumnList={config.groupableColumnList}
                                    operationList={config.operationList}
                                    action={config.action}
                                    lineComponent={Line}
                                    onLineClick={function onLineClick(line){ alert('click sur la ligne ' + line.title); }}
                                    isSelection={true}
                                    lineOperationList={config.lineOperationList}


        />;
    }
});