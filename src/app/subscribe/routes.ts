import { Page } from "../../types";
import SubscribePage, { SubscribeCongratulationPage } from /* webpackChunkName: 'subscribe' */ "./page";

const routes: Page[] = [
	{
		path: "/subscribe",
		title: "Subscribe",
		element: SubscribePage
	},
	{
		title: "Subscribe",
		path: "/subscribe/completed",
		element: SubscribeCongratulationPage
	}
];

export default routes;
