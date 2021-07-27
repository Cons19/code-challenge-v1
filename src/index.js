const { getColor } = require('./apiMock');

const { Green, Blue, Red, Black, White } = require('./classes');

// getColors function asynchronous
async function getColors(green, blue, red, white, black, order, callback) {
	const colors = [];
	// check which colors to show
	if (green === 'true'){
		green = new Green();
		colors[order.indexOf(green.name)] = getColor(green.name);
	}
	if (blue === 'true') {
		blue = new Blue()
		colors[order.indexOf(blue.name)] = getColor(blue.name);
	}
	if (red === 'true') {
		red = new Red();
		colors[order.indexOf(red.name)] = getColor(red.name);
	}
	if (white === 'true') {
		white = new White();
		colors[order.indexOf(white.name)] = getColor(white.name);
	}
	if (black === 'true') {
		black = new Black();
		colors[order.indexOf(black.name)] = getColor(black.name);
	}
	callback(colors);
	return colors;
}

// getColor function synchronous
async function getColorsSync(green, blue, red, white, black, order) {
	const colors = [];
	// check which colors to show
	if (green === 'true') {
		green = new Green();
		colors[order.indexOf(green.name)] = await getColor(green.name);
	}
	if (blue === 'true') {
		blue = new Blue()
		colors[order.indexOf(blue.name)] = await getColor(blue.name);
	}
	if (red === 'true') {
		red = new Red();
		colors[order.indexOf(red.name)] = await getColor(red.name);
	}
	if (white === 'true') {
		white = new White();
		colors[order.indexOf(white.name)] = await getColor(white.name);
	}
	if (black === 'true') {
		black = new Black();
		colors[order.indexOf(black.name)] = await getColor(black.name);
	}
	return colors;
}

// colors function asynchronous
function colors() {
	console.log("DEBUG: ", process.argv);
	let green = process.argv[2];
	let blue = process.argv[3];
	let red = process.argv[4];
	let white = process.argv[5];
	let black = process.argv[6];
	const colorOrder = process.argv[7];
	getColors(green, blue, red, white, black, colorOrder, async function (colors) {
  		colors = await Promise.all(colors); // remove await
		let colorNames = [];
		let hexColors = [];
		let rgbColors = [];
		colors.forEach(color => {
			if (color) {
				colorNames.push(color.name)
				hexColors.push(color.HEX);
				rgbColors.push(color.RGB);
			} else {
				return null;
			}
		});
		console.log("Colors:", colorNames);
		console.log("Hex:", hexColors);
		console.log("RGB:", rgbColors);
	});
}

// colors function synchronous
async function colorsSync() {
	console.log("DEBUG: ", process.argv);
	let green = process.argv[2];
	let blue = process.argv[3];
	let red = process.argv[4];
	let white = process.argv[5];
	let black = process.argv[6];
	const colorOrder = process.argv[7];
	const colors = await getColorsSync(green, blue, red, white, black, colorOrder);
	for (let i=0; i < colors.length; i++) {
		if (colors[i]) {
			console.log("Colors:", colors[i].name);
			console.log("Hex:", colors[i].HEX);
			console.log("RGB:", colors[i].RGB);
		}
	}
}

colors();
colorsSync();

/*
To run application:
node ~/code-challenge/src/index.js true false true '["green","blue", "red"]'
----------------------------------------------------------------------------
To get green, blue and red, black, white in Hex and RGB format, run:
node ~/code-challenge/src/index.js true true true true true '["green","blue","red","black","white"]'
*/
