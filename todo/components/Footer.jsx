/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react/addons');

var Component = React.createClass({
    render: function() {
        var nowShowing = this.props.nowShowing;
        var onFilterChange = this.props.onFilterChange;
        var activeTodoLabel = 'item' + (this.props.count > 1 ? 's' : '');
        var cx = React.addons.classSet;
        var clearButton;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    id="clear-completed"
                    onClick={this.props.onClearCompleted}>

                    Clear completed ({this.props.completedCount})
                </button>
            );
        }

        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoLabel} left
                </span>
                <ul id="filters">
                    <li>
                        <a
                            href="#"
                            onClick={onFilterChange.bind(null, 'ALL_TODOS')}
                            className={cx({ selected: nowShowing === 'ALL_TODOS' })}>

                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#"
                            onClick={onFilterChange.bind(null, 'ACTIVE_TODOS')}
                            className={cx({ selected: nowShowing === 'ACTIVE_TODOS' })}>

                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            href="#"
                            onClick={onFilterChange.bind(null, 'COMPLETED_TODOS')}
                            className={cx({ selected: nowShowing === 'COMPLETED_TODOS' })}>

                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
});


module.exports = Component;
