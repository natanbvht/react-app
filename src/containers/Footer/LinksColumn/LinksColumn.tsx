import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LinksColumnProps } from "../types.d";
import "./LinksColumn.css";

function LinksColumn({ title, links }: LinksColumnProps) {
	const { t } = useTranslation();

	return (
		<Grid
			item
			xs={6}
			sm={6}
			md={2}
		>
			<Box className="linksColumnWrapper">
				<Typography
					p={0}
					mb={2}
					variant="h3"
					fontWeight={600}
					className="LinksColumnTitle"
				>
					{t(`${title}`)}
				</Typography>
				<List sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
					{links.map(({ name, url }, index) => (
						<ListItem
							key={name}
							sx={{ display: "inline", paddingLeft: 0 }}
						>
							<Link
								to={url}
								key={index}
								aria-label={t(`${name}`)}
								className="LinksColumnLink"
								style={{ textDecoration: "none" }}
								target={url.includes("#") ? "_self" : "_blank"}
							>
								{t(`${name}`)}
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
		</Grid>
	);
}

export default LinksColumn;
