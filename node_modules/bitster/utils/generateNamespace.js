// Utility to generate a namespace decleration from the bitster source.
var fs = require("fs");

var bitster = fs.readFileSync(__dirname + '/../src/bitster.js').toString();

var lines = bitster.split('\n');

var root = {};

lines.forEach(function(line) {
	var match = /bitster\.(.*?)\W+=/g.exec(line);

	if(match != null) {		
		var parts = match[1].split('.');

		var obj = root;

		parts.forEach(function(part) {
			if(obj[part] === undefined) {
				obj[part] = {};
			}

			obj = obj[part];
		});
	}
});

console.log("var bitster = " + JSON.stringify(root).replace(/"/g, '') + ";\n");
