module("Function");

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
