/**
 * @package needlepoint
 * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
 */

import container from './container';

export default function dependencies(...deps) {
    return function decorator(Clazz) {
        container.registerDependencies(Clazz, deps);
    };
}
