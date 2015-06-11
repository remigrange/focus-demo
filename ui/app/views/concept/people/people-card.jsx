module.exports = React.createClass({
    render() {
        return (
            <div className="people-line">
                <div data-focus="sl-icon" className="fa fa-user fa-3x"></div>
                <div className="level1">{this.props.name}</div>
                <div className="level2">{this.props.subName}</div>
            </div>
        );
    }
});