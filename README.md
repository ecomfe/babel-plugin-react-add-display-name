# babel-plugin-react-add-display-name

This plugin add `displayName` to various form of react component definition, including ES6 class, `createReactClass` calls, stateless functions (both `function` and arrow).

## Install

```shell
npm install --save-dev babel-plugin-react-add-display-name
```

## Usage

### Via `.babelrc` (Recommended)

.babelrc

```json
{
  "plugins": ["react-add-display-name"]
}
```

### Via CLI

```shell
$ babel --plugins react-add-display-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["react-add-display-name"]
});
```

## Source of displayName

- For `createReactClass` or `createClass` calls, the variable name becomes `displayName`:

    ```javascript
    let Foo = createReactClass({
        // ...
    });
    ```
    
    Becomes
    
    ```javascript
    let Foo = createReactClass({
        displayName: 'Foo',
        // ...
    });
    ```
    
- For named classes, class name becomes `displayName`, all classes with a `render` method whose function body contains jsx expression are recgonized as component class:

    ```javascript
    class Foo extends Component {
        render() {
            return <div></div>;
        }
    }
    
    let Alice = class Bob extends Component {
        render() {
            return <div></div>;
        }
    }
    ```
    
    Becomes
    
    

    ```javascript
    class Foo extends Component {
        render() {
            return <div></div>;
        }
    }
    Foo.displayName = 'Foo';
    
    let Alice = class Bob extends Component {
        render() {
            return <div></div>;
        }
    }
    Alice.displayName = 'Bob';
    ```
    
- For anonymouse classes, the variable name becomes `displayName`:
  

    ```javascript
    let Foo = class extends Component {
        render() {
            return <div></div>;
        }
    }
    ```
    
    Becomes

    ```javascript
    let Foo = class extends Component {
        render() {
            return <div></div>;
        }
    }
    Foo.displayName = 'Foo';
    ```
    
- For stateless component defined via named functions (both function declarations and expressions), the function name becomes `displayName`:
  
    ```javascript
    function Foo() {
       return <div></div>;
    }
    
    let Alice = function Bob() {
        return <div></div>;
    };
    ```
    
    Becomes
  
    ```javascript
    function Foo() {
       return <div></div>;
    }
    Foo.displayName = 'Foo';
    
    let Alice = function Bob() {
        return <div></div>;
    };
    Alice.displayName = 'Bob';
    ```
    
- For anonymous functions or arrow functions, the variable name becomes `displayName`:

    ```javascript
    let Foo = function () {
        return <div></div>;
    };
    
    let Bar = () => <div></div>;
    ```
    
    Becomes
    
    ```javascript
    let Foo = function () {
        return <div></div>;
    };
    Foo.displayName = 'Foo';
    
    let Bar = () => <div></div>;
    Bar.displayName = 'Bar';
    ```
    
- For other cases where there is no explicit hint of `displayName`, this plugin will not add `displayName` to component.

