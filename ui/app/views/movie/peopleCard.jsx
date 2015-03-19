module.exports = React.createClass({
    getInitialState: function () {
        this.props.movie = {actors: [],
            producers: [],
            directors: []};
        return this.state;
    },
    render: function renderMovieDetail() {
        return (
            <div></div>
        );
    }
});
