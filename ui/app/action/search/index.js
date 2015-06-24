// Config

let scopeConfig = require('../../config/scopes');

// Services

var services = require('../../services');

// Dependencies

var keys = _.keys;
var assign = _.extend;
var isEqual = _.isEqual;
var clone = _.clone;

let _buildPagination = (pageInfos) => {
    return {
        page: pageInfos.page || 0,
        skip: pageInfos.skip || 0
    }
};

let _buildOrderAndSort = (pageInfos) => {
    if (pageInfos.order) {
        let result = {};
        result.sortFieldName = pageInfos.order.key;
        if (pageInfos.order.order) {
            result.sortDesc = pageInfos.order.order.toLowerCase() === 'desc';
        }
        return result;
    } else {
        return {
            sortFieldName: '',
            sortDesc: false
        }
    }
};

let _buildFacets = (facets) => {
    return keys(facets).map((selectedFacetKey) => {
        let selectedFacet = facets[selectedFacetKey];
        return {
            key: selectedFacetKey,
            value: selectedFacet.key
        };
    });
};

let _parseUnscopedResponse = (data, context) => {
    return ({
        map: data.groups,
        facet: _parseFacets(data.facets),
        pageInfos: _parsePageInfos(data, context)
    });
};

let _parseScopedResponse = (data, context) => {
    return ({
        map: data.groups || {[context.scope]: data.list},
        facet: _parseFacets(data.facets),
        pageInfos: _parsePageInfos(data, context)
    });
};

let _dispatchResult = (data) => {
    Focus.dispatcher.handleServerAction({
        data,
        type: 'update'
    });
};

let _parseFacets = (facets) => {
    return keys(facets).reduce((formattedFacets, serverFacetKey) => {
        let serverFacetData = facets[serverFacetKey];
        formattedFacets[serverFacetKey] = keys(serverFacetData).reduce((facetData, serverFacetItemKey) => {
            let serverFacetItemValue = serverFacetData[serverFacetItemKey];
            facetData[serverFacetItemKey] = {
                label: serverFacetItemKey,
                count: serverFacetItemValue
            };
            return facetData;
        }, {});
        return formattedFacets;
    }, {});
};

let _parsePageInfos = (data, context) => {
    return {
        currentPage: context.page,
        perPage: 50,
        totalRecords: data.totalCount
    }
};

module.exports = {
    search(param) {
        param = clone(param);

        let criteria = param.criteria;

        // Check if query is null, replace with * if so

        if (criteria.query === '') {
          criteria.query = '*';
        }


        // Ordering and pagination
        let urlData = assign(_buildPagination(param.pageInfos), _buildOrderAndSort(param.pageInfos));

        // Fake scope facet check
        if (keys(param.facets).length === 1 && isEqual(keys(param.facets), ['FCT_SCOPE'])) {
            criteria.scope = scopeConfig[param.facets['FCT_SCOPE'].key];
            Focus.search.changeScope(criteria.scope);
            param.facets = {};
        }

        if (param.facets && param.facets['FCT_SCOPE']) {
            delete param.facets['FCT_SCOPE'];
        }

        let postData = {criteria};

        // Grouping
        if (criteria.scope === 'ALL') {
            postData.group = 'FCT_SCOPE';
            postData.facets = []; // Might be useless
            //Service call
            return services.search.unscopedSearch({
                urlData: urlData,
                data: postData
            }).then((data) => {
                return _parseUnscopedResponse(data, {page: urlData.page});
            }).then(_dispatchResult);
        }
        //Scope defined
        postData.group = param.pageInfos.group || '';

        // Facets
        postData.facets = _buildFacets(param.facets);

        return services.search.scopedSearch({urlData: urlData, data: postData})
            .then((data)=> {
                return _parseScopedResponse(data, {scope: criteria.scope, page: urlData.page})
            })
            .then(_dispatchResult);
    }
};
