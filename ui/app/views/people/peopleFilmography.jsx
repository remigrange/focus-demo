//TODO Trouver un moyen de loader les data pour la FormList sans passer par le formMixin car il n'a pas lieu d'être
var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/people');
var peopleStore = require('../../stores/people');
var Title = focus.components.common.title.component;
var MovieCard = require('./movieCard');
var FormList = focus.components.common.list;
var line = React.createClass({
  definitionPath: 'movie',
  mixins: [focus.components.list.selection.line.mixin],
  renderLineContent: function(data){
    return (
      <MovieCard picture="" name={data.title} middleName={data.genreIds} subName={data.year}/>
    );
  }
});
module.exports = React.createClass({
  definitionPath: "movie",
  displayName: "peopleFilmography",
  mixins: [formMixin],
  renderActions: function renderActions(){},
  getInitialState: function () {
    this.state = {
      filmography: []
    };
    return this.state;
  },
  stores: [{store: peopleStore, properties: ['filmography']}],
  action: {
    load: function (id) {
      peopleActions.loadFilmography(id);
    }
  },
  renderContent: function render() {
    return (
      <div className='slidingBloc'>
        <Title id="filmography" title="FILMOGRAPHY"/>
        <FormList data={this.state.filmography} line={line} perPage={5}/>
      </div>
    );
  }
});
