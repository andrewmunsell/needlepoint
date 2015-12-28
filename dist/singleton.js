'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = singleton;

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function singleton(Clazz) {
  _container2.default.registerAsSingleton(Clazz);
} /**
   * @package needlepoint
   * @copyright 2015 Andrew Munsell <andrew@wizardapps.net>
   */