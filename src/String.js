/**
 * @class String
 */
obfunctional.override(String, {
  /**
   * Capitalizes first letter of the string.
   * 
   * >> "foo".upperCaseFirst() -> "Foo"
   * >> "".upperCaseFirst() -> ""
   * 
   * @return {String}
   */
  upperCaseFirst: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
});
