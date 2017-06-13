import React, {PureComponent} from 'react';

class Foo extends PureComponent {
    render() {
        return (
        <div onClick={this.handleClick}></div>
        );
    }
}