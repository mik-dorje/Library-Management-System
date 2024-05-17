import {
	IApiDetails,
	RequestAuthType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const prefix = "/author";

const author: { [key: string]: IApiDetails } = {
	getAuthorPaginated: {
		controllerName: `${prefix}/paginated`,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "GET_AUTHOR_PAGINATED",
		requestAuthType: RequestAuthType.AUTH,
	},
	addAuthor: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "ADD_AUTHOR",
		requestAuthType: RequestAuthType.AUTH,
	},
	updateAuthor: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.PUT,
		queryKeyName: "UPDATE_AUTHOR",
		requestAuthType: RequestAuthType.AUTH,
	},
	getAllAuthor: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_ALL_AUTHOR",
		requestAuthType: RequestAuthType.AUTH,
	},
	getAuthorById: {
		controllerName: `${prefix}/{id}`,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_AUTHOR_BY_ID",
		requestAuthType: RequestAuthType.AUTH,
	},
	deleteAuthor: {
		controllerName: `${prefix}/delete-author`,
		requestMethod: RequestMethodEnum.DELETE,
		queryKeyName: "DELETE_AUTHOR",
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default author;
