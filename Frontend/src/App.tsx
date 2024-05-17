import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { protectedRoutes } from "./router/routes/protected/protected.routes";
import { publicRoutes } from "./router/routes/public/public.routes";
import { useAuth } from "./providers/AuthProvider";

function App() {
	const { isAuthenticated } = useAuth();

	const router = createBrowserRouter(
		isAuthenticated ? protectedRoutes : publicRoutes,
	);

	return <RouterProvider router={router} />;
}

export default App;
