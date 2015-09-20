# flatten-object-strict
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/voltrevo/flatten-object-strict/badge.svg?branch=master&service=github)](https://coveralls.io/github/voltrevo/flatten-object-strict?branch=master) [![Code Climate](https://codeclimate.com/github/voltrevo/flatten-object-strict/badges/gpa.svg)](https://codeclimate.com/github/voltrevo/flatten-object-strict)
> Flattens a nested object. Throws on collisions.


## Install

```sh
$ npm install --save flatten-object-strict
```


## Usage

```js
'use strict';

var flattenObjectStrict = require('flatten-object-strict');

console.log(flattenObjectStrict({
  foo: {
    one: 1,
    two: 2
  },
  bar: {
    three: 3,
    four: 4
  }
}))

// { one: 1, two: 2, three: 3, four: 4 }

console.log(flattenObjectStrict({
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
}));

// Error: Duplicate keys found: {
//   "dup1": [
//     ".foo.dup1",
//     ".bar.dup1"
//   ],
//   "dup2": [
//     ".bar.dup2",
//     ".baz.dup2"
//   ]
// }
```

## License

MIT © [Andrew Morris](http://andrewmorris.io/)


[npm-image]: https://badge.fury.io/js/flatten-object-strict.svg
[npm-url]: https://npmjs.org/package/flatten-object-strict
[travis-image]: https://travis-ci.org/voltrevo/flatten-object-strict.svg?branch=master
[travis-url]: https://travis-ci.org/voltrevo/flatten-object-strict
[daviddm-image]: https://david-dm.org/voltrevo/flatten-object-strict.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/voltrevo/flatten-object-strict
