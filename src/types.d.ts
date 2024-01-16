import { ComponentType } from "react";

declare module "*.scss" {
	const content: { [className: string]: string };
	export default content;
}

export type Route<T = string> = string;
export type PathName = Route<string>;

export interface RouteConfig {
	title?: string;
	keywords?: string;
	footer?: boolean;
	toolbar?: boolean;
}

export interface Page extends RouteConfig {
	path: PathName;
	mobile?: RouteConfig;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	provider?: ComponentType<any>;
	component: ComponentType<RouteConfig>;
}
