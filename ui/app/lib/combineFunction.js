// Unflatten a json object.
// from an object `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
// Gives a `{contact: {nom: "nom", prenom: "prenom"}}`
JSON.unflatten = function(data) {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    if ("" in data)
        return data[""];
    var result = {},
        cur, prop, idx, last, temp;
    for (var p in data) {
        cur = result;
        prop = "";
        last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = temp;
            last = idx + 1;
        } while (idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
};

//Flatten a json object.
// from an object`{contact: {nom: "nom", prenom: "prenom"}}`
// Gives a one level object:  `{"contact.nom": "Nom", "contact.prenom": "Prenom"}`
JSON.flatten = function(data) {
    var result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop ? prop + "." + i : "" + i);
            if (l === 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};
//Deeply combine an arbitrary number of JS objects.
var combine = function combine() {
    var res = {};
    var args = _.map(arguments, function (item) {
        return item && !_.isEmpty(item) ? JSON.flatten(item) : {};
    });
    args.unshift(res);
    _.extend.apply(this, args);
    return JSON.unflatten(res);
}

module.exports = {
    combine: combine
};
