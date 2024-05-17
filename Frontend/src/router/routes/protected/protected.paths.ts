export const protectedRoutePaths = {
	base: "/",

	// category

	bookCategory: "/book-category",
	createServiceProvider: "/book-category/create",

	// author
	author: "/author/list",

	// book
	book: {
		base: "/book",
		bookList: "/book/list",
		viewBook: "/book/view/:id",
		createBookForm: "/book/details",
		editBookForm: "/book/details/:id",
	},
	// member

	member: "/member/list",

	transaction: {
		base: "/transaction",
		transactionList: "/transaction/list",
		createTransactionForm: "/transaction/details",
		editTransactionForm: "/transaction/details/:id",
	},

	// test dashboard
	testDashboard: "/dashboard",
	testDashboardView: "/test-dashboard/:id",

	// custom-editor
	editorPlayground: "/editor/playground",
};
