/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://ender.no.de)
  * Build: ender build . --output dist/bundle
  * =============================================================
  */

/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.6'
    , fn: boosh // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);

!function () {

  var module = { exports: {} }, exports = module.exports;

  !function (name, context, definition) {
    if (typeof module !== 'undefined') module.exports = definition(name, context);
    else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
    else context[name] = definition(name, context);
  }("bitster", this, function(name, context) {
  
  // Dont fsck with the bit$ter
  var bitster = {invert:{endianness:{of:{Long:{String:{Stream:{}},Array:{Stream:{}}},Short:{String:{Stream:{}},Array:{Stream:{}}}}}},Number:{from:{Long:{String:{},Array:{}},LE:{Long:{String:{},Array:{}},Short:{String:{},Array:{}}},Short:{String:{},Array:{}},Byte:{String:{},Array:{}}},Stream:{from:{Byte:{String:{Stream:{}},Array:{Stream:{}}},Short:{String:{Stream:{}},Array:{Stream:{}}},LE:{Short:{String:{Stream:{}},Array:{Stream:{}}},Long:{String:{Stream:{}},Array:{Stream:{}}}},Long:{String:{Stream:{}},Array:{Stream:{}}}}}},Unsigned:{Number:{from:{Long:{String:{},Array:{}},LE:{Long:{String:{},Array:{}},Short:{String:{},Array:{}}},Short:{String:{},Array:{}},Byte:{String:{},Array:{}}},Stream:{from:{Byte:{String:{Stream:{}},Array:{Stream:{}}},Short:{String:{Stream:{}},Array:{Stream:{}}},LE:{Short:{String:{Stream:{}},Array:{Stream:{}}},Long:{String:{Stream:{}},Array:{Stream:{}}}},Long:{String:{Stream:{}},Array:{Stream:{}}}}}}},Long:{String:{from:{Number:{},Array:{}},Stream:{from:{Long:{Array:{Stream:{}}}}}},Array:{from:{Number:{},String:{}},Stream:{from:{Long:{String:{Stream:{}}}}}}},LE:{Long:{String:{from:{Number:{}}},Array:{from:{Number:{}}}},Short:{String:{from:{Number:{}}},Array:{from:{Number:{}}}}},Short:{String:{from:{Number:{},Array:{}},Stream:{from:{Short:{Array:{Stream:{}}}}}},Array:{from:{Number:{},String:{}},Stream:{from:{Short:{String:{Stream:{}}}}}}},Byte:{String:{from:{Number:{},Array:{}},Stream:{from:{Byte:{Array:{Stream:{}}}}}},Array:{from:{Number:{},String:{}},Stream:{from:{Byte:{String:{Stream:{}}}}}}},Raw:{Byte:{String:{Stream:{from:{Byte:{Array:{Stream:{}}}}}},Array:{Stream:{from:{Byte:{String:{Stream:{}}}}}}}}};
  
  //
  bitster.invert.endianness.of.Long.String = function(string) { return string.charAt(3) + string.charAt(2) + string.charAt(1) + string.charAt(0); };
  bitster.invert.endianness.of.Short.String = function(string) { return string.charAt(1) + string.charAt(0); };
  
  bitster.invert.endianness.of.Long.Array = function(array) { return [array[3], array[2], array[1], array[0]]; };
  bitster.invert.endianness.of.Short.Array = function(array) { return [array[1], array[0]]; };
  
  //
  bitster.invert.endianness.of.Long.String.Stream = function(inStringStream) { 
  	var outStringStream = '';
  
  	for(var i = 0, len = inStringStream.length; i < len; i += 4) {
  		outStringStream += inStringStream.charAt(i + 3) + inStringStream.charAt(i + 2) + inStringStream.charAt(i + 1) + inStringStream.charAt(i + 0);
  	}
  
  	return outStringStream;
  };
  
  bitster.invert.endianness.of.Short.String.Stream = function(inStringStream) { 
  	var outStringStream = '';
  
  	for(var i = 0, len = inStringStream.length; i < len; i += 2) {
  		outStringStream += inStringStream.charAt(i + 1) + inStringStream.charAt(i + 0);
  	}
  
  	return outStringStream;
  };
  
  bitster.invert.endianness.of.Long.Array.Stream = function(inArrayStream) { 
  	var outArrayStream = new Array(inArrayStream.length);
  
  	for(var i = 0, len = inArrayStream.length; i < len; ++i) {
  		outArrayStream[i] = [inArrayStream[i][3], inArrayStream[i][2], inArrayStream[i][1], inArrayStream[i][0]];
  	}
  
  	return outArrayStream;
  };
  
  bitster.invert.endianness.of.Short.Array.Stream = function(inArrayStream) { 
  	var outArrayStream = new Array(inArrayStream.length);
  
  	for(var i = 0, len = inArrayStream.length; i < len; ++i) {
  		outArrayStream[i] = [inArrayStream[i][1], inArrayStream[i][0]];
  	}
  
  	return outArrayStream;
  };
  
  //
  bitster.Number.from.Long.String     = function(string) { return (string.charCodeAt(0) & 0xFF) << 24 | (string.charCodeAt(1) & 0xFF) << 16 | (string.charCodeAt(2) & 0xFF) << 8 | string.charCodeAt(3) & 0xFF; };
  bitster.Number.from.LE.Long.String  = function(string) { return (string.charCodeAt(3) & 0xFF) << 24 | (string.charCodeAt(2) & 0xFF) << 16 | (string.charCodeAt(1) & 0xFF) << 8 | string.charCodeAt(0) & 0xFF; };
  bitster.Number.from.Short.String    = function(string) { return ((string.charCodeAt(0) & 0xFF) << 8 | string.charCodeAt(1) & 0xFF) << 16 >> 16; };
  bitster.Number.from.LE.Short.String = function(string) { return ((string.charCodeAt(1) & 0xFF) << 8 | string.charCodeAt(0) & 0xFF) << 16 >> 16; };
  bitster.Number.from.Byte.String     = function(string) { return (string.charCodeAt(0) & 0xFF) << 24 >> 24; };
  
  bitster.Unsigned.Number.from.Long.String     = function(string) { return ((string.charCodeAt(0) & 0xFF) << 24 | (string.charCodeAt(1) & 0xFF) << 16 | (string.charCodeAt(2) & 0xFF) << 8 | string.charCodeAt(3) & 0xFF) >>> 0; };
  bitster.Unsigned.Number.from.LE.Long.String  = function(string) { return ((string.charCodeAt(3) & 0xFF) << 24 | (string.charCodeAt(2) & 0xFF) << 16 | (string.charCodeAt(1) & 0xFF) << 8 | string.charCodeAt(0) & 0xFF) >>> 0; };
  bitster.Unsigned.Number.from.Short.String    = function(string) { return (string.charCodeAt(0) & 0xFF) << 8 | string.charCodeAt(1) & 0xFF; };
  bitster.Unsigned.Number.from.LE.Short.String = function(string) { return (string.charCodeAt(1) & 0xFF) << 8 | string.charCodeAt(0) & 0xFF; };
  bitster.Unsigned.Number.from.Byte.String     = function(string) { return string.charCodeAt(0) & 0xFF; };
  
  bitster.Number.from.Long.Array     = function(array) { return (array[0] & 0xFF) << 24 | (array[1] & 0xFF) << 16 | (array[2] & 0xFF) << 8 | array[3] & 0xFF; };
  bitster.Number.from.LE.Long.Array  = function(array) { return (array[3] & 0xFF) << 24 | (array[2] & 0xFF) << 16 | (array[1] & 0xFF) << 8 | array[0] & 0xFF; };
  bitster.Number.from.Short.Array    = function(array) { return ((array[0] & 0xFF) << 8 | array[1] & 0xFF) << 16 >> 16; };
  bitster.Number.from.LE.Short.Array = function(array) { return ((array[1] & 0xFF) << 8 | array[0] & 0xFF) << 16 >> 16; };
  bitster.Number.from.Byte.Array     = function(array) { return (array[0] & 0xFF) << 24 >> 24; };
  
  bitster.Unsigned.Number.from.Long.Array     = function(array) { return ((array[0] & 0xFF) << 24 | (array[1] & 0xFF) << 16 | (array[2] & 0xFF) << 8 | array[3] & 0xFF) >>> 0; };
  bitster.Unsigned.Number.from.LE.Long.Array  = function(array) { return ((array[3] & 0xFF) << 24 | (array[2] & 0xFF) << 16 | (array[1] & 0xFF) << 8 | array[0] & 0xFF) >>> 0; };
  bitster.Unsigned.Number.from.Short.Array    = function(array) { return (array[0] & 0xFF) << 8 | array[1] & 0xFF; };
  bitster.Unsigned.Number.from.LE.Short.Array = function(array) { return (array[1] & 0xFF) << 8 | array[0] & 0xFF; };
  bitster.Unsigned.Number.from.Byte.Array     = function(array) { return array[0] & 0xFF; };
  
  //
  bitster.Long.String.from.Number     = function(number) { return String.fromCharCode(number >> 24 & 0xFF, number >> 16 & 0xFF, number >> 8 & 0xFF, number & 0xFF); };
  bitster.LE.Long.String.from.Number  = function(number) { return String.fromCharCode(number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF); };
  bitster.Short.String.from.Number    = function(number) { return String.fromCharCode(number >> 8 & 0xFF, number & 0xFF); };
  bitster.LE.Short.String.from.Number = function(number) { return String.fromCharCode(number & 0xFF, number >> 8 & 0xFF); };
  bitster.Byte.String.from.Number     = function(number) { return String.fromCharCode(number & 0xFF); };
  
  //
  bitster.Long.String.from.Array     = function(array) { return String.fromCharCode(array[0] & 0xFF, array[1] & 0xFF, array[2] & 0xFF, array[3] & 0xFF); };
  bitster.Short.String.from.Array    = function(array) { return String.fromCharCode(array[0] & 0xFF, array[1] & 0xFF); };
  bitster.Byte.String.from.Array     = function(array) { return String.fromCharCode(array[0] & 0xFF); };
  
  //
  bitster.Long.Array.from.Number     = function(number) { return [number >> 24 & 0xFF, number >> 16 & 0xFF, number >> 8 & 0xFF, number & 0xFF]; };
  bitster.LE.Long.Array.from.Number  = function(number) { return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF]; };
  bitster.Short.Array.from.Number    = function(number) { return [number >> 8 & 0xFF, number & 0xFF]; };
  bitster.LE.Short.Array.from.Number = function(number) { return [number & 0xFF, number >> 8 & 0xFF]; };
  bitster.Byte.Array.from.Number     = function(number) { return [number & 0xFF]; };
  
  //
  bitster.Long.Array.from.String     = function(string) { return [string.charCodeAt(0) & 0xFF, string.charCodeAt(1) & 0xFF, string.charCodeAt(2) & 0xFF, string.charCodeAt(3) & 0xFF]; };
  bitster.Short.Array.from.String    = function(string) { return [string.charCodeAt(0) & 0xFF, string.charCodeAt(1) & 0xFF]; };
  bitster.Byte.Array.from.String     = function(string) { return [string.charCodeAt(0) & 0xFF]; };
  
  //
  bitster.Number.Stream.from.Byte.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = (stringStream.charCodeAt(i) & 0xFF) << 24 >> 24;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.Byte.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = stringStream.charCodeAt(i) & 0xFF;
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.Short.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 2);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 2) {
  		numberStream[j++] = ((stringStream.charCodeAt(i) & 0xFF) << 8 | stringStream.charCodeAt(i + 1) & 0xFF) << 16 >> 16;
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.LE.Short.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 2);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 2) {
  		numberStream[j++] = ((stringStream.charCodeAt(i + 1) & 0xFF) << 8 | stringStream.charCodeAt(i) & 0xFF) << 16 >> 16;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.Short.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 2);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 2) {
  		numberStream[j++] = (stringStream.charCodeAt(i) & 0xFF) << 8 | stringStream.charCodeAt(i + 1) & 0xFF;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.LE.Short.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 2);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 2) {
  		numberStream[j++] = (stringStream.charCodeAt(i + 1) & 0xFF) << 8 | stringStream.charCodeAt(i) & 0xFF;
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.Long.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 4);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 4) {
  		numberStream[j++] = (stringStream.charCodeAt(i) & 0xFF) << 24 | (stringStream.charCodeAt(i + 1) & 0xFF) << 16 | (stringStream.charCodeAt(i + 2) & 0xFF) << 8 | stringStream.charCodeAt(i + 3) & 0xFF;
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.LE.Long.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 4);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 4) {
  		numberStream[j++] = (stringStream.charCodeAt(i + 3) & 0xFF) << 24 | (stringStream.charCodeAt(i + 2) & 0xFF) << 16 | (stringStream.charCodeAt(i + 1) & 0xFF) << 8 | stringStream.charCodeAt(i) & 0xFF;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.Long.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 4);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 4) {
  		numberStream[j++] = ((stringStream.charCodeAt(i) & 0xFF) << 24 | (stringStream.charCodeAt(i + 1) & 0xFF) << 16 | (stringStream.charCodeAt(i + 2) & 0xFF) << 8 | stringStream.charCodeAt(i + 3) & 0xFF) >>> 0;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.LE.Long.String.Stream = function(stringStream) {
  	var numberStream = new Array(stringStream.length / 4);	
  	
  	for(var i = 0, j = 0, len = numberStream.length; j < len; i += 4) {
  		numberStream[j++] = ((stringStream.charCodeAt(i + 3) & 0xFF) << 24 | (stringStream.charCodeAt(i + 2) & 0xFF) << 16 | (stringStream.charCodeAt(i + 1) & 0xFF) << 8 | stringStream.charCodeAt(i) & 0xFF) >>> 0;
  	}
  
  	return numberStream;
  };
  
  //
  bitster.Number.Stream.from.Byte.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = (arrayStream[i][0] & 0xFF) << 24 >> 24;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.Byte.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = arrayStream[i][0];
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.Short.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][0] & 0xFF) << 8 | arrayStream[i][1] & 0xFF) << 16 >> 16;
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.LE.Short.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][1] & 0xFF) << 8 | arrayStream[i][0] & 0xFF) << 16 >> 16;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.Short.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][0] & 0xFF) << 8 | arrayStream[i][1] & 0xFF);
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.LE.Short.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][1] & 0xFF) << 8 | arrayStream[i][0] & 0xFF);
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.Long.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][0] & 0xFF) << 24 | (arrayStream[i][1] & 0xFF) << 16 | (arrayStream[i][2] & 0xFF) << 8 | arrayStream[i][3] & 0xFF);
  	}
  
  	return numberStream;
  };
  
  bitster.Number.Stream.from.LE.Long.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][3] & 0xFF) << 24 | (arrayStream[i][2] & 0xFF) << 16 | (arrayStream[i][1] & 0xFF) << 8 | arrayStream[i][0] & 0xFF);
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.Long.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][0] & 0xFF) << 24 | (arrayStream[i][1] & 0xFF) << 16 | (arrayStream[i][2] & 0xFF) << 8 | arrayStream[i][3] & 0xFF) >>> 0;
  	}
  
  	return numberStream;
  };
  
  bitster.Unsigned.Number.Stream.from.LE.Long.Array.Stream = function(arrayStream) {
  	var numberStream = new Array(arrayStream.length);	
  	
  	for(var i = 0, len = numberStream.length; i < len; ++i) {
  		numberStream[i] = ((arrayStream[i][3] & 0xFF) << 24 | (arrayStream[i][2] & 0xFF) << 16 | (arrayStream[i][1] & 0xFF) << 8 | arrayStream[i][0] & 0xFF) >>> 0;
  	}
  
  	return numberStream;
  };
  
  //
  bitster.Byte.String.Stream.from.Byte.Array.Stream = function(arrayStream) {
  	var stringStream = '';	
  	
  	for(var i = 0, len = arrayStream.length; i < len; ++i) {
  		stringStream += String.fromCharCode(arrayStream[i][0] & 0xFF);
  	}
  
  	return stringStream;
  };
  
  bitster.Short.String.Stream.from.Short.Array.Stream = function(arrayStream) {
  	var stringStream = '';	
  	
  	for(var i = 0, len = arrayStream.length; i < len; ++i) {
  		stringStream += String.fromCharCode(arrayStream[i][0] & 0xFF) + String.fromCharCode(arrayStream[i][1] & 0xFF);
  	}
  
  	return stringStream;
  };
  
  bitster.Long.String.Stream.from.Long.Array.Stream = function(arrayStream) {
  	var stringStream = '';	
  	
  	for(var i = 0, len = arrayStream.length; i < len; ++i) {
  		stringStream += String.fromCharCode(arrayStream[i][0] & 0xFF) + String.fromCharCode(arrayStream[i][1] & 0xFF) + String.fromCharCode(arrayStream[i][2] & 0xFF) + String.fromCharCode(arrayStream[i][3] & 0xFF);
  	}
  
  	return stringStream;
  };
  
  //
  bitster.Byte.Array.Stream.from.Byte.String.Stream = function(stringStream) {
  	var arrayStream = new Array(stringStream.length);	
  	
  	for(var i = 0, len = arrayStream.length; i < len; ++i) {
  		arrayStream[i] = [stringStream.charCodeAt(i) & 0xFF];
  	}
  
  	return arrayStream;
  };
  
  bitster.Short.Array.Stream.from.Short.String.Stream = function(stringStream) {
  	var arrayStream = new Array(stringStream.length / 2);	
  	
  	for(var i = 0, j = 0, len = arrayStream.length; j < len; i += 2) {
  		arrayStream[j++] = [stringStream.charCodeAt(i) & 0xFF, stringStream.charCodeAt(i + 1) & 0xFF];
  	}
  
  	return arrayStream;
  };
  
  bitster.Long.Array.Stream.from.Long.String.Stream = function(stringStream) {
  	var arrayStream = new Array(stringStream.length / 4);	
  	
  	for(var i = 0, j = 0, len = arrayStream.length; j < len; i += 4) {
  		arrayStream[j++] = [stringStream.charCodeAt(i) & 0xFF, stringStream.charCodeAt(i + 1) & 0xFF, stringStream.charCodeAt(i + 2) & 0xFF, stringStream.charCodeAt(i + 3) & 0xFF];
  	}
  
  	return arrayStream;
  };
  
  //
  bitster.Raw.Byte.String.Stream.from.Byte.Array.Stream = function(arrayStream) {
  	var string = '';
  	
  	for(var i = 0, len = arrayStream.length; i < len; ++i) {
  		string += String.fromCharCode(arrayStream[i] & 0xFF);
  	}
  
  	return string;
  };
  
  bitster.Raw.Byte.Array.Stream.from.Byte.String.Stream = function(stringStream) {
  	var array = new Array(stringStream.length);	
  	
  	for(var i = 0, len = array.length; i < len; ++i) {
  		array[i] = stringStream.charCodeAt(i) & 0xFF;
  	}
  
  	return array;
  };
  
  return bitster; });
  

  provide("bitster", module.exports);

  $.ender(module.exports);

}();