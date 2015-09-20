'use strict';

/* global describe it */

var assert = require('assert');

var flattenObjectStrict = require('../lib');

describe('flatten-object-strict', function() {
  it('an empty object produces an empty object', function() {
    assert.deepEqual(flattenObjectStrict({}), {});
  });

  it('a object that\'s already flat doesn\'t change', function() {
    [
      { a: 'a', b: [1, 2, 3], c: function() {} },
      { foo: 'bar', baz: 'boom' },
      { one: 'one', two: 'two', three: 'three', four: 'four', five: 'five' }
    ].forEach(function(flatObject) {
      assert.deepEqual(flattenObjectStrict(flatObject), flatObject);
    });
  });
});
