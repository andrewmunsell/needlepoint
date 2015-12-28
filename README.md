# Needlepoint

![Build Status](https://travis-ci.org/andrewmunsell/needlepoint.svg) [![Code Climate](https://codeclimate.com/github/andrewmunsell/needlepoint/badges/gpa.svg)](https://codeclimate.com/github/andrewmunsell/needlepoint) [![Test Coverage](https://codeclimate.com/github/andrewmunsell/needlepoint/badges/coverage.svg)](https://codeclimate.com/github/andrewmunsell/needlepoint/coverage)

Needlepoint is a dependency injection framework for Node.js and other Javascript
environments where ES6 is supported.

Needlepoint is licensed under the MIT license.

**Note: This library is very early in development and was largely developed as
an exercise, though I intend to use Needlepoint in my own future projects.**

## Requirements

Needlepoint requires a Javascript environment such as Node.js. Though
the library is designed to use new features such as ES6 classes and the proposed
ES7 decorators, Babel is included as a dependency to make the library compatible
with environments that do not support these features directly.

## Getting Started

To use Needlepoint, install it with `npm`:

```
npm install --save needlepoint
```

If you're not using a Javascript environment that supports both ES6 classes and
ES7-style decorators (e.g. Node.JS), then you must configure Babel. This can be
done pretty easily.

### Babel 5

If you are using Babel 5.x, you can simply add ES7 decorators to the opt-in features:

```
require('babel/register')({
    optional: ['es7.decorators']
});
```

### Babel 6

Because Babel 6 has not entirely implemented ES7 decorators, you must install another NPM package
 to enable the legacy ES7 decorators (as well as the corresponding presets, which I've included
 a sample of) and then configure Babel as follows:

```
npm install --save babel-plugin-transform-decorators-legacy
```

```
require('babel/register')({
    presets: ['es2015', 'stage-0', 'stage-1'],
    plugins: ['babel-plugin-transform-decorators-legacy']
});
```

After this, you can simply import the container where ever your application
needs to inject dependencies:

```
import {container} from 'needlepoint';
```

From there, you can resolve dependencies:

```
import {container} from 'needlepoint';
import {MyDependency} from './my-dependency';

var instanceOfDependency = container.resolve(MyDependency);
instanceOfDependency.performMethod();
```

You can also declare dependencies of your classes with the `@dependencies()`
decorator:

```
import {container, dependencies} from 'needlepoint';
import {MyDependency} from './my-dependency';

@dependencies(MyDependency)
class HasDependencies {
    constructor(myDependency) {
        this.myDependency = myDependency;
    }
}

var instance = container.resolve(HasDependencies);
instance.myDependency.performMethod();
```

Dependencies of a class are injected through the constructor. The objects passed
into the constructor are instances of the requested dependencies.

Or, if you want a class to be a singleton (i.e. only one instance of the class
will be created for your entire application):

```
import {container, singleton} from 'needlepoint';

@singleton
class SingletonDependency {
    constructor() {

    }
}
```

If a class is declared to be a `@singleton`, then one instance will be created
the first time the class is listed as a dependency or resolved, and this
instance will be cached and used when other classes need an instance of it.
