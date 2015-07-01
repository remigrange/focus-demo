module.exports = {
    initialize() {
        Focus.dispatcher.handleViewAction({
            data: {
                query: '',
                scope: 'ALL'
            },
            type: 'update',
            identifier: Focus.search.builtInStore.advancedSearchStore.identifier
        });
        Focus.dispatcher.handleViewAction({
            data: {
                query: '',
                scope: 'ALL'
            },
            type: 'update',
            identifier: Focus.search.builtInStore.quickSearchStore.identifier
        });
    }
};
