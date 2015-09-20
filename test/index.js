'use strict';

/* global describe it */

var assert = require('assert');

var flattenObjectStrict = require('../lib');

describe('flatten-object-strict', function() {
  it('an empty object produces an empty object', function() {
    assert.deepEqual(flattenObjectStrict({}), {});
  });
});
