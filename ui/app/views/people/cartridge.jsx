var formMixin = Focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
module.exports = React.createClass({
  definitionPath: "people",
  displayName: "cartridge",
  mixins: [formMixin],
  stores: [{store: peopleStore, properties: ['people']}],
  action: peopleActions,
  renderActions: function renderActions(){},
  renderContent: function renderMovieCartridge() {
    return (
      <div className="cartridge">
        <div className="header">
          <div className="picture">
            <img src="./static/img/peopleLogo.png" width="100%" height="100%"/>
          </div>
          <div className="link"><a href="">IMDB</a></div>
          <div className="title">{this.state.peoName}</div>
          <div className="professions">{this.state.professions}</div>
        </div>
        <div className="field">
          <div className="title">{"PROFESSIONS"}</div>
          <div className="content">
            {this.state.professions}
          </div>
        </div>
      </div>
    );
  }
});
