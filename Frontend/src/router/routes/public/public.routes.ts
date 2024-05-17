import { lazy } from "react";
import { _RouteObject } from "react-router-dom";

import { createRoute } from "../create-route";
import { publicRoutePaths } from "./public.paths";

const SignIn = lazy(() => import("@/pages/public/SignIn"));

export const publicRoutes: _RouteObject<"public">[] = [
	createRoute({
		path: publicRoutePaths.signin,
		element: SignIn,
	}),
];
