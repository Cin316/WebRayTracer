
// CanvasRenderingContext2D context;
// Color[][] colorArr;
// Returns: ImageData
function convertColorArrToImageData(context, colorArr) {
	var imageData = context.createImageData(colorArr.length, colorArr[0].length);

	for (var x=0; x<colorArr.length; x++) {
		for (var y=0; y<colorArr[0].length; y++) {
			let offset = 4*((y*colorArr.length)+x);
			imageData.data[offset+0] = colorArr[x][y].red;
			imageData.data[offset+1] = colorArr[x][y].green;
			imageData.data[offset+2] = colorArr[x][y].blue;
			imageData.data[offset+3] = colorArr[x][y].alpha;
		}
	}

	return imageData
}

