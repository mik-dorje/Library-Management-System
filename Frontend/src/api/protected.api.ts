import generic from "@/core/genericQueries/request-details";
import category from "@/pages/protected/Category/api/query-details";
import author from "@/pages/protected/Author/api/query-details";
import member from "@/pages/protected/Member/api/query-details";
import book from "@/pages/protected/MockTestBoard/api/query-details";
import transaction from "@/pages/protected/Transaction/api/query-details";
import dashboard from "@/pages/protected/TestDashboard/api/query-details";

export const protectedApiList = {
	category,
	generic,
	author,
	member,
	book,
	transaction,
	dashboard,
};
