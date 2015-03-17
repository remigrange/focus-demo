var MovieDetail = require('./detail');

module.exports =  React.createClass({
  displayName: "MovieView",
  render:function(){
    return (
      <div className="movieView">
        <h2>{"Film"}</h2>
        <MovieDetail id={this.props.id} />
      </div>
    );
  }
});
