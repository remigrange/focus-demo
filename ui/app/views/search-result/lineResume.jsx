//Get the form mixin.
var Block = focus.components.common.block.component;
var Label = focus.components.common.label.component;
module.exports =  React.createClass({
    render: function renderMovieResume(){
        return(
            <Block>
                <div className ="movie-lineResume">
                    <div className="movie-resume-logo" >
                        <img src="./static/img/logoMovie.png"/>
                    </div>
                    <div className="movie-info">
                        <div className="title-level-2">
                         {React.createElement(Label, {name: "title", value: this.props.title})}
                        </div>
                        <div className="title-level-3">
                            {this.props.imdbId}
                        </div>
                    </div>
                    <div className="movie-link-detailed-sheet">
                        <a href="#">Detailed sheet</a>
                    </div>
                </div>
                <div className="movie-descrition" >
                   <div className="container-title">Storyline</div>
                   <div >{this.props.description}</div>
                </div>

                <div className="movie-details" >
                    <div className="details-panel-title">Details</div>
                    <div className="movie-detail-line">
                        <div className="details-label-name">
                            <div>Country</div>
                        </div>
                        <div className="details-label-value">
                            <div>{this.props.countryIds}</div>
                        </div>
                    </div>

                    <div className="movie-detail-line">
                        <div className="details-label-name">
                            <div>Language</div>
                        </div>
                        <div className="details-label-value">
                            <div>{this.props.languageIds}</div>
                        </div>
                    </div>
                    <div className="movie-detail-line">
                        <div className="details-label-name">
                            <div>Release date</div>
                        </div>
                        <div className="details-label-value">
                            <div>{this.props.released}</div>
                        </div>
                    </div>
                    <div className="movie-detail-line">
                        <div className="details-label-name">
                            <div>Runtime</div>
                        </div>
                        <div className="details-label-value">
                            <div>{this.props.runtime}</div>
                        </div>
                    </div>
                </div>

            </Block>
        );
    }
});
