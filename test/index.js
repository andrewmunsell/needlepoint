/**
 * @package needlepoint
 * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
 */

import {expect} from 'chai';

import * as Needlepoint from '../src/index';

describe('Needlepoint', function() {
    it('should have an container property', function() {
        expect(Needlepoint).to.have.property('container');
    });

    // Decorators

    it('should have a singleton property', function() {
        expect(Needlepoint).to.have.property('singleton');
    });

    it('should have a dependencies property', function() {
        expect(Needlepoint).to.have.property('dependencies');
    });
});
