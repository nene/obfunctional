/**
 * Reads inline tests from JavaScript source and executes them as
 * QUnit tests.
 */
var InlineQUnit = (function() {
  function run(url) {
    var tests = loadTests(url);
    module(url);
    for (var i=0; i<tests.length; i++) {
      (function(t) {
        test(t[0]+" -> "+t[1], function() {
          var a = makeFunc(t[0]);
          var b = makeFunc(t[1]);
          same(a(), b());
        });
      })(tests[i]);
    }
  }
  
  // creates function from JS source code.
  // When code doesn't contain semicolons, converts it to return statement
  function makeFunc(code) {
    return new Function(/;/.test(code) ? code : "return (" + code + ");");
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
    
    if (xhr.status !== 200) {
      alert("InlineQUnit: Failed to load: "+url);
      return "";
    }
    
    return xhr.responseText;
  }
  
  return {
    run: run
  };
})();