//Get the form mixin.
var formMixin = focus.components.common.form.mixin;
var Block = focus.components.common.block.component;
//var actionsMovie = require('../../action/movie');;
var movieStore = require('../../stores/movie');
module.exports =  React.createClass({
    definitionPath: "movie",
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["movie"]}],
    action: {
        load: function(){
            Promise.resolve({movie: {title: "pierre", description: "besson"}}).then(
                function(data){
                    focus.dispatcher.handleServerAction({
                        data: data,
                        type: "update"
                    });
                });
        }},
  renderContent:function renderMovieDetail(){
    return(
        <Block title={"Fiche de d'un film"}>
            {this.fieldFor("title")}
            {this.fieldFor("description")}
            {this.buttonSave()}
       </Block>
    );
  }
});
