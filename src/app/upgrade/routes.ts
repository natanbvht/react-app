import React from "react";
import { Page } from "../../types";

const routes: Page[] = [
	{
		title: "Upgrade",
		path: "/upgrade",
		component: React.lazy(() => import(/* webpackChunkName: 'upgrade' */ "./page"))
	}
];

export default routes;
