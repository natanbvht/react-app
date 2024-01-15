import { Page } from "../../types";
import Page404 from "./page";

const routes: Page[] = [
	{
		path: "/404",
		title: "404 Oops! Page not found",
		component: Page404
	},
	{
		path: "/not-found",
		title: "404 Oops! Page not found",
		component: Page404
	}
];

export default routes;
