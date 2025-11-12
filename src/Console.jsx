function RangeInput({ labelText, inputId, min, max, inputElements }) {
	return (
		<div>
			<label htmlFor={inputId}>{labelText}</label>
			<input
				id={inputId}
				type="range"
				min={min}
				max={max}
				ref={(node) => {
					inputElements.push(node);
					return () => inputElements.pop();
				}}
			/>
		</div>
	);
}

export default function Console({ inputElements }) {
	return (
		<div className="console">
			<RangeInput
				inputElements={inputElements}
				labelText="N"
				inputId="iter"
				min="0"
				max="200"
			/>
			<RangeInput
				inputElements={inputElements}
				labelText="tau div"
				inputId="tau-div"
				min="1"
				max="25"
			/>
			<RangeInput
				inputElements={inputElements}
				labelText="red"
				inputId="red-fac"
				min="0"
				max="255"
			/>
			<RangeInput
				inputElements={inputElements}
				labelText="green"
				inputId="green-fac"
				min="0"
				max="255"
			/>
			<RangeInput
				inputElements={inputElements}
				labelText="blue"
				inputId="blue-fac"
				min="0"
				max="255"
			/>
		</div>
	);
}
