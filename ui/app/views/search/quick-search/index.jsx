// Components

let MoviePreview = require('../previews/movie-preview');
let MovieLineComponent = require('../lines/movieLineComponent');

let PeoplePreview = require('../previews/people-preview');
let PeopleLineComponent = require('../lines/peopleLineComponent');

let Button = Focus.components.common.button.action.component;
let QuickSearch = Focus.components.page.search.quickSearch.component;

// Mixins

let i18nMixin = Focus.components.common.i18n.mixin;

// Formatters

let numberFormatter = Focus.definition.formatter.number;

// Config

// Services

let service = require('../../../services/search');

let scopeConfig = require('../../../config/scopes');

let QuickSearchWrapper = React.createClass({
    mixins: [Focus.components.common.i18n.mixin],
    _getOperationList() {
        let self = this;
        return [
            {
                action(data) {
                    let isPreviewOpened = self.props.menuRef.refs['preview-popin'].state.opened;
                    if (self.state && _.isEqual(self.state.previewData, data)) {
                        self.props.togglePreviewPopin();
                    } else {
                        let timeout = 0;
                        if (isPreviewOpened) {
                            self.props.togglePreviewPopin();
                            timeout = 100;
                        }
                        setTimeout(() => {
                            let Preview = self._getPreviewType(data);
                            let id = data.movId ? data.movId : data.peoId;
                            let previewComponent = <Preview closePopin={self.props.menuRef.refs['quick-search-popin'].toggleOpen} hasForm={false} id={id}/>;
                            self.props.togglePreviewPopin(previewComponent);
                            self.setState({previewData: data});
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
        return React.createClass({
            mixins: [i18nMixin],
            _advancedSearchClickHandler(scope) {
                return () => {
                    let route = '#search/advanced';
                    let query = Focus.search.builtInStore.quickSearchStore.getQuery();
                    scope = scopeConfig[scope] || scope;
                    Focus.dispatcher.handleViewAction({
                        data: {
                            query,
                            scope,
                            selectedFacets: undefined,
                            gorupingKey: undefined
                        },
                        type: 'update',
                        identifier: 'ADVANCED_SEARCH'
                    });
                    popinCloser();
                    Backbone.history.navigate(route, true);
                };
            },
            render() {
                return (
                    <div data-focus='group-result-container'>
                        <div className="title-navigation">
                            <Button handleOnClick={this._advancedSearchClickHandler(this.props.groupKey)}
                                    label='button.advancedSearch'
                                    shape="ghost"/>

                            <h3>{`${this.props.groupKey} (${numberFormatter.format(this.props.count, '(0,0)')})`}</h3>

                            {!this.props.isUnique &&
                                <p>{this.i18n('search.mostRelevant')}</p>
                            }
                        </div>
                        {this.props.children}
                    </div>
                );
            }
        });
    },
    _lineComponentMapper(groupKey, list) {
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
    render() {
        return (
            <div>
                <h1>{this.i18n('quickSearch.title')}</h1>
                <QuickSearch
                    closePopin={this.props.closePopin}
                    groupComponent={this._getGroupComponent()}
                    lineComponentMapper={this._lineComponentMapper}
                    lineOperationList={this._getOperationList()}
                    onLineClick={this._onLineClick}
                    service={service}
                />
            </div>

        );
    }
});

module.exports = QuickSearchWrapper;
