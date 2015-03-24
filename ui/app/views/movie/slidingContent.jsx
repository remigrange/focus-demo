var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./peopleCard');
module.exports = React.createClass({
    definitionPath: "movie",
    displayName: "slidingContent",
    getInitialState: function () {
        this.state = {
            actors: [],
            producers: [],
            directors: [],
            castings: []
        };
        return this.state;
    },
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie", "castings"]}],
    action: {
        load: function (id) {
            movieActions.load(id);
            movieActions.loadCastings(id);
        }
    },
    renderContent: function renderSlidingContent() {
        return (
            <div id='slidingContent'>
                <div className='slidingBloc'>
                    <Title id="details" title="DETAILS"/>
                    {this.fieldFor("title")}
                    {this.fieldFor("released")}
                    {this.fieldFor("runtime")}
                    {this.fieldFor("countryIds")}
                    {this.fieldFor("languageIds")}
                    {this.fieldFor("genreIds")}
                </div>
                <div className='slidingBloc'>
                    <Title id="cast" title="CAST"/>
                    {this.state.castings.map(function (people) {
                        return (
                            <PeopleCard picture="" name={people.peoName} subName={"As ("+people.role+") "+(people.characterName!==undefined?people.characterName:"")}/>
                        );
                    })}
                </div>
                <div className='slidingBloc'>
                    <Title id="storyline" title="STORYLINE"/>
                    {this.state.description}
                </div>
                <div className='slidingBloc'>
                    <Title id="producers" title="PRODUCERS"/>
                    {this.state.producers.map(function (people) {
                        return (
                            <PeopleCard picture="" name={people.peoName} subName=""/>
                        );
                    })}
                </div>
                <div className='slidingBloc'>
                    <Title id="directors" title="DIRECTORS"/>
                    {this.state.directors.map(function (people) {
                        return (
                            <PeopleCard picture="" name={people.peoName} subName=""/>
                        );
                    })}
                </div>
                <div className='slidingBloc noBorderBottom'>
                    <Title id="pictures" title="PICTURES"/>
                </div>
            </div>
        );
    }
});
