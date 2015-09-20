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
});
