# Needlepoint

![Build Status](https://travis-ci.org/andrewmunsell/needlepoint.svg)

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
