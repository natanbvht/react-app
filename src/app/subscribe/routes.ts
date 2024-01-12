import { Page } from "../../types";
import SubscribePage, { SubscribeCongratulationPage } from "./page";

const routes: Page[] = [
	{
		path: "/subscribe",
		title: "Subscribe",
		component: SubscribePage
	},
	{
		path: "/subscribe/completed",
		title: "Subscribe",
		component: SubscribeCongratulationPage
	}
];

export default routes;
