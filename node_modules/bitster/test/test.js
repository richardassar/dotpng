var 
	bitster = require("../"),
	chai = require('chai'),
	assert = chai.assert;

// TODO: Move into proto project
Array.prototype.equals = function(val) { 	
	if(!val || !(val instanceof Array) || this.length != val.length) {
		return false;
	}

	for(var i = 0, len = this.length; i < len; ++i) {		
		if(this[i] instanceof Array) {
			if(val[i] instanceof Array) {
				if(!this[i].equals(val[i])) {
					return false;
				}
			} else {
				return false;
			} 
		} else if(this[i] != val[i]) {
			return false;
		}
	}
	
	return true;
};

suite("Array", function() {
	suite("equals", function() {
		test("equal arrays are equal", function() { assert.ok([1,2,3].equals([1,2,3])); });
		test("unequals arrays are not equal", function() { assert.ok(![1,2,4].equals([1,2,3])); });
		test("arrays are not equal to undefined", function() { assert.ok(![1,2,4].equals(undefined)); });
		test("arrays are not equal to null", function() { assert.ok(![1,2,4].equals(null)); });
	});	
});

//
suite("bitster", function() {
	suite("single values", function() {
		suite("Number", function() {
			suite("from String", function() {
				suite("signed", function() {
					test("Long", function() { assert.ok(bitster.Number.from.Long.String(String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF)) == -2136224273); });
					test("Little-Endian Long", function() { assert.ok(bitster.Number.from.LE.Long.String(String.fromCharCode(0xEF, 0xCD, 0xAB, 0x80)) == -2136224273); });
					test("Short", function() { assert.ok(bitster.Number.from.Short.String(String.fromCharCode(0x80, 0xAB)) == -32597); });
					test("Little-Endian Short", function() { assert.ok(bitster.Number.from.LE.Short.String(String.fromCharCode(0xAB, 0x80)) == -32597); });
					test("Byte", function() { assert.ok(bitster.Number.from.Byte.String(String.fromCharCode(0x80)) == -128); });
				});

				suite("unsigned", function() {
					test("Long", function() { assert.ok(bitster.Unsigned.Number.from.Long.String(String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF)) == 2158743023); });
					test("Little-Endian Unsigned Long", function() { assert.ok(bitster.Unsigned.Number.from.LE.Long.String(String.fromCharCode(0xEF, 0xCD, 0xAB, 0x80)) == 2158743023); });
					test("Short", function() { assert.ok(bitster.Unsigned.Number.from.Short.String(String.fromCharCode(0x80, 0xAB)) == 32939); });
					test("Little-Endian Short", function() { assert.ok(bitster.Unsigned.Number.from.LE.Short.String(String.fromCharCode(0xAB, 0x80)) == 32939); });
					test("Byte", function() { assert.ok(bitster.Unsigned.Number.from.Byte.String(String.fromCharCode(0x80)) == 128); });
				});
			});

			suite("from Array", function() {
				suite("signed", function() {
					test("Long", function() { assert.ok(bitster.Number.from.Long.Array([0x80, 0xAB, 0xCD, 0xEF]) == -2136224273); });
					test("Little-Endian Long", function() { assert.ok(bitster.Number.from.LE.Long.Array([0xEF, 0xCD, 0xAB, 0x80]) == -2136224273); });
					test("Short", function() { assert.ok(bitster.Number.from.Short.Array([0x80, 0xAB]) == -32597); });
					test("Little-Endian Short", function() { assert.ok(bitster.Number.from.LE.Short.Array([0xAB, 0x80]) == -32597); });
					test("Byte", function() { assert.ok(bitster.Number.from.Byte.Array([0x80]) == -128); });
				});

				suite("unsigned", function() {
					test("Long", function() { assert.ok(bitster.Unsigned.Number.from.Long.Array([0x80, 0xAB, 0xCD, 0xEF]) == 2158743023); });
					test("Little-Endian Unsigned Long", function() { assert.ok(bitster.Unsigned.Number.from.LE.Long.Array([0xEF, 0xCD, 0xAB, 0x80]) == 2158743023); });
					test("Short", function() { assert.ok(bitster.Unsigned.Number.from.Short.Array([0x80, 0xAB]) == 32939); });
					test("Little-Endian Short", function() { assert.ok(bitster.Unsigned.Number.from.LE.Short.Array([0xAB, 0x80]) == 32939); });
					test("Byte", function() { assert.ok(bitster.Unsigned.Number.from.Byte.Array([0x80]) == 128); });
				});
			});
		});

		suite("String", function() {
			suite("from Number", function() {
				test("Long", function() { assert.ok(bitster.Long.String.from.Number(0x80ABCDEF) == String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF)); });
				test("Little-Endian Long", function() { assert.ok(bitster.LE.Long.String.from.Number(0x80ABCDEF) == String.fromCharCode(0xEF, 0xCD, 0xAB, 0x80)); });
				test("Short", function() { assert.ok(bitster.Short.String.from.Number(0xABCD) == String.fromCharCode(0xAB, 0xCD)); });
				test("Little-Endian Short", function() { assert.ok(bitster.LE.Short.String.from.Number(0xABCD) == String.fromCharCode(0xCD, 0xAB)); });
				test("Byte", function() { assert.ok(bitster.Byte.String.from.Number(0xAB) == String.fromCharCode(0xAB)); });
			});

			suite("from Array", function() {
				test("Long", function() { assert.ok(bitster.Long.String.from.Array([0x80, 0xAB, 0xCD, 0xEF]) == String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF)); });	
				test("Short", function() { assert.ok(bitster.Short.String.from.Array([0x80, 0xAB]) == String.fromCharCode(0x80, 0xAB)); });
				test("Byte", function() { assert.ok(bitster.Byte.String.from.Array([0x80]) == String.fromCharCode(0x80)); });
			});
		});

		suite("Array", function() {
			suite("from Number", function() {
				test("Long", function() { assert.ok(bitster.Long.Array.from.Number(0x80ABCDEF).equals([0x80, 0xAB, 0xCD, 0xEF])); });
				test("Little-Endian Long", function() { assert.ok(bitster.LE.Long.Array.from.Number(0x80ABCDEF).equals([0xEF, 0xCD, 0xAB, 0x80])); });
				test("Short", function() { assert.ok(bitster.Short.Array.from.Number(0xABCD).equals([0xAB, 0xCD])); });
				test("Little-Endian Short", function() { assert.ok(bitster.LE.Short.Array.from.Number(0xABCD).equals([0xCD, 0xAB])); });
				test("Byte", function() { assert.ok(bitster.Byte.Array.from.Number(0xAB).equals([0xAB])); });
			});	

			suite("from String", function() {
				test("Long", function() { assert.ok(bitster.Long.Array.from.String(String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF)).equals([0x80, 0xAB, 0xCD, 0xEF])); });
				test("Short", function() { assert.ok(bitster.Short.Array.from.String(String.fromCharCode(0x80, 0xAB)).equals([0x80, 0xAB])); });
				test("Byte", function() { assert.ok(bitster.Byte.Array.from.String(String.fromCharCode(0x80)).equals([0x80])); });
			});		
		});	
	});

	suite("streams", function() {
		suite("Number", function() {
			suite("from String", function() {
				suite("signed", function() {
					test("Long", function() { assert.ok(bitster.Number.Stream.from.Long.String.Stream(String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF, 0xAA, 0xBB, 0xCC, 0xDD)).equals([-2136224273, -1430532899])); });
					test("Little-Endian Long", function() { assert.ok(bitster.Number.Stream.from.LE.Long.String.Stream(String.fromCharCode(0xEF, 0xCD, 0xAB, 0x80, 0xDD, 0xCC, 0xBB, 0xAA)).equals([-2136224273, -1430532899])); });
					test("Short", function() { assert.ok(bitster.Number.Stream.from.Short.String.Stream(String.fromCharCode(0x80, 0xAB, 0xAA, 0xBB)).equals([-32597, -21829])); });
					test("Little-Endian Short", function() { assert.ok(bitster.Number.Stream.from.LE.Short.String.Stream(String.fromCharCode(0xAB, 0x80, 0xBB, 0xAA)).equals([-32597, -21829])); });
					test("Byte", function() { assert.ok(bitster.Number.Stream.from.Byte.String.Stream(String.fromCharCode(0x77, 0x88, 0x99, 0xFF)).equals([119, -120, -103, -1])); });
				});

				suite("unsigned", function() {
					test("Long", function() { assert.ok(bitster.Unsigned.Number.Stream.from.Long.String.Stream(String.fromCharCode(0x80, 0xAB, 0xCD, 0xEF, 0xAA, 0xBB, 0xCC, 0xDD)).equals([2158743023, 2864434397])); });
					test("Little-Endian Long", function() { assert.ok(bitster.Unsigned.Number.Stream.from.LE.Long.String.Stream(String.fromCharCode(0xEF, 0xCD, 0xAB, 0x80, 0xDD, 0xCC, 0xBB, 0xAA)).equals([2158743023, 2864434397])); });
					test("Short", function() { assert.ok(bitster.Unsigned.Number.Stream.from.Short.String.Stream(String.fromCharCode(0x80, 0xAB, 0xAA, 0xBB)).equals([32939, 43707])); });
					test("Little-Endian Short", function() { assert.ok(bitster.Unsigned.Number.Stream.from.LE.Short.String.Stream(String.fromCharCode(0xAB, 0x80, 0xBB, 0xAA)).equals([32939, 43707])); });
					test("Byte", function() { assert.ok(bitster.Unsigned.Number.Stream.from.Byte.String.Stream(String.fromCharCode(0x77, 0x88, 0x99, 0xFF)).equals([119, 136, 153, 255])); });
				});
			});

			suite("from Array", function() {
				suite("signed", function() {
					test("Long", function() { assert.ok(bitster.Number.Stream.from.Long.Array.Stream([[0x80, 0xAB, 0xCD, 0xEF], [0xAA, 0xBB, 0xCC, 0xDD]]).equals([-2136224273, -1430532899])); });
					test("Little-Endian Long", function() { assert.ok(bitster.Number.Stream.from.LE.Long.Array.Stream([[0xEF, 0xCD, 0xAB, 0x80], [0xDD, 0xCC, 0xBB, 0xAA]]).equals([-2136224273, -1430532899])); });
					test("Short", function() { assert.ok(bitster.Number.Stream.from.Short.Array.Stream([[0x80, 0xAB], [0xAA, 0xBB]]).equals([-32597, -21829])); });
					test("Little-Endian Short", function() { assert.ok(bitster.Number.Stream.from.LE.Short.Array.Stream([[0xAB, 0x80], [0xBB, 0xAA]]).equals([-32597, -21829])); });
					test("Byte", function() { assert.ok(bitster.Number.Stream.from.Byte.Array.Stream([[0x77], [0x88], [0x99], [0xFF]]).equals([119, -120, -103, -1])); });
				});

				suite("unsigned", function() {
					test("Long", function() { assert.ok(bitster.Unsigned.Number.Stream.from.Long.Array.Stream([[0x80, 0xAB, 0xCD, 0xEF], [0xAA, 0xBB, 0xCC, 0xDD]]).equals([2158743023, 2864434397])); });
					test("Little-Endian Long", function() { assert.ok(bitster.Unsigned.Number.Stream.from.LE.Long.Array.Stream([[0xEF, 0xCD, 0xAB, 0x80], [0xDD, 0xCC, 0xBB, 0xAA]]).equals([2158743023, 2864434397])); });
					test("Short", function() { assert.ok(bitster.Unsigned.Number.Stream.from.Short.Array.Stream([[0x80, 0xAB], [0xAA, 0xBB]]).equals([32939, 43707])); });
					test("Little-Endian Short", function() { assert.ok(bitster.Unsigned.Number.Stream.from.LE.Short.Array.Stream([[0xAB, 0x80], [0xBB, 0xAA]]).equals([32939, 43707])); });
					test("Byte", function() { assert.ok(bitster.Unsigned.Number.Stream.from.Byte.Array.Stream([[0x77], [0x88], [0x99], [0xFF]]).equals([119, 136, 153, 255])); });
				});
			});
		});

		suite("String", function() {
			suite("from Array", function() {
				test("Long", function() { assert.ok(bitster.Long.String.Stream.from.Long.Array.Stream([[0x77, 0x88, 0x99, 0xFF]]) == String.fromCharCode(119, 136, 153, 255)); });
				test("Short", function() { assert.ok(bitster.Short.String.Stream.from.Short.Array.Stream([[0x77, 0x88], [0x99, 0xFF]]) == String.fromCharCode(119, 136, 153, 255)); });
				test("Byte", function() { assert.ok(bitster.Byte.String.Stream.from.Byte.Array.Stream([[0x77], [0x88], [0x99], [0xFF]]) == String.fromCharCode(119, 136, 153, 255)); });
			});
		});

		suite("Array", function() {
			suite("from String", function() {
				test("Long", function() { assert.ok(bitster.Long.Array.Stream.from.Long.String.Stream(String.fromCharCode(119, 136, 153, 255)).equals([[0x77, 0x88, 0x99, 0xFF]])); });
				test("Short", function() { assert.ok(bitster.Short.Array.Stream.from.Short.String.Stream(String.fromCharCode(119, 136, 153, 255)).equals([[0x77, 0x88], [0x99, 0xFF]])); });
				test("Byte", function() { assert.ok(bitster.Byte.Array.Stream.from.Byte.String.Stream(String.fromCharCode(119, 136, 153, 255)).equals([[0x77], [0x88], [0x99], [0xFF]])); });
			});
		});

		suite("Raw", function() {
			test("String from Array", function() { assert.ok(bitster.Raw.Byte.String.Stream.from.Byte.Array.Stream([119, 136, 153, 255]) == String.fromCharCode(119, 136, 153, 255)); });
			test("Array from String", function() { assert.ok(bitster.Raw.Byte.Array.Stream.from.Byte.String.Stream(String.fromCharCode(119, 136, 153, 255)).equals([119, 136, 153, 255])); });
		});
	});

	suite("endianness", function() {
		suite("single values", function() {
			suite("String", function() {
				test("Long", function() { assert.ok(bitster.invert.endianness.of.Long.String(String.fromCharCode(0x80, 0xAB, 0xAA, 0xBB)) == String.fromCharCode(0xBB, 0xAA, 0xAB, 0x80)); });
				test("Short", function() { assert.ok(bitster.invert.endianness.of.Short.String(String.fromCharCode(0x80, 0xAB)) == String.fromCharCode(0xAB, 0x80)); });
			});

			suite("Array", function() {
				test("Long", function() { assert.ok(bitster.invert.endianness.of.Long.Array([0x80, 0xAB, 0xAA, 0xBB]).equals([0xBB, 0xAA, 0xAB, 0x80])); });
				test("Short", function() { assert.ok(bitster.invert.endianness.of.Short.Array([0x80, 0xAB]).equals([0xAB, 0x80])); });
			});
		});

		suite("streams", function() {
			suite("String", function() {
				test("Long", function() { assert.ok(bitster.invert.endianness.of.Long.String.Stream(String.fromCharCode(0xAB, 0xCD, 0xEF, 0xFE, 0xDC, 0xAB, 0xCD, 0xEF)) == String.fromCharCode(0xFE, 0xEF, 0xCD, 0xAB, 0xEF, 0xCD, 0xAB, 0xDC)); });
				test("Short", function() { assert.ok(bitster.invert.endianness.of.Short.String.Stream(String.fromCharCode(0xAB, 0xCD, 0xEF, 0xFE)) == String.fromCharCode(0xCD, 0xAB, 0xFE, 0xEF)); });
			});

			suite("Array", function() {
				test("Long", function() { assert.ok(bitster.invert.endianness.of.Long.Array.Stream([[0xAB, 0xCD, 0xEF, 0xFE], [0xDC, 0xAB, 0xCD, 0xEF]]).equals([[0xFE, 0xEF, 0xCD, 0xAB], [0xEF, 0xCD, 0xAB, 0xDC]])); });
				test("Short", function() { assert.ok(bitster.invert.endianness.of.Short.Array.Stream([[0xAB, 0xCD], [0xEF, 0xFE]]).equals([[0xCD, 0xAB], [0xFE, 0xEF]])); });
			});
		});
	});
});
