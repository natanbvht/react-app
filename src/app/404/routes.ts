import React from "react";
import { Page } from "../../types";

const routes: Page[] = [
	{
		path: "/404",
		title: "404 Oops! Page not found",
		element: React.lazy(() => import(/* webpackChunkName: '404' */ "./page"))
	},
	{
		path: "/not-found",
		title: "404 Oops! Page not found",
		element: React.lazy(() => import(/* webpackChunkName: '404' */ "./page"))
	}
];

export default routes;
