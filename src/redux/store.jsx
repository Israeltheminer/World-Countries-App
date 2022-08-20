import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./displaySlice";
import refetchReducer from "./refetchSlice"
import previousDataReducer from "./previousDataSlice"
import pageReducer from "./pageSlice"

export const store = configureStore({
	reducer: {
		display: displayReducer,
		refetch: refetchReducer,
		previousData: previousDataReducer,
		page: pageReducer,
	},
})
