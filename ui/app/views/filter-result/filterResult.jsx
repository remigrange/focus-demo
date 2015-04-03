/*global React, focusComponents */
var Title = focusComponents.common.title.component;
var Button = focusComponents.common.button.action.component;
var action = require('../../action/search/filterSearch');

module.exports = React.createClass({
    mixins: [focusComponents.page.search.filterResult.mixin],
    actions: action,
    store: new focus.store.SearchStore(),
    render: function () {
        var root = React.createElement('div', {className: 'search-result'},
            this.liveFilterComponent(),
            React.createElement(
                'div',
                {className: 'resultContainer'},
                this.listSummaryComponent(),
                this.actionBarComponent(),
                this.listComponent()
            )
        );
        return root;
    },
    renderGroupBy: function renderGroupBy(groupKey, list, maxRows) {
        var buttonSeeMore = <div></div>;
        if (list.length > this.props.groupMaxRows && maxRows <= this.props.groupMaxRows) {
            buttonSeeMore = <Button handleOnClick = {this.changeGroupByMaxRows(groupKey, 10)} label = "See More" className='btn-show-all' />;
        }
        return <div className="listResultContainer panel">
            <Title className="results-groupBy-title" title={groupKey} />
                             {this.renderSimpleList(groupKey, list, maxRows)}
            <div className='btn-group-by-container'>
                <div className = "btn-see-more" >{buttonSeeMore}</div>
                <div className = "btn-show-all" ><Button handleOnClick = {this.showAllGroupListHandler(groupKey)} label = "Show all" /></div>
            </div>
        </div>;

    }
});
