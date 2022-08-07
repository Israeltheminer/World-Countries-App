import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CountryPage from "./routes/CountryPage";
import { store } from "./redux/store";
import { Provider } from "react-redux"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/:countryId' element={<CountryPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
