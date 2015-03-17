//Get the form mixin.
var React = require('react');
var formMixin = focus.components.common.form.mixin;
var Block = focus.components.common.block.component;
var actionsMovie = ;
var movieStore = require('../../stores/movie');
module.exports =  React.createClass({
  mixins: [formMixin],
  stores: [{store: movieStore, properties: ["movie"]}],
  actions: actionsUser,
  renderContent:function renderUserDetail(){
    return(
        <Block title={"Fiche de d'un film"}>
            {this.fieldFor("title")}
            {this.fieldFor("description")}
            {this.buttonSave()}
       </Block>
    );
  }
});
