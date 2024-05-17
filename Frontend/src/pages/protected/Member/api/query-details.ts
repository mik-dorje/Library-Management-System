import {
	IApiDetails,
	RequestAuthType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const prefix = "/member";

const member: { [key: string]: IApiDetails } = {
	getMemberPaginated: {
		controllerName: `${prefix}/paginated`,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "GET_MEMBER_PAGINATED",
		requestAuthType: RequestAuthType.AUTH,
	},
	addMember: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.POST,
		queryKeyName: "ADD_MEMBER",
		requestAuthType: RequestAuthType.AUTH,
	},
	updateMember: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.PUT,
		queryKeyName: "UPDATE_MEMBER",
		requestAuthType: RequestAuthType.AUTH,
	},
	getAllMember: {
		controllerName: prefix,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_ALL_MEMBER",
		requestAuthType: RequestAuthType.AUTH,
	},
	getMemberById: {
		controllerName: `${prefix}/{id}`,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_MEMBER_BY_ID",
		requestAuthType: RequestAuthType.AUTH,
	},
	deleteMember: {
		controllerName: `${prefix}/delete-member`,
		requestMethod: RequestMethodEnum.DELETE,
		queryKeyName: "DELETE_MEMBER",
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default member;
