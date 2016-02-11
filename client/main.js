'use strict';

console.log('hello!');

console.log('allo again!');

var component = require('./components/component.js');

document.getElementById('container').appendChild(component());
