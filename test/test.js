var DotPNG = require("../");

var width = 64, height = 64, numChannels = 4;

var png = new DotPNG({
	'width' : width,
	'height' : height,
	'numChannels' : numChannels
});

var imageData = new Array(width * height * numChannels);

for(var y = 0; y < height; ++y) {
	for(var x = 0; x < width; ++x) {
		var index = (y * width + x) * numChannels;

		imageData[index] = Math.floor((x / width) * 255);
		imageData[index + 1] = Math.floor((y / width) * 255);
		imageData[index + 2] = 255 - Math.floor((x / width) * 255);
		imageData[index + 3] = 255;
	}
}

png.setImageData(imageData);

png.generate();

console.log(png.getData('raw').length);