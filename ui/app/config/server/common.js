var root = ".";
var url = focus.util.url.builder;
module.exports = {
    searchByScope: url(root+"/searchByScope?${sortedFieldName}&${sortDesc}", 'POST')/*,
    filterResult: url(root+"/filterResult", 'POST')*/
};
