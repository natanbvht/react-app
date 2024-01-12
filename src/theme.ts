import { createTheme } from "@mui/material/styles";

export const METAINTRO_BLUE = { r: 57, g: 74, b: 185 };

export const typography = {
	fontFamily: "Kanit, Calibri, sans-serif",
	h1: {
		fontSize: "2.5rem",
		fontWeight: 500,
		letterSpacing: "-0.01562em",
		lineHeight: "1.5rem"
	},
	h2: {
		fontSize: "2rem",
		fontWeight: 500,
		letterSpacing: "-0.00833em",
		lineHeight: "1.5rem"
	},
	h3: {
		fontSize: "1.75rem",
		fontWeight: 500,
		letterSpacing: "0em",
		lineHeight: "1.5rem"
	},
	h4: {
		fontSize: "1.5rem",
		fontWeight: 500,
		letterSpacing: "0.00735em",
		lineHeight: "1.5rem"
	},
	h5: {
		fontSize: "1.25rem",
		fontWeight: 500,
		letterSpacing: "0em",
		lineHeight: "1.5rem"
	},
	h6: {
		fontSize: "1.125rem",
		fontWeight: 500,
		letterSpacing: "0.0075em",
		lineHeight: "1.5rem"
	},
	subtitle1: {
		fontSize: "1rem",
		fontWeight: 400,
		letterSpacing: "0.00938em",
		lineHeight: 1.5
	},
	subtitle2: {
		fontSize: "0.875rem",
		fontWeight: 500,
		letterSpacing: "0.00714em",
		lineHeight: 1.5
	},
	body1: {
		fontSize: "1rem",
		fontWeight: 400,
		letterSpacing: "0.00938em",
		lineHeight: 1.5
	},
	body2: {
		fontSize: "0.875rem",
		fontWeight: 400,
		letterSpacing: "0.01071em",
		lineHeight: 1.5
	},
	button: {
		fontSize: "0.875rem",
		fontWeight: 500,
		letterSpacing: "0.02857em",
		lineHeight: 1.75
	},
	caption: {
		fontSize: "0.75rem",
		fontWeight: 400,
		letterSpacing: "0.03333em",
		lineHeight: 1.66
	},
	overline: {
		fontSize: "0.75rem",
		fontWeight: 500,
		letterSpacing: "0.08333em",
		lineHeight: 2.66,
		textTransform: "uppercase" as const
	}
};

export const sideNavTheme = createTheme({
	typography,
	components: {
		MuiListItemButton: {
			defaultProps: {
				disableTouchRipple: true
			}
		}
	},
	palette: {
		mode: "dark",
		primary: { main: "rgb(102, 157, 246)" },
		background: { paper: "rgb(5, 30, 52)" }
	}
});

export const toolbarTheme = createTheme({
	typography,
	palette: {
		mode: "light",
		primary: {
			main: "#FFFFFF" // Primary color for the toolbar
		},
		secondary: {
			main: "#000000" // Secondary color for the toolbar
		}
	}
});

const theme = createTheme({
	typography,
	palette: {
		mode: "light",
		primary: {
			main: "#394AB9", // Primary color for the toolbar
			dark: "#20357A", // Darker shade of the primary color
			light: "#7D8BDD" // Lighter shade of the primary color
		},
		error: {
			main: "#FF3D00" // Error color
		},
		background: {
			default: "#F5F5F5" // Default background color
		},
		text: {
			primary: "#333333", // Primary text color
			secondary: "#666666", // Secondary text color
			disabled: "#BFBFBF" // Disabled text color
		}
	}
});

export default theme;
