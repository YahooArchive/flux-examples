var React = require('react');
var provideContext = require('fluxible-addons-react').provideContext;


module.exports = function (context) {
  return function (Component, props) {
    props.context = context.getComponentContext();
    return React.createElement(provideContext(Component), props);
  };
};
