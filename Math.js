/**
 * @class Math
 */

/**
 * Extend Math.round by adding additional precision parameter.
 * 
 * <pre>
 * Math.round(5.1234, 2) --> 5.12
 * Math.round(5.3268, 3) --> 5.327
 * </pre>
 * 
 * NOTE: this function doesn't really belong to the functional 
 * category, but currently I don't have a better place for it.
 * 
 * @param {Number} number
 * @param {Number} precision
 * @return {Number}
 */
Math.round = (function() {
  var oldRound = Math.round;
  return function(number, precision) {
    precision = Math.abs(parseInt(precision)) || 0;
    var coefficient = Math.pow(10, precision);
    return oldRound(number*coefficient)/coefficient;
  };
})();

