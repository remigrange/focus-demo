/*global Focus */
//Dependencies.
let Router = Focus.router;

//Creates the router for the application's key concepts.
let ExampleRouter = Router.extend({
    log: true,
    beforeRoute() {

    },
    routes: {
        'example/domain': 'domain',
    //    'response/error/field': 'fieldError',
    //    'response/error/global': 'globalError'
    },
    fieldError() {
        let FieldErrorView = require('views/example/fieldError');
        this._pageContent(FieldErrorView);
    },
    globalError() {
        let GlobalErrorView = require('views/example/globalError');
        this._pageContent(GlobalErrorView);
    },
    domain() {
        let DomainView = require('views/example/domain');
        this._pageContent(DomainView);
    }
});

module.exports = new ExampleRouter();
