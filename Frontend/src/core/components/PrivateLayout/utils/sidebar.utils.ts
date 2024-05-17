import { protectedRoutePaths } from "@/router";

export const activeRoutesInfo: { base: string; activeRoutePaths: string[] }[] =
	[
		{
			base: protectedRoutePaths.testDashboard,
			activeRoutePaths: [protectedRoutePaths.testDashboard],
		},
		{
			base: protectedRoutePaths.bookCategory,
			activeRoutePaths: [protectedRoutePaths.bookCategory],
		},

		{
			base: protectedRoutePaths.author,
			activeRoutePaths: [protectedRoutePaths.author],
		},

		{
			base: protectedRoutePaths.transaction.transactionList,
			activeRoutePaths: [
				protectedRoutePaths.transaction.transactionList,
				protectedRoutePaths.transaction.createTransactionForm,
				protectedRoutePaths.transaction.editTransactionForm,
			],
		},
		{
			base: protectedRoutePaths.book.bookList,
			activeRoutePaths: [
				protectedRoutePaths.book.bookList,
				protectedRoutePaths.book.createBookForm,
				protectedRoutePaths.book.editBookForm,
				protectedRoutePaths.book.viewBook,
			],
		},
		{
			base: protectedRoutePaths.member,
			activeRoutePaths: [protectedRoutePaths.member],
		},
		{
			base: protectedRoutePaths.editorPlayground,
			activeRoutePaths: [protectedRoutePaths.editorPlayground],
		},
	];
