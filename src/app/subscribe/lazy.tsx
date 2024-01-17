import React from "react";

const DesktopSideScreen = React.lazy(() => import(/* webpackChunkName: 's-100' */ "./partials/page-desktop"));
const Congratulations = React.lazy(() => import(/* webpackChunkName: 's-200' */ "./congratulations/page"));
const Apple = React.lazy(() => import(/* webpackChunkName: 's-300' */ "../../components/SocialAuthButton/Apple"));
const Google = React.lazy(() => import(/* webpackChunkName: 's-400' */ "../../components/SocialAuthButton/Google"));
const Facebook = React.lazy(() => import(/* webpackChunkName: 's-500' */ "../../components/SocialAuthButton/Facebook"));
const Github = React.lazy(() => import(/* webpackChunkName: 's-600' */ "../../components/SocialAuthButton/GitHub"));
const Yahoo = React.lazy(() => import(/* webpackChunkName: 's-700' */ "../../components/SocialAuthButton/Yahoo"));
const LQIPImage = React.lazy(() => import(/* webpackChunkName: 's-800' */ "../../components/LQIPImage/LQIPImage"));

const SocialAuthButtons = {
	Apple,
	Google,
	Facebook,
	Github,
	Yahoo
};

const PagePartials = {
	LQIPImage,
	Congratulations,
	DesktopSideScreen
};

export { SocialAuthButtons, PagePartials };
