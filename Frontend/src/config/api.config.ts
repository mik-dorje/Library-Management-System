const apiEndpointMap = {
	"your-domain": {
		development: "http://localhost:3500",
		production: "https://your-backend-server/bookrental",
	},
};

const defaultApiEndpointObj = apiEndpointMap["your-domain"];

export const getApiEndpoint = () => {
	const domain = window.location.hostname;
	const environment = process.env.NODE_ENV || "development";

	const apiEndpointObj =
		apiEndpointMap[domain as keyof typeof apiEndpointMap] ||
		defaultApiEndpointObj;

	return apiEndpointObj[environment as keyof typeof apiEndpointObj];
};

export const API_ENDPOINT = getApiEndpoint();
