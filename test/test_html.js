var DotPNG = require("../");

var width = 512, height = 512, numChannels = 4;

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
		imageData[index + 1] = Math.floor((y / height) * 255);
		imageData[index + 2] = 255 - Math.floor((x / width) * 255);
		imageData[index + 3] = 255;
	}
}

png.setImageData(imageData);

png.generate();

var imageElement = new Image();

imageElement.src = png.getData('base64');

document.body.appendChild(imageElement);