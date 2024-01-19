import { Page } from "../../types";
import SubscribePage, { SubscribeCongratulationPage } from /* webpackChunkName: 'subscribe' */ "./page";

const routes: Page[] = [
	{
		path: "/subscribe",
		title: "Subscribe",
		component: SubscribePage
	},
	{
		title: "Subscribe",
		path: "/subscribe/completed",
		component: SubscribeCongratulationPage
	}
];

export default routes;
