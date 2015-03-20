var root = ".";
var url = focus.util.url.builder;
module.exports = {
    searchByScope: url(root+"/searchByScope?sortFieldName=${sortFieldName}&sortDesc=${sortDesc}", 'POST')/*,
    filterResult: url(root+"/filterResult", 'POST')*/
};
