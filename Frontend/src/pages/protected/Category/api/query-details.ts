import {
	IApiDetails,
	RequestAuthType,
	RequestBodyType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const prefix = "/category";

const category: { [key: string]: IApiDetails } = {
	getCategoryPaginated: {
		controllerName: `${prefix}/paginated`,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "GET_CATEGORY_PAGINATED",
		requestAuthType: RequestAuthType.AUTH,
	},
	addCategory: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "ADD_CATEGORY",
		requestAuthType: RequestAuthType.AUTH,
	},
	updateCategory: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.PUT,
		queryKeyName: "UPDATE_CATEGORY",
		requestAuthType: RequestAuthType.AUTH,
	},
	getAllCategory: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_ALL_CATEGORY",
		requestAuthType: RequestAuthType.AUTH,
	},
	getCategoryById: {
		controllerName: `${prefix}/{id}`,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_CATEGORY_BY_ID",
		requestAuthType: RequestAuthType.AUTH,
	},
	deleteCategory: {
		controllerName: `${prefix}/delete-category`,
		requestMethod: RequestMethodEnum.DELETE,
		queryKeyName: "DELETE_CATEGORY",
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default category;
