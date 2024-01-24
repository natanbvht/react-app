import React from "react";
import { Page } from "../../types";

const routes: Page[] = [
	{
		footer: false,
		title: "Recommendations",
		path: "/recommendations",
		element: React.lazy(() => import(/* webpackChunkName: 'recommendations' */ "./page"))
	}
];

export default routes;
