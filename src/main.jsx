import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import init from "../pkg/bubble_universe.js";

const wasm = await init();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App wasm={wasm} />
	</StrictMode>
);
