'use strict';

var objectLeaves = require('object-leaves');

var oldSchoolComparison = function(a, b) {
  return (a < b ? -1 : a > b ? 1 : 0);
};

var mappedComparator = function(map) {
  return function(a, b) {
    return oldSchoolComparison(map(a), map(b));
  };
};

var propGetter = function(key) {
  return function(obj) {
    return obj[key];
  };
};

var duplicateKeys = function(leaves) {
  var sortedLeaves = leaves.slice().sort(mappedComparator(propGetter('key')));

  var duplicates = {};

  for (var i = 0; i !== sortedLeaves.length; i++) {
    var j = i + 1;

    while (j < sortedLeaves.length && sortedLeaves[j].key === sortedLeaves[i].key) {
      j++;
    }

    if (j > i + 1) {
      duplicates[sortedLeaves[i].key] = sortedLeaves.slice(i, j).map(function(leaf) {
        return '.' + leaf.path.join('.');
      });
    }
  }

  return duplicates;
};

module.exports = function(obj) {
  var flattened = {};

  var leaves = objectLeaves(obj);

  leaves.forEach(function(leaf) {
    if (leaf.key in flattened) {
      throw new Error('Duplicate keys found: ' + JSON.stringify(duplicateKeys(leaves), null, 2));
    }

    flattened[leaf.key] = leaf.value;
  });

  return flattened;
};
