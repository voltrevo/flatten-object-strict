'use strict';

/* global describe it */

var assert = require('assert');

var flattenObjectStrict = require('../lib');

var noThrow = function(fn) {
  return function() {
    var ret = {
      error: undefined,
      value: undefined
    };

    try {
      ret.value = fn.apply(this, arguments);
    } catch (e) {
      ret.error = e;
    }

    return ret;
  };
};

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

  it('flattens an object with nesting', function() {
    assert.deepEqual(
      flattenObjectStrict({
        one: 1,
        two: {
          three: 3,
          four: 4
        },
        five: {
          five: 5,
          six: 6,
          seven: {
            eight: 8,
            nine: 9,
            ten: 10
          },
          eleven: 11,
          twelve: {
            thirteen: {
              fourteen: {
                fifteen: 15
              }
            }
          }
        }
      }),
      {
        one: 1,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        fifteen: 15
      }
    );
  });

  it('throws a helpful error message when there are duplicate keys', function() {
    assert.deepEqual(
      noThrow(flattenObjectStrict)({
        foo: {
          dup1: 1
        },
        bar: {
          dup1: 13,
          dup2: 281
        },
        baz: {
          dup2: 38
        }
      }).error.message,
      'Duplicate keys found: ' + JSON.stringify({
        dup1: ['.foo.dup1', '.bar.dup1'],
        dup2: ['.bar.dup2', '.baz.dup2']
      }, null, 2)
    );
  });
});
