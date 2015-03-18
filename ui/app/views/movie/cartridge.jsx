//Get the form mixin.
var formMixin = focus.components.common.form.mixin;
var Block = focus.components.common.block.component;
var fetch = focus.network.fetch;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
module.exports =  React.createClass({
    definitionPath: "movie",
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,
    renderContent:function renderMovieDetail(){
        return(
            <div>
                <div className="title">
                    {this.fieldFor("movId")}
                </div>
                <div className="field">
                    {this.fieldFor("title")}
                </div>
            </div>
        );
    }
});
