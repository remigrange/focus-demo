module.exports = React.createClass({
    render: function renderPeopleCard() {
        return (
            <div className='card'>
                <div className='picture'><img src="./static/img/peopleLogo.png" width="100%" height="100%"/></div>
                <div className='name'>{this.props.name}</div>
                <div className='subName'>{this.props.subName}</div>
            </div>
        );
    }
});
