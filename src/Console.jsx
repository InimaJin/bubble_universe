import { useEffect } from "react";

function RangeInput({ labelText, inputId, min, max, step, inputElements }) {
	return (
		<div>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				id={inputId}
				type="range"
				min={min}
				max={max}
				step={step}
				ref={(node) => {
					inputElements[inputId] = node;
					return () => delete inputElements[inputId];
				}}
			/>
		</div>
	);
}

export default function Console({ inputElements }) {
	function initValues() {
		inputElements["iter"].value = 250;
		inputElements["speed"].value = 0.5;
		inputElements["tau-div"].value = 5;
		inputElements["px-size"].value = 1;
		inputElements["red-fac"].value = 1;
		inputElements["green-fac"].value = 1;
		inputElements["blue-fac"].value = 99;
	}

	useEffect(initValues, []);

	return (
		<div className="console">
			<div className="reset">
				<button aria-label="Reset the console" onClick={initValues}>
					<img src="/assets/reset_console.png" alt="reset icon" />
				</button>
			</div>
			<div className="inputs">
				<RangeInput
					inputElements={inputElements}
					labelText="N"
					inputId="iter"
					min="0"
					max="450"
				/>
				<RangeInput
					inputElements={inputElements}
					labelText="speed"
					inputId="speed"
					min="0.5"
					max="20"
					step=".5"
				/>
				<RangeInput
					inputElements={inputElements}
					labelText="tau div"
					inputId="tau-div"
					min="1"
					max="5"
				/>
				<RangeInput
					inputElements={inputElements}
					labelText="px size"
					inputId="px-size"
					min="1"
					max="6"
				/>
				<RangeInput
					inputElements={inputElements}
					labelText="red"
					inputId="red-fac"
					min="0"
					max="5"
				/>
				<RangeInput
					inputElements={inputElements}
					labelText="green"
					inputId="green-fac"
					min="0"
					max="10"
					step="2"
				/>
				<RangeInput
					inputElements={inputElements}
					labelText="blue"
					inputId="blue-fac"
					min="0"
					max="255"
				/>
			</div>
		</div>
	);
}
