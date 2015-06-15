var services = require('../../services');
var keys = _.keys;


module.exports = {
    search: function (criteria) {
        criteria.pageInfos.page = criteria.pageInfos.page || 0;
        criteria.pageInfos.skip = criteria.pageInfos.skip || 0;
        criteria.group = criteria.pageInfos.group;
        if (criteria.group === undefined || criteria.group === null) {
            criteria.group = '';
        }
        if (criteria.pageInfos.order !== undefined) {
            criteria.pageInfos.sortFieldName = criteria.pageInfos.order.key;
            if (criteria.pageInfos.order.order !== undefined && criteria.pageInfos.order.order !== null) {
                if (criteria.pageInfos.order.order.toLowerCase() === 'asc') {
                    criteria.pageInfos.sortDesc = false;
                } else if (criteria.pageInfos.order.order.toLowerCase() === 'desc') {
                    criteria.pageInfos.sortDesc = true;
                }
            }
        } else {
            criteria.pageInfos.sortFieldName = undefined;
            criteria.pageInfos.sortDesc = undefined;
        }
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
