import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Header from "./Header";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: [
			"Poppins",
			'sans-serif',
		].join(',')
	}
})


const Layout: React.FC = ({children}) => {
	return (
		<ThemeProvider theme={theme}>

			<Box sx={{
				width: "100%",
				height: '100vh',
				backgroundColor: "#FDDB29",
				padding: "2em 1em"
			}}>
				<Grid container spacing={2} sx={{
					flexDirection: "column",
					alignItems: "center",
					maxWidth: "650px",
					mx:"auto",
				}}>
					<Grid component={"header"}>
						<Header/>
					</Grid>

					<Grid component="main" item>
						{children}
					</Grid>

					<Grid item component={'footer'}>
						Footer
					</Grid>
				</Grid>
			</Box>
		</ThemeProvider>
	);
};

export default Layout;
