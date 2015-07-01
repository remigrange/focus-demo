module.exports = {
    onLineClick(data) {
        //Should be on the line and not in the config
        let url = data.movId ? `#movie/${data.movId}` : `#people/${data.peoId}`;
        Backbone.history.navigate(url, true);
    }
};
