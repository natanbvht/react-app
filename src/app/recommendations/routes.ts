import React from "react";
import { Page } from "../../types";

const routes: Page[] = [
	{
		title: "Recommendations",
		path: "/recommendations",
		component: React.lazy(() => import(/* webpackChunkName: 'recommendations' */ "./page"))
	}
];

export default routes;
