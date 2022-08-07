/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		screens: {
			xl: { max: "1200px" },
			lg: { max: "1050px" },
			md: { max: "900px" },
			sm: { max: "610px" },
			xs: { max: "425px" },
		},
		extend: {},
	},
	plugins: [],
};
