var React = require('react');

module.exports = function (context) {
  return function (Component, props) {
    props.context = context.getComponentContext();
    return React.createElement(Component, props);
  };
};
