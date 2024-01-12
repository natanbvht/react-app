import { ComponentType } from "react";

export type Route<T = string> = string;
export type PathName = Route<string>;

export interface RouteConfig {
	title?: string;
	keywords?: string;
}

export interface Page extends RouteConfig {
	path: PathName;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	provider?: ComponentType<any>;
	component: ComponentType<RouteConfig>;
}
