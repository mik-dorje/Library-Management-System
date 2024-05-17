import { lazy } from "react";
import { _RouteObject } from "react-router-dom";

import { createRoute } from "../create-route";
import { protectedRoutePaths } from "..";

const PrivateLayout = lazy(() => import("@/core/components/PrivateLayout"));

// service providers
const Category = lazy(() => import("@/pages/protected/Category/pagess"));

// students report
const Author = lazy(() => import("@/pages/protected/Author/pagess"));
const Member = lazy(() => import("@/pages/protected/Member/pagess"));

const MockTestBoard = lazy(() => import("@/pages/protected/MockTestBoard"));
const BookView = lazy(() => import("@/pages/protected/MockTestBoard/BookView"));
const BookForm = lazy(() => import("@/pages/protected/MockTestBoard/BookForm"));

// test dashboard
const TestDashboard = lazy(
	() => import("@/pages/protected/TestDashboard/pages/TestDashboard"),
);

// Transaction
const Transaction = lazy(() => import("@/pages/protected/Transaction/pagess"));

// custom editor
const EditorPlayground = lazy(
	() => import("@/pages/protected/EditorPlayground"),
);

const NotFound = lazy(() => import("@/pages/shared/NotFound"));

export const protectedRoutes: _RouteObject<"protected">[] = [
	createRoute({
		path: protectedRoutePaths.base,
		element: PrivateLayout,
		children: [
			// service providers
			createRoute({
				path: protectedRoutePaths.bookCategory,
				element: Category,
			}),
			// students report
			createRoute({
				path: protectedRoutePaths.author,
				element: Author,
			}),
			createRoute({
				path: protectedRoutePaths.member,
				element: Member,
			}),

			createRoute({
				path: protectedRoutePaths.book.bookList,
				element: MockTestBoard,
			}),
			createRoute({
				path: protectedRoutePaths.book.viewBook,
				element: BookView,
			}),
			createRoute({
				path: protectedRoutePaths.book.createBookForm,
				element: BookForm,
			}),
			createRoute({
				path: protectedRoutePaths.book.editBookForm,
				element: BookForm,
			}),

			// test dashboard
			createRoute({
				path: protectedRoutePaths.testDashboard,
				element: TestDashboard,
			}),

			// transaction

			createRoute({
				path: protectedRoutePaths.transaction.transactionList,
				element: Transaction,
			}),

			// custom editor
			createRoute({
				path: protectedRoutePaths.editorPlayground,
				element: EditorPlayground,
			}),

			createRoute({
				path: "*",
				element: NotFound,
			}),
		],
	}),
];
