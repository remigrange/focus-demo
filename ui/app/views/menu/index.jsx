/*global focusComponents, React */
//Define menu.
var menuMixin = focusComponents.application.menu.mixin;
var Menu = React.createClass({
  mixins: [menuMixin],
  renderContent: function renderMenuContent() {
    if (this.props.type === 'menuLeft') {
      return this.props.links.map(function (link) {
        if(!link.img){
          return <a href= {link.url}>link.title</a>;
        } else {
          return <a href= {link.url}><img src={link.img}/></a>;
        }
      });
    }
    return this.renderLinks();
  }
});

module.exports = React.createClass({
  render: function renderPeopleView() {
    var test = <div>
      <button id='buttonLeft' onClick={this.hanleOpenLeftPopin}>Open popin left</button>
      <button id='buttonUp' onClick={this.hanleOpenUpPopin}>Open popin up</button>
      <button id='buttonDown' onClick={this.hanleOpenDownPopin}>Open popin down</button>
      <button id='buttonRight' onClick={this.hanleOpenRightPopin}>Open popin right</button>
      <div>  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Sed ut quam consectetur sem porta blandit sed vitae magna. Sed ultrices egestas risus, id euismod magna interdum et. Proin lobortis porta commodo.

        Quisque vitae suscipit massa, ac mollis leo. Phasellus nisl magna, placerat a diam posuere, luctus blandit odio. Donec sagittis vehicula sem id ullamcorper. Nunc tincidunt arcu sagittis, faucibus quam ut, laoreet sapien. Cras magna odio, viverra quis elit ut, elementum tempor enim. Integer magna mauris, porttitor id nisl a, dapibus porttitor magna. Quisque ac porttitor magna. Nulla dapibus eleifend urna fermentum vehicula. Pellentesque ac tincidunt leo, quis gravida massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae purus sed metus molestie dapibus et ac est.

        Vestibulum est est, fermentum sed vestibulum ut, ultrices eu velit. Vivamus consequat auctor dui, at pulvinar nunc suscipit ut. Nulla porta tincidunt ipsum ut euismod. Donec ante lacus, mollis at vehicula a, sagittis at eros. Fusce fringilla erat sit amet ex vestibulum, et dignissim tellus rhoncus. Nullam eu suscipit tellus. Quisque hendrerit leo laoreet ligula dignissim malesuada. Duis consectetur nisl et tellus accumsan dignissim. Sed ultricies luctus tortor. Nam molestie convallis mauris dictum rutrum. Praesent ligula urna, tempus vitae auctor sed, condimentum a eros. Aliquam ante lacus, convallis vitae scelerisque ornare, tristique quis orci. Integer volutpat, erat at porta finibus, quam lectus ornare tortor, et lacinia leo purus eget ligula. Maecenas elementum semper pulvinar.

        Nulla nec neque maximus, sollicitudin mauris sit amet, mollis urna. Duis pellentesque non nunc sed cursus. Nunc sed ullamcorper purus. Morbi erat nulla, congue at urna tincidunt, rhoncus imperdiet eros. Vivamus interdum mattis risus, ut mollis orci convallis et. Maecenas a nulla quam. Maecenas sit amet eros a tortor lacinia accumsan eu non sapien.

        Duis fringilla arcu vitae sollicitudin facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean at cursus ipsum, ac sollicitudin orci. Nam ultricies augue mi, eu interdum neque venenatis et. Duis euismod a massa et vestibulum. Quisque et lacinia nunc, eget vulputate orci. Nulla scelerisque rhoncus erat nec maximus. Nullam tincidunt mauris erat, non tempor nunc blandit vitae. Mauris non arcu sit amet turpis euismod elementum in nec magna. Donec id purus sodales erat auctor pharetra sit amet at orci. Nam dignissim vitae ligula at dictum.

      </div>
    </div>;

    return (
      <Menu
        open={true}
        position= {this.props.position}
        direction= {this.props.direction}
        title= {this.props.title}
        links={this.props.links}
        ref= {this.props.reference}
        type= {this.props.reference}
        style= {this.props.style}
      />);
  }
});
