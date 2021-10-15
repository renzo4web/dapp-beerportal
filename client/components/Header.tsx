import React from 'react';
import {Typography} from "@mui/material";

const Header = () => {
	return (
		<div>
			<Typography variant={"h3"} component={'h1'} sx={{fontWeight:"bold"}}>
				Welcome to Beer Portal 🍻
			</Typography>
		</div>
	);
};

export default Header;
