'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dependencies;

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dependencies() {
    for (var _len = arguments.length, deps = Array(_len), _key = 0; _key < _len; _key++) {
        deps[_key] = arguments[_key];
    }

    return function decorator(Clazz) {
        _container2.default.registerDependencies(Clazz, deps);
    };
} /**
   * @package needlepoint
   * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
   */