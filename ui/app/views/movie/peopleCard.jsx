module.exports = React.createClass({
    render: function renderPeopleCard() {
        return (
            <div className='peopleCard'>
                <div className='picture'><img src="./static/img/logoMovie.png" width="100%" height="100%"/></div>
                <div className='name'>{this.props.name}</div>
                <div className='subName'>{this.props.subName}</div>
            </div>
        );
    }
});
