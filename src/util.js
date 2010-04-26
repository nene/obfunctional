// Some helper functions

// mozilla already supports this
if (!Array.slice) {
  Array.slice = (function(slice) {
    return function(object) {
      return slice.apply(object, slice.call(arguments, 1));
    };
  })(Array.prototype.slice);
}

var obfunctional = {
  // Overrides methods in class prototype.
  override: function(klass, methods) {
    for (var methodName in methods) {
      klass.prototype[methodName] = methods[methodName];
    }
  }
};

