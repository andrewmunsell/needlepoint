/**
 * @package needlepoint
 * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
 */

// Currently initialized instances for singletons
var dependencies = new Map();
var singletons = new Map();

export default class Container {
    /**
     * Resolve a single class to an instance, injecting dependencies as needed
     * @param  {class|string} clazz
     * @return {object}       Instance of the class
     */
    static resolve(clazz) {
        clazz = Container.normalizeClass(clazz);

        // If the class being injected is a singleton, handle it separately
        // since instances of it are cached.
        if(singletons.has(clazz)) {
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
    static resolveAll(...classes) {
        return classes.map(Container.resolve);
    }

    /**
     * Resolve a class into a singleton instance. This single instance will be
     * used across the entire application.
     * @param  {class|string} clazz
     * @return {object}       Resolved instance of the class as a singleton
     */
    static resolveSingleton(clazz) {
        if(singletons.get(clazz) === null) {
            singletons.set(clazz, Container.resolveSingleInstance(clazz));
        }

        return singletons.get(clazz);
    }

    /**
     * Resolve a class into an instance with all of its dependencies injected.
     * @param  {class|string} clazz
     * @return {object}       Resolved instance of the class
     */
    static resolveSingleInstance(clazz) {
        // Check and see if there are any dependencies that need to be injected
        var deps = Container.resolveAll(...(dependencies.get(clazz) || []));

        // Apply the dependencies and create a new instance of the class
        return new clazz(...deps);
    }

    /**
     * Resolve a dependency into its class.
     * @param  {class|function|string} clazz
     * @return {class}
     */
    static normalizeClass(clazz) {
        if(typeof clazz == 'string') {
            // TODO: Actually resolve the class from the string name that
            // was provided to us.
        } else if(typeof clazz == 'function') {
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
    static registerInstance(clazz, instance) {
        if(typeof instance != 'object' && typeof instance != 'function') {
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
    static registerDependencies(clazz, deps) {
        dependencies.set(clazz, deps);
    }

    /**
     * Register the specified class as a singleton, meaning only a single
     * instance of it will be created for the entire application.
     * @param  {class} clazz
     */
    static registerAsSingleton(clazz) {
        if(!singletons.has(clazz)) {
            singletons.set(clazz, null);
        }
    }
}
