/**
 * @class Array
 */

/**
 * Executes a provided function once per array element.
 * 
 * <p>Implementation of JavaScript 1.6 built in method, as documented in:
 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach
 * 
 * forEach is good choice when the callback doesn't return anything
 * and just produces a side-effect, like so:
 * 
 * >> var sum=0; [1,2,3].forEach(function(x){sum+=x}); return sum -> 6
 * >> var sum=0; [1,2,3].forEach(function(x, i){sum+=i}); return sum -> 3
 * >> var x=0; [3].forEach(function(){x=this.y}, {y: 5}); return x -> 5
 * 
 * forEach() on empty array doesn't execute the callback at all:
 * 
 * >> var x=1; [].forEach(function(){x=2}); return x -> 1
 * 
 * @param {Function} func
 * @param {Object} scope
 * @return {Array}
 */
Array.prototype.forEach = (function(){
  var nativeFunc = Array.prototype.forEach;
  if (nativeFunc) {
    return function(func, scope) {
      return nativeFunc.call(this, func.toFunction(), scope);
    };
  }
  else {
    return function(func, scope) {
      func = func.toFunction();
      for (var i = 0, len = this.length; i < len; i++) {
        func.call(scope, this[i], i);
      }
    };
  }
})();

/**
 * Maps set of values to another set of values.
 * 
 * <p>Implementation of JavaScript 1.6 built in method, as documented in:
 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
 * 
 * >> [].map(function(){}) -> []
 * >> [1,2,3].map('*2') -> [2,4,6]
 * >> [5,8,2].map('v,i->i') -> [0,1,2]
 * 
 * Second argument specifies function scope:
 * 
 * >> [1,2,3,4].map("x -> x+this.value", {value: 5}) -> [6,7,8,9]
 * 
 * @param {Function} func
 * @param {Object} scope
 * @return {Array}
 */
Array.prototype.map = (function(){
  var nativeFunc = Array.prototype.map;
  if (nativeFunc) {
    return function(func, scope) {
      return nativeFunc.call(this, func.toFunction(), scope);
    };
  }
  else {
    return function(func, scope) {
      func = func.toFunction();
      var result = [];
      for (var i = 0, len = this.length; i < len; i++) {
        result.push(func.call(scope, this[i], i));
      }
      return result;
    };
  }
})();

/**
 * Apply a function simultaneously against two values of the array
 * (from left-to-right) as to reduce it to a single value.
 * 
 * <p>Also known as:  left fold.
 * 
 * <p>Implementation of JavaScript 1.8 built in method, as documented in:
 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
 * 
 * >> [].reduce('1+2+3', 0) -> 0
 * 
 * reduce() can be used to implement sum(), product() and clone() functions:
 * 
 * >> [1,2,3].reduce('+', 0) -> 6
 * >> [1,2,3].reduce('*', 1) -> 6
 * >> [1,2,3].reduce('x,y->x.concat(y)', []) -> [1,2,3]
 * 
 * @param {Function} func
 * @param {Anything} initial
 * @return {Array}
 */
Array.prototype.reduce = (function(){
  var nativeFunc = Array.prototype.reduce;
  if (nativeFunc) {
    return function(func, initial) {
      return nativeFunc.call(this, func.toFunction(), initial);
    };
  }
  else {
    return function(func, initial) {
      func = func.toFunction();
      var result = initial;
      for (var i = 0, len = this.length; i < len; i++) {
        result = func(result, this[i]);
      }
      return result;
    };
  }
})();

/**
 * Creates a new array with all elements that pass the test
 * implemented by the provided function.
 * 
 * <p>Implementation of JavaScript 1.6 built in method, as documented in:
 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
 * 
 * >> [].filter('1+2+3') -> []
 * >> [1,2,3].filter('>1') -> [2,3]
 * >> [1,2,3].filter('<1') -> []
 * >> [1,2,3].filter('v,i -> i>1') -> [3]
 * 
 * @param {Function} func
 * @param {Object} scope
 * @return {Array}
 */
Array.prototype.filter = (function(){
  var nativeFunc = Array.prototype.filter;
  if (nativeFunc) {
    return function(func, scope) {
      return nativeFunc.call(this, func.toFunction(), scope);
    };
  }
  else {
    return function(func, scope) {
      func = func.toFunction();
      var result = [];
      for (var i = 0, len = this.length; i < len; i++) {
        if (func.call(scope, this[i], i)) {
          result.push(this[i]);
        }
      }
      return result;
    };
  }
})();

/**
 * Tests whether all elements in the array pass the test implemented
 * by the provided function.
 * 
 * >> [1,2,3].every('>0') -> true
 * >> [1,2,3].every('>1') -> false
 * 
 * When array is empty, returns true:
 * 
 * >> [].every(function(){}) -> true
 * 
 * @param {Function} func
 * @param {Object} scope
 * @return {Boolean}
 */
Array.prototype.every = (function(){
  var nativeFunc = Array.prototype.every;
  if (nativeFunc) {
    return function(func, scope) {
      return nativeFunc.call(this, func.toFunction(), scope);
    };
  }
  else {
    return function(func, scope) {
      func = func.toFunction();
      for (var i = 0, len = this.length; i < len; i++) {
        if (!func.call(scope, this[i], i)) {
          return false;
        }
      }
      return true;
    };
  }
})();

/**
 * Tests whether some element in the array passes the test
 * implemented by the provided function.
 * 
 * >> [1,2,3].some('>0') -> true
 * >> [1,2,3].some('>1') -> true
 * >> [1,2,3].some('>2') -> true
 * >> [1,2,3].some('>3') -> false
 * 
 * When array is empty, returns false:
 * 
 * >> [].some(function(){}) -> false
 * 
 * @param {Function} fun
 * @param {Object} scope
 * @return {Boolean}
 */
Array.prototype.some = (function(){
  var nativeFunc = Array.prototype.some;
  if (nativeFunc) {
    return function(func, scope) {
      return nativeFunc.call(this, func.toFunction(), scope);
    };
  }
  else {
    return function(func, scope) {
      func = func.toFunction();
      for (var i = 0, len = this.length; i < len; i++) {
        if (func.call(scope, this[i], i)) {
          return true;
        }
      }
      return false;
    };
  }
})();

if (!Array.prototype.indexOf) {
  /**
   * Returns the first index at which a given element can be found in
   * the array, or -1 if it is not present.
   * 
   * indexOf compares searchElement to elements of the Array using
   * strict equality (the same method used by the === operator).
   * 
   * >> [1,2,3,4].indexOf(3) -> 2
   * >> [5,5,8,2,3,2].indexOf(2) -> 3
   * >> [8,9,2].indexOf(5) -> -1
   * >> [].indexOf(4) -> -1
   * 
   * Comparison is performed using ===:
   * 
   * >> [1,2,3,4].indexOf("3") -> -1
   * 
   * Use of the fromIndex parameter:
   * 
   * >> [1,2,3,4,5].indexOf(3, 2) -> 2
   * >> [1,2,3,4,5].indexOf(3, 3) -> -1
   * 
   * @param {Object} searchElement Element to locate in the array.
   * @param {Number} fromIndex The index at which to begin the search.
   * searching backwards.
   * @return {Number} 
   */
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    fromIndex = fromIndex || 0;
    for (var i = fromIndex, len = this.length; i < len; i++) {
      if (this[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };
}

obfunctional.override(Array, {
  /**
   * Invokes a method on each item in an Array.
   * 
   * Invoke is just a special form of map:
   * 
   * >> [{foo:"1".lambda()}, {foo:"2".lambda()}].invoke("foo") -> [1,2]
   * >> [{foo:"1".lambda()}, {foo:"2".lambda()}].map(".foo()") -> [1,2]
   * 
   * Also with parameters:
   * 
   * >> [{foo:"x+1".lambda()}, {foo:"x+2".lambda()}].invoke("foo", 5) -> [6,7]
   * >> [{foo:"x+1".lambda()}, {foo:"x+2".lambda()}].map(".foo(5)") -> [6,7]
   * 
   * @param {String} methodName The method name to invoke.
   * @param {Anything} ... Arguments to send into the method invocation.
   * @return {Array} The results of invoking the method on each item in the array.
   */
  invoke: function(methodName) {
    var ret = [];
    var args = Array.prototype.slice.call(arguments, 1);
    
    for (var i=0, len=this.length; i<len; i++) {
      var v = this[i];
      ret.push(v[methodName].apply(v, args));
    }
    
    return ret;
  },
  
  /**
   * Combines array with another array of the same length
   * using supplied function that does the combination.
   * 
   * <p>For example:
   * 
   * <pre>
   * [1,2,3].zipWith([4,5,6], function(a,b){return a+b;});
   * </pre>
   * 
   * will return the following array:
   * 
   * <pre>
   * [5,7,9]
   * </pre>
   * 
   * Inspired by Haskell :)
   * 
   * @param {Array} arr  second array to combine first with
   * @param {Function} func  function that takes two arguments
   * @param {Object} scope  scope for the function
   * @return {Array} new combined array
   */
  zipWith: function(arr, func, scope) {
    func = func.toFunction();
    scope = scope || this;
    var result = [];
    for (var i = 0, len = this.length; i < len; i++) {
      result[i] = func.call(scope, this[i], arr[i]);
    }
    return result;
  },
  
  /**
   * Returns largest value in array.
   * 
   * >> [4,3,8,2,7].max() -> 8
   * 
   * When array is empty, returns null:
   * 
   * >> [].max() -> null
   * 
   * Also works with dates:
   * 
   * >> [new Date(1000), new Date(2000), new Date(3000)].max() -> new Date(3000)
   * 
   * @return {Number/Date}
   */
  max: function() {
    return this.reduce('max, x -> (x > max) ? x : max', this[0] || null);
  },
  
  /**
   * Returns smallest value in array.
   * 
   * >> [4,3,8,2,7].min() -> 2
   * 
   * When array is empty, returns null:
   * 
   * >> [].min() -> null
   * 
   * Also works with dates:
   * 
   * >> [new Date(1000), new Date(2000), new Date(3000)].min() -> new Date(1000)
   * 
   * @return {Number/Date}
   */
  min: function() {
    return this.reduce('min, x -> (x < min) ? x : min', this[0] || null);
  },
  
  /**
   * Adds together all values in array.
   * 
   * >> [1,2,3].sum() -> 6
   * >> [7,3,-10].sum() -> 0
   * 
   * When array is empty, returns 0:
   * 
   * >> [].sum() -> 0
   * 
   * Works only with numeric arrays:
   * 
   * >> ["hello", "dolly"].sum() -> NaN
   * 
   * @return {Number}
   */
  sum: function() {
    return this.reduce('a, b -> (+a) + (+b)', 0);
  },
  
  /**
   * Extracts property values from each object in array.
   * 
   * <p>For example:
   * 
   * <pre>
   * var people = [{name:"John", age:20}, {name:"Mary", age:14}];
   * people.pluck("name"); // returns ["John", "Mary"]
   * people.pluck("age"); // returns [20, 14]
   * </pre>
   * 
   * Inspired by Prototype JS method Enumerable.pluck()
   * 
   * @param {String} key  the name of object property to retrieve
   * @return {Array}
   */
  pluck: function(key) {
    return this.map(function(obj){ return obj[key]; });
  },
  
  /**
   * Returns the last index at which a given element can be found in
   * the array, or -1 if it is not present. The array is searched
   * backwards, starting at fromIndex.
   * 
   * >> [1,2,3,4].lastIndexOf(3) -> 2
   * >> [5,5,8,2,3,2].lastIndexOf(2) -> 5
   * >> [8,9,2].lastIndexOf(5) -> -1
   * >> [].lastIndexOf(4) -> -1
   * 
   * Comparison is done with the === operator:
   * 
   * >> [1,2,3,4].lastIndexOf("3") -> -1
   * 
   * Use of the fromIndex parameter:
   * 
   * >> [1,2,3,4,5].lastIndexOf(3, 2) -> 2
   * >> [1,2,3,4,5].lastIndexOf(3, 1) -> -1
   * 
   * @param {Object} searchElement Element to locate in the array.
   * @param {Number} fromIndex The index at which to start searching
   * backwards.
   * @return {Number} 
   */
  lastIndexOf: function(searchElement, fromIndex) {
    fromIndex = (fromIndex === undefined) ? this.length-1 : fromIndex;
    for (var i = fromIndex; i >= 0; i--) {
      if (this[i] === searchElement) {
        return i;
      }
    }
    return i;
  },
  
  /**
   * Returns true when value exists in array, false otherwise.
   * 
   * <p>Works like indexOf(), but more suitable when you don't
   * care about the index of the element you are looking for.
   * 
   * @param {Anything} value
   * @return {Boolean}
   */
  contains: function(value) {
    return this.indexOf(value) !== -1;
  },
  
  /**
   * Removes null and undefined array elements.
   * 
   * For example:
   * 
   * <pre>
   * [1,2,null,3,undefined,4].compact() --> [1,2,3,4]
   * </pre>
   * 
   * @return {Array}
   */
  compact: function() {
    return this.filter('x -> x!==null && x!==undefined');
  },
  
  /**
   * Flattens multi-dimensional array into one-dimensional.
   * 
   * <p>For example:
   * 
   * <pre>
   * [1,2,[3,4,[5,6]],7].flatten() --> [1,2,3,4,5,6,7]
   * </pre>
   * 
   * @return {Array}
   */
  flatten: function() {
    var result = [];
    for (var i=0, len=this.length; i<len; i++) {
      var v = this[i];
      if (v instanceof Array) {
        result.push.apply(result, v.flatten());
      }
      else {
        result.push(v);
      }
    }
    return result;
  },
  
  /**
   * Returns first element of array or undefined when array empty.
   * 
   * @return {Anything}
   */
  first: function() {
    return this[0];
  },
  
  /**
   * Returns last element of array or undefined when array empty.
   * 
   * @return {Anything}
   */
  last: function() {
    return this[this.length-1];
  },
  
  /**
   * Returns true when the passed in array is equal to this one.
   * 
   * <p>For example:
   * 
   * <pre>
   * [1,2,3].equals("foo"); // false
   * [1,2,3].equals([1,2,3]); // true
   * [1,2,3].equals([3,2,1]); // false
   * [1,2,3].equals([1,2,"3"]); // false
   * [[1,2],[3,4]].equals([[1,2],[3,4]]); // true
   * </pre>
   * 
   * @param {Array} arr  the array to compare to
   * @return {Boolaen}
   */
  equals: function(arr) {
    if (!(arr instanceof Array) || this.length !== arr.length) {
      return false;
    }
    
    for (var i=0, len=this.length; i<len; i++) {
      if (this[i] instanceof Array) {
        if (!this[i].equals(arr[i])) {
          return false;
        }
      }
      else if (this[i] !== arr[i]) {
        return false;
      }
    }
    
    return true;
  },
  
  /**
   * Removes duplicate consequent values from array, like UNIX command
   * with the same name.
   * 
   * <p>Simple usage:
   * 
   * <pre>
   * [1,1,1,2,2,2,2,3,4,4,4,5,6,6,6].uniq();  // produces: [1,2,3,4,5,6]
   * </pre>
   * 
   * <p>More complex case, providing your own comparison function:
   * 
   * <pre>
   * [{id:1},{id:1},{id:2},{id:2},{id:2}{id:3}].uniq(function(a,b){return a.id===b.id;});
   * // produces: [{id:1},{id:2},{id:3}]
   * </pre>
   * 
   * <p>When you want a list of completely unique values, then you
   * should call sort() first:
   * 
   * <pre>
   * [1,1,1,2,2,2,1,1,2,2].uniq();  // produces: [1,2,1,2]
   * [1,1,1,2,2,2,1,1,2,2].sort().uniq();  // produces: [1,2]
   * </pre>
   * 
   * <p>PS. ext-basex contains Array.unique() which behaves differently.
   * 
   * @param {Function} equals  function for determining if two
   * array elements equal.  Must return true when the two values
   * passwd to it are equal.  By default the === operator is used to
   * determin equality. (optional)
   * @param {Object} scope  scope for the function (optional).
   * @return {Array}
   */
  uniq: function(equals, scope) {
    equals = (equals || "===").toFunction();
    var result = [];
    for (var i=0, len=this.length; i<len; i++) {
      if (i===0 || !equals.call(scope, this[i-1], this[i])) {
        result.push(this[i]);
      }
    }
    return result;
  },
  
  /**
   * Searches array from beginning to end, executing callback function
   * on each value.  When function returns true, returns the current
   * index.
   * 
   * <p>For example:
   * 
   * <pre>
   * // returns 4  (first number greater than 3)
   * [1,2,3,4,5].find(function(x){return x > 3});
   * 
   * // returns undefined
   * [1,2,3,4,5].find(function(x){return x < 0});
   * </pre>
   * 
   * @param {Function} func  function returning true when item found.
   * It gets passed two arguments: value and index.
   * @param {Object} scope  scope for the function.
   * @param {Boolean} backwards when true, array is searched from end
   * to beginning. <b>NB!</b> Don't use this parameter, use
   * findBackwards() method instead.
   * @return {Number} Either index of the value found or -1.
   */
  find: function(func, scope, backwards) {
    func = func.toFunction();
    for (var i=0, len=this.length; i<len; i++) {
      var index = backwards ? len-i-1 : i;
      if (func.call(scope, this[index], index)) {
        return index;
      }
    }
    return -1;
  },
  
  /**
   * Just like find(), but searches the array from end to beginning.
   * 
   * @param {Function} func
   * @param {Object} scope
   * @return {Number}
   */
  findBackwards: function(func, scope) {
    return this.find(func, scope, true);
  },
  
  /**
   * Sorts array in place by comparing values extracted from array
   * elements by callback function.
   * 
   * <p>For example to sort array of strings my length you would
   * supply a sort function, that returns length of string:
   * 
   * <pre>
   * ["a", "", "foo", "xy"].sortByValue(".length"); // --> ["", "a", "xy", "foo"]
   * </pre>
   * 
   * @param {Function} extractValue  callback that gets called with
   * each array element.
   * @param {Object} scope  scope for the callback
   * @return {Array}
   */
  sortByValue: function(extractValue, scope) {
    this.sort(function(a, b) {
      a = extractValue.call(scope, a);
      b = extractValue.call(scope, b);
      return (a > b) ? 1 : ((a < b) ? -1 : 0);
    });
    return this;
  },
  
  /**
   * Chunks an array into size large chunks. The last chunk may
   * contain less than size elements.
   * 
   * <p>For example:
   * 
   * <pre>
   * [1,2,3,4].chuck(2); // --> [[1,2], [3,4]]
   * [1,2,3,4].chuck(3); // --> [[1,2,3], [4]]
   * [1,2,3,4,5].chuck(1); // --> [[1], [2], [3], [4], [5]]
   * </pre>
   * 
   * @param {Number} size  the size of each chunk
   * @return {Array}
   */
  chunk: function(size) {
    if (size <= 0) {
      throw "Chunks size must be > 0";
    }
    
    var chunks = [];
    for (var i=0, len=this.length; i<len; i+=size) {
      chunks.push(this.slice(i, i+size));
    }
    return chunks;
  },
  
  /**
   * Creates array of integers starting with 0 of specified length.
   * 
   * For example:
   * 
   * <pre>
   * [].range(0); // --> []
   * [].range(5); // --> [0,1,2,3,4]
   * </pre>
   * 
   * @param {Number} len
   * @return {[Number]}
   */
  range: function(len) {
    var range = [];
    for (var i=0; i<len; i++) {
      range.push(i);
    }
    return range;
  }

});
