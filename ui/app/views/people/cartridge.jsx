var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/movie');
var peopleStore = require('../../stores/movie');
module.exports = React.createClass({
    definitionPath: "people",
    displayName: "cartridge",
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ['people']}],
    action: peopleActions,
    renderContent: function renderMovieCartridge() {
        return (
            <div className="cartridge">
                <div className="header">
                    <div className="picture"><img src="./static/img/peopleLogo.png" width="100%" height="100%"/></div>
                    <div className="title">{this.state.peoName}</div>
                    <div className="year">{this.state.year}</div>
                </div>
            </div>
        );
    }
});
