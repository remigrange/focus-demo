// Components

let MoviePreview = require('../previews/moviePreview');
let MovieLineComponent = require('../lines/movieLineComponent');

let PeoplePreview = require('../previews/peoplePreview');
let PeopleLineComponent = require('../lines/peopleLineComponent');

let Title = FocusComponents.common.title.component;
let Button = FocusComponents.common.button.action.component;

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
        return [
            {
                label: '',
                action() {

                },
                style: {className: 'preview fa fa-eye'},
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
    _onLineClick(line) {
        let route = line.movId ? `movies/${line.id}` : `people/${line.id}`;
        this.props.closePopin();
        navigationAction.navigate(route);
    },
    render() {
        return (
            <QuickSearch
                lineMap={this._getLineMap()}
                scopeList={this._getScopeList()}
                operationList={this._getOperationList()}
                onLineClick={this._onLineClick}
                />
        );
    }
});

module.exports = QuickSearchWrapper;

//
//
//
//
//
////Configuration des props du composant de vue de recherche.
//let config = {
//    onLineClick: function onLineClick(data) {
//        let url = '';
//        if (data.movId !== undefined && data.movId !== null) {
//            url = '#movie/' + data.movId;
//        } else {
//            if (data.peoId !== undefined && data.peoId !== null) {
//                url = '#people/' + data.peoId;
//            }
//        }
//        Backbone.history.navigate(url, true);
//        $('.quick-search-popin .popin-close-btn').click();
//        //On ferme la popin de preview si elle est affichée.
//        let qsPreview = $('.preview-popin .popin-close-btn');
//        if(qsPreview !== undefined && qsPreview !== null && qsPreview.length > 0){
//            qsPreview.click();
//        }
//    },
//    operationList: [
//        {
//            label: '', action: function (data) {
//            let Preview = MoviePreview;
//            if(!data.movId){
//                Preview = PeoplePreview;
//            }
//            Focus.application.render(Preview, '#previewModal',
//                {
//                    props: {
//                        data: data,
//                        position: 'right',
//                        open: true,
//                        style: {className: 'preview-popin'}
//                    }
//                });
//        }, style: {className: 'preview fa fa-eye'}, priority: 1
//        }
//    ],
//    scopes: [
//        {code: 'ALL', label: 'ALL'},
//        {code: 'MOVIE', label: 'MOVIE'},
//        {code: 'PEOPLE', label: 'PEOPLE'}
//    ],
//    scope: 'ALL',
//    idField: 'movId',
//    groupMaxRows: 3
//};
//
//let qs = React.createElement(SearchResult, {
//    lineMap: {
//        'Movies': MovieLineComponent,
//        'People': PeopleLineComponent,
//        'MOVIE': MovieLineComponent,
//        'PEOPLE': PeopleLineComponent
//    },
//    onLineClick: config.onLineClick,
//    operationList: config.operationList,
//    scopeList: config.scopes,
//    scope: config.scope,
//    idField: config.idField,
//    groupMaxRows: config.groupMaxRows,
//    parentSelector: parentselector
//});