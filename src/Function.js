/**
 * @class Function
 */
obfunctional.override(Function, {
  /**
   * Returns a bound method on `object`, optionally currying `args`.
   * 
   * <pre>
   * f.bind(obj, args...)(args2...) == f.apply(obj, [args..., args2...])
   * </pre>
   * 
   * >> "this.foo + x + y".lambda().bind({foo: "a"})("b", "c") -> "abc"
   * >> "this.foo + x + y".lambda().bind({foo: "a"}, "b")("c") -> "abc"
   * >> "this.foo + x + y".lambda().bind({foo: "a"}, "b", "c")() -> "abc"
   * 
   * @param {Object} object  value for this inside function.
   * @param {Object} var1 additional arguments to pass to the function
   * @return {Function}
   */
  bind: function(object) {
    var fn = this;
    var args = Array.slice(arguments, 1);
    return function() {
      return fn.apply(object, args.concat(Array.slice(arguments, 0)));
    };
  },
  
  /**
   * Negates a predicate function.
   * 
   * For example when we have a predicate that returns true
   * when number is even, we can use not() to get a function
   * that returns true when number is odd:
   * 
   * >> "x % 2 === 0".lambda().not()(5) -> true
   * 
   * It also works in object context:
   * 
   * >> "this.x > y".lambda().call({x: 5}, 4) -> true
   * 
   * @return {Function} negated function
   */
  not: function() {
    var f = this;
    return function(){
      return !f.apply(this, arguments);
    };
  },
  
  /**
   * Creates a cached version of a method.
   * 
   * <p>That is the method will execute its computations only when
   * called the first time and cache the resulting value for simple
   * returning on all subsequent calls.
   * 
   * <p>On first call it executes the method and then overwrites it
   * with simple function that just returns the value.
   * 
   * <p>Example usage:
   * 
   * <pre>
   * var Adder = Ext.extend(Object, {
   *   constructor: function(v) {
   *     this.value = v;
   *   },
   *   add: (function(x) {
   *     // In practice this should be some longer calculation
   *     return this.value + x;
   *   }).cacheMethod("add")
   * });
   * 
   * var c1 = new Cacher(10);
   * c1.add(1); // does long calculation and returns 11
   * c1.add(2); // does long calculation and returns 12
   * c1.add(1); // returns from cache 11
   * c1.add(2); // returns from cache 12
   * 
   * // when we create another instance then this will have separate cache
   * var c2 = new Cacher(20);
   * c2.add(1); // 21
   * c2.add(2); // 22
   * </pre>
   * 
   * @param {String} methodName  name of the method.
   * @return {Function}
   */
  cacheMethod: function(methodName) {
    var func = this;
    return function() {
      var cache = {};
      var cachedFunc = function() {
        var key = Array.prototype.join.call(arguments);
        if (cache.hasOwnProperty(key)) {
          return cache[key];
        }
        else {
          return cache[key] = func.apply(this, arguments);
        }
      };
      this[methodName] = cachedFunc;
      return cachedFunc.apply(this, arguments);
    };
  }
});
