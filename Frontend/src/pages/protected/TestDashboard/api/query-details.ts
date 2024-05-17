import {
	IApiDetails,
	RequestAuthType,
	RequestMethodEnum,
} from "@/schema/http.schema";

const prefix = "/dashboard";

const dashboard: { [key: string]: IApiDetails } = {
	getDashboardData: {
		controllerName: `${prefix}/all`,
		requestMethod: RequestMethodEnum.GET,
		queryKeyName: "GET_DASHBOARD_DATA",
		requestAuthType: RequestAuthType.AUTH,
	},
};

export default dashboard;
