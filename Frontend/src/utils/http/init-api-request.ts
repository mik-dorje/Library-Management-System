import {
    IApiDetails,
    Primitive,
    RequestAuthType,
    RequestBodyType,
    RequestDataType,
    RequestParam,
} from "@/schema/http.schema";
import Axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
    CancelTokenStatic,
    Method,
} from "axios";

import { API_ENDPOINT } from "@/config/api.config";

import { getRequestHeaders } from "./get-request-headers";
import { transformRequestData } from "./transform-request-data";

const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();
let isAlreadyFetchingAccessToken = false;

export default function initApiRequest<TData>(
    apiDetails: IApiDetails,
    requestData: RequestDataType,
    requestMethod: Method,
    params?: RequestParam,
    cancelSource?: CancelTokenSource,
    initialAuthToken?: string | undefined,
    extraData?: { [key: string]: Primitive }
): Promise<AxiosResponse<TData>> {
    // Base api url
    const endpoint = apiDetails.baseApiEndpoint || API_ENDPOINT;

    const headers = getRequestHeaders(apiDetails, initialAuthToken, extraData);

    const transformedRequestData = transformRequestData(
        apiDetails,
        requestData
    );

    let axiosReqParams: AxiosRequestConfig = {
        baseURL: endpoint,
        url: apiDetails.controllerName,
        method: requestMethod,
        responseType: "json",
        timeout: 60 * 3 * 1000,
        cancelToken: cancelSource ? cancelSource.token : source.token,
        headers,
        ...transformedRequestData,
    };

    if (apiDetails.requestAuthType === RequestAuthType.NOAUTH) {
        axiosReqParams = {
            ...axiosReqParams,
            auth: {
                username: "clientId",
                password: "secret",
            },
        };
    }

    if (params) {
        axiosReqParams = {
            ...axiosReqParams,
            params,
        };
    }

    if (apiDetails.requestBodyType === RequestBodyType.FILE) {
        axiosReqParams.responseType = "blob";
    }

    Axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            return Promise.reject(error);
        }
    );

    /**
     * interceptor to append isApprovalEdit:true when update from approval flow
     */
    // Add a request interceptor
    Axios.interceptors.request.use(
        // eslint-disable-next-line func-names
        function (config) {
            // Do something before request is sent
            return config;
        },
        // eslint-disable-next-line func-names
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    return Axios.request(axiosReqParams)
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosError) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const errorResponse = manageErrorResponse(error, apiDetails);
            throw errorResponse;
        });
}

function manageErrorResponse(error: any, apiDetails: IApiDetails) {
    const errorResponse: any = {
        message: "Error",
        data: null,
        status: false,
    };

    errorResponse.message = error.message; // Something happened in setting up the request that triggered an Error

    if (error.logout) errorResponse.logout = error.logout;

    if (error.logout) {
        isAlreadyFetchingAccessToken = false;
    }

    if (error.response) {
        errorResponse.response = error.response; // The server responded with a status code and data

        if (apiDetails.queryKeyName !== "AUTHFILE") {
            errorResponse.data = error.response.data; // The server responded with a status code and data
        }
    } else if (error.request) {
        errorResponse.message = "Server could not be reached."; // No response was received
        errorResponse.noConnection = true;
    }

    errorResponse.config = error.config; // Request Params Configs
    errorResponse.isAxiosError = error.isAxiosError; // If Axios Error
    return errorResponse;
}
