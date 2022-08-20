import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	refetch: true,
};

export const refetchSlice = createSlice({
	name: "refetch",
	initialState,
	reducers: {
		setRefetch: (state, action) => {
			state.refetch = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setRefetch } = refetchSlice.actions;

export default refetchSlice.reducer;
