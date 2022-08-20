import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	previousData: {
		category: "ALL",
		searchValue: "",
	},
}

export const previousDataSlice = createSlice({
	name: "previousData",
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.previousData.category = action.payload
		},
		setSearchValue: (state, action) => {
			state.previousData.searchValue = action.payload
		},
	},
})

export const { setCategory, setSearchValue } = previousDataSlice.actions

export default previousDataSlice.reducer
