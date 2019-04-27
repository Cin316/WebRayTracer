
function main() {
	var canvas = document.getElementById("canvas");

	canvas.width = 700;
	canvas.height = 400;

	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 700, 400);
}

window.onload = main;

