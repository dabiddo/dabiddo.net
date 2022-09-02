/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
		  {
			mytheme: {
			  primary: "#73C126",
			  secondary: "#f6d860",
			  accent: "#37cdbe",
			  neutral: "#3d4451",
			  "base-100": "#282829",
			},
		  },
		  "dark",
		  "cupcake",
		],
	  },
}
