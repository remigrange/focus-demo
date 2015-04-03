/*global focusComponents, React*/
var lineResume = require('./lineResume');
var SearchResult = require('./searchResult');
//Composant d'une ligne.
var Line = require('./lineComponent');

//Configuration des props du composant de vue de recherche.
var config = {
    onLineClick: function onLineClick(data) {
        var url = '';
        if(data.movId !== undefined && data.movId !== null){
            url = '#movie/' + data.movId;
        } else {
            if(data.peoId !== undefined && data.peoId !== null){
                url = '#people/' + data.peoId;
            }
        }
        Backbone.history.navigate(url, true);
    },
    operationList: [
        {label: 'testt', action: function(data) {
            focus.application.render(lineResume, '#lineResume',
             {
             props: {
             title: data.title,
             description: data.description,
             released: data.released,
             countryIds: data.countryIds,
             languageIds: data.languageIds,
             runtime: this.runtime
             }
             });
        }, style: {className: 'preview'}, priority: 1}
    ],
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
       return <SearchResult
                lineComponent = {Line}
                onLineClick = {config.onLineClick}
                operationList = {config.operationList}
                scopeList = {config.scopes}
                scope = {config.scope}
                idField = {config.idField} />;
    }
});
