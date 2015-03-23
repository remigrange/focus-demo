var formMixin = focus.components.common.form.mixin;
var peopleActions = require('../../action/movie');
var peopleStore = require('../../stores/movie');
var Title = focus.components.common.title.component;
var MovieCard = require('./peopleCard');
module.exports = React.createClass({
    definitionPath: "people",
    displayName: "slidingContent",
    getInitialState: function () {
        this.state = {
            filmography: []
        };
        return this.state;
    },
    mixins: [formMixin],
    stores: [{store: peopleStore, properties: ["people", "filmography"]}],
    action: {
        load: function (id) {
            peopleActions.load(id);
            peopleActions.loadFilmography(id);
        }
    },
    renderContent: function renderSlidingContent() {
        return (
            <div id='slidingContent'>
                <div className='slidingBloc'>
                    <Title id="details" title="DETAILS"/>
                </div>
            </div>
        );
    }
});
