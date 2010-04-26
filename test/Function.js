module("Function");

test("bind()", function() {
  var func = function(x, y) {
    return this.foo + x + y;
  };
  same(func.bind({foo: "a"})("b", "c"), "abc");
  same(func.bind({foo: "a"}, "b")("c"), "abc");
  same(func.bind({foo: "a"}, "b", "c")(), "abc");
});

test("not() even/odd", function() {
  var even = function(x){return x % 2 === 0;};
  var odd = even.not();
  ok(even(4));
  ok(!even(3));
  ok(odd(7));
  ok(!odd(8));
});

test("not() eq/neq", function() {
  var eq = function(a,b){return a === b;};
  var neq = eq.not();
  ok(eq(2,2));
  ok(!eq(1,2));
  ok(neq(1,2));
  ok(!neq(2,2));
});

test("not() in object context", function() {
  var obj = {
    x: 6,
    isX: function(n) {
      return n === this.x;
    }
  };
  obj.notX = obj.isX.not();
  ok(!obj.isX(1));
  ok(obj.isX(6));
  ok(!obj.notX(6));
  ok(obj.notX(8));
});

test("cacheMethod() no arguments", function() {
  var obj = {
    value: 1,
    getValue: function() {
      return this.value;
    },
    getCachedValue: (function() {
      return this.value;
    }).cacheMethod("getCachedValue")
  };
  same(obj.getValue(), 1);
  same(obj.getCachedValue(), 1);
  
  obj.value = 2;
  same(obj.getValue(), 2);
  same(obj.getCachedValue(), 1);
});

test("cacheMethod() multiple arguments", function() {
  var obj = {
    value: 1,
    add: function(x) {
      return this.value + x;
    },
    cachedAdd: (function(x) {
      return this.value + x;
    }).cacheMethod("cachedAdd")
  };
  same(obj.add(1), 2);
  same(obj.add(2), 3);
  same(obj.cachedAdd(1), 2);
  same(obj.cachedAdd(2), 3);
  
  obj.value = 10;
  same(obj.add(1), 11);
  same(obj.add(2), 12);
  same(obj.cachedAdd(1), 2);
  same(obj.cachedAdd(2), 3);
});

test("cacheMethod() multiple objects", function() {
  var MyClass = function(v) {
    this.value = v;
  };
  MyClass.prototype = {
    getValue: function() {
      return this.value;
    },
    getCachedValue: (function() {
      return this.value;
    }).cacheMethod("getCachedValue")
  };
  
  var obj1 = new MyClass(1);
  same(obj1.getValue(), 1);
  same(obj1.getCachedValue(), 1);
  
  var obj2 = new MyClass(2);
  same(obj2.getValue(), 2);
  same(obj2.getCachedValue(), 2);
});
