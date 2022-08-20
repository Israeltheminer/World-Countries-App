import { createSlice } from "@reduxjs/toolkit"

const cookieValue = getCookie("page")

const initialState = {
	page: parseInt(cookieValue) || 1,
}

function getCookie(cname) {
	let name = cname + "="
	let decodedCookie = decodeURIComponent(document.cookie)
	let ca = decodedCookie.split(";")
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === " ") {
			c = c.substring(1)
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ""
}

export const pageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setPage } = pageSlice.actions

export default pageSlice.reducer
