import Console from "./Console.jsx";

import { useEffect, useRef } from "react";

//Console input elements
let iterInput, tauDivInput, redInput, greenInput, blueInput;
function animate(ctx, width, x = 0, y = 0, v = 0, t = 0) {
	ctx.clearRect(0, 0, width, width);

	const n = iterInput.value;
	const r = (2 * Math.PI) / tauDivInput.value;
	const [redFac, greenFac, blueFac] = [
		redInput.value,
		greenInput.value,
		blueInput.value,
	];

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			const u = Math.sin(i + v) + Math.sin(r * i + x);
			v = Math.cos(i + v) + Math.cos(r * i + x);
			x = u + t;

			ctx.fillStyle = `rgb(${i * redFac} ${j * greenFac} ${blueFac})`;
			const [widthHalf, widthQuart] = [width / 2, width / 4];
			ctx.fillRect(
				u * widthQuart + widthHalf,
				v * widthQuart + widthHalf,
				1,
				1
			);
		}
	}
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
		iterInput.value = 170;
		tauDivInput.value = 5;
		redInput.value = 1;
		greenInput.value = 1;
		blueInput.value = 99;
	}

	useEffect(() => {
		initConsoleData();
		resetBtn.current.addEventListener("click", initConsoleData);
		const canvas = canvasRef.current;
		let width = Math.min(innerWidth, innerHeight) * 0.8;
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
