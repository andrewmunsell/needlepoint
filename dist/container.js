'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @package needlepoint
 * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
 */

// Currently initialized instances for singletons
var dependencies = new Map();
var singletons = new Map();

var Container = (function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, null, [{
        key: 'resolve',

        /**
         * Resolve a single class to an instance, injecting dependencies as needed
         * @param  {class|string} clazz
         * @return {object}       Instance of the class
         */
        value: function resolve(clazz) {
            clazz = Container.normalizeClass(clazz);

            // If the class being injected is a singleton, handle it separately
            // since instances of it are cached.
            if (singletons.has(clazz)) {
                return Container.resolveSingleton(clazz);
            } else {
                return Container.resolveSingleInstance(clazz);
            }
        }

        /**
         * Resolve the specified classes, injecting dependencies as needed
         * @param  {class|string} ...classes
         * @return {...object}
         */

    }, {
        key: 'resolveAll',
        value: function resolveAll() {
            for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
                classes[_key] = arguments[_key];
            }

            return classes.map(Container.resolve);
        }

        /**
         * Resolve a class into a singleton instance. This single instance will be
         * used across the entire application.
         * @param  {class|string} clazz
         * @return {object}       Resolved instance of the class as a singleton
         */

    }, {
        key: 'resolveSingleton',
        value: function resolveSingleton(clazz) {
            if (singletons.get(clazz) === null) {
                singletons.set(clazz, Container.resolveSingleInstance(clazz));
            }

            return singletons.get(clazz);
        }

        /**
         * Resolve a class into an instance with all of its dependencies injected.
         * @param  {class|string} clazz
         * @return {object}       Resolved instance of the class
         */

    }, {
        key: 'resolveSingleInstance',
        value: function resolveSingleInstance(clazz) {
            // Check and see if there are any dependencies that need to be injected
            var deps = Container.resolveAll.apply(Container, _toConsumableArray(dependencies.get(clazz) || []));

            // Apply the dependencies and create a new instance of the class
            return new (Function.prototype.bind.apply(clazz, [null].concat(_toConsumableArray(deps))))();
        }

        /**
         * Resolve a dependency into its class.
         * @param  {class|function|string} clazz
         * @return {class}
         */

    }, {
        key: 'normalizeClass',
        value: function normalizeClass(clazz) {
            if (typeof clazz == 'string') {
                // TODO: Actually resolve the class from the string name that
                // was provided to us.
            } else if (typeof clazz == 'function') {
                    return clazz;
                } else {
                    throw new Error('Unable to resolve the dependency name to the class.');
                }
        }

        /**
         * Register an instance as a singleton for the specified class
         * @param  {class|string} clazz
         * @param  {object} instance
         */

    }, {
        key: 'registerInstance',
        value: function registerInstance(clazz, instance) {
            if ((typeof instance === 'undefined' ? 'undefined' : _typeof(instance)) != 'object' && typeof instance != 'function') {
                throw new Error('The argument passed was an invalid type.');
            }

            clazz = Container.normalizeClass(clazz);

            singletons.set(clazz, instance);
        }

        /**
         * Register the list of dependencies required for the specified class.
         * @param  {class} clazz        Class to register dependencies for
         * @param  {array} dependencies Array of dependencies for the class
         */

    }, {
        key: 'registerDependencies',
        value: function registerDependencies(clazz, deps) {
            dependencies.set(clazz, deps);
        }

        /**
         * Register the specified class as a singleton, meaning only a single
         * instance of it will be created for the entire application.
         * @param  {class} clazz
         */

    }, {
        key: 'registerAsSingleton',
        value: function registerAsSingleton(clazz) {
            if (!singletons.has(clazz)) {
                singletons.set(clazz, null);
            }
        }
    }]);

    return Container;
})();

exports.default = Container;