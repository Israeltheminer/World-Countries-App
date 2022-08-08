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
			if (state.display) {
				document.cookie = "display=dark";
			} else {
				document.cookie = "display=light";
			}
		},
		setDisplay: (state, action)=> {
			state.display = action.payload
		}
	},
});

// Action creators are generated for each case reducer function
export const { changeDisplay, setDisplay } = displaySlice.actions;

export default displaySlice.reducer;
