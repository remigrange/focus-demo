var Title = focus.components.common.title.component;
module.exports = React.createClass({
  displayName: "moviePictures",
  render: function render() {
    return (
      <div className='slidingBloc noBorderBottom'>
        <Title id="pictures" title="PICTURES"/>
      </div>
    );
  }
});
