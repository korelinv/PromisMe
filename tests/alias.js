const assert = require('assert');
const {describe} = require('..').core;
const {alias} = require('..').alias;

// alias should return promise from description
(() => {
    let description = describe('', ({scope}) => {});

    assert.ok(true === (alias(description(), {}) instanceof Promise));
})();
