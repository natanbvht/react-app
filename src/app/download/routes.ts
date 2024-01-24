import React from "react";
import { Page } from "../../types";

const routes: Page[] = [
	{
		title: "Download",
		path: "/download",
		element: React.lazy(() => import(/* webpackChunkName: 'download' */ "./page"))
	}
];

export default routes;
