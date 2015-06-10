let headerBehaviour = Focus.components.page.mixin
/* global React, Focus.components */
module.exports = React.createClass({
  mixins: [headerBehaviour],
  render: function renderPeopleView() {
    return (
      <div className='welcome-title'>
        Welcome page
      </div>
    );
  }
});
