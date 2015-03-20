var formMixin = focus.components.common.form.mixin;
var movieActions = require('../../action/movie');
var movieStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var PeopleCard = require('./peopleCard');
module.exports = React.createClass({
    definitionPath: "movie",
    displayName: "slidingContent",
    getInitialState: function () {
        this.state = {actors: [],
            producers: [],
            directors: []};
        return this.state;
    },
    mixins: [formMixin],
    stores: [{store: movieStore, properties: ["movie"]}],
    action: movieActions,
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
                    qsdfsqfdq
                </div>
                <div className='slidingBloc'>
                    <Title id="storyline" title="STORYLINE"/>
                    {this.fieldFor("title")}
                </div>
                <div className='slidingBloc'>
                    <Title id="producers" title="PRODUCERS"/>
                    {this.state.producers.map(function (people) {
                        return (
                            <PeopleCard picture="" name={people.peoName} subName=""/>
                        )
                    })}
                </div>
                <div className='slidingBloc'>
                    <Title id="directors" title="DIRECTORS"/>
                    {this.state.directors.map(function (people) {
                        return (
                            <PeopleCard picture="" name={people.peoName} subName=""/>
                        )
                    })}
                </div>
                <div className='slidingBloc'>
                    <Title id="pictures" title="PICTURES"/>
                    qsdfsqdf
                </div>
            </div>
        );
    }
});
