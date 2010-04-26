module("String");

test("upperCaseFirst() capitalizes first letter of string", function() {
  same("foo".upperCaseFirst(), "Foo");
  same("haa hoo".upperCaseFirst(), "Haa hoo");
  same("Bar".upperCaseFirst(), "Bar");
});

test("upperCaseFirst() does nothing with empty string", function() {
  same("".upperCaseFirst(), "");
});
