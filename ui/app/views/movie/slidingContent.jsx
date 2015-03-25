var Title = focus.components.common.title.component;
var MovieDetails = require('./movieDetails');
var Castings = require('./castings');
var MovieProducers = require('./movieProducers');
var MovieDirectors = require('./movieDirectors');
var MoviePictures = require('./moviePictures');
var Title = focus.components.common.title.component;

module.exports = React.createClass({
    displayName: "slidingContent",
    render: function renderSlidingContent() {
        return (
          <div className="details">
            <div id="slidingContent">
              <Title id="cast" title="CAST"/>
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <Title id="cast2" title="CAST2"/>
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <Title id="cast3" title="CAST3"/>
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <Title id="cast4" title="CAST4"/>
              <br/><br/><br/><br/><br/><br/><br/><br/>
              <Title id="cast5" title="CAST5"/>

            </div>
          </div>
        );
    }
});
/*
 <MovieDetails id={this.props.id}/>
 <Castings id={this.props.id}/>
 <MovieProducers id={this.props.id}/>
 <MovieDirectors id={this.props.id}/>
 <MoviePictures id={this.props.id}/>
 */