// Dependencies

let isEmpty = _.isEmpty;

// Components

let MoviePreview = require('../previews/movie-preview');
let MovieLineComponent = require('../lines/movieLineComponent');

let PeoplePreview = require('../previews/people-preview');
let PeopleLineComponent = require('../lines/peopleLineComponent');

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;
let Popin = FocusComponents.application.popin.component;
let QuickSearch = Focus.components.page.search.quickSearch.component;

// Actions

let searchAction = require('action/search');

// Mixins

let i18nMixin = Focus.components.common.i18n.mixin;

// Stores

let searchStore = require('stores/search');

// Formatters

let numberFormatter = Focus.definition.formatter.number;

// Config

let scopeConfig = require('../../../config/scopes');

let QuickSearchWrapper = React.createClass({
    mixins: [Focus.components.common.i18n.mixin],
    _getOperationList() {
        let self = this;
        return [
            {
                action(data) {
                    if (self.state && _.isEqual(self.state.previewData, data)) {
                        self.refs['preview-popin'].toggleOpen();
                        self._previewOpened = !self._previewOpened;
                    } else {
                        let timeout = 0;
                        if (self._previewOpened) {
                            self.refs['preview-popin'].toggleOpen();
                            timeout = 200;
                        }
                        setTimeout(() => {
                            let Preview = self._getPreviewType(data);
                            let id = data.movId ? data.movId : data.peoId;
                            self.setState({
                                previewComponent: <Preview hasForm={false} id={id}/>,
                                previewData: data
                            });
                            self.refs['preview-popin'].toggleOpen();
                            self._previewOpened = true;
                        }, timeout);
                    }
                },
                style: {className: 'fa fa-eye', shape: 'fab', 'data-focus': 'line-preview'},
                priority: 1
            }
        ];
    },
    _getGroupComponent() {
        let popinCloser = this.props.closePopin;
        let self = this;
        return React.createClass({
            mixins: [i18nMixin],
            _advancedSearchClickHandler(scope) {
                return () => {
                    let query = self._query;
                    scope = scopeConfig[scope];
                    let route = `#search/advanced/scope/${scope}${query ? '/query/' + query : ''}`;
                    Focus.search.changeScope(scope);
                    self._searchAction({
                        criteria: {
                            query: query,
                            scope: scope
                        },
                        pageInfos: {
                            page: 1
                        }
                    });
                    popinCloser();
                    Backbone.history.navigate(route, true);
                }
            },
            render() {
                let camelCase = _.camelCase;
                let capitalize = _.capitalize;
                let lowerKey = camelCase(this.props.groupKey);
                return (
                    <div data-focus='group-result-container'>
                        <div className="title-navigation">
                            <Button handleOnClick={this._advancedSearchClickHandler(this.props.groupKey)}
                                    label='button.advancedSearch'
                                    shape="ghost"></Button>

                            <h3>{`${this.props.groupKey} (${numberFormatter.format(this.props.count, '(0,0)')})`}</h3>

                            <p>{this.i18n('search.mostRelevant')}</p>
                        </div>
                        {this.props.children}
                    </div>
                );
            }
        });
    },
    _lineComponentMapper(list) {
        if (list.length > 0) {
            return list[0].movId ? MovieLineComponent : PeopleLineComponent;
        } else {
            return MovieLineComponent;
        }
    },
    _onLineClick(data) {
        let route = data.movId ? `#movie/${data.movId}` : `#people/${data.peoId}`;
        this.props.closePopin();
        Backbone.history.navigate(route, true);
    },
    _getPreviewType(data) {
        return data.movId ? MoviePreview : PeoplePreview;
    },
    _searchAction(criteria) {
        this._query = criteria.criteria.query;
        searchAction.search(criteria);
    },
    render() {
        return (
            <div>
                <h1>{this.i18n('quickSearch.title')}</h1>
                <QuickSearch
                    lineOperationList={this._getOperationList()}
                    onLineClick={this._onLineClick}
                    scope='ALL'
                    closePopin={this.props.closePopin}
                    searchAction={this._searchAction}
                    groupComponent={this._getGroupComponent()}
                    lineComponentMapper={this._lineComponentMapper}
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
