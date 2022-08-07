import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	display: false,
	// false indicates light-mode and this the default, true indicates dark-mode.
};

export const displaySlice = createSlice({
	name: "display",
	initialState,
	reducers: {
		changeDisplay: (state) => {
			const previousDisplay = state.display;
			state.display = !previousDisplay;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeDisplay } = displaySlice.actions;

export default displaySlice.reducer;
