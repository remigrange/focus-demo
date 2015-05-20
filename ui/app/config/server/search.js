var root = '.';
var url = Focus.util.url.builder;
module.exports = {
    searchByScope: url(root + '/searchByScope?sortFieldName=${sortFieldName}&sortDesc=${sortDesc}&skip=${skip}', 'POST')
};
