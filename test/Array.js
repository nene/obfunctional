module("Array");

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
