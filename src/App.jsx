import { useEffect, useRef } from "react";

import Console from "./Console.jsx";
import { FrameCalc } from "../pkg/bubble_universe.js";

let iterInput,
	speedInput,
	tauDivInput,
	pxSizeInput,
	redInput,
	greenInput,
	blueInput;
function animate(wasm, fc, ctx) {
	const width = ctx.canvas.width;
	const ptr = fc.compute_frame(
		width,
		iterInput.value,
		speedInput.value,
		tauDivInput.value,
		pxSizeInput.value,
		redInput.value,
		greenInput.value,
		blueInput.value
	);

	const pixelData = new Uint8ClampedArray(
		wasm.memory.buffer,
		ptr,
		width * width * 4
	);
	const imgData = new ImageData(pixelData, width);
	ctx.putImageData(imgData, 0, 0);

	requestAnimationFrame(() => {
		animate(wasm, fc, ctx);
	});
}

export default function App({ wasm }) {
	const canvasRef = useRef(null);
	const inputElements = useRef({});

	useEffect(() => {
		[
			iterInput,
			speedInput,
			tauDivInput,
			pxSizeInput,
			redInput,
			greenInput,
			blueInput,
		] = Object.values(inputElements.current);

		const canvas = canvasRef.current;
		function resizeCanvas() {
			const width = Math.round(Math.min(innerWidth, innerHeight) * 0.8);
			[canvas.width, canvas.height] = [width, width];
		}
		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		const fc = new FrameCalc();
		const ctx = canvas.getContext("2d");

		animate(wasm, fc, ctx);
	}, []);

	return (
		<>
			<Console inputElements={inputElements.current} />
			<canvas ref={canvasRef}>
				The Bubble Universe should be displayed here.
			</canvas>
		</>
	);
}
