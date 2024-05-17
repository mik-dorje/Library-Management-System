import {
	IApiDetails,
	RequestAuthType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const prefix = "/book";

const book: { [key: string]: IApiDetails } = {
	getBookPaginated: {
		controllerName: `${prefix}/paginated`,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "GET_BOOK_PAGINATED",
		requestAuthType: RequestAuthType.AUTH,
	},
	addBook: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "ADD_BOOK",
		requestAuthType: RequestAuthType.AUTH,
	},
	updateBook: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.PUT,
		queryKeyName: "UPDATE_BOOK",
		requestAuthType: RequestAuthType.AUTH,
	},
	getAllBook: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_ALL_BOOK",
		requestAuthType: RequestAuthType.AUTH,
	},
	getBookById: {
		controllerName: `${prefix}/{id}`,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_BOOK_BY_ID",
		requestAuthType: RequestAuthType.AUTH,
	},
	deleteBook: {
		controllerName: `${prefix}/delete-book`,
		requestMethod: RequestMethodEnum.DELETE,
		queryKeyName: "DELETE_BOOK",
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default book;
