# bit$ter

**IMPORTANT** Docs require updating, please ignore content below until this notice disappears.

So what do you want? How do you want it delivered? What do I get for it?

!["Stick 'em up!"](http://gangster-movies.com/wp-content/uploads/2010/01/gangster-movies-scarface-1932.jpg "Stick 'em up!")

> "As far back as I can remember, I always wanted to be a gangster."

## About

bit$ter is a binary transcoding utility module which converts binary data between native JavaScript data-types and supports single values and streams.

Say what data type you want, how you want it, what input data type you will be providing and bit$ter will do the rest.

That's... 

* What do you want? ... `bitster.UInt32`
* How do you want it delivered? ... `bitster.UInt32.Number`
* What do I get for it? ... `bitster.UInt32.Number.from.String`

Simple.

## Motivation

Converting between binary representations in JavaScript can be messy and painful.

bit$ter attempts to alleviate that pain with a shotgun, **no**... tommy gun, approach.

## Examples

Converting single values:

`bitster.UInt16.Number.from.String(stringData)` means "Give me an unsigned int16 in Number format from a String".
`bitster.Int32_LE.Number.from.Array(arrayData)` means "Give me an signed little-endian int32 in Number format from an Array".

Converting streams:

`bitster.UInt32.Array.Stream.from.String(stringData)` means "Give me an unsigned int32 Stream in Array format from a String".

From/to: (TODO)

bit$ter also supports "to" in place of "from" to perform the inverse of an operation.

`bitster.UInt16_LE.String.to.Array(stringData)` means "Give me an unsigned little-endian int16 in Array 

## Installation

Install bit$ter through **npm**

`npm install bitster`

and bundle with **Browserify**.

`browserify example.js -o bundle.js`

Alternatively add bit$ter to your **Ender** bundle

`ender build bitster`

## Representation

Bit$ter converts binary data between String, Array and Number representations.

They look like this ...

* A is the low byte (0x00 -> 0xFF)
* D is the high byte (0x00 -> 0xFF)

**String**

* "DCBA" - Big-endian Int32 / UInt32  
* "ABCD" - Little-endian Int32 / UInt32 
* "BA" - Big-endian Int16 / UInt16
* "AB" - Little-endian Int16 / UInt16

**Array**

* [D, C, B, A] - Big-endian Int32 / UInt32  
* [A, B, C, D] - Little-endian Int32 / UInt32 
* [B, A] - Big-endian Int16 / UInt16
* [A, B] - Little-endian Int16 / UInt16

**Number**

Numbers are a direct numerical representation of the binary data, they can be **signed** or **unsigned**.

## Types

The following data types are supported:

* Int8 - Signed int8 (char)
* Int16 - Signed int16 (short)
* Int16_LE - Signed little-endian int16 (short)
* Int32 - Signed int32 (int)
* Int32_LE - Signed little-endian int32 (int)
* UInt8 - Unsigned int8 (char)
* UInt16 - Unsigned int16 (short)
* UInt16_LE - Unsigned little-endian int16 (short)
* UInt32 - Unsigned int32 (int)
* UInt32_LE - Unsigned little-endian int32 (int)

## TODO

* Unit tests
* Benchmarking
