var services = require('../../../services');


module.exports = {
    search: function (criteria) {
        var page = 0;
        if ((criteria.pageInfos.page !== undefined) && (criteria.pageInfos.page !== null)) {
            page = criteria.pageInfos.page;
        }
        var critere = {
            criteria: {
                scope: criteria.criteria.scope,
                query: criteria.criteria.query
            },
            pageInfos: {
                sortFieldName: undefined,
                sortDesc: undefined,
                skip: page
            },
            facets: [],
            group: ''
        };
        services.search.searchByScope(critere).then(
            function success(data) {
                var list = data;
                if (data.list !== undefined) {
                    list = data.list;
                }
                var dataRet = {
                    list: list,
                    facet: {},
                    pageInfos: {
                        currentPage: page,
                        perPage: 50,
                        totalRecords: data.totalRecords
                    },
                    searchContext: {
                        scope: criteria.criteria.scope,
                        query: criteria.criteria.query
                    }
                };
                focus.dispatcher.handleServerAction({data: dataRet, type: 'update'});
            },
            function error(errors) {
                console.info('Errrors ', errors);
            }
        );
    }
};
