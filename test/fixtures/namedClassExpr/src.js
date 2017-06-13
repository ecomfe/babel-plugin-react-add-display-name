import React, {Component, PureComponent} from 'react';

const Foo = class Bar extends Component {
    render() {
        return (
        <div onClick={this.handleClick}></div>
        );
    }
}

const Boo = class Alice extends PureComponent {
    render() {
        return (
        <div>React PureComponent</div>
        );
    }
}