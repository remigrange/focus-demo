// Components

let MoviePreview = require('../previews/movie-preview');
let MovieLineComponent = require('../lines/movieLineComponent');

let PeoplePreview = require('../previews/people-preview');
let PeopleLineComponent = require('../lines/peopleLineComponent');

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;
let Popin = FocusComponents.application.popin.component;

// Mixins

let QuickSearchMixin = Focus.components.page.search.quickSearch.mixin;

// Actions

let navigationAction = require('action/navigation');
let searchAction = require('action/search');

// Stores

let searchStore = require('stores/search');

let QuickSearch = React.createClass({
    mixins: [QuickSearchMixin],
    actions: searchAction,
    store: searchStore,
    render() {
        let list = this.isSimpleList() ? this.getSimpleListComponent({type: this._getListType()}) : this.getGroupByListComponent();
        return (
            <div data-focus='quick-search'>
                {this.getSearchBarComponent()}
                {list}
            </div>
        );
    },
    renderGroupByBlock(groupKey, list, maxRows) {
        return (
            <div data-focus='group-result-container'>
                <Title title={groupKey}/>
                <a onClick={this._advancedSearchClickHandler(groupKey)}>Advanced search</a>
                {this.getSimpleListComponent({
                    type: this._getListType(list),
                    list,
                    maxRows
                })}
                <Button handleOnClick={this.changeGroupByMaxRows(groupKey, 5)} label='Show more'></Button>
            </div>
        );
    },
    _getListType(list) {
        list = list || this.store.getList() || [{movId:0}];
        return list[0].movId ? 'Movie' : 'People';
    },
    _advancedSearchClickHandler(scope) {
        return () => {
            let route = `search/advanced/scope/${scope}/query/${this.getCriteria().query}`;
            this.props.closePopin();
            navigationAction.navigate(route);
        }
    }
});

let QuickSearchWrapper = React.createClass({
    _getOperationList() {
        let self = this;
        return [
            {
                label: '',
                action(data) {
                    let Preview = self._getPreviewType(data);
                    self.setState({
                        previewComponent: <Preview data={data}/>
                    });
                    self.refs['preview-popin'].toggleOpen();
                },
                style: {className: 'fa fa-eye', 'data-focus': 'line-preview'},
                priority: 1
            }
        ];
    },
    _getScopeList() {
        return [];
    },
    _getLineMap() {
        return {
            'Movie': MovieLineComponent,
            'People': PeopleLineComponent
        };
    },
    _onLineClick(data) {
        let route = data.movId ? `movies/${data.movId}` : `people/${data.peoId}`;
        this.props.closePopin();
        navigationAction.navigate(route);
    },
    _getPreviewType(data) {
        return data.movId ? MoviePreview : PeoplePreview;
    },
    render() {
        return (
            <div>
                <QuickSearch
                    lineMap={this._getLineMap()}
                    scopeList={this._getScopeList()}
                    lineOperationList={this._getOperationList()}
                    onLineClick={this._onLineClick}
                    />
                <Popin
                    overlay={false}
                    type='from-right'
                    open={this.state && this.state.previewComponent != undefined}
                    ref='preview-popin'
                    >
                    {this.state && this.state.previewComponent}
                </Popin>
            </div>

        );
    }
});

module.exports = QuickSearchWrapper;
