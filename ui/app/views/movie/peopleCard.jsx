module.exports = React.createClass({
    render: function renderPeopleCard() {
        return (
            <div>
                <div className='picture'></div>
                <div className='name'>{this.props.name}</div>
                <div className='subName'></div>
            </div>
        );
    }
});
