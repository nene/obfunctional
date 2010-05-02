module("Array");

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
