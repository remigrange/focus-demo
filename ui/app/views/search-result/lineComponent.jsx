/*global React, focusComponents */
module.exports = React.createClass({
    mixins: [focusComponents.list.selection.line.mixin],
    definitionPath: "movie",
    renderLineContent: function (data) {
        if(!data.movId){
            return <div className="item">
                <div className="mov-logo" >
                    <img src="./static/img/pictoPeople.png"/>
                </div>
                <div>
                    <div className="title-level-1">
                            {data.peoName}
                    </div>
                </div>
            </div>;
        }
        return <div className="item">
            <div className="mov-logo" >
                <img src="./static/img/logoMovie.png"/>
            </div>
            <div>
                <div className="title-level-1">
                            {data.title}
                </div>
                <div className="title-level-2">
                            {data.genreIds}
                </div>
                <div className="title-level-3">
                            {data.released}
                </div>
            </div>
        </div>;
    }
});
