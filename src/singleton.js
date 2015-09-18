/**
 * @package needlepoint
 * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
 */

import container from './container';

export default function singleton(Clazz) {
    container.registerAsSingleton(Clazz);
}
