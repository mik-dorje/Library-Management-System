/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from "axios";
import { message } from "antd";

import TokenService from "@/services/token-storage";
import {
	IApiDetails,
	IApiRequestDetails,
	RequestDataType,
	ResponseError,
} from "@/schema/http.schema";
import { sanitizeController } from "./sanitize-controller";
import initApiRequest from "./init-api-request";
import { clearStorage } from "../storage.utils";

export type APIResponseDetail<TData = unknown> = Promise<CustomResponse<TData>>;

let timeoutLanguageCount = 0;
let noServerConnectionLanguageCount = 0;
let noConnectionLanguageCount = 0;
const axiosCancelSource = Axios.CancelToken.source();

/**
 * Manages API call and updates reducer with success or failure
 * @param apiDetails redux action and api config
 * @param apiRequestDetails request details for XMLHTTP request
 */

export default async function performApiAction<TData = unknown>(
	apiDetails: IApiDetails,
	apiRequestDetails: IApiRequestDetails = {},
): Promise<TData> {
	const {
		requestData,
		requestMethod,
		pathVariables,
		params,
		cancelSource,
		disableSuccessToast = false,
		disableFailureToast,
		enableSuccessToast = false,
		initialAuthToken,
	} = apiRequestDetails;

	// Check for path variables in controllername
	const sanitizedApiDetails = sanitizeController(apiDetails, pathVariables);

	let responseData: any;

	try {
		responseData = await initApiRequest<TData>(
			sanitizedApiDetails,
			requestData,
			requestMethod || sanitizedApiDetails.requestMethod || "GET",
			params,
			cancelSource || axiosCancelSource,
			initialAuthToken,
		);

		if (
			responseData?.data?.message?.toLowerCase()?.includes("jwt expired")
		) {
			TokenService.clearToken();
			clearStorage();
			window.location.replace("/");
		}

		if (
			(responseData as unknown as ResponseError).isAxiosError &&
			(responseData as unknown as ResponseError).response?.status === 401
		) {
			if (TokenService.getAccessToken()) {
				TokenService.clearToken();
			}
		}

		if (!responseData) {
			throw responseData;
		}

		if (enableSuccessToast) {
			message.success(responseData.data?.message);
		}

		if (disableSuccessToast) {
			// No work done
		} else if (
			![requestMethod, sanitizedApiDetails.requestMethod].includes("GET")
		) {
			message.success(responseData.data?.message);
		}

		responseData = responseData.data;
	} catch (customThrownError) {
		responseData = customThrownError;
		let errorResponseData: { [key: string]: RequestDataType } = {};

		if (responseData instanceof Object) {
			errorResponseData = { ...responseData };
		}

		if (
			errorResponseData.response?.data?.error_description
				?.toLowerCase()
				?.includes("access token expired")
		) {
			TokenService.clearToken();
			clearStorage();
			window.location.replace("/");
		}

		if (errorResponseData.status === 413) {
			message.error("Please upload file with size under 12 mb");
		}

		if (disableFailureToast) {
			// No work done
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			errorResponseData?.data?.message &&
				message.error(errorResponseData?.data?.message);
		}

		// Axios Timeout
		if (errorResponseData.config?.code === "ECONNABORTED") {
			if (!timeoutLanguageCount) {
				timeoutLanguageCount++;
				// message.error(requestTimeoutLanguage());
			}
		}

		if (
			(responseData as ResponseError).data &&
			(responseData as ResponseError).isAxiosError
		) {
			const errorArray = responseData?.data?.errors;
			if ((errorArray || []).length > 0) {
				message.error(errorArray[0]);
			} else if (responseData.data?.message) {
				message.error(responseData.data?.message);
			} else if (errorResponseData?.message) {
				message.error(
					"Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!",
				);
			}
		}

		// No Connection
		if (errorResponseData.noconnection) {
			// No Server Connection
			if (errorResponseData.message === "Server could not be reached") {
				if (!noServerConnectionLanguageCount) {
					noServerConnectionLanguageCount++;
					// FailToast(noConnectionLanguage());
				}
			}
			// No Connection
			else if (errorResponseData.config.code !== "ECONNABORTED") {
				if (!noConnectionLanguageCount) {
					noConnectionLanguageCount++;
					// FailToast(noConnectionLanguage());
				}
			}
		}

		throw new Error(errorResponseData?.message);
	}

	return responseData.data;
}
