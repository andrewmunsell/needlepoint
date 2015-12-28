/**
 * @package needlepoint
 * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
 */

import {expect} from 'chai';

import {container, dependencies, singleton} from '../src/index';

class DummyDependency {
    constructor() {

    }
}

class SecondDummyDependency {
    constructor() {

    }
}

@dependencies(DummyDependency)
class DummyWithDependency {
    constructor(dummyDependency) {
        this._dependency = dummyDependency;
    }

    getDependency() {
        return this._dependency;
    }
}

@dependencies(DummyWithDependency)
class DummyWithNestedDependencies {
    constructor(dummyWithDependency) {
        this._dependency = dummyWithDependency;
    }

    getDependency() {
        return this._dependency;
    }
}

@singleton
class Singleton {

}

describe('Container', function() {
    describe('#resolveAll()', function() {
        it('should resolve a single class with no dependencies to the correct instance', function() {
            var dependencies = container.resolveAll(DummyDependency);

            expect(dependencies).to.be.an.instanceOf(Array);
            expect(dependencies).to.have.length(1);

            expect(dependencies[0]).to.be.an.instanceOf(DummyDependency);
        });

        it('should resolve multiple classes-- none of them with dependencies', function() {
            var dependencies = container.resolveAll(DummyDependency, SecondDummyDependency);

            expect(dependencies).to.be.an.instanceOf(Array);
            expect(dependencies).to.have.length(2);

            expect(dependencies[0]).to.be.an.instanceOf(DummyDependency);
            expect(dependencies[1]).to.be.an.instanceOf(SecondDummyDependency);
        });
    });

    describe('#resolve()', function() {
        it('should resolve a class with no dependencies to an instance of itself', function() {
            var dummyClass = container.resolve(DummyDependency);

            expect(dummyClass).to.be.an.instanceOf(DummyDependency);
        });

        it('should resolve a class with a single dependency', function() {
            var dummyClass = container.resolve(DummyWithDependency);

            expect(dummyClass).to.be.an.instanceOf(DummyWithDependency);
            expect(dummyClass.getDependency()).to.be.an.instanceOf(DummyDependency);
        });

        it('should resolve a class with nested dependencies', function() {
            var dummyClass = container.resolve(DummyWithNestedDependencies);

            expect(dummyClass).to.be.an.instanceOf(DummyWithNestedDependencies);

            expect(dummyClass.getDependency()).to.be.an.instanceOf(DummyWithDependency);
            expect(dummyClass.getDependency().getDependency()).to.be
                .an.instanceOf(DummyDependency);
        });

        it('should resolve the same class every time if it is a singleton', function() {
            var singletonInstance = container.resolve(Singleton);

            singletonInstance.value = 'hello-world';

            var singletonInstanceTwo = container.resolve(Singleton);

            expect(singletonInstance).to.equal(singletonInstanceTwo);
            expect(singletonInstance.value).to.equal(singletonInstanceTwo.value);
        })
    });

    describe('#registerInstance()', function() {
        it('should register an instance as a singleton', function() {
            var instance = {
                hello: 'world'
            };

            container.registerInstance(Singleton, instance);

            var newInstance = container.resolve(Singleton);

            expect(newInstance).to.equal(instance);
        });

        it('should throw an error if a non-object/non-function is passed in as an instance', function() {
            expect(container.registerInstance.bind(container, Singleton, 1)).to
                .throw('The argument passed was an invalid type.');
        });
    });

    describe('#normalizeClass()', function() {
        it('should return the class constructor unmodified if one is passed in', function() {
            expect(container.normalizeClass(DummyDependency)).to.equal(DummyDependency);
        });

        it('should throw an error if the provided "class name" is not a string or constructor', function() {
            expect(container.normalizeClass.bind(container, {})).to.throw('Unable to resolve the'
                + ' dependency name to the class.');
        });
    });
});
