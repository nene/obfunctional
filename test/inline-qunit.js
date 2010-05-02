/**
 * Reads inline tests from JavaScript source and executes them as
 * QUnit tests.
 */
var InlineQUnit = (function() {
  function run(url) {
    var tests = loadTests(url);
    module(url);
    for (var i=0; i<tests.length; i++) {
      var t = tests[i];
      test(t[0]+" -> "+t[1], function() {
        var a = new Function("return (" + t[0] + ");");
        var b = new Function("return (" + t[1] + ");");
        same(a(), b());
      });
    }
  }
  
  function loadTests(url) {
    var js = getContents(url);
    var lines = js.split(/\r\n|\r|\n/);
    
    var tests = [];
    for (var i=0; i < lines.length; i++) {
      var m = lines[i].match(/^ +\* >> (.*) -> (.*)$/);
      if (m) {
        tests.push([m[1], m[2]]);
      }
    }
    return tests;
  }
  
  // Loads file with XML HTTP Request and returns its contents
  function getContents(url) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    }
    else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xhr.open("GET", url, false);
    xhr.send(null);
    
    return (xhr.status === 200) ? xhr.responseText : "";
  }
  
  return {
    run: run
  };
})();