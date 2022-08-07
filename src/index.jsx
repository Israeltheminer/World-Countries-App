import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryPage from "./routes/CountryPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<Routes>
				<Route path='/' element={<App />}>
					<Route path=':countryId' element={<CountryPage />} />
				</Route>
			</Routes>
		</React.StrictMode>
	</BrowserRouter>
);
