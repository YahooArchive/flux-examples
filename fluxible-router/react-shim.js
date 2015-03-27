class Component {
    constructor(props, context) {
        this.props = props;
        this.context = context;
    }
}


const ReactShim = {
    Component: Component,
    createClass: function () {},
    createElement: function () {},
    PropTypes: {},
    renderToStaticMarkup: function () {},
    renderToString: function () {}
};


export default ReactShim;