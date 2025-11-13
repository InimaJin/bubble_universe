import Console from "./Console.jsx";

import { useEffect, useRef } from "react";

//Maps canvas coordinates onto four indices for that pixel in an array
function coordToColorIndices(canvasWidth, x, y) {
	const redIndex = 4 * (y * canvasWidth + x);
	return [redIndex, redIndex + 1, redIndex + 2, redIndex + 3];
}

//Console input elements
let iterInput, tauDivInput, redInput, greenInput, blueInput;
function animate(ctx, width, x = 0, y = 0, v = 0, t = 0) {
	const n = iterInput.value;
	const r = (2 * Math.PI) / tauDivInput.value;
	const [redFac, greenFac, blueFac] = [
		redInput.value,
		greenInput.value,
		blueInput.value,
	];

	const imgData = new ImageData(width, width);
	const arr = imgData.data;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const u = Math.sin(i + v) + Math.sin(r * i + x);
			v = Math.cos(i + v) + Math.cos(r * i + x);
			x = u + t;

			const [widthHalf, widthQuart] = [width / 2, width / 4];
			const [xPos, yPos] = [
				u * widthQuart + widthHalf,
				v * widthQuart + widthHalf,
			];
			const [redIndex, greenIndex, blueIndex, alphaIndex] = coordToColorIndices(
				width,
				Math.round(xPos),
				Math.round(yPos)
			);

			arr[redIndex] = i * redFac;
			arr[greenIndex] = j * greenFac;
			arr[blueIndex] = blueFac;
			arr[alphaIndex] = 255;
		}
	}

	ctx.putImageData(imgData, 0, 0);
	t += 0.025;
	requestAnimationFrame(() => {
		animate(ctx, width, x, y, v, t);
	});
}

export default function App() {
	const canvasRef = useRef(null);
	//Holds the input nodes from the console
	const inputElements = useRef([]);

	const resetBtn = useRef(null);
	function initConsoleData() {
		[iterInput, tauDivInput, redInput, greenInput, blueInput] =
			inputElements.current;
		iterInput.value = 220;
		tauDivInput.value = 5;
		redInput.value = 1;
		greenInput.value = 1;
		blueInput.value = 99;
	}

	useEffect(() => {
		initConsoleData();
		resetBtn.current.addEventListener("click", initConsoleData);
		const canvas = canvasRef.current;
		const width = Math.round(Math.min(innerWidth, innerHeight) * 0.8);
		[canvas.width, canvas.height] = [width, width];

		/** @type {CanvasRenderingContext2D} */
		const ctx = canvas.getContext("2d");
		animate(ctx, width);
	}, []);

	return (
		<>
			<Console resetBtnRef={resetBtn} inputElements={inputElements.current} />
			<canvas ref={canvasRef}>
				The Bubble Universe should be displayed here.
			</canvas>
		</>
	);
}
