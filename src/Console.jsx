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
					inputElements.push(node);
					return () => inputElements.pop();
				}}
			/>
		</div>
	);
}

export default function Console({ resetBtnRef, inputElements }) {
	return (
		<div className="console">
			<div className="reset">
				<button ref={resetBtnRef} aria-label="Reset the console">
					<img src="/assets/reset_console.png" alt="reset icon" />
				</button>
			</div>
			<div className="inputs">
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
					max="5"
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
