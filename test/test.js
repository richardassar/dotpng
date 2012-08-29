var DotPNG = require("../"),
	fs = require("fs");

var width = 512, height = 512, numChannels = 4;

var png = new DotPNG({
	'width' : width,
	'height' : height,
	'numChannels' : numChannels
});

var imageData = new Array(width * height * numChannels);

function clampByte(x) {
	return Math.floor(x > 255 ? 255 : x < 0 ? 0 : x) >> 0;
}

for(var y = 0; y < height; ++y) {
	for(var x = 0; x < width; ++x) {
		var index = (y * width + x) * numChannels;

		var _x = x / (width - 1);
		var _y = y / (height - 1);

		var r = ((_x * 0xFFFFFFFF & _y * 0xFFFFFFFF) >>> 0) / 0xFFFFFFFF;
		var g = ((_x * 0xFFFFFFFF | _y * 0xFFFFFFFF) >>> 0) / 0xFFFFFFFF;
		var b = ((_x * 0xFFFFFFFF ^ _y * 0xFFFFFFFF) >>> 0) / 0xFFFFFFFF;

		imageData[index] = clampByte(r * 255);
		imageData[index + 1] = clampByte(g * 255);
		imageData[index + 2] = clampByte(b * 255);
		imageData[index + 3] = 255;
	}
}

png.setImageData(imageData);

png.generate();

fs.writeFileSync(__dirname + "/output.png", png.getData('raw'), 'binary');

console.log(png.getData('raw').length);