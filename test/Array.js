module("Array");

test("invoke()", function() {
  same([].invoke("foo"), [], "invoke on empty list results in empty list");
  
  same([
    {foo: function(){return "a";}},
    {foo: function(){return "b";}},
    {foo: function(){return "c";}}
  ].invoke("foo"), ["a", "b", "c"]);
});

test("max()", function() {
  same([].max(), null, "maximum value in empty list is null");
  same([9].max(), 9, "maximum value of one-element list is the only value in there");
  same([3,4,1].max(), 4);
  same([2,2,2,2].max(), 2);
  
  var d1 = new Date(1000);
  var d2 = new Date(2000);
  var d3 = new Date(3000);
  same([d1,d2,d3].max(), d3, "also works on Date's");
});

test("min()", function() {
  same([].min(), null, "minimum value in empty list is null");
  same([9].min(), 9, "minimum value of one-element list is the only value in there");
  same([3,4,1].min(), 1);
  same([2,2,2,2].min(), 2);
  
  var d1 = new Date(1000);
  var d2 = new Date(2000);
  var d3 = new Date(3000);
  same([d1,d2,d3].min(), d1, "also works on Date's");
});

test("sum()", function() {
  same([].sum(), 0, "sum of empty list is 0");
  same([42].sum(), 42);
  same([1,2,3].sum(), 6);
});

test("pluck()", function() {
  var people = [{name:"John", age:20}, {name:"Mary", age:14}];
  same(people.pluck("name"), ["John", "Mary"]);
  same(people.pluck("age"), [20, 14]);
  same([].pluck("foo"), [], "plucking empty array results in empty array");
  same([{foo:1}, {bar:2}].pluck("baz"), [undefined, undefined]);
});

test("indexOf() returns array index or -1", function() {
  same([1,2,3,4].indexOf(3), 2);
  same([5,5,8,2,3,2].indexOf(2), 3);
  same([8,9,2].indexOf(5), -1);
  same([].indexOf(4), -1);
});

test("lastIndexOf() returns array index or -1", function() {
  same([1,2,3,4].lastIndexOf(3), 2);
  same([5,5,8,2,3,2].lastIndexOf(2), 5);
  same([8,9,2].lastIndexOf(5), -1);
  same([].lastIndexOf(4), -1);
});

test("indexOf() and lastIndexOf() compare using ===", function() {
  same([1,2,3,4].indexOf("3"), -1);
  same([1,2,3,4].lastIndexOf("3"), -1);
  same([null].indexOf(undefined), -1);
  same([undefined].lastIndexOf(null), -1);
});

test("indexOf() and lastIndexOf() fromIndex parameter", function() {
  same([1,2,3,4,5].indexOf(3, 0), 2);
  same([1,2,3,4,5].indexOf(3, 2), 2);
  same([1,2,3,4,5].indexOf(3, 3), -1);
  same([1,2,3,4,5].indexOf(3, 4), -1);
  
  same([1,2,3,4,5].lastIndexOf(3, 4), 2);
  same([1,2,3,4,5].lastIndexOf(3, 2), 2);
  same([1,2,3,4,5].lastIndexOf(3, 1), -1);
  same([1,2,3,4,5].lastIndexOf(3, 0), -1);
});

test("contains() finds nothing from empty list", function() {
  same([].contains(5), false);
});

test("contains() works with numbers", function() {
  same([42].contains(42), true);
  same([1,2,3].contains(2), true);
  same([1,2,3].contains(0), false);
});

test("contains() works with all kinds of types", function() {
  var obj = {a:1};
  var arr = [1,2,3];
  var fun = function(){};
  
  var stuff = ["x", 8, false, undefined, null, obj, arr, fun];
  stuff.forEach(function(item) {
    ok(stuff.contains(item));
  });
  
  var otherStuff = ["X", 5, true, {a:1}, [1,2,3], function(){}];
  otherStuff.forEach(function(item) {
    ok(!stuff.contains(item));
  });
  stuff.forEach(function(item) {
    ok(!otherStuff.contains(item));
  });
});

test("contains() compares using ===", function() {
  same([1,2,3].contains("3"), false);
});

test("compact() removes nothing when no element null or undefined", function() {
  var arr = [42,true,false,{x:8},[1,2]];
  same(arr.compact(), arr);
});

test("compact() removes null and undefined", function() {
  same([undefined,null,1,null,2,undefined,3,null,null].compact(), [1,2,3]);
});

test("compact() returns empty array when all elements null/undefined", function() {
  same([undefined,null,null,undefined,null,null].compact(), []);
});

test("flatten()", function() {
  same([].flatten(), []);
  same([1,2,3].flatten(), [1,2,3]);
  same([[1,2],3].flatten(), [1,2,3]);
  same([[1,[2]],[3]].flatten(), [1,2,3]);
});

test("first()", function() {
  same([].first(), undefined);
  same([8].first(), 8);
  same([4,5,2].first(), 4);
});

test("last()", function() {
  same([].last(), undefined);
  same([8].last(), 8);
  same([4,5,2].last(), 2);
});

test("equals()", function() {
  ok([].equals([]), "Empty array are equal");
  ok([1,2,3].equals([1,2,3]), "1,2,3 equals 1,2,3");
  ok([1,"foo",false].equals([1,"foo",false]), "1,foo,false equals 1,foo,false");
  ok([[1,2],[3,4]].equals([[1,2],[3,4]]), "comparing 2D arrays");
  
  ok(![1,2,3].equals("foo"), "array doesn't equal non-array");
  ok(![1,2,3].equals([1,2,3,4]), "array doesn't equal array with more elements");
  ok(![1,2,3].equals([1,8,3]), "array doesn't equal array with different elements");
  ok(![1,2,3].equals([3,2,1]), "array doesn't equal array with differently ordered elements");
  ok(![1,"2",3].equals([1,2,3]), "array doesn't equal array with elements of different type");
});

test("sortByValue()", function() {
  same(["a", "", "foo", "xy"].sortByValue(".length"), ["", "a", "xy", "foo"]);
  same([].sortByValue(".length"), []);
  // test scope parameter
  same(["a", "b", "c"].sortByValue("x -> this[x]", {b: 1, c: 2, a: 3}), ["b", "c", "a"]);
});

test("chunk() into equal partitions", function() {
  same([1,2,3,4].chunk(4), [[1,2,3,4]]);
  same([1,2,3,4].chunk(2), [[1,2], [3,4]]);
  same([1,2,3,4].chunk(1), [[1], [2], [3], [4]]);
});

test("chunk() into unequal partitions", function() {
  same([1,2,3,4,5].chunk(3), [[1,2,3], [4,5]]);
  same([1,2,3,4,5].chunk(2), [[1,2], [3,4], [5]]);
});

test("chunk() of nothing returns nothing", function() {
  same([].chunk(2), []);
});

test("chunk() creating chunks without size doesn't make sense", function() {
  expect(1);
  try {
    [1,2,3,4].chunk(0);
  }
  catch (e) {
    same(e, "Chunks size must be > 0");
  }
});
