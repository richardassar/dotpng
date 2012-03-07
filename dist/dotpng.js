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

}();!function (name, context, definition) {
  if (typeof module !== 'undefined') module.exports = definition(name, context);
  else if (typeof define === 'function' && typeof define.amd  === 'object') define(definition);
  else context[name] = definition(name, context);
}("dotpng", this, function(name, context) {
	//
	var bitster = require("bitster");

	// TODO: Move to proto
	function splitChunks(string, chunkSize) {
		var len = Math.ceil(string.length / chunkSize);

		var ret = new Array(len);

		for(var i = 0; i < len; i++) {
			ret[i] = string.substr(i * chunkSize, chunkSize);
		}

		return ret;
	};

	function array_splitChunks(array, chunkSize) {
		var len = Math.ceil(array.length / chunkSize);

		var ret = new Array(len);

		for(var i = 0; i < len; i++) {
			ret[i] = array.slice(i * chunkSize, (i + 1) * chunkSize);
		}

		return ret;
	};

	// TODO: move to hashlib
	function adler32(string) {
		var BASE = 65521; /* largest prime smaller than 65536 */
		var NMAX = 5552;  /* NMAX is the largest n such that 255n(n+1)/2 + (n+1)(BASE-1) <= 2^32-1 */
		var s1 = 1;
		var s2 = 0;
		var n = NMAX;

		for(var i = 0, len = string.length; i < len; ++i) {
			s1 += string.charCodeAt(i);
			
			s2 += s1;
			
			if ((n-= 1) == 0) {
				s1%= BASE;
				s2%= BASE;
				n = NMAX;
			}
		}
		
		s1 %= BASE;
		s2 %= BASE;

		return (s2 << 16) | s1;
	};

	// TODO: move to hashlib
	function crc32(string) {   
		var table = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];

		var crc = 0;
		
		var x = 0;
		var y = 0;

		crc = crc ^ (-1);

		for (var i = 0, len = string.length; i < len; ++i) {
			y = (crc ^ string.charCodeAt(i)) & 0xFF;
			x = table[y];
			
			crc = (crc >>> 8) ^ x;
		}

		return crc ^ (-1);
	};

	//
	function deflatePack(str) {
		var ret = "\x78\x9c";

		var chunks = splitChunks(str, 0xFFFF);

		for(var i = 0; i < chunks.length; i++) {
			var chunk = chunks[i];															
			
			ret +=
				(i < (chunks.length - 1) ? "\x00" : "\x01") + 
				bitster.LE.Short.String.from.Number(chunk.length) + 
				bitster.LE.Short.String.from.Number(~chunk.length) + 
				chunk;
		}

		ret += bitster.Long.String.from.Number(adler32(str));
		
		return ret;
	};

	//
	var pngSignature = bitster.Raw.Byte.String.Stream.from.Byte.Array.Stream([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

	//
	function generateChunk(type, data) {		
		var typeAndData = type + data;
		
		return bitster.Long.String.from.Number(data.length) + typeAndData + bitster.Long.String.from.Number(crc32(typeAndData));
	};

	//
	function getIDHR(options) {
		var ihdrData = 
			bitster.Long.String.from.Number(options.width) +  // Width
			bitster.Long.String.from.Number(options.height) + // Height
			"\x08" + // Bit depth
			(options.numChannels == 3 ? "\x02" : "\x06") + // Colour type
			"\x00" + // Compression method						
			"\x00" + // Filter method				
			"\x00";  // Interlace method	

		return generateChunk("IHDR", ihdrData);
	};

	// TODO: Optional zpipe
	function getIDAT(imageData, options) {		
		var scanLines = array_splitChunks(imageData, options.width * options.numChannels);

		var imageBytes = '';

		for(var i = 0, len = scanLines.length; i < len; ++i) {
			var scanline = scanLines[i];

			imageBytes += 
				bitster.Byte.String.from.Number(0) + 
				bitster.Raw.Byte.String.Stream.from.Byte.Array.Stream(scanline);
		}
		
		var deflatedImageBytes = deflatePack(imageBytes);

		return generateChunk("IDAT", deflatedImageBytes);
	};

	//
	function getIEND() {
		return generateChunk("IEND", "");
	};

	//
	var DotPNG = function(options) {
		this.options = options;			
	};

	DotPNG.prototype = {
		'generate' : function() {
			this.pngBytes = 
				pngSignature + 
				getIDHR(this.options) + 
				getIDAT(this.imageData, this.options) + 
				getIEND();
		},

		'setImageData' : function(imageData) {
			this.imageData = imageData;
		},

		'getData' : function(format) { 
			switch(format) {
				case 'raw':
					return this.pngBytes;
					break;

				case 'base64':
					return btoa(this.pngBytes);
					break;
				
				default:
					throw new Error("You must specify a type (raw|base64)");
			};		
		}
	};				

	return DotPNG;
});
