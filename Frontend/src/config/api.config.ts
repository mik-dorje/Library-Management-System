const apiEndpointMap = {
	"https://book-rental-frontend.vercel.app": {
		development: "http://localhost:3500",
		production: "https://book-rental-backend.vercel.app",
	},
};

const defaultApiEndpointObj =
	apiEndpointMap["https://book-rental-frontend.vercel.app"];

export const getApiEndpoint = () => {
	const domain = window.location.hostname;
	const environment = process.env.NODE_ENV || "development";

	const apiEndpointObj =
		apiEndpointMap[domain as keyof typeof apiEndpointMap] ||
		defaultApiEndpointObj;

	return apiEndpointObj[environment as keyof typeof apiEndpointObj];
};

export const API_ENDPOINT = getApiEndpoint();
