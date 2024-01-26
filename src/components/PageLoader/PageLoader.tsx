import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function PageLoader() {
	return (
		<Backdrop
			open
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Box sx={{ width: "280px" }}>
				<LinearProgress color="inherit" />
			</Box>
		</Backdrop>
	);
}

export default PageLoader;
