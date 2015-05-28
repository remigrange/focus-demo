module.exports = React.createClass({
    render: function renderPeopleCard() {
        return (
            <div className='people-line'>
                <div className='icon'><i className="fa fa-user fa-3x"></i></div>
                <div className='name level1'>{this.props.name}</div>
                <div className='subName level2'>{this.props.subName}</div>
            </div>
        );
    }
});
