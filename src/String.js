/**
 * @class String
 */
obfunctional.override(String, {
  /**
   * Capitalizes first letter of the string.
   * 
   * @return {String}
   */
  upperCaseFirst: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
});
