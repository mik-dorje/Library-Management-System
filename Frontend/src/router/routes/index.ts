import { protectedRoutePaths } from "./protected/protected.paths";
import { publicRoutePaths } from "./public/public.paths";

const routePaths = {
	...protectedRoutePaths,
	...publicRoutePaths,
} as const;

export { publicRoutePaths, protectedRoutePaths, routePaths };
