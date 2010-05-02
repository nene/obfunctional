/**
 * Reads inline tests from JavaScript source and executes them as
 * QUnit tests.
 */
var InlineQUnit = (function() {
  function run(url) {
    var testsets = extractTestsets(getContents(url));
    module(url);
    for (var i=0; i<testsets.length; i++) {
      (function(name, tests) {
        test(name, function() {
          expect(tests.length);
          for (var j=0; j<tests.length; j++) {
            var t = tests[j];
            var a = makeFunc(t[0]);
            var b = makeFunc(t[1]);
            same(a(), b());
          }
        });
      })(testsets[i].name, testsets[i].tests);
    }
  }
  
  // creates function from JS source code.
  // When code doesn't contain semicolons, converts it to return statement
  function makeFunc(code) {
    return new Function(/;/.test(code) ? code : "return (" + code + ");");
  }
  
  // Extracts doc-comments from source code and for each doc-comment
  // returns object containing the name of its associated function
  // and the test expressions inside each doc-comment.
  function extractTestsets(code) {
    var m;
    var testsets = [];
    while (code.length > 0) {
      if ((m = code.match(/^(\/\*\*[^]*?\*\/)([^]*)$/))) {
        var tests = extractTests(m[1]);
        // ignore when docblock contains no tests
        if (tests.length > 0) {
          testsets.push({
            name: extractFuncName(m[2]),
            tests: tests
          });
        }
        code = m[2];
      }
      else if ((m = code.match(/^([^]*?)(\/\*\*[^]*)$/))) {
        code = m[2];
      }
      else {
        code = "";
      }
    }
    return testsets;
  }
  
  // returns the name of the function at the beginning of the code
  function extractFuncName(code) {
    var m = code.match(/^\s*(?:var\s+)?(?:[a-z0-9_]+\.)*([a-z0-9_]+)\s*[=:]/i);
    return m ? m[1] : "Unable to determine function name!";
  }
  
  // extracts tests inside doc-comment
  function extractTests(code) {
    var lines = code.split(/\r\n|\r|\n/);
    
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