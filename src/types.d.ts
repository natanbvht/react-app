import { ComponentType } from "react";

declare module "*.scss" {
	const content: { [className: string]: string };
	export default content;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export type Route<T = string> = string;
export type PathName = Route<string>;

export interface User {
	id?: string;
	name: string;
	email: string;
}

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
	element: ComponentType<RouteConfig>;
}

export interface IpLocation {
	city?: string;
	state?: string;
	country?: string;
	countryCode?: string;
}

export interface UTM {
	source: string;
	medium: string;
	campaign: string;
	content: string;
	term: string;
	search?: string;
}

export interface Recommendation {
	_id: string;
	sub: string;
	cta?: string;
	logo: string;
	name: string;
	sponsored?: boolean;
	description: string;
}
