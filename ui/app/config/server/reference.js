var root = ".";
var url = focus.util.url.builder;
module.exports = {
    getScopes: url(root+"/scopes", 'GET')
};
