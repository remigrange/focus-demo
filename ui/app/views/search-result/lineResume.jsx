/*global React, focusComponents*/
//Get the form mixin.
var Block = focus.components.common.block.component;
var Label = focus.components.common.label.component;
module.exports = React.createClass({
  mixins: [focusComponents.application.popin.mixin],
  renderPopinHeader: function (popin) {
    return React.createElement('div', null,
      React.createElement('div', {
        className: 'preview-popin-header'
      }, '')
    );
  },
  renderPopinFooter: function renderPopinFooter(popin) {
    return React.createElement('div', null, '');
  },
  renderContent: function (popin) {
    $('.search-part').removeClass('search-part-preview');
    $('.search-part').toggleClass('search-part-preview');
    $('#lineResume').removeClass('line-preview-none');
    var movieLink = '#movie/' + this.props.data.movId;
    var peopleLink = '#people/' + this.props.data.peoId;
    if (!this.props.data.movId) {
      return (
        <Block>
          <div className ="movie-lineResume">
            <div className="movie-resume-logo" >
              <img src="./static/img/pictoPeople.png"/>
            </div>
            <div className="movie-info">
              <div className="title-level-2">
                <div >{this.props.data.peoName}</div>
              </div>
              <div className="title-level-3">
                                {this.props.data.imdbId}
              </div>
            </div>
            <div className="movie-link-detailed-sheet" >
              <a href={peopleLink}>Detailed sheet
                <img src='./static/img/arrow-right-16.png'/>
              </a>
            </div>
          </div>
        </Block>
      );
    }
    return (
      <Block>
        <div className ="movie-lineResume">
          <div className="movie-resume-logo" >
            <img src="./static/img/logoMovie.png"/>
          </div>
          <div className="movie-info">
            <div className="title-level-2">
              <div >{this.props.data.title}</div>
            </div>
            <div className="title-level-3">
                                {this.props.data.imdbId}
            </div>
          </div>
          <div className="movie-link-detailed-sheet" >
            <a href={movieLink}>Detailed sheet
              <img src='./static/img/arrow-right-16.png'/>
            </a>
          </div>
        </div>
        <div className="movie-descrition" >
          <div className="container-title">Storyline</div>
          <div >{this.props.data.description}</div>
        </div>

        <div className="movie-details" >
          <div className="details-panel-title">Details</div>
          <div className="movie-detail-line">
            <div className="details-label-name">
              <div>Country</div>
            </div>
            <div className="details-label-value">
              <div>{this.props.data.countryIds}</div>
            </div>
          </div>

          <div className="movie-detail-line">
            <div className="details-label-name">
              <div>Language</div>
            </div>
            <div className="details-label-value">
              <div>{this.props.data.languageIds}</div>
            </div>
          </div>
          <div className="movie-detail-line">
            <div className="details-label-name">
              <div>Release date</div>
            </div>
            <div className="details-label-value">
              <div>{this.props.data.released}</div>
            </div>
          </div>
          <div className="movie-detail-line">
            <div className="details-label-name">
              <div>Runtime</div>
            </div>
            <div className="details-label-value">
              <div>{this.props.data.runtime}</div>
            </div>
          </div>
        </div>

      </Block>
    );
  },
  /**
   * Handle click on close img.
   * @private
   */
  _handleOnClickClose: function () {
    $('.search-part').removeClass('search-part-preview');
    $('#lineResume').addClass('line-preview-none');
  }
});
