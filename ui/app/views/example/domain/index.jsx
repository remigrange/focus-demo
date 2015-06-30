// Dependencies
let createDetail = Focus.components.page.createDetail;
let Detail = Focus.components.common.detail.component;

// Components

let DomainIdentity = require('./domain-identity');

/**
 * Page représentant le détail de la fiche d'un film.
 */
module.exports = createDetail({
    displayName: 'DomainView',
    render() {
        return (
            <Detail>
                <DomainIdentity id={this.props.id}/>
            </Detail>
        );
    }
});
