// Config

let scopeConfig = require('../../config/scopes');

// Services

var services = require('../../services');

// Dependencies

var keys = _.keys;
var assign = _.extend;
var isEqual = _.isEqual;

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
        map: {[context.scope]: data.list},
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
        let criteria = param.criteria;

        // Ordering and pagination
        let urlData = assign(_buildPagination(param.pageInfos), _buildOrderAndSort(param.pageInfos));

        // Fake scope facet check
        if (keys(param.facets).length === 1 && isEqual(keys(param.facets), ['FCT_SCOPE'])) {
            criteria.scope = scopeConfig[param.facets['FCT_SCOPE'].key];
            param.facets = {};
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
    },
    searchDeprecated: function (criteria) {
        //criteria.pageInfos.page = criteria.pageInfos.page || 0;
        //criteria.pageInfos.skip = criteria.pageInfos.skip || 0;
        //criteria.group = criteria.pageInfos.group;
        //if (criteria.group === undefined || criteria.group === null) {
        //    criteria.group = '';
        //}
        //if (criteria.pageInfos.order !== undefined) {
        //    criteria.pageInfos.sortFieldName = criteria.pageInfos.order.key;
        //    if (criteria.pageInfos.order.order !== undefined && criteria.pageInfos.order.order !== null) {
        //        if (criteria.pageInfos.order.order.toLowerCase() === 'asc') {
        //            criteria.pageInfos.sortDesc = false;
        //        } else if (criteria.pageInfos.order.order.toLowerCase() === 'desc') {
        //            criteria.pageInfos.sortDesc = true;
        //        }
        //    }
        //} else {
        //criteria.pageInfos.sortFieldName = undefined;
        //criteria.pageInfos.sortDesc = undefined;
        //}
        return services.search.searchByScope(criteria).then(
            function success(data) {
                if (data.facets) {
                    data.facets = keys(data.facets).reduce((liveFilterFacets, serverFacetKey) => {
                        let serverFacetData = data.facets[serverFacetKey];
                        liveFilterFacets[serverFacetKey] = keys(serverFacetData).reduce((facetData, serverFacetItemKey) => {
                            let serverFacetItemValue = serverFacetData[serverFacetItemKey];
                            facetData[serverFacetItemKey] = {
                                label: serverFacetItemKey,
                                count: serverFacetItemValue
                            };
                            return facetData;
                        }, {});
                        return liveFilterFacets;
                    }, {});
                }
                var dataRet = {
                    facet: data.facets,
                    map: data.map,
                    pageInfos: {
                        currentPage: criteria.pageInfos.page,
                        perPage: 50,
                        totalRecords: data.totalRecords
                    }
                };
                if (criteria.group) {
                    dataRet.pageInfos = {};
                }
                if (data.records) {
                    Focus.dispatcher.handleServerAction(
                        {
                            data: {
                                movieRecords: data.records.MOVIE,
                                peopleRecords: data.records.PEOPLE
                            },
                            type: 'update'
                        }
                    );
                }
                Focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors: ', errors);
            }
        );
    }
};
