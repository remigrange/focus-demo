module.exports = React.createClass({
    render: function renderMovieCard() {
        return (
            <div className='card'>
                <div className='picture'><img src="./static/img/logoMovie.png" /></div>
                <div>
                  <div className='name'>{this.props.name}</div>
                  <div className='middleName'>{this.props.middleName}</div>
                  <div className='subName'>{this.props.subName}</div>
                </div>
            </div>
        );
    }
});
