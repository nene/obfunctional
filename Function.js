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
  }
});
