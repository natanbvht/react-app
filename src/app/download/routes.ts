import React from "react";
import { Page } from "../../types";

const routes: Page[] = [
	{
		title: "Download",
		path: "/download",
		component: React.lazy(() => import(/* webpackChunkName: 'download' */ "./page"))
	}
];

export default routes;
