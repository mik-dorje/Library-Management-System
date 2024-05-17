import {
	IApiDetails,
	RequestAuthType,
	RequestBodyType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const prefix = "/transaction";

const transaction: { [key: string]: IApiDetails } = {
	getTransactionPaginated: {
		controllerName: `${prefix}/paginated`,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "GET_TRANSACTION_PAGINATED",
		requestAuthType: RequestAuthType.AUTH,
	},
	addTransaction: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "ADD_TRANSACTION",
		requestAuthType: RequestAuthType.AUTH,
	},
	updateTransaction: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.PUT,
		queryKeyName: "UPDATE_TRANSACTION",
		requestAuthType: RequestAuthType.AUTH,
	},
	getAllTransaction: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_ALL_TRANSACTION",
		requestAuthType: RequestAuthType.AUTH,
	},
	getTransactionById: {
		controllerName: `${prefix}/{id}`,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_TRANSACTION_BY_ID",
		requestAuthType: RequestAuthType.AUTH,
	},
	deleteTransaction: {
		controllerName: `${prefix}/delete-Transaction`,
		requestMethod: RequestMethodEnum.DELETE,
		queryKeyName: "DELETE_TRANSACTION",
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default transaction;
