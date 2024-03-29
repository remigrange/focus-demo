let createDetail = Focus.components.page.createDetail;
let Detail = Focus.components.common.detail.component;

let PeopleDetails = require('./people-details');
let PeopleFilmography = require('./people-filmography');
let PeoplePictures = require('./people-pictures');
let PeopleCartrige = require('./people-cartridge');
let PeopleSummary = require('./people-summary')

module.exports = createDetail({
    displayName: 'PeopleView',
    cartridgeConfiguration() {
        let props = {id: this.props.id, hasForm: false};
        return {
            summary: {component: PeopleSummary, props},
            cartridge: {component: PeopleCartrige, props},
            actions: {
                primary: [
                    {label: 'imprimer', action: ()=>{console.log('print primaire'); }, icon: 'print'},
                    {label: 'archiver', action: ()=>{console.log('archiver primaire'); }, icon: 'archive'}
                ],
                secondary: [
                    {label: 'imprimer Secondaire', action: ()=>{console.log('print secondaire'); }, icon: 'print'},
                    {label: 'archiver', action: ()=>{console.log('archiver secondaire'); }, icon: 'archive'}]
            }
        };
    },
    render() {
        return (
            <Detail>
                <PeopleDetails id={this.props.id} />
                <PeopleFilmography id={this.props.id} />
            </Detail>
        );
    }
});
